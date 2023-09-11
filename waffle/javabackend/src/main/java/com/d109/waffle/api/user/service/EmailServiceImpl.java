package com.d109.waffle.api.user.service;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.d109.waffle.api.user.entity.EmailTokenEntity;
import com.d109.waffle.api.user.repository.EmailTokenRepository;

import io.jsonwebtoken.lang.Assert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class EmailServiceImpl implements EmailService {

	private final EmailTokenRepository emailTokenRepository;
	private final JavaMailSender javaMailSender;

	// 이메일 인증 토큰 생성 및 전송
	@Override
	public String createEmailToken(String email, Integer userId) throws Exception {
		Assert.hasText(email, "email error");

		// 이메일 토큰 저장
		EmailTokenEntity emailToken = null;
		if(userId == null) {
			emailToken = EmailTokenEntity.createEmailToken();
		} else {
			emailToken = EmailTokenEntity.createEmailToken(userId);
		}
		emailTokenRepository.save(emailToken);

		// 이메일 전송
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(email);
		mailMessage.setSubject("[WAFFLE] 이메일 인증");
		mailMessage.setText(emailToken.getId());
		sendEmail(mailMessage);

		return emailToken.getId();
	}

	@Async
	public void sendEmail(SimpleMailMessage email) {
		javaMailSender.send(email);
	}

	@Override
	public Optional<EmailTokenEntity> findValidToken(String emailTokenId) throws Exception {
		return Optional.empty();
	}

	@Override
	public Boolean verifyToken(String token) throws Exception {
		Optional<EmailTokenEntity> emailToken = emailTokenRepository
			.findByIdAndExpirationDateAfterAndExpired(token, LocalDateTime.now(), false);
		if(emailToken.isPresent()) {
			emailToken.get().setTokenToUsed();
			return true;
		} else {
			return false;
		}
	}
}
