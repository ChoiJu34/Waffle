package com.d109.waffle.api.cardrecommend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.d109.waffle.api.cardrecommend.controller.CardRecommendController;
import com.d109.waffle.api.cardrecommend.dto.CardDto;
import com.d109.waffle.api.cardrecommend.dto.RecommendCardDto;
import com.d109.waffle.api.cardrecommend.dto.SurveyDto;
import com.d109.waffle.api.cardrecommend.repository.CardRecommendRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardRecommendServiceImpl implements CardRecommendService {
	private static final Logger logger = LoggerFactory.getLogger(CardRecommendController.class);
	private final CardRecommendRepository cardRecommendRepository;

	@Override
	public List<RecommendCardDto> getRecommendCardList(SurveyDto surveyDto) throws Exception {


		return null;
	}
}
