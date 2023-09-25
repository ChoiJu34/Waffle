package com.d109.waffle.api.exchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.waffle.api.exchange.entity.ExchangeEntity;

public interface ExchangeRepository extends JpaRepository<ExchangeEntity, Integer> {
}
