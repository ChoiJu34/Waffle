package com.d109.waffle.api.cardrecommend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.cardrecommend.dto.BenefitDto;
import com.d109.waffle.api.cardrecommend.dto.CardDto;

public interface CardBenefitRepository extends JpaRepository<BenefitDto, Integer> {
	List<BenefitDto> findAllByCardDto_Id(int cardId);
}
