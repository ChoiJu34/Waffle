package com.d109.waffle.api.checklist.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.d109.waffle.api.checklist.Entity.Checklist;
import com.d109.waffle.api.checklist.Entity.ChecklistList;
import com.d109.waffle.api.checklist.Entity.CountryChecklist;
import com.d109.waffle.api.checklist.dto.ChecklistDto;
import com.d109.waffle.api.checklist.dto.ChecklistListDto;
import com.d109.waffle.api.checklist.repository.ChecklistListRepository;
import com.d109.waffle.api.checklist.repository.ChecklistRepository;
import com.d109.waffle.api.checklist.repository.CountryChecklistRepository;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChecklistService {
	private final ChecklistListRepository checklistListRepository;
	private final ChecklistRepository checklistRepository;
	private final CountryChecklistRepository countryChecklistRepository;
	private final JwtService jwtService;

	public List<ChecklistList> getChecklistList(String authorization){
		Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
		if (!userEntity.isPresent()) {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
		UserEntity user = userEntity.get();
		List<ChecklistList> list = checklistListRepository.findAllByUserEntity_Id(user.getId());
		return list;
	}

	public boolean addChecklistList(String authorization, ChecklistListDto checkListDto){
		Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
		if (!userEntity.isPresent()) {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
		UserEntity user = userEntity.get();
		ChecklistList checklistList = ChecklistList.builder()
			.country(checkListDto.getCountry())
			.start(checkListDto.getStart())
			.end(checkListDto.getEnd())
			.name(checkListDto.getName())
			.color(checkListDto.getColor())
			.userEntity(user)
			.build();
		try {
			checklistList.setId(checklistListRepository.save(checklistList).getId());
			List<CountryChecklist> list = countryChecklistRepository.findByCountry(checkListDto.getCountry());
			for(CountryChecklist countryChecklist : list){
				Checklist checklist = Checklist.builder()
					.content(countryChecklist.getContent())
					.price(countryChecklist.getPrice())
					.currency(countryChecklist.getCurrency())
					.checklistList(checklistList)
					.build();
				checklistRepository.save(checklist);
			}
		} catch (Exception e){
			return false;
		}
		return true;
	}

	public boolean deleteChecklistList(String authorization, int id){
		try {
			checklistListRepository.deleteById(id);
		}catch (Exception e){
			return false;
		}
		return true;
	}

	public List<Map<String,Object>> getChecklist(String authorization, int id){
		List<Checklist> list = checklistRepository.findByChecklistList_Id(id);
		List<Map<String, Object>> result = new ArrayList<>();
		for(Checklist checklist: list){
			Map<String, Object> map = new HashMap<>();
			map.put("id", checklist.getId());
			map.put("content", checklist.getContent());
			map.put("price", checklist.getPrice());
			map.put("currency", checklist.getCurrency());
			result.add(map);
		}
		return result;
	}

	public boolean addChecklistItem(ChecklistDto checklistDto){
		try {
			Checklist checklist = Checklist.builder()
				.content(checklistDto.getContent())
				.price(checklistDto.getPrice())
				.currency(checklistDto.getCurrency())
				.checklistList(checklistListRepository.findById(checklistDto.getChecklistListId()).get())
				.build();
			checklistRepository.save(checklist);
			return true;
		}catch (Exception e){
			return false;
		}
	}

	public boolean deleteChecklistItem(int id){
		try {
			checklistRepository.deleteById(id);
			return true;
		}catch (Exception e){
			return false;
		}
	}

	public boolean checkChecklistItem(int id){
		try {
			Checklist checklist = checklistRepository.findById(id).get();
			if (checklist.getCheck()==0) {
				checklist.setCheck((byte)1);
			}else{
				checklist.setCheck((byte)0);
			}
			checklistRepository.save(checklist);
			return true;
		}catch (Exception e){
			return false;
		}
	}
}
