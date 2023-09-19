package com.d109.chocobank.api.card.repository;

import com.d109.chocobank.api.card.dto.UserCardDto;
import com.d109.chocobank.api.card.entity.UserCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
    List<UserCardEntity> findByUserEntity_Id(int id);

    @Query(value = "select c.id, c.name, c.company, c.credit, c.brand from bank_user_card as uc inner join bank_card as c on uc.bank_card_id = c.id where uc.bank_user_id = ?",
            nativeQuery = true)
    List<UserCardDto> findByUserEntity_IdAndGetCardNameList(int userId);
}
