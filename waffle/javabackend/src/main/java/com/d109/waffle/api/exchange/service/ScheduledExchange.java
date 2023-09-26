package com.d109.waffle.api.exchange.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.d109.waffle.api.exchange.dto.CountryEnum;
import com.d109.waffle.api.exchange.dto.ExchangeDto;
import com.d109.waffle.api.exchange.dto.RecentExchangeDto;
import com.d109.waffle.api.exchange.entity.ExchangeEntity;
import com.d109.waffle.api.exchange.repository.ExchangeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ScheduledExchange {

	private final ExchangeRepository exchangeRepository;

	@Value("${request.recent_exchange_open_api.base_url}")
	private String recent_exchange_url;

	@Scheduled(cron = "0 0/5  8-23 * * 1-5", zone = "Asia/Seoul")
	public void updateCurrentExchangeData() {
		log.info("scheduler running {}", LocalDateTime.now());

		HashMap<String, String> body = new HashMap<>();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");

		HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

		RestTemplate restTemplate = new RestTemplate();

		LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

		log.info("now midnight {}", now.with(LocalTime.MIDNIGHT));

		LocalDateTime today = now.with(LocalTime.MIDNIGHT);

		ResponseEntity<List<RecentExchangeDto>> response = restTemplate.exchange(
			recent_exchange_url,
			HttpMethod.GET,
			entity,
			new ParameterizedTypeReference<List<RecentExchangeDto>>() {}
		);

		if(response.getBody().isEmpty()) {
			log.info("empty response");
			return;
		}

		log.info("recent exchange res {}", response.getBody());


		List<RecentExchangeDto> list = response.getBody();
		for(RecentExchangeDto dto : list) {
			String unit = dto.getCurrencyCode();

			List<ExchangeEntity> exchangeEntity = exchangeRepository.findByCountryIdAndDateGreaterThanEqual(CountryEnum.valueOf(unit).getId(), today);

			log.info("get today rate {}", exchangeEntity);

			ExchangeEntity exchange;
			if(exchangeEntity.isEmpty()) {
				log.info("empty exchange entity");
				exchange = ExchangeEntity.builder()
					.date(today)
					.countryId(CountryEnum.valueOf(unit).getId())
					.price(dto.getBasePrice())
					.build();
			} else {
				log.info("exist");
				exchange = exchangeEntity.get(0);
				exchange.setPrice(dto.getBasePrice());
			}

			log.info("save exchange entity {}", exchange);

			exchangeRepository.save(exchange);

		}
	}
}
