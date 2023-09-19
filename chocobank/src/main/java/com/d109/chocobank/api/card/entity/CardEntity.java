package com.d109.chocobank.api.card.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity(name = "bank_card")
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String company;

    private String brand;

    private String name;

    private Boolean credit;

    @Column(name = "card_num")
    private String cardNumber;


}
