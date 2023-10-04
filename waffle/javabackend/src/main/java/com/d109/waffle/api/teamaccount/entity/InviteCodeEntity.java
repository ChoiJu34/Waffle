package com.d109.waffle.api.teamaccount.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="invite_code")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@DynamicInsert
@DynamicUpdate
public class InviteCodeEntity {

    private static final long INVITE_CODE_EXPIRATION_TIME_VALUE = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length=45)
    private String code;

    @Column(name="expiration_date")
    private LocalDateTime expirationDate;

    @Column
    private Boolean expired;

    @ManyToOne
    @JoinColumn(name = "team_account_id")
    private TeamAccountEntity teamAccount;


    public static InviteCodeEntity createInviteCode(){
        InviteCodeEntity inviteCode = new InviteCodeEntity();
        inviteCode.expirationDate = LocalDateTime
                .now()
                .plusMinutes(INVITE_CODE_EXPIRATION_TIME_VALUE);

        return inviteCode;
    }
}
