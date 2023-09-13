package com.d109.waffle.api.cardrecommend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.d109.waffle.api.cardrecommend.entity.CardEntity;

@Repository
public interface CardRecommendRepository extends JpaRepository<CardEntity, Integer> {
	List<CardEntity> findByCreditTrue();
	List<CardEntity> findByCreditTrueAndCompanyIsIn(List<String> company);
	List<CardEntity> findByCreditFalse();
	List<CardEntity> findByCreditFalseAndCompanyIsIn(List<String> company);
	List<CardEntity> findByCompanyIsIn(List<String> company);
}
