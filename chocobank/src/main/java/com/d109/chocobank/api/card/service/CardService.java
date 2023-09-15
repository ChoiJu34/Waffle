package com.d109.chocobank.api.card.service;

import com.auth0.jwt.algorithms.Algorithm;
import com.d109.chocobank.api.card.entity.CardEntity;

import java.util.List;

public interface CardService {
    CardEntity getCard(String authorization, String cardNumber) throws Exception;

    List<CardEntity> getUserCardList(String uuid) throws Exception;

    void addCard(String authorization, int id) throws Exception;
}
