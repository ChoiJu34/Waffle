package com.d109.waffle.api.checklist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.checklist.Entity.CountryChecklist;

public interface CountryChecklistRepository extends JpaRepository<CountryChecklist, Integer> {
	List<CountryChecklist> findByCountry(String country);
}
