package com.d109.waffle.api.card.dto;

import java.math.BigInteger;
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
	private BigInteger annualFee;
	private BigInteger dutyFree;
	private BigInteger use;
	private String country;
}
