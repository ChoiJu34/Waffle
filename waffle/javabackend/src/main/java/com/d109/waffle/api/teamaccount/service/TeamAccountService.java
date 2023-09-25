package com.d109.waffle.api.teamaccount.service;

import com.d109.waffle.api.teamaccount.dto.TeamAccountDetailDto;
import com.d109.waffle.api.teamaccount.dto.TeamAccountDto;
import com.d109.waffle.api.teamaccount.dto.TeamAccountListDto;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;

import java.util.List;

public interface TeamAccountService {
    public TeamAccountDto addTeamAccount(String authorization, TeamAccountDto teamAccountDto);
    public List<TeamAccountListDto> getAccountList(String authorization) throws Exception;
    public void deleteAccount(int accountId);
    public TeamAccountDetailDto getDetailList(String authorization, int accountId);
}
