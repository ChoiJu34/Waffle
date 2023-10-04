package com.d109.waffle.api.teamaccount.service;

import com.d109.waffle.api.teamaccount.dto.TeamAccountDetailDto;
import com.d109.waffle.api.teamaccount.dto.TeamAccountDto;
import com.d109.waffle.api.teamaccount.dto.TeamAccountListDto;
import com.d109.waffle.api.teamaccount.entity.InviteCodeEntity;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import com.d109.waffle.api.teamaccount.entity.TeamMemberEntity;

import java.util.List;

public interface TeamAccountService {
    public TeamAccountEntity addTeamAccount(String authorization, TeamAccountEntity teamAccountEntity);
    public List<TeamAccountListDto> getAccountList(String authorization) throws Exception;
    public void deleteAccount(int accountId);
    public TeamAccountDetailDto getDetailList(String authorization, int accountId);
    public TeamAccountDetailDto updateDetail(String authorization, TeamAccountEntity teamAccountEntity);
    public List<TeamMemberEntity> getMemberList(String authorization, int accountId);
    public void deleteMember(String authorization, int groupId);
    public TeamAccountDetailDto updateNickname(String authorization, TeamMemberEntity teamMemberEntity);
    public String createInviteCode(String authorization, int accountId);
    public void addInvite(String authorization, InviteCodeEntity inviteCodeEntity);
}
