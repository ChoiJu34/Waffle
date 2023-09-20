package com.d109.waffle.api.card.repository;

import com.d109.waffle.api.card.dto.UserCardDto;
import com.d109.waffle.api.card.dto.UserCardListDto;
import com.d109.waffle.api.card.entity.UserCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {

    Boolean existsByCardEntity_IdAndUserEntity_Id(int cardId, int userId);

    @Query(value = "select c.id, c.name, c.company, c.credit, c.brand from user_card as uc inner join card as c on uc.card_id = c.id where uc.user_id = ?",
            nativeQuery = true)
    List<UserCardListDto> findByUserEntity_IdAndGetCardNameList(int userId);

    void deleteByUserEntity_IdAndCardEntity_Id(int UserId, int id);
}
