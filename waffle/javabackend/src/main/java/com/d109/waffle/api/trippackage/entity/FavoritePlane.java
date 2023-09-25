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

@Entity(name = "favorite_plane")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class FavoritePlane {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
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
	@ManyToOne
	@JoinColumn(name = "package_id")
	private FavoritePackage favoritePackage;
}
