package com.d109.waffle.api.card.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class UserCardDto {
    private int id;
    private String name;
    private String company;
    private Boolean credit;
    private String brand;
}
