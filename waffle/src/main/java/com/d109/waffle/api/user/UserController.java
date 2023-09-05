package com.d109.waffle.api.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
	private final UserServiceImpl userService;
	//
	// @PostMapping("/sign-up")
	// public ResponseEntity<?> fanSignUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
	// 	userService.signUp(userSignUpDto);
	// 	return new ResponseEntity<String>("회원가입 성공", HttpStatus.OK);
	// }
}
