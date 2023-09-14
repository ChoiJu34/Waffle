package com.d109.waffle.api.card.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SurveyDto {
	private int card;
	private List<String> favoriteCompany;
	private int annualFee;
	private int dutyFree;
	private int use;
	private String country;
}
