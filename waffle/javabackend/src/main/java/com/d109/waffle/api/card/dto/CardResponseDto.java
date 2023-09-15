package com.d109.waffle.api.card.dto;

import lombok.*;

import java.util.HashMap;
import java.util.Objects;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CardResponseDto {
    private String message;
    private String result;

}
