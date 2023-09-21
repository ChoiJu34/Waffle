package com.d109.chocobank.api.account.repository;

import com.d109.chocobank.api.account.entity.AccountHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountHistoryRepository extends JpaRepository<AccountHistoryEntity, Integer> {
    List<AccountHistoryEntity> findByAccountEntity_AccountNumber(String accountNumber);
    List<AccountHistoryEntity> findByAccountEntity_Id(int accountId);
}
