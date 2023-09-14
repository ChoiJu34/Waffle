package com.d109.chocobank.api.card.service;

import com.d109.chocobank.api.card.entity.CardEntity;

import java.util.List;

public interface CardService {
    CardEntity getCard(String authorization, String cardNumber) throws Exception;

    List<CardEntity> getUserCardList(String uuid) throws Exception;
}
