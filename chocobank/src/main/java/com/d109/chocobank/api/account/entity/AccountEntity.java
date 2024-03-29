package com.d109.chocobank.api.account.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.common.auth.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "account")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class AccountEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name="user_id")
	private UserEntity userEntity;

	@Column(name = "account_number")
	private String accountNumber;

	@CreationTimestamp
	@Column(name = "start_date")
	private LocalDateTime startDate;

	private int balance;

	public int sendTransfer(int money) {
		this.balance -= money;
		return this.balance;
	}

	public int receiveTransfer(int money) {
		this.balance += money;
		return this.balance;
	}

}
