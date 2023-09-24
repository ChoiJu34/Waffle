package com.d109.waffle.api.trippackage.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "favorite_hotel")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class FavoriteHotel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String hotelName;
	String start;
	String end;
	String card;
	String originPrice;
	String discountPrice;
	String url;
	String img;
	String site;
	@ManyToOne
	@JoinColumn(name = "package_id")
	private FavoritePackage favoritePackage;
}
