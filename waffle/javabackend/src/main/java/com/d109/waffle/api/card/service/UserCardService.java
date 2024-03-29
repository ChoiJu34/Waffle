package com.d109.waffle.api.card.service;

import com.d109.waffle.api.card.dto.UserCardDto;
import com.d109.waffle.api.card.dto.UserCardListDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserCardService {
    void addCard(String authorization, String cardBin, String cardNumber, String cardNickname, String cardValidDate) throws Exception;

    List<UserCardDto> getBankUserCardList(String authorization) throws Exception;

    void addBankCard(String authorization) throws Exception;

    List<UserCardListDto> getUserCardList(String authorization) throws Exception;

    void deleteUserCard(String authorization, int id) throws Exception;
}
