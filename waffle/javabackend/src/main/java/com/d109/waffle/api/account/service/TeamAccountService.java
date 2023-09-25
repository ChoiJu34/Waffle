package com.d109.waffle.api.account.service;

import java.util.List;

import com.d109.waffle.api.account.entity.TeamAccountEntity;

public interface TeamAccountService {

	List<TeamAccountEntity> getBankAccountList(String authorization) throws Exception;
}
