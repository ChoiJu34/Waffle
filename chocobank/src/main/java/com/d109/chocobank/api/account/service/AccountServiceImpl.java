package com.d109.chocobank.api.account.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.d109.chocobank.api.account.entity.AccountEntity;
import com.d109.chocobank.api.account.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
	private final AccountRepository accountRepository;

	public List<AccountEntity> getAccountList(int userId) throws Exception {
		List<AccountEntity> accountList = accountRepository.findByUserEntity_Id(userId);
		return accountList;
	}

	public AccountEntity getAccount(int id) throws Exception {
		AccountEntity account = accountRepository.findById(id);
		return account;
	}
}
