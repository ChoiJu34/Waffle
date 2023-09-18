package com.d109.chocobank.api.user.controller;

import java.security.InvalidKeyException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.service.UserServiceImpl;
import com.d109.chocobank.common.auth.service.JwtService;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Api(tags = "User Controller")
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
	private final UserServiceImpl userService;

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody Map<String, String> map) throws Exception {
		return null;
	}

	@PostMapping("/sign-up")
	public ResponseEntity<?> fanSignUp(@RequestBody UserEntity userEntity) throws Exception {
		Map<String, String> result = new HashMap<>();
		try {
			userService.signUp(userEntity);
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	private final JwtService jwtService;

	@GetMapping("/token-test")
	public ResponseEntity<?> tokenTest(@RequestHeader("Authorization") String header) throws Exception {
		try {
			Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(header);
			UserEntity user = null;
			if (userEntity.isPresent()) {
				user = userEntity.get();
			}
			return new ResponseEntity<>(user.getName(), HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
}