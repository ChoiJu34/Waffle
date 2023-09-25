package com.d109.waffle.api.teamaccount.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BankAccountResponseDto {
    private String message;
    private List<BankAccountDto> bankAccountDtoList;
}
