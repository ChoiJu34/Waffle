package com.d109.chocobank.api.user.service;

import java.security.InvalidKeyException;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.repository.UserRepository;
import com.d109.chocobank.common.auth.Role;
import com.d109.chocobank.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	@Override
	public void signUp(UserEntity userEntity) throws Exception {
		if(userRepository.findByEmail(userEntity.getEmail()).isPresent()) {
			throw new Exception("이미 존재하는 이메일입니다.");
		}

		UserEntity user = UserEntity.builder()
			.email(userEntity.getEmail())
			.password(userEntity.getPassword())
			.name(userEntity.getName())
			.tel(userEntity.getTel())
			.role(Role.USER)
			.build();

		user.encodePassword(passwordEncoder);
		user.setUserUuid();
		userRepository.save(user);
	}

}
