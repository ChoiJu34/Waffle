package com.d109.chocobank.api.account.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.chocobank.api.account.entity.AccountEntity;
import com.d109.chocobank.api.account.service.AccountServiceImpl;
import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.service.UserServiceImpl;
import com.d109.chocobank.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
@Slf4j
public class AccountController {
	private final JwtService jwtService;
	private final AccountServiceImpl accountService;

	@GetMapping("")
	public ResponseEntity<?> getAccountList(@RequestHeader("Authorization") String header) throws Exception {
		Map<String, Object> result = new HashMap<>();
		try {
			Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(header);

			UserEntity user = null;
			if (userEntity.isPresent()) {
				user = userEntity.get();
			}

			List<AccountEntity> accountList = accountService.getAccountList(user.getId());

			result.put("message", "SUCCESS");
			result.put("result", accountList);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	@GetMapping("{id}")
	public ResponseEntity<?> getAccount(@RequestHeader("Authorization") String header, @PathVariable Integer id) throws Exception {
		Map<String, Object> result = new HashMap<>();
		try {
			Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(header);

			UserEntity user = null;
			if (userEntity.isPresent()) {
				user = userEntity.get();
			}

			AccountEntity account = accountService.getAccount(id);

			result.put("message", "SUCCESS");
			result.put("result", account);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
}
