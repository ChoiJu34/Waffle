package com.d109.waffle.api.trippackage.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.d109.waffle.api.trippackage.dto.RecommendDto;
import com.d109.waffle.api.trippackage.service.TripPackageService;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/package")
@Slf4j
@CrossOrigin("*")
public class TripPackageController {
	private RestTemplate restTemplate;
	private TripPackageService tripPackageService;

	@Autowired
	public void TripPackageService(RestTemplate restTemplate, TripPackageService tripPackageService){
		this.restTemplate = restTemplate;
		this.tripPackageService = tripPackageService;
	}

	@PostMapping("/test")
	public ResponseEntity<?> test(@RequestBody RecommendDto recommendDto) throws JsonProcessingException {
		// Map<String, Object> map = tripPackageService.all(recommendDto);
		// return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
		ListenableFuture<Map<String, Object>> map1 = tripPackageService.interparkPlane(recommendDto);
		System.out.println("111");
		ListenableFuture<Map<String, Object>> map2 = tripPackageService.interparkPlane2(recommendDto);
		Map<String, Object> ans = new HashMap<>();
		while(!map1.isDone() || !map2.isDone()){
		}
		map1.addCallback(result -> ans.put("plane", result), error -> System.out.println(error.getMessage()));
		map2.addCallback(result -> ans.put("hotel", result), error -> System.out.println(error.getMessage()));
		return new ResponseEntity<Map<String, Object>>(ans, HttpStatus.OK);
	}
}
