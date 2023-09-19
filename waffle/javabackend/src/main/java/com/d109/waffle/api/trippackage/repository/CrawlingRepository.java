package com.d109.waffle.api.trippackage.repository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.client.RestTemplate;

import com.d109.waffle.api.trippackage.dto.RecommendDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
@Transactional
public class CrawlingRepository {
	private final RestTemplate restTemplate;
	@Async("multiAsync")
	public ListenableFuture<Map<String, Object>> interparkPlane(RecommendDto recommendDto) throws
		JsonProcessingException {
		String s = restTemplate.postForObject("http://127.0.0.1:8000/interparkPlane", recommendDto, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(s, new TypeReference<Map<String, Object>>() {});
		return new AsyncResult<>(dataMap);
	}
	@Async("multiAsync")
	public ListenableFuture<Map<String, Object>> interparkHotel(RecommendDto recommendDto) throws
		JsonProcessingException {
		String s = restTemplate.postForObject("http://127.0.0.1:8000/interparkHotel", recommendDto, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(s, new TypeReference<Map<String, Object>>() {});
		return new AsyncResult<>(dataMap);
	}
	@Async("multiAsync")
	public ListenableFuture<Map<String, Object>> tripPlane(RecommendDto recommendDto) throws
		JsonProcessingException {
		String s = restTemplate.postForObject("http://127.0.0.1:8000/tripPlane", recommendDto, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(s, new TypeReference<Map<String, Object>>() {});
		return new AsyncResult<>(dataMap);
	}
}
