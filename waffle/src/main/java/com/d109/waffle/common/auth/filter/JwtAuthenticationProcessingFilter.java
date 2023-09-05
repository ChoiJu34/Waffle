package com.d109.waffle.common.auth.filter;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.d109.waffle.api.user.UserDto;
import com.d109.waffle.api.user.UserRepository;
import com.d109.waffle.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {
	private static final String NO_CHECK_URL = "/login"; // "/login"으로 들어오는 요청은 Filter 작동 X

	private final JwtService jwtService;

	private final UserRepository userRepository;

	private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		if (request.getRequestURI().equals(NO_CHECK_URL)) {
			filterChain.doFilter(request, response); // "/login" 요청이 들어오면, 다음 필터 호출
			return;
		}


		String refreshToken = jwtService.extractRefreshToken(request)
			.filter(jwtService::isTokenValid)
			.orElse(null);

		if (refreshToken != null) {
			checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
			return;
		}

		if (refreshToken == null) {
			checkAccessTokenAndAuthentication(request, response, filterChain);
		}
	}

	public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
		userRepository.findByRefreshToken(refreshToken)
			.ifPresent(user -> {
				String reIssuedRefreshToken = reIssueRefreshToken(user);
				jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(user.getEmail()),
					reIssuedRefreshToken);
			});
	}

	private String reIssueRefreshToken(UserDto user) {
		String reIssuedRefreshToken = jwtService.createRefreshToken();
		user.updateRefreshToken(reIssuedRefreshToken);
		userRepository.saveAndFlush(user);
		return reIssuedRefreshToken;
	}


	public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		log.info("checkAccessTokenAndAuthentication() 호출");
		jwtService.extractAccessToken(request)
			.filter(jwtService::isTokenValid)
			.ifPresent(accessToken -> jwtService.extractEmail(accessToken)
				.ifPresent(email -> userRepository.findByEmail(email)
					.ifPresent(this::saveAuthentication)));

		log.info("checkAccessTokenAndAuthentication response"+response.getStatus());

		Optional<String> accessToken = jwtService.extractAccessToken(request);
		if(accessToken.isPresent()) {
			if(!jwtService.isTokenValid(accessToken.get())) {
				response.setStatus(HttpStatus.UNAUTHORIZED.value());
				return;
			}
		}

		filterChain.doFilter(request, response);
	}

	public void saveAuthentication(UserDto myUser) {
		String password = myUser.getPassword();

		UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
			.username(myUser.getEmail())
			.password(password)
			.roles(myUser.getRole().name())
			.build();

		Authentication authentication =
			new UsernamePasswordAuthenticationToken(userDetailsUser, null,
				authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

}
