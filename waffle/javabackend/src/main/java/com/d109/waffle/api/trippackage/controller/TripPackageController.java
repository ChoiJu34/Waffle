package com.d109.waffle.api.trippackage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.d109.waffle.api.trippackage.dto.AirplaneDto;
import com.d109.waffle.api.trippackage.dto.RecommendDto;
import com.d109.waffle.api.trippackage.dto.RecommendResultDto;
import com.d109.waffle.api.trippackage.service.TripPackageService;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.common.auth.service.JwtService;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/package")
@Slf4j
@CrossOrigin("*")
@Transactional
public class TripPackageController {
	private final TripPackageService tripPackageService;
	String success = "SUCCESS";
	String fail = "FAIL";

	@GetMapping("/get-airplane-list")
	public ResponseEntity<?> getPlaneList(){
		List<AirplaneDto> list = tripPackageService.getAirplaneList();
		Map<String, Object> planeList = new HashMap<>();
		planeList.put("list", list);
		planeList.put("message", success);
		return new ResponseEntity<>(planeList, HttpStatus.OK);
	}

	@PostMapping("/add-favorite")
	public ResponseEntity<?> addFavorite(@RequestBody RecommendDto recommendDto, @RequestHeader("Authorization") String authorization){
		Map<String, Object> result = new HashMap<>();
		try{
			int id = tripPackageService.addFavorite(recommendDto, authorization);
			result.put("id", id);
			result.put("message", success);
		}catch (Exception e){
			result.put("message", fail);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/get-favorite-list")
	public ResponseEntity<?> getFavoriteList(@RequestHeader("Authorization") String authorization){
		Map<String,Object> result = new HashMap<>();
		try {
			List<RecommendResultDto> list = tripPackageService.getFavoriteList(authorization);
			result.put("list", list);
			result.put("message", success);
		}catch (Exception e) {
			result.put("message", fail);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@DeleteMapping("/delete-favorite/{id}")
	public ResponseEntity<?> deleteFavorite(@PathVariable("id") int id){
		Map<String,Object> result = new HashMap<>();
		if(tripPackageService.deleteFavorite(id)){
			result.put("message", success);
		}else{
			result.put("message", fail);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
