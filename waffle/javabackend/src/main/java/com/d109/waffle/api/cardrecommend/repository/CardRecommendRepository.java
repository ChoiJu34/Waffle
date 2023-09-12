package com.d109.waffle.api.cardrecommend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.d109.waffle.api.cardrecommend.dto.CardDto;

@Repository
public interface CardRecommendRepository extends JpaRepository<CardDto, Integer> {
	List<CardDto> findByCreditTrue();
	List<CardDto> findByCreditTrueAndCompanyIsIn(List<String> company);
	List<CardDto> findByCreditFalse();
	List<CardDto> findByCreditFalseAndCompanyIsIn(List<String> company);
	List<CardDto> findByCompanyIsIn(List<String> company);
}
