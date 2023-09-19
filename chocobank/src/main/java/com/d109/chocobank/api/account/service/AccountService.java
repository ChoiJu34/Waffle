package com.d109.chocobank.api.account.service;

import java.util.List;

import com.d109.chocobank.api.account.entity.AccountEntity;

public interface AccountService {
	List<AccountEntity> getAccountList(int userId) throws Exception;
	AccountEntity getAccount(int id) throws Exception;
	void postAccount(AccountEntity accountEntity) throws Exception;
}
