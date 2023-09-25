package com.d109.waffle.api.exchange.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CountryEnum {
	USD(1, "미국"),
	JPY(2, "일본"),
	EUR(3, "유럽"),
	HKD(4, "홍콩"),
	SGD(5, "싱가포르"),
	CNY(6, "중국"),
	CNH(6, "중국"),
	THB(7, "태국"),
	GBP(8, "영국");

	private final int id;
	private final String name;
}
