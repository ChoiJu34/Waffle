package com.d109.waffle.api.card.service;

import java.util.List;

import com.d109.waffle.api.card.dto.RecommendCardDto;
import com.d109.waffle.api.card.dto.SurveyDto;

public interface CardRecommendService {
	public List<RecommendCardDto> getRecommendCardList(SurveyDto surveyDto) throws Exception;
}
