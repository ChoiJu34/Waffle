package com.d109.waffle.api.checklist.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.d109.waffle.api.checklist.Entity.Checklist;
import com.d109.waffle.api.checklist.Entity.ChecklistList;
import com.d109.waffle.api.checklist.dto.ChecklistListDto;
import com.d109.waffle.api.checklist.service.ChecklistService;

import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/checklist")
@Slf4j
@CrossOrigin("*")
@Transactional
public class ChecklistController {
	private final ChecklistService checklistService;
	String success = "SUCCESS";
	String fail = "FAIL";

	@GetMapping("/get-checklist-list")
	public ResponseEntity<?> getChecklistList(@RequestHeader("Authorization") String authorization){
		Map<String, Object> result = new HashMap<>();
		List<ChecklistList> list = checklistService.getChecklistList(authorization);
		result.put("list", list);
		result.put("message", success);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/add-checklist-list")
	public ResponseEntity<?> addChecklistList(@RequestHeader("Authorization") String authorization, @RequestBody  ChecklistListDto checklistListDto){
		Map<String, Object> result = new HashMap<>();
		if(checklistService.addChecklistList(authorization, checklistListDto)) {
			result.put("message", success);
		}else{
			result.put("message", fail);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/get-checklist/{checklist-list-id}")
	public ResponseEntity<?> getChecklist(@RequestHeader("Authorization") String authorization, @PathVariable("checklist-list-id") int id){
		Map<String, Object> result = new HashMap<>();
		List<Checklist> list = checklistService.getChecklist(authorization, id);
		result.put("list", list);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
