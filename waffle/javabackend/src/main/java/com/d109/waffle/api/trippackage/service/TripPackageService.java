package com.d109.waffle.api.trippackage.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

	public Map<String, Object> all(String data) throws JsonProcessingException {
		Map<String, Object> map = interpark(data);
		return map;
	}

	public Map<String, Object> interpark(String data) throws JsonProcessingException {
		String s = restTemplate.postForObject("http://127.0.0.1:8000/convertData", data, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(s, new TypeReference<Map<String, Object>>() {});

		//data : 0:항공사, 1:출발항공, 2:출발시간, 3:도착항공, 4:도착시간, 5:직항, 6:걸리는시간, 7:걸리는분
		//팝업닫기 배열 다음배열부터 카드정보
		//카드 이름이 띄워쓰기가 있어서....
		return dataMap;
	}
}
