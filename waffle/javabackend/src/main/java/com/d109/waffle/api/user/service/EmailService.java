package com.d109.waffle.api.user.service;

import java.util.Optional;

import com.d109.waffle.api.user.entity.EmailTokenEntity;

public interface EmailService {

	// 이메일 인증 토큰 생성 및 전송
	String createEmailToken(String email, Integer userId) throws Exception;

	public Optional<EmailTokenEntity> findValidToken(String emailTokenId) throws Exception;

	public Boolean verifyToken(String token) throws Exception;

}
