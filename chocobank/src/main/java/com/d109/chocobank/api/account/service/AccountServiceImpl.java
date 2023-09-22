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
import com.d109.chocobank.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
	private final AccountRepository accountRepository;
	private final UserRepository userRepository;
	private final AccountHistoryRepository accountHistoryRepository;
	private final JwtService jwtService;

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

	@Override
	public void createAccountTransfer(String authorization, String senderName, String receiverName, String senderAccountNumber, String receiverAccountNumber, int money) throws Exception {
		Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
		if(userEntity.isEmpty()) {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
		AccountEntity receiverAccountEntity = accountRepository.findByAccountNumber(receiverAccountNumber)
			.orElseThrow(() -> new NoSuchElementException("계좌 정보를 찾을 수 없습니다."));
		AccountEntity senderAccountEntity = accountRepository.findByAccountNumber(senderAccountNumber)
			.orElseThrow(() -> new NoSuchElementException("계좌 정보를 찾을 수 없습니다."));


		if(senderAccountEntity.getUserEntity().getId() != userEntity.get().getId()) {
			throw new Exception("계좌 소유주가 아닙니다.");
		}

		if(senderAccountEntity.getBalance() < money) {
			throw new Exception("잔액이 부족합니다.");
		}

		// 이체 하는 계좌의 내역 생성
		AccountHistoryEntity sendHistory = AccountHistoryEntity.builder()
			.accountEntity(senderAccountEntity)
			.balance(senderAccountEntity.sendTransfer(money))
			.money("- "+money)
			.senderName(Optional.ofNullable(senderName).orElse(senderAccountEntity.getUserEntity().getName()))
			.receiverName(Optional.ofNullable(receiverName).orElse(receiverAccountEntity.getUserEntity().getName()))
			.senderAccountNumber(senderAccountNumber)
			.receiverAccountNumber(receiverAccountNumber)
			.build();

		// 이체 받는 계좌의 내역 생성
		AccountHistoryEntity receiveHistory = AccountHistoryEntity.builder()
			.accountEntity(receiverAccountEntity)
			.balance(receiverAccountEntity.receiveTransfer(money))
			.money("+ "+money)
			.senderName(Optional.ofNullable(senderName).orElse(senderAccountEntity.getUserEntity().getName()))
			.receiverName(Optional.ofNullable(receiverName).orElse(receiverAccountEntity.getUserEntity().getName()))
			.senderAccountNumber(senderAccountNumber)
			.receiverAccountNumber(receiverAccountNumber)
			.build();

		accountHistoryRepository.save(sendHistory);
		accountHistoryRepository.save(receiveHistory);

	}
}
