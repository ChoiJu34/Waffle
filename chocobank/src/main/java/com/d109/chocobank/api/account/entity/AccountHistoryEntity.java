package com.d109.chocobank.api.account.entity;

import com.d109.chocobank.api.user.entity.UserEntity;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "account_history")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class AccountHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="account_id")
    private AccountEntity accountEntity;

    // 이체 내역에 표시되는 이름
    // 기본값 수취인명
    @Column(name = "sender_name")
    private String senderName;
    @Column(name = "receiver_name")
    private String receiverName;

    // 이체 진행한 계좌 번호
    @Column(name = "sender_account_number")
    private String senderAccountNumber;
    @Column(name = "receiver_account_number")
    private String receiverAccountNumber;

    // 이체 금액 + / -
    private int money;

    // 남은 잔액
    private int balance;

    @CreationTimestamp
    @Column(name = "create_date")
    private LocalDateTime createDate;
}
