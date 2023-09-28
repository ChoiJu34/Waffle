package com.d109.waffle.api.exchange.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.swing.*;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.yaml.snakeyaml.util.EnumUtils;

import com.d109.waffle.api.card.dto.CardResponseDto;
import com.d109.waffle.api.card.entity.CardEntity;
import com.d109.waffle.api.card.entity.UserCardEntity;
import com.d109.waffle.api.exchange.dto.CountryEnum;
import com.d109.waffle.api.exchange.dto.ExchangeDto;
import com.d109.waffle.api.exchange.entity.ExchangeEntity;
import com.d109.waffle.api.exchange.repository.ExchangeRepository;
import com.d109.waffle.api.user.repository.EmailTokenRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.schema.Enums;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ExchangeServiceImpl implements ExchangeService{

	private final ExchangeRepository exchangeRepository;

	@Value("${request.exchange_open_api.base_url}")
	private String exchange_url;

	@Override
	public void initExchangeData(int startDate, int endDate) throws Exception {

		HashMap<String, String> body = new HashMap<>();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");

		HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

		RestTemplate restTemplate = new RestTemplate();

		for(int i=startDate; i<endDate; i++) {
			ResponseEntity<List<ExchangeDto>> response = restTemplate.exchange(
				exchange_url + "&searchdate=" + i,
				HttpMethod.GET,
				entity,
				new ParameterizedTypeReference<List<ExchangeDto>>() {}
			);

			if(response.getBody().isEmpty()) {
				log.info("empty response body");
				continue;
			}

			List<ExchangeDto> list = response.getBody();
			for(ExchangeDto dto : list) {
				String unit = dto.getCur_unit().substring(0, 3);
				if(!Arrays.stream(CountryEnum.values()).anyMatch(v->v.name().equals(unit))) {
					continue;
				}

				ExchangeEntity exchangeEntity = ExchangeEntity.builder()
					.countryId(CountryEnum.valueOf(unit).getId())
					.date(LocalDateTime.of(i/10000, i%10000/100, i%100, 0, 0, 0))
					.price(Double.valueOf(dto.getDeal_bas_r().replace(",", "")))
					.build();

				exchangeRepository.save(exchangeEntity);

			}
		}
	}

	@Override
	public List<ExchangeEntity> getYearExchangeData(String currencyCode) throws Exception {
		ZoneId zoneId = ZoneId.of("Asia/Seoul");
		LocalDateTime yearAgoDate = LocalDateTime.now(zoneId).minusYears(1);
		log.info("1년 전 localdatetime {}", yearAgoDate);
		int countryId = CountryEnum.valueOf(currencyCode).getId();
		log.info("country id {}", countryId);
		return exchangeRepository.findByCountryIdAndDateGreaterThanEqual(countryId, yearAgoDate);
	}
}
