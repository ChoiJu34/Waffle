package com.d109.waffle.api.user.dto;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UpdateUserDto {
	private String newName;
	private String newTel;
	private String password;
	private String newPassword;

}
