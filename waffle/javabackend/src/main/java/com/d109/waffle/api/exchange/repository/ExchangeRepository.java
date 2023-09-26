package com.d109.waffle.api.exchange.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.exchange.dto.ExchangeDto;
import com.d109.waffle.api.exchange.entity.ExchangeEntity;

public interface ExchangeRepository extends JpaRepository<ExchangeEntity, Integer> {

	List<ExchangeEntity> findByCountryIdAndDateGreaterThanEqual(int countryId, LocalDateTime yearAgoDate);

	// ExchangeEntity findByCountryIdAndDateAfter(int countryId, LocalDateTime todayDate);
}
