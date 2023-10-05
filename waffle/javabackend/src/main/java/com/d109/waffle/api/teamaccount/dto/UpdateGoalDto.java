package com.d109.waffle.api.teamaccount.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
// update-goal request 받을 때 쓰이는 Dto
public class UpdateGoalDto {
    private int accountId;
    private List<Group> group;
}
