package com.d109.waffle.api.card.service;

import com.d109.waffle.api.card.dto.UserCardDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserCardService {
    void addCard(String authorization, String cardNumber) throws Exception;

    List<UserCardDto> getBankUserCardList(String authorization) throws Exception;
}
