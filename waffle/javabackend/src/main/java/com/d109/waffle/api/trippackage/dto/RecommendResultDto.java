package com.d109.waffle.api.trippackage.dto;

import java.util.List;

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
public class RecommendResultDto {
	int id;
	int memberCnt;
	String card;
	List<PackagePlaneDto> plane;
	List<PackageHotelDto> hotel;
}
