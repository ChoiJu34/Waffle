package com.d109.waffle.api.card.dto;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class RecommendCardDto {
	private int recommendNumber;
	private int cardId;
	private String cardCompany;
	private String cardBrand;
	private String cardName;
	private Map<String, Integer> originalPrice;
	private Map<String, Integer> getPrice;
	private Map<String, Integer> discountPrice;
	private List<String[]> getBenefit;
	private List<String> otherBenefit;
	private String link;
}