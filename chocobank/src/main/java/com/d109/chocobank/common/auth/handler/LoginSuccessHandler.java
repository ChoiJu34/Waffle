package com.d109.chocobank.common.auth.handler;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.d109.chocobank.api.user.repository.UserRepository;
import com.d109.chocobank.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final JwtService jwtService;
	private final UserRepository userRepository;

	@Value("${jwt.access.expiration}")
	private String accessTokenExpiration;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) {
		String email = extractUsername(authentication);
		String accessToken = jwtService.createAccessToken(email);
		String refreshToken = jwtService.createRefreshToken();
		Optional<String> role = jwtService.extractRole(accessToken);
		log.info("로그인 : userEmail : {}, userRole : {}", jwtService.extractEmail(accessToken), role);

		jwtService.sendAccessAndRefreshToken(response, accessToken,
			refreshToken); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답

			userRepository.findByEmail(email)
				.ifPresent(user -> {
					user.updateRefreshToken(refreshToken);
					userRepository.saveAndFlush(user);
				});
	}

	private String extractUsername(Authentication authentication) {
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		return userDetails.getUsername();
	}

}
