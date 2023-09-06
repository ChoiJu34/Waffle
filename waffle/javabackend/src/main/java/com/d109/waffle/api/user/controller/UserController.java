package com.d109.waffle.api.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.waffle.api.user.service.UserServiceImpl;
import com.d109.waffle.api.user.entity.UserEntity;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
	private final UserServiceImpl userService;

	@PostMapping("/sign-up")
	public ResponseEntity<?> fanSignUp(@RequestBody UserEntity userDto) throws Exception {
		Map<String, String> result = new HashMap<>();
		try {
			userService.signUp(userDto);
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}
}