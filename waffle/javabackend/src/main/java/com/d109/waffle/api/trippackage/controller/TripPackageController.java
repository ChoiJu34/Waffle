package com.d109.waffle.api.trippackage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/package")
@Slf4j
@CrossOrigin("*")
public class TripPackageController {
	private RestTemplate restTemplate;

	@Autowired
	public void TripPackageService(RestTemplate restTemplate){
		this.restTemplate = restTemplate;
	}

	@PostMapping("/test")
	public ResponseEntity<?> test(@RequestBody String data){
		String s = restTemplate.postForObject("http://127.0.0.1:8000/convertData", data, String.class);
		return new ResponseEntity<String>(s, HttpStatus.OK);
	}
}
