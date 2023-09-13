package com.d109.waffle.api.cardrecommend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.waffle.api.cardrecommend.dto.RecommendCardDto;
import com.d109.waffle.api.cardrecommend.dto.SurveyDto;
import com.d109.waffle.api.cardrecommend.service.CardRecommendServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend-card")
@Slf4j
@CrossOrigin("*")
public class CardRecommendController {
	private static final Logger logger = LoggerFactory.getLogger(CardRecommendController.class);
	private final CardRecommendServiceImpl cardRecommendService;

	@PostMapping("/recommend")
	public ResponseEntity<?> getRecommendCardList(@RequestBody SurveyDto surveyDto) {
		Map<String, Object> result = new HashMap<>();
		try {
			List<RecommendCardDto> recommendCardList = cardRecommendService.getRecommendCardList(surveyDto);
			result.put("message", "SUCCESS");
			result.put("result", recommendCardList);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage());
			result.put("message", "FAIL");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}
}
