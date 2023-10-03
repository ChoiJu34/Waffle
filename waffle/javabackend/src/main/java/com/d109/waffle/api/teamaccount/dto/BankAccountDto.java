package com.d109.waffle.api.teamaccount.dto;

import com.d109.waffle.api.user.entity.UserEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankAccountDto {
    private int id;
    private LocalDateTime startDate;
    private String accountNumber;
    private UserEntity userEntity;
    private int balance;
}
