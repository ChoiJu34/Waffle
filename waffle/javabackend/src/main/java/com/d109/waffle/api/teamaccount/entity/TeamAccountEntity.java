package com.d109.waffle.api.teamaccount.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @Column(length=45)
    private LocalDateTime end_day;

    @Column
    private int goal;

    @Column(name="invite_code")
    private String inviteCode;
}
