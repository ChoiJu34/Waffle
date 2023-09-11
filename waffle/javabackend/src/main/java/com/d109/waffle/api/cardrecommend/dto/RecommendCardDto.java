package com.d109.waffle.api.cardrecommend.dto;

import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RecommendCardDto {
	private int recommendNumber;
	private int cardId;
	private String cardCompany;
	private String cardName;
	private int originalPrice;
	private int getPrice;
	private int discountPrice;
	private Map<String, Integer> getBenefit;
	private List<String> otherBenefit;
	private String link;
}
