package com.d109.waffle.api.teamaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BankAccountHistoryResponseDto {
    @JsonProperty("result")
    private List<BankAccountHistoryDto> bankAccountHistoryDtoList;
    private String message;
}
