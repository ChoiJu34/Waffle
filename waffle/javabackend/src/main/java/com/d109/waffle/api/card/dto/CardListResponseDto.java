package com.d109.waffle.api.card.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CardListResponseDto {
    private String message;
    private List<UserCardDto> userCardDtoList;
//    private Object userCardDtoList;

}
