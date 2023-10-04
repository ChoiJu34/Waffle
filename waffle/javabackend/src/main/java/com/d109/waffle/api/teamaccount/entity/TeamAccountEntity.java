package com.d109.waffle.api.teamaccount.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="team_account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@DynamicInsert @DynamicUpdate
public class TeamAccountEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length=45)
    private String name;

    @Column(length=45)
    private String company;

    @Column(length=45, name="account_number")
    private String accountNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name="end_day")
    private LocalDate endDay;

    @Column
    private int goal;

    @Column
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(name="invite_code")
    private String inviteCode;
}
