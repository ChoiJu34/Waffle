package com.d109.chocobank.api.account.repository;

import java.util.List;
import java.util.Optional;

import com.d109.chocobank.api.card.dto.AccountDto;
import org.springframework.data.jpa.repository.JpaRepository;

import com.d109.chocobank.api.account.entity.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
	List<AccountEntity> findByUserEntity_Id(int userId);
	AccountEntity findById(int id);

	List<AccountDto> findByUserEntity_Uuid(String userEntity_uuid);

	Optional<AccountEntity> findByAccountNumber(String accountNumber);

	// Optional<AccountDto> findByAccountNumber(String accountNumber);


}
