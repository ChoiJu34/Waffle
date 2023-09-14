package com.d109.chocobank.api.card.repository;

import com.d109.chocobank.api.card.dto.UserCardDto;
import com.d109.chocobank.api.card.entity.UserCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
//    List<UserCardDto> findByUserEntity_IdAndGetCardNameList(int userId);
}
