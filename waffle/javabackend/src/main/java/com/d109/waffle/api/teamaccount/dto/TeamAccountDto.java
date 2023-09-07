package com.d109.waffle.api.teamaccount.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;



@ToString
@Getter
@Setter
@Builder
public class TeamAccountDto {
    private int id;
    private String name;
    private String company;
    private String accountNumber;
    private String endDay;
    private int goal;
}
