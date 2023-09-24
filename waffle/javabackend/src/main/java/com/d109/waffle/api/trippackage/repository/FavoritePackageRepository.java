package com.d109.waffle.api.trippackage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.trippackage.entity.FavoritePackage;
import com.d109.waffle.api.user.entity.UserEntity;

public interface FavoritePackageRepository extends JpaRepository<FavoritePackage, Integer> {
	List<FavoritePackage> findAllByUserEntity_Id(int id);
}
