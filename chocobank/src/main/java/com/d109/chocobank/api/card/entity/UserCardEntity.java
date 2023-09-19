package com.d109.chocobank.api.card.entity;

import com.d109.chocobank.api.user.entity.UserEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity(name = "bank_user_card")
public class UserCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "bank_user_id")
    private UserEntity userEntity;

    @ManyToOne
    @JoinColumn(name = "bank_card_id")
    private CardEntity cardEntity;
}
