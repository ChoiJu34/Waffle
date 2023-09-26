package com.d109.waffle.api.exchange.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RecentExchangeDto {

	private String code;
	private String currencyCode;
	private String currencyName;
	private String country;
	// private String name;
	private String date;
	private String time;
	private int recurrenceCount;
	private Double basePrice;
	// private int openingPrice;
	// private int highPrice;
	// private int lowPrice;
}
