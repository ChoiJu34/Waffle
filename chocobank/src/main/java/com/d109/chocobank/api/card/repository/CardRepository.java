package com.d109.chocobank.api.card.repository;

import com.d109.chocobank.api.card.dto.CardDto;
import com.d109.chocobank.api.card.entity.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<CardEntity, Integer> {
    Optional<CardEntity> findByCardNumber(String cardNumber);

    List<CardDto> findAllBy();
}
