package com.d109.waffle.api.cardrecommend.service;

import java.util.List;

import com.d109.waffle.api.cardrecommend.dto.CardDto;
import com.d109.waffle.api.cardrecommend.dto.RecommendCardDto;
import com.d109.waffle.api.cardrecommend.dto.SurveyDto;

public interface CardRecommendService {
	public List<RecommendCardDto> getRecommendCardList(SurveyDto surveyDto) throws Exception;
}
