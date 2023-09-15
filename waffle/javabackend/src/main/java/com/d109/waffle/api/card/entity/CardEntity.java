package com.d109.waffle.api.card.entity;

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
public class CardEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String company;

	private String brand;

	private String name;

	private Boolean credit;

	@Column(name="usage_fee")
	private Double usageFee;

	@Column(name="exchange_fee")
	private Double exchangeFee;

	@Column(name="annual_fee")
	private Integer annualFee;

	private String link;
}
