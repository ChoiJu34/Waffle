package com.d109.waffle.api.user.service;

import java.util.Optional;

import com.d109.waffle.api.user.entity.EmailTokenEntity;

public interface EmailService {

	public String createEmailToken(String email) throws Exception;

	public Optional<EmailTokenEntity> findValidToken(String emailTokenId) throws Exception;

	public Boolean verifyToken(String token) throws Exception;

}
