package com.d109.waffle.api.teamaccount.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamAccountDetailDto {
    private int id;
    private String name;
    private int goal;
    private LocalDate endDay;
    private long totalAdd;
    private long totalSub;
    private Boolean master;
    private List<Group> group;
}
