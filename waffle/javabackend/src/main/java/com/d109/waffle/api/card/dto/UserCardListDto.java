package com.d109.waffle.api.card.dto;

import javax.persistence.Column;

public interface UserCardListDto {
    int getId();
    String getName();
    String getCompany();
    Boolean getCredit();
    String getBrand();
    @Column(name = "card_nickname")
    String getCardNickname();
    // @Column(name = "card_number")
    String getCardNumber();
    // @Column(name = "card_valid_date")
    String getCardValidDate();
}