package com.d109.chocobank.api.account.service;

import java.util.List;

import com.d109.chocobank.api.account.entity.AccountEntity;

public interface AccountService {
	public List<AccountEntity> getAccountList(int userId) throws Exception;
	public AccountEntity getAccount(int id) throws Exception;
}
