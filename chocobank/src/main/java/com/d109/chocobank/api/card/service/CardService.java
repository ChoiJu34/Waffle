package com.d109.chocobank.api.card.service;

import com.d109.chocobank.api.card.dto.CardDto;
import com.d109.chocobank.api.card.dto.UserCardDto;
import com.d109.chocobank.api.card.entity.CardEntity;

import java.util.List;

public interface CardService {
    CardEntity getCard(String cardNumber) throws Exception;

    List<UserCardDto> getUserCardList(String uuid) throws Exception;

    void addCard(String authorization, int id) throws Exception;

    List<CardDto> getCardList() throws Exception;
}
