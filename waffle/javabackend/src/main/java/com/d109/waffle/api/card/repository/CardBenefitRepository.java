package com.d109.waffle.api.card.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.card.entity.BenefitEntity;

public interface CardBenefitRepository extends JpaRepository<BenefitEntity, Integer> {
	List<BenefitEntity> findAllByCardDto_Id(int cardId);
}
