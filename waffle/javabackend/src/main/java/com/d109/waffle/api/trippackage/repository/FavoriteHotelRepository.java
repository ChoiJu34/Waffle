package com.d109.waffle.api.trippackage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.trippackage.entity.FavoriteHotel;
import com.d109.waffle.api.trippackage.entity.FavoritePackage;

public interface FavoriteHotelRepository extends JpaRepository<FavoriteHotel, Integer> {
	List<FavoriteHotel> findAllByFavoritePackage_Id(int id);
	void deleteByFavoritePackage_Id(int id);
}
