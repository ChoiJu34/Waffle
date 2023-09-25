package com.d109.waffle.api.trippackage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.trippackage.entity.Airplane;

public interface AirplaneRepository extends JpaRepository<Airplane, Integer> {
}
