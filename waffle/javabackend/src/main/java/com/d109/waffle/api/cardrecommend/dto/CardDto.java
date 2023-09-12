package com.d109.waffle.api.cardrecommend.dto;

import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
@Entity(name = "card")
public class CardDto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String company;

	private String brand;

	private String name;

	private boolean credit;

	@Column(name="usage_fee")
	private double usageFee;

	@Column(name="exchange_fee")
	private double exchangeFee;

	@Column(name="annual_fee")
	private int annualFee;

	private String link;
}
