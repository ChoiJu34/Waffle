package com.d109.waffle.api.trippackage.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RecommendDto {
	int memberCnt;
	String card;
	List<PackagePlaneDto> plane;
	List<PackageHotelDto> hotel;
}
