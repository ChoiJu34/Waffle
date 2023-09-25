package com.d109.waffle.api.trippackage.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AirplaneDto {
	String name;
	String code;
	String city;
}
