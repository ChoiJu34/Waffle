package com.d109.waffle.api.cardrecommend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.cardrecommend.entity.BenefitEntity;

public interface CardBenefitRepository extends JpaRepository<BenefitEntity, Integer> {
	List<BenefitEntity> findAllByCardDto_Id(int cardId);
}
