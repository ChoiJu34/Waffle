package com.d109.waffle.api.user.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.d109.waffle.common.auth.Role;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.api.user.repository.UserRepository;
import com.d109.waffle.common.auth.service.JwtService;

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
	private final EmailServiceImpl emailService;

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
			.birthday(userEntity.getBirthday())
			.role(Role.USER)
			.build();

		user.encodePassword(passwordEncoder);
		userRepository.save(user);
	}

	@Override
	public void verifyEmail(String email) throws Exception {
		Optional<UserEntity> userEntity = userRepository.findByEmail(email);
		if(!userEntity.isPresent()) {
			emailService.createEmailToken(email, null);
		} else {
			throw new DuplicateKeyException("이미 가입 정보가 존재합니다.");
		}
	}

	@Override
	public String findEmail(String name, String tel) throws Exception {
		Optional<UserEntity> userEntity = userRepository.findByNameAndTel(name, tel);
		if(userEntity.isPresent()) {
			return userEntity.get().getEmail();
		} else {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
	}

	@Override
	public void findPassword(String email) throws Exception {
		Optional<UserEntity> userEntity = userRepository.findByEmail(email);
		if(userEntity.isPresent()) {
			emailService.createEmailToken(email, userEntity.get().getId());
		} else {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
	}
}
