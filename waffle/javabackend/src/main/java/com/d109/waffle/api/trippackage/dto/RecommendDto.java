package com.d109.waffle.api.trippackage.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecommendDto {
	int memberCnt;
	List<PlaneDto> planPlane;
	List<HotelDto> planHotel;
}
