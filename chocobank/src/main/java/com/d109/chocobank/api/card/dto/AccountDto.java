package com.d109.chocobank.api.card.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// public interface AccountDto {
//     String getAccountNumber();
//     LocalDateTime getStartDate();
// }

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDto {
    String accountNumber;
    LocalDateTime startDate;
}