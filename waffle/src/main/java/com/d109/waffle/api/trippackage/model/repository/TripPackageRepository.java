package com.d109.waffle.api.trippackage.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.trippackage.model.entity.FavoritPackage;

public interface TripPackageRepository extends JpaRepository<FavoritPackage, Integer> {
}
