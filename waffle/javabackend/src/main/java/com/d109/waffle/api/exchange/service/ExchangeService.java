package com.d109.waffle.api.exchange.service;

import java.util.List;

import com.d109.waffle.api.exchange.dto.ExchangeDto;
import com.d109.waffle.api.exchange.entity.ExchangeEntity;

public interface ExchangeService {

	public void initExchangeData(int startDate, int endDate) throws Exception;

	List<ExchangeEntity> getYearExchangeData(String currencyCode) throws Exception;
}
