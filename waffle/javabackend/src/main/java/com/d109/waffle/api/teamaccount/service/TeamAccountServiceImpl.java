package com.d109.waffle.api.teamaccount.service;

import com.d109.waffle.api.teamaccount.dto.TeamAccountDto;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import com.d109.waffle.api.teamaccount.repository.TeamAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamAccountServiceImpl implements TeamAccountService {

    private final TeamAccountRepository teamAccountRepository;
    @Override
    public TeamAccountDto addTeamAccount(TeamAccountDto teamAccountDto) {
        TeamAccountDto returnDto;
        TeamAccountEntity result;
        result = teamAccountRepository.save(converToEntity(teamAccountDto));
        returnDto = convertToDto(result);
        return returnDto;
    }

    private TeamAccountDto convertToDto(TeamAccountEntity teamAccountEntity){
        return TeamAccountDto.builder()
                .id(teamAccountEntity.getId())
                .name(teamAccountEntity.getName())
                .company(teamAccountEntity.getCompany())
                .accountNumber(teamAccountEntity.getAccount_number())
                .endDay(teamAccountEntity.getEnd_day())
                .goal(teamAccountEntity.getGoal())
                .build();
    }

    private TeamAccountEntity converToEntity(TeamAccountDto teamAccountDto){
        return TeamAccountEntity.builder()
                .id(teamAccountDto.getId())
                .name(teamAccountDto.getName())
                .company(teamAccountDto.getCompany())
                .account_number(teamAccountDto.getAccountNumber())
                .end_day(teamAccountDto.getEndDay())
                .goal(teamAccountDto.getGoal())
                .build();
    }

}
