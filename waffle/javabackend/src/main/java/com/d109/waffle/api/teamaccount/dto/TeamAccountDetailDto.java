package com.d109.waffle.api.teamaccount.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamAccountDetailDto {
    private int id;
    private String name;
    private int goal;
    private LocalDateTime endDay;
    private long totalAdd;
    private long totalSub;
    private Byte master;
}
