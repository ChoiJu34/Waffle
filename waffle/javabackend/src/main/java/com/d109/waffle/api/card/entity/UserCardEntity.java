package com.d109.waffle.api.card.entity;

import com.d109.waffle.api.user.entity.UserEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity(name = "user_card")
public class UserCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private CardEntity cardEntity;

    @Column(name = "card_nickname")
    private String cardNickname;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "card_valid_date")
    private String cardValidDate;
}
