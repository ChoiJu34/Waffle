package com.d109.chocobank.api.card.dto;

import lombok.*;

public interface CardDto {
    int getId();
    String getName();
    String getCompany();
    Boolean getCredit();
    String getBrand();
}
