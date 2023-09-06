package com.d109.waffle.api.user.service;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.d109.waffle.common.auth.Role;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.api.user.repository.UserRepository;
import com.d109.waffle.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	@Override
	public void signUp(UserEntity userDto) throws Exception {
		if(userRepository.findByEmail(userDto.getEmail()).isPresent()) {
			throw new Exception("이미 존재하는 이메일입니다.");
		}

		UserEntity user = UserEntity.builder()
			.email(userDto.getEmail())
			.password(userDto.getPassword())
			.name(userDto.getName())
			.tel(userDto.getTel())
			.birthday(userDto.getBirthday())
			.role(Role.USER)
			.build();

		user.encodePassword(passwordEncoder);
		userRepository.save(user);
	}
}
