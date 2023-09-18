package com.d109.waffle.api.card.service;

import org.springframework.stereotype.Service;

public interface UserCardService {
    void addCard(String authorization, String cardNumber) throws Exception;
}
