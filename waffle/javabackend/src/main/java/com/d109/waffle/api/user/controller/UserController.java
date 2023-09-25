package com.d109.waffle.api.user.controller;

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

import com.d109.waffle.api.user.dto.UpdateUserDto;
import com.d109.waffle.api.user.service.EmailServiceImpl;
import com.d109.waffle.api.user.service.UserServiceImpl;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
	private final UserServiceImpl userService;
	private final EmailServiceImpl emailService;

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

	@PostMapping("/verify-email")
	public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> map) {
		Map<String, String> result = new HashMap<>();
		try {
			userService.verifyEmail(map.get("email"));
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (DuplicateKeyException dke) {
			log.error(dke.getMessage());
			result.put("message", "DUPLICATE");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	@PostMapping("/verify-token")
	public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> map) {
		Map<String, String> result = new HashMap<>();
		try {
			result.put("validation", emailService.verifyToken(map.get("token")).toString());
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	@PostMapping("/find-email")
	public ResponseEntity<?> findEmail(@RequestBody Map<String, String> map) {
		Map<String, String> result = new HashMap<>();
		try {
			result.put("email", userService.findEmail(map.get("name"), map.get("tel")));
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NoSuchElementException nse) {
			log.error(nse.getMessage());
			result.put("message", "FAIL");
			result.put("result", nse.getMessage());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	// 비밀번호 찾기 시도
	// 이메일, 이름, 전화번호 모두 일치하는 사용자가 존재할 경우
	// 이메일로 토큰 전송
	@PostMapping("/find-password")
	public ResponseEntity<?> findPassword(@RequestBody Map<String, String> map) {
		Map<String, String> result = new HashMap<>();
		try {
			userService.findPassword(map.get("email"), map.get("name"), map.get("tel"));
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NoSuchElementException nse) {
			log.error(nse.getMessage());
			result.put("message", "FAIL");
			result.put("result", nse.getMessage());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	// 이메일로 전송한 토큰의 유효성을 검증한다.
	@PutMapping("/verify-password-token")
	public ResponseEntity<?> verifyPasswordToken(@RequestBody Map<String, String> map) {
		Map<String, String> result = new HashMap<>();
		try {
			result.put("validation", emailService.verifyPasswordToken(map.get("token"), false).toString());
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	// 앞서 verify-password-token 을 통해 인증한 토큰, 변경할 새 비밀번호
	@PutMapping("/update-password")
	public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> map) {
		Map<String, String> result = new HashMap<>();
		try {
			userService.updatePassword(map.get("token"), map.get("newPassword"));
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (InvalidKeyException ike) {
			log.error(ike.getMessage());
			result.put("message", "FAIL");
			result.put("result", ike.getMessage());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	@PutMapping("/update-user")
	public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String authorization, @RequestBody UpdateUserDto updateUserDto) {
		Map<String, String> result = new HashMap<>();
		try {
			userService.updateUser(authorization, updateUserDto);
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (InvalidKeyException ike) {		// 비밀번호 오류
			log.error(ike.getMessage());
			result.put("message", "FAIL");
			result.put("result", ike.getMessage());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (AuthorizationServiceException ase) {	// 토큰 오류
			log.error(ase.getMessage());
			result.put("message", "FAIL");
			result.put("result", ase.getMessage());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	@PostMapping("/save/uuid")
	public ResponseEntity<?> saveUserUuid(@RequestHeader("Authorization") String authorization, @RequestBody String uuid) {
		Map<String, String> result = new HashMap<>();
		try {
			userService.saveUserUuid(authorization, uuid);
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}




}