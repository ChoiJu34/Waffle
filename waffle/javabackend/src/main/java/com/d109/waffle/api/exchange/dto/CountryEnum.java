package com.d109.waffle.api.exchange.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CountryEnum {
	USD(1, "미국", "USD"),
	JPY(2, "일본", "JPY"),
	EUR(3, "유럽", "EUR"),
	HKD(4, "홍콩", "HKD"),
	SGD(5, "싱가포르", "SGD"),
	CNY(6, "중국", "CNY"),
	CNH(6, "중국", "CNH"),
	THB(7, "태국", "THB"),
	GBP(8, "영국", "GBP");

	private final int id;
	private final String name;
	private final String code;
}
