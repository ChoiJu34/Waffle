package com.d109.waffle.api.card.repository;

import com.d109.waffle.api.card.entity.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<CardEntity, Integer> {
    CardEntity findById(int id);

    Optional<CardEntity> findByName(String name);
}
