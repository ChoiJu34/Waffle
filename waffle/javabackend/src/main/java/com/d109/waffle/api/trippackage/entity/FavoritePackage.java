package com.d109.waffle.api.trippackage.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.d109.waffle.api.user.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "favorit_package")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class FavoritePackage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	int memberCnt;
	String card;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity userEntity;

}
