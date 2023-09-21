package com.d109.chocobank.api.card.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;

public interface UserCardDto {
    int getId();
    String getName();
    String getCompany();
    Boolean getCredit();
    String getBrand();
}
