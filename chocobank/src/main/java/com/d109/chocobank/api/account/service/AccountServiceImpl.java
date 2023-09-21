package com.d109.chocobank.api.account.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.d109.chocobank.api.account.entity.AccountHistoryEntity;
import com.d109.chocobank.api.account.repository.AccountHistoryRepository;
import com.d109.chocobank.api.card.dto.AccountDto;
import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.d109.chocobank.api.account.entity.AccountEntity;
import com.d109.chocobank.api.account.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
	private final AccountRepository accountRepository;
	private final UserRepository userRepository;
	private final AccountHistoryRepository accountHistoryRepository;

	@Override
	public List<AccountEntity> getAccountList(int userId) throws Exception {
		List<AccountEntity> accountList = accountRepository.findByUserEntity_Id(userId);
		return accountList;
	}

	@Override
	public AccountEntity getAccount(int id) throws Exception {
		AccountEntity account = accountRepository.findById(id);
		return account;
	}

	@Override
	public void postAccount(AccountEntity accountEntity) throws Exception {
		accountRepository.save(accountEntity);
	}

	@Override
	public List<AccountDto> getServiceAccountList(String uuid) throws Exception {
//		Optional<UserEntity> userEntity = userRepository.findByUuid(uuid);
//		if(userEntity.isEmpty()) {
//			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
//		}
		List<AccountDto> accountDtoList = accountRepository.findByUserEntity_Uuid(uuid);
		return accountDtoList;
	}

	@Override
	public List<AccountHistoryEntity> getServiceAccountHistory(String uuid, String accountNumber) throws Exception {
		return accountHistoryRepository.findByAccountEntity_AccountNumber(accountNumber);
	}
}
