package com.d109.waffle.api.teamaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BankAccountHistoryDto {
    private int id;
    @JsonProperty("accountEntity")
    private BankAccountDto bankAccount;
    private String senderName;
    private String receiverName;
    private String senderAccountNumber;
    private String receiverAccountNumber;
    private String money;
    private int balance;
    private LocalDateTime createDate;
}
