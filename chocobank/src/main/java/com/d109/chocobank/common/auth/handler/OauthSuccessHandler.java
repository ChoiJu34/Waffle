package com.d109.chocobank.common.auth.handler;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.repository.UserRepository;
import com.d109.chocobank.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class OauthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final JwtService jwtService;
	private final UserRepository userRepository;

	@Value("${jwt.access.expiration}")
	private String accessTokenExpiration;

	private String REDIRECT_LOCATION = "http://localhost/login/chocobank/loading";

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		// String email = extractUsername(authentication);
		// String accessToken = jwtService.createAccessToken(email);
		// String refreshToken = jwtService.createRefreshToken();
		// Optional<String> role = jwtService.extractRole(accessToken);
		// log.info("로그인 : userEmail : {}, userRole : {}", jwtService.extractEmail(accessToken), role);
		//
		// jwtService.sendAccessAndRefreshToken(response, accessToken,
		// 	refreshToken); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답
		//
		// 	userRepository.findByEmail(email)
		// 		.ifPresent(user -> {
		// 			// user.updateRefreshToken(refreshToken);
		// 			userRepository.saveAndFlush(user);
		// 		});
		try {
			loginSuccess(response, authentication);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw e;
		}

		log.info("인증에 성공하였습니다. 이메일 : {}", extractUsername(authentication));
		log.info("인증에 성공하였습니다. AccessToken : {}");
		log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);

	}

	private String extractUsername(Authentication authentication) {
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		return userDetails.getUsername();
	}

	private String getUserUuid(String userEmail) {
		Optional<UserEntity> userEntity = userRepository.findByEmail(userEmail);

		return userEntity.orElseThrow().getUuid();
	}

	private void loginSuccess(HttpServletResponse response, Authentication authentication) throws IOException {
		String accessToken = jwtService.createAccessToken(extractUsername(authentication));
		String refreshToken = jwtService.createRefreshToken();
		response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
		response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

		response.sendRedirect(UriComponentsBuilder.fromUriString(REDIRECT_LOCATION)
			.queryParam("accessToken", accessToken)
			.queryParam("refreshToken", refreshToken)
			.queryParam("uuid", getUserUuid(extractUsername(authentication)))
			.build()
			.encode(StandardCharsets.UTF_8)
			.toUriString());

		jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
		jwtService.updateRefreshToken(extractUsername(authentication), refreshToken);
	}



}
