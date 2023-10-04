package com.d109.waffle.api.teamaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
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
    @JsonProperty("result")
    private BankAccountDto bankAccountDto;

}

