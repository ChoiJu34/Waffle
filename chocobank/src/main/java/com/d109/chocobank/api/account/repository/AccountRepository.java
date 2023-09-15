package com.d109.chocobank.api.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.chocobank.api.account.entity.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
	List<AccountEntity> findByUserEntity_Id(int userId);
	AccountEntity findById(int id);
}
