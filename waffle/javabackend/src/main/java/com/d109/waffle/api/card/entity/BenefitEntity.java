package com.d109.waffle.api.card.entity;

import java.math.BigDecimal;
import java.math.BigInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
@Entity(name = "benefit")
public class BenefitEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name="card_id")
	private CardEntity cardDto;

	@Column(name="case")
	private String benefitCase;

	private String at;

	@Column(name="if")
	private BigInteger benefitIf;

	private String what;

	@Column(name="get_percent")
	private BigDecimal percent;

	@Column(name="get_price")
	private BigInteger price;

	@Column(name="base_price")
	private BigInteger base;

	@Column(name="base_price_per")
	private BigInteger basePer;

	private int type;

	private BigInteger max;

	private String limit;
}
