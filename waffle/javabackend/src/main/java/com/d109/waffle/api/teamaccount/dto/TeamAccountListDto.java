package com.d109.waffle.api.teamaccount.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@ToString
@Builder
@Getter
@Setter

public class TeamAccountListDto {
    private int id;
    private String name;
    private int percent;
    private LocalDateTime endDay;
    private Byte master;

}
