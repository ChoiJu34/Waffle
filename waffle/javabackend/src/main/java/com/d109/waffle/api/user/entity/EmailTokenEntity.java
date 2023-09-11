package com.d109.waffle.api.user.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "email_token")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class EmailTokenEntity {

	private static final long EMAIL_TOKEN_EXPIRATION_TIME_VALUE = 5L;

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(length = 45)
	private String id;

	@Column(name = "expiration_date")
	private LocalDateTime expirationDate;

	private Boolean expired;

	@Column(name = "user_id")
	private Integer userId;

	public static EmailTokenEntity createEmailToken() {
		EmailTokenEntity emailToken = new EmailTokenEntity();
		emailToken.expirationDate = LocalDateTime
			.now()
			.plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME_VALUE);
		emailToken.expired = false;

		return emailToken;
	}

	public static EmailTokenEntity createEmailToken(Integer userId) {
		EmailTokenEntity emailToken = new EmailTokenEntity();
		emailToken.expirationDate = LocalDateTime
			.now()
			.plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME_VALUE);
		emailToken.expired = false;
		emailToken.userId = userId;

		return emailToken;
	}

	public void setTokenToUsed() {
		this.expired = true;
	}

}