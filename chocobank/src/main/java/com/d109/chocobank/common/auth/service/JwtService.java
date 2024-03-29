package com.d109.chocobank.common.auth.service;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.repository.UserRepository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {
	@Value("${jwt.secretKey}")
	private String secretKey;

	@Value("${jwt.access.expiration}")
	private Long accessTokenExpirationPeriod;

	@Value("${jwt.refresh.expiration}")
	private Long refreshTokenExpirationPeriod;

	@Value("${jwt.access.header}")
	private String accessHeader;

	@Value("${jwt.refresh.header}")
	private String refreshHeader;

	private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
	private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
	private static final String EMAIL_CLAIM = "email";
	private static final String USER_ROLE_CLAIM = "role";
	private static final String USER_ID_CLAIM = "id";
	private static final String BEARER = "Bearer ";

	// user repository
	private final UserRepository userRepository;


	public String createAccessToken(String email) {
		Date now = new Date();
		String role;

		UserEntity fanDto = userRepository.findByEmail(email).get();
		role = fanDto.getRole().getKey();

		return JWT.create()
			.withSubject(ACCESS_TOKEN_SUBJECT)
			.withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod))

			.withClaim(EMAIL_CLAIM, email)
			.withClaim(USER_ROLE_CLAIM, role)
			.sign(Algorithm.HMAC512(secretKey));
	}

	public String createRefreshToken() {
		Date now = new Date();

		return JWT.create()
			.withSubject(REFRESH_TOKEN_SUBJECT)
			.withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
			.sign(Algorithm.HMAC512(secretKey));
	}

	public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
		response.setStatus(HttpServletResponse.SC_OK);

		setAccessTokenHeader(response, accessToken);
		setRefreshTokenHeader(response, refreshToken);
	}

	public Optional<String> extractRefreshToken(HttpServletRequest request) {
		return Optional.ofNullable(request.getHeader(refreshHeader))
			.filter(refreshToken -> refreshToken.startsWith(BEARER))
			.map(refreshToken -> refreshToken.replace(BEARER, ""));
	}

	public Optional<String> extractAccessToken(HttpServletRequest request) {
		return Optional.ofNullable(request.getHeader(accessHeader))
			.filter(refreshToken -> refreshToken.startsWith(BEARER))
			.map(refreshToken -> refreshToken.replace(BEARER, ""));
	}

	public Optional<String> removeBearer(String accessHeader) {
		return Optional.ofNullable(accessHeader)
			.filter(token -> token.startsWith(BEARER))
			.map(token -> token.replace(BEARER, ""));
	}

	public Optional<UserEntity> accessHeaderToUser(String accessHeader) {
		String accessToken = removeBearer(accessHeader).orElseThrow();

		String email = extractEmail(accessToken).orElseThrow();

		return userRepository.findByEmail(email);
	}

	public Optional<String> extractEmail(String accessToken) {
		try {
			return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
				.build()
				.verify(accessToken)
				.getClaim(EMAIL_CLAIM)
				.asString());
		} catch (TokenExpiredException tee) {
			log.error("만료된 토큰입니다. {}", tee.getMessage());
			return Optional.empty();
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.");
			return Optional.empty();
		}
	}

	public Integer accessTokenToUserId(String accessToken) {
		try {
			accessToken = removeBearer(accessToken).get();

			String email = extractEmail(accessToken).get();

			String role = extractRole(accessToken).get();

			return userRepository.findByEmail(email).get().getId();
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.");
			return null;
		}
	}

	public Optional<String> extractRole(String accessToken) {
		try {
			return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
				.build()
				.verify(accessToken)
				.getClaim(USER_ROLE_CLAIM)
				.asString());
		} catch (TokenExpiredException tee) {
			log.error("만료된 토큰입니다. {}", tee.getMessage());
			return Optional.empty();
		} catch (Exception e) {
			log.error("extracRole :: 액세스 토큰이 유효하지 않습니다.");
			return Optional.empty();
		}
	}

	public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
		response.setHeader(accessHeader, accessToken);
	}

	public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
		response.setHeader(refreshHeader, refreshToken);
	}

	public void updateRefreshToken(String email, String refreshToken) {
		userRepository.findByEmail(email)
			.ifPresentOrElse(
				user -> user.updateRefreshToken(refreshToken),
				() -> new Exception("일치하는 회원이 없습니다.")
			);
	}

	public boolean isTokenValid(String token) {
		try {
			JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
			return true;
		} catch (TokenExpiredException tee) {
			log.error("만료된 토큰입니다. {}", tee.getMessage());
			return false;
		} catch (Exception e) {
			log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
			return false;
		}
	}



}
