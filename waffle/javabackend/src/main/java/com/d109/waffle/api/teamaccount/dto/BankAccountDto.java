package com.d109.waffle.api.teamaccount.dto;

import lombok.*;

import java.time.LocalDateTime;

@ToString
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankAccountDto {
    private int id;
    private LocalDateTime startDate;
    private String accountNumber;
    private int userId;
    private int balance;
}
