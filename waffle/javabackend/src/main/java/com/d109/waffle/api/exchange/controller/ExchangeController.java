package com.d109.waffle.api.exchange.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.waffle.api.exchange.service.ExchangeServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exchange")
@Slf4j
public class ExchangeController {
	private final ExchangeServiceImpl exchangeService;

	@PostMapping("/init-data")
	public ResponseEntity<?> initExchangeData(@RequestBody Map<String, String> map) {
		try {
			exchangeService.initExchangeData(Integer.parseInt(map.get("startDate")), Integer.parseInt(map.get("endDate")));
			return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			return new ResponseEntity<>("FAIL", HttpStatus.ACCEPTED);
		}
	}
}
