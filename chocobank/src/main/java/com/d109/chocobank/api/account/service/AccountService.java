package com.d109.chocobank.api.account.service;

import java.util.List;

import com.d109.chocobank.api.account.entity.AccountEntity;
import com.d109.chocobank.api.account.entity.AccountHistoryEntity;
import com.d109.chocobank.api.card.dto.AccountDto;

public interface AccountService {
	List<AccountEntity> getAccountList(int userId) throws Exception;
	AccountEntity getAccount(int id) throws Exception;
	void postAccount(AccountEntity accountEntity) throws Exception;

    List<AccountDto> getServiceAccountList(String uuid) throws Exception;

	List<AccountHistoryEntity> getServiceAccountHistory(String uuid, String accountNumber) throws Exception;

	void createAccountTransfer(String authorization, String senderName, String receiverName, String senderAccountNumber, String receiverAccountNumber, int cost) throws Exception;
}
