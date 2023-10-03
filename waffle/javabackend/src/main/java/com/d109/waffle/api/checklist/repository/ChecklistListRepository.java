package com.d109.waffle.api.checklist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.checklist.Entity.ChecklistList;

public interface ChecklistListRepository extends JpaRepository<ChecklistList, Integer> {
	List<ChecklistList> findByUserEntity_Id(int id);
}
