package com.d109.waffle.api.trippackage.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.d109.waffle.api.trippackage.dto.RecommendDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TripPackageService {
	private RestTemplate restTemplate;

	@Autowired
	public void TripPackageService(RestTemplate restTemplate){
		this.restTemplate = restTemplate;
	}

	public Map<String, Object> all(RecommendDto recommendDto) throws JsonProcessingException {
		Map<String, Object> map = interpark(recommendDto);
		return map;
	}

	public Map<String, Object> interpark(RecommendDto recommendDto) throws JsonProcessingException {
		String s = restTemplate.postForObject("http://127.0.0.1:8000/convertData", recommendDto, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(s, new TypeReference<Map<String, Object>>() {});
		//data:[{
		//	plane:[[[],[],[],[]],[],[]]
		//	card:[[[],[],[],[],[]],[],[]]},{...}]
		return dataMap;
	}
}
