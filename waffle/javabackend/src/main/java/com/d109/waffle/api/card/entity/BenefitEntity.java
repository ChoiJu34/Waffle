package com.d109.waffle.api.card.entity;

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
	private Integer benefitIf;

	private String what;

	@Column(name="get_percent")
	private Double percent;

	@Column(name="get_price")
	private Integer price;

	@Column(name="base_price")
	private Integer base;

	@Column(name="base_price_per")
	private Integer basePer;

	private Integer type;

	private Integer max;

	private String limit;
}
