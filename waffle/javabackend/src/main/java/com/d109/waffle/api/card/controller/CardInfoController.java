package com.d109.waffle.api.card.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.waffle.api.card.dto.CardInfoDto;
import com.d109.waffle.api.card.dto.RecommendCardDto;
import com.d109.waffle.api.card.dto.SurveyDto;
import com.d109.waffle.api.card.service.CardInfoServiceImpl;
import com.d109.waffle.api.card.service.CardRecommendServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cardinfo")
@Slf4j
@CrossOrigin("*")
public class CardInfoController {
	private static final Logger logger = LoggerFactory.getLogger(CardInfoController.class);
	private final CardInfoServiceImpl cardInfoService;

	@GetMapping("/{id}")
	public ResponseEntity<?> getCardInfo(@PathVariable int id) {
		Map<String, Object> result = new HashMap<>();

		try {
			CardInfoDto cardInfo = cardInfoService.getCardInfo(id);
			result.put("message", "SUCCESS");
			result.put("result", cardInfo);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}
}
