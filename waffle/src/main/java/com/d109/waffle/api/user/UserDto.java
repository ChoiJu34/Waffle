package com.d109.waffle.api.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "user")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert @DynamicUpdate
public class UserDto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	private String birthday;

	private String tel;

	@Column(name = "refresh_token")
	private String refreshToken;

	@Column(name = "create_at")
	private String createAt;

	@Column(name = "update_at")
	private String updateAt;

	@Enumerated(EnumType.STRING)
	private Role role;

	// user role setting
	public void authorizeUser() {this.role = Role.USER;}

	// Encrypt password
	private void encodePassword(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.password);
	}

	// update refresh token
	public void updateRefreshToken(String updateRefreshToken) {
		this.refreshToken = updateRefreshToken;
	}

}
