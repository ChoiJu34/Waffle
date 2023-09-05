package com.d109.waffle.api.trippackage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.d109.waffle.api.trippackage.model.service.TripPackageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/package")
public class TripPackageController {
	private final TripPackageService tripPackageService;

	@GetMapping("/recommend")
	public ResponseEntity<?> recommend(){
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
}
