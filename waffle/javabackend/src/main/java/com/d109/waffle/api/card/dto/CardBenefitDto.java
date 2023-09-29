package com.d109.waffle.api.card.dto;

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
public class CardBenefitDto {
	boolean check;
	BenefitEntity benefitEntity;
}
