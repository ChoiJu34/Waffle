package com.d109.waffle.common.auth.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.d109.waffle.common.auth.Role;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.api.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<UserEntity> userEntity = userRepository.findByEmail(email);

		if (userEntity.isPresent()) {
			UserEntity user = userEntity.get();
			return User.builder()
				.username(user.getEmail())
				.password(user.getPassword())
				.roles(Role.USER.getKey())
				.build();
		} else {
			throw new UsernameNotFoundException("해당 이메일이 존재하지 않습니다.");
		}
	}
}
