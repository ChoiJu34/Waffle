package com.d109.waffle.api.teamaccount.service;

import com.d109.waffle.api.teamaccount.dto.*;
import com.d109.waffle.api.teamaccount.entity.InviteCodeEntity;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import com.d109.waffle.api.teamaccount.entity.TeamMemberEntity;

import java.util.List;
import java.util.Map;

public interface TeamAccountService {
    public TeamAccountEntity addTeamAccount(String authorization, TeamAccountEntity teamAccountEntity);
    public List<TeamAccountListDto> getAccountList(String authorization) throws Exception;
    public void deleteAccount(int accountId);
    public TeamAccountDetailDto getDetailList(String authorization, int accountId);
    public TeamAccountDetailDto updateDetail(String authorization, TeamAccountEntity teamAccountEntity);
    public List<Map<String, Object>> getMemberList(String authorization, int accountId);
    public void deleteMember(String authorization, int groupId);
    public TeamAccountDetailDto updateNickname(String authorization, TeamMemberEntity teamMemberEntity);
    public String createInviteCode(String authorization, int accountId);
    public void addInvite(String authorization, InviteCodeEntity inviteCodeEntity);
    public void updateGoals(String authorization, UpdateGoalDto updateGoalDto);
    public TeamMemberEntity getGroupId(String authorization, int accountId);
}
