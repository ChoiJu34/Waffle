package com.d109.waffle.api.user.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.user.entity.EmailTokenEntity;

public interface EmailTokenRepository extends JpaRepository<EmailTokenEntity, String> {
	Optional<EmailTokenEntity> findByIdAndExpirationDateAfterAndExpired(String emailTokenId, LocalDateTime now, Boolean expired);
	Optional<EmailTokenEntity> findByIdAndExpirationDateAfterAndExpiredAndHoldExpired(String emailTokenId, LocalDateTime now, Boolean expired, Boolean holdExpired);
}
