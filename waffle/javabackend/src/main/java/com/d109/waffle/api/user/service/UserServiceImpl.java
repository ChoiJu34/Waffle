package com.d109.waffle.api.user.service;

import java.security.InvalidKeyException;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.d109.waffle.api.user.dto.UpdateUserDto;
import com.d109.waffle.api.user.entity.EmailTokenEntity;
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
	public void findPassword(String email, String name, String tel) throws Exception {
		Optional<UserEntity> userEntity = userRepository.findByEmail(email);
		if(userEntity.isPresent()) {
			UserEntity user = userEntity.get();
			if(!user.getName().equals(name) || !user.getTel().equals(tel)) {
				throw new NoSuchElementException("사용자 정보가 잘못되었습니다.");
			}
			emailService.createEmailToken(email, userEntity.get().getId());
		} else {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
	}

	@Override
	public void updatePassword(String token, String newPassword) throws Exception {
		if(emailService.verifyPasswordToken(token, true)){
			Optional<EmailTokenEntity> emailToken = emailService.findValidToken(token);
			UserEntity user = userRepository.findById(emailToken.get().getUserId()).orElseThrow();
			user.setPassword(newPassword);
			user.encodePassword(passwordEncoder);
			userRepository.save(user);
		} else {
			throw new InvalidKeyException("잘못된 키값입니다.");
		}
	}

	@Override
	public void updateUser(String authorization, UpdateUserDto updateUserDto) throws Exception {
		Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
		if(userEntity.isPresent()) {
			UserEntity user = userEntity.get();

			if(!passwordEncoder.matches(updateUserDto.getPassword(), user.getPassword())) {
				throw new InvalidKeyException("비밀번호를 다시 입력해주세요.");
			}
			user.setName(updateUserDto.getNewName());
			user.setTel(updateUserDto.getNewTel());
			user.setPassword(updateUserDto.getNewPassword());
			user.encodePassword(passwordEncoder);
			userRepository.save(user);
		} else {
			throw new AuthorizationServiceException("인증 오류");
		}
	}

	@Override
	public void saveUserUuid(String authorization, String uuid) throws Exception {
		Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
		if(userEntity.isPresent()) {
			UserEntity user = userEntity.get();

			user.setUuid(uuid);
			userRepository.save(user);
		}
	}
}
