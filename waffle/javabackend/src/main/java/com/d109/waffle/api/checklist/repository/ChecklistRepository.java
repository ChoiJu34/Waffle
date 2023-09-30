package com.d109.waffle.api.checklist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.checklist.Entity.Checklist;
import com.d109.waffle.api.checklist.Entity.ChecklistList;

public interface ChecklistRepository extends JpaRepository<Checklist, Integer>{
	List<Checklist> findByChecklistList_IdOrderByOrderAsc(int id);
}
