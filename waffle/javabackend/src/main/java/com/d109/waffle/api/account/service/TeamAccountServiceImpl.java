package com.d109.waffle.api.account.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.d109.waffle.api.account.entity.TeamAccountEntity;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TeamAccountServiceImpl implements TeamAccountService {

	@Override
	public List<TeamAccountEntity> getBankAccountList(String authorization) throws Exception {

		return null;
	}
}
