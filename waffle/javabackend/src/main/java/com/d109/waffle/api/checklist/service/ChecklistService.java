package com.d109.waffle.api.checklist.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.d109.waffle.api.checklist.Entity.Checklist;
import com.d109.waffle.api.checklist.Entity.ChecklistList;
import com.d109.waffle.api.checklist.dto.ChecklistListDto;
import com.d109.waffle.api.checklist.repository.ChecklistListRepository;
import com.d109.waffle.api.checklist.repository.ChecklistRepository;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChecklistService {
	private final ChecklistListRepository checklistListRepository;
	private final ChecklistRepository checklistRepository;
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
			//나라별 체크리스트 엔티티 만들고 나라로 리스트 뽑은 뒤 사용자 체크리스트에 저장해야해
			checklistListRepository.save(checklistList);
			// checklistRepository.save(checklist);
		} catch (Exception e){
			return false;
		}
		return true;
	}

	public List<Checklist> getChecklist(String authorization, int id){
		List<Checklist> result = checklistRepository.findAllByChecklistList_Id(id);
		return result;
	}
}
