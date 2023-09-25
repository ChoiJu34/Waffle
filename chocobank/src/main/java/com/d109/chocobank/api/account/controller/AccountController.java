package com.d109.chocobank.api.account.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.d109.chocobank.api.account.entity.AccountHistoryEntity;
import com.d109.chocobank.api.card.dto.AccountDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.chocobank.api.account.entity.AccountEntity;
import com.d109.chocobank.api.account.service.AccountServiceImpl;
import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.service.UserServiceImpl;
import com.d109.chocobank.common.auth.service.JwtService;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Api(tags = "Account Controller")
@RequiredArgsConstructor
@RequestMapping("/account")
@Slf4j
public class AccountController {
	private final JwtService jwtService;
	private final AccountServiceImpl accountService;

	private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

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

	@PostMapping("")
	public ResponseEntity<?> postAccount(@RequestHeader("Authorization") String header, @RequestBody Map<String, String> map) {
		Map<String, Object> result = new HashMap<>();
		try {
			Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(header);

			UserEntity user = null;
			if (userEntity.isPresent()) {
				user = userEntity.get();
			}

			AccountEntity accountEntity = new AccountEntity();
			accountEntity.setAccountNumber(map.get("accountNumber"));
			accountEntity.setUserEntity(user);

			accountService.postAccount(accountEntity);

			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);

		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	// @GetMapping("/service/list")
	// public ResponseEntity<?> getServiceAccountList(@RequestHeader("Authorization-uuid") String uuid) throws Exception {
	// 	Map<String, Object> result = new HashMap<>();
	// 	try {
	// 		List<AccountDto> accountList = accountService.getServiceAccountList(uuid);
	// 		result.put("message", "SUCCESS");
	// 		result.put("result", accountList);
	// 		return new ResponseEntity<>(result, HttpStatus.OK);
	// 	} catch (Exception e) {
	// 		log.error(e.getMessage());
	// 		result.put("message", "FAIL");
	// 		return new ResponseEntity<>(result, HttpStatus.OK);
	// 	}
	// }

	@GetMapping("/service")
	public ResponseEntity<?> getServiceAccount(@RequestBody Map<String, String> map) throws Exception {
		Map<String, Object> result = new HashMap<>();
		try {
			AccountEntity account = accountService.getServiceAccount(map.get("accountNumber"));
			result.put("message", "SUCCESS");
			result.put("result", account);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	// @GetMapping("/service/history")
	// public ResponseEntity<?> getServiceAccountHistory(@RequestHeader("Authorization-uuid") String uuid, @RequestBody Map<String, String> map) throws Exception {
	// 	Map<String, Object> result = new HashMap<>();
	// 	try {
	// 		List<AccountHistoryEntity> accountList = accountService.getServiceAccountHistory(uuid, map.get("accountNumber"));
	// 		result.put("message", "SUCCESS");
	// 		result.put("result", accountList);
	// 		return new ResponseEntity<>(result, HttpStatus.OK);
	// 	} catch (Exception e) {
	// 		log.error(e.getMessage());
	// 		result.put("message", "FAIL");
	// 		return new ResponseEntity<>(result, HttpStatus.OK);
	// 	}
	// }

	@GetMapping("/service/history")
	public ResponseEntity<?> getServiceAccountHistory(@RequestBody Map<String, String> map) throws Exception {
		Map<String, Object> result = new HashMap<>();
		try {
			List<AccountHistoryEntity> accountList = accountService.getServiceAccountHistory(map.get("accountNumber"));
			result.put("message", "SUCCESS");
			result.put("result", accountList);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}

	@PutMapping("/account-transfer")
	public ResponseEntity<?> createAccountTransfer(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, String> map) throws Exception {
		Map<String, Object> result = new HashMap<>();
		try {
			accountService.createAccountTransfer(authorization, map.get("senderName"), map.get("receiverName"), map.get("senderAccountNumber"), map.get("receiverAccountNumber"), Integer.parseInt(map.get("money")));
			result.put("message", "SUCCESS");
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}
}
