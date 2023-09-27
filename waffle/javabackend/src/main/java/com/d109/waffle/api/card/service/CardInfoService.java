package com.d109.waffle.api.card.service;

import java.util.List;

import com.d109.waffle.api.card.dto.CardInfoDto;

public interface CardInfoService {
	CardInfoDto getCardInfo(int cardId) throws Exception;
}
