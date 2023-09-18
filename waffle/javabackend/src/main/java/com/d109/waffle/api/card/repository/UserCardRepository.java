package com.d109.waffle.api.card.repository;

import com.d109.waffle.api.card.entity.UserCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
}
