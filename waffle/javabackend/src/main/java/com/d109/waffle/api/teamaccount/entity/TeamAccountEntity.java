package com.d109.waffle.api.teamaccount.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="team_account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TeamAccountEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length=45)
    private String name;

    @Column(length=45)
    private String company;

    @Column(length=45)
    private String account_number;

    @Column(length=45)
    private String end_day;

    @Column
    private int goal;

}
