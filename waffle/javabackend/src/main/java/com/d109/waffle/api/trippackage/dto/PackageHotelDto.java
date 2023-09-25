package com.d109.waffle.api.trippackage.dto;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class PackageHotelDto {
	String hotelName;
	String start;
	String end;
	String card;
	String originPrice;
	String discountPrice;
	String url;
	String img;
	String site;
}
