package com.d109.waffle.api.teamaccount.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
// teamAccount detail 정보를 넘겨줄때 쓰이는 Dto
public class Group{
    private int id;
    private String name;
    private int money;
    private int goal;
}