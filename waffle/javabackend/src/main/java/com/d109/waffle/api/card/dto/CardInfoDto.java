package com.d109.waffle.api.card.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import com.d109.waffle.api.card.entity.BenefitEntity;
import com.d109.waffle.api.card.entity.CardEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class CardInfoDto {
	private CardEntity cardEntity;
	private Map<String, List<CardBenefitDto>> cardBenefitMap;
}
