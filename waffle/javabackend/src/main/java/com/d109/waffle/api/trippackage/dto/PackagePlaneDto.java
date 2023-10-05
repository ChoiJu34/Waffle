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
public class PackagePlaneDto {
	String planeDate;
	String company;
	String startPlace;
	String startTime;
	String endPlace;
	String endTime;
	String originPrice;
	String discountPrice;
	String layover;
	String during;
	String site;
	String card;
	String url;
	String companyImg;
}
