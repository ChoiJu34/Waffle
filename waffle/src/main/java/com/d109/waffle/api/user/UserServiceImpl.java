package com.d109.waffle.api.user;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.d109.waffle.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final JwtService jwtService;
}
