package com.d109.waffle.api.teamaccount.service;

import com.d109.waffle.api.card.dto.CardListResponseDto;
import com.d109.waffle.api.card.dto.CardResponseDto;
import com.d109.waffle.api.card.dto.UserCardDto;
import com.d109.waffle.api.card.entity.CardEntity;
import com.d109.waffle.api.card.entity.UserCardEntity;
import com.d109.waffle.api.teamaccount.dto.*;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import com.d109.waffle.api.teamaccount.entity.TeamMemberEntity;
import com.d109.waffle.api.teamaccount.repository.TeamAccountRepository;
import com.d109.waffle.api.teamaccount.repository.TeamMemberRepository;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.common.auth.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TeamAccountServiceImpl implements TeamAccountService {

    private final TeamMemberRepository teamMemberRepository;
    private final TeamAccountRepository teamAccountRepository;
    private final JwtService jwtService;

    @Value("${request.chocobank.base_url}")
    private String bank_url;



    @Transactional
    @Override
    public TeamAccountDto addTeamAccount(String authorization, TeamAccountDto teamAccountDto) {
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        UserEntity user = userEntity.get();

        TeamAccountDto returnDto;
        TeamAccountEntity result;
        result = teamAccountRepository.save(convertToEntity(teamAccountDto));
        TeamMemberEntity teamMemberEntity = TeamMemberEntity.builder()
                                            .user(user)
                                            .teamAccount(result)
                                            .master(Byte.valueOf((byte)1))
                                            .build();
        teamMemberRepository.save(teamMemberEntity);
        returnDto = convertToDto(result);
        return returnDto;
    }

    @Transactional
    @Override
    public List<TeamAccountListDto> getAccountList(String authorization) throws Exception{
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        UserEntity user = userEntity.get();

        System.out.println(user);

        HashMap<String, String> body = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("Authorization-uuid", user.getUuid());
        HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<BankAccountResponseDto> response = restTemplate.exchange(
                bank_url+"/account/service",
                HttpMethod.GET,
                entity,
                BankAccountResponseDto.class
        );

        System.out.println(response);

        List<BankAccountDto> bankAccountDtoList;

        if(response.getBody().getMessage().equals("SUCCESS")) {
            bankAccountDtoList = response.getBody().getBankAccountDtoList();
        } else {
            throw new Exception("bank FAIL");
        }

        List<TeamAccountListDto> resultList = new ArrayList<>();
        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByUser_Id(user.getId());
        teamMemberEntityList.forEach(list -> {
            int percent = 0;
            Optional<TeamAccountEntity> account = teamAccountRepository.findById(list.getId());
            TeamAccountEntity element = account.get();
            for(BankAccountDto bankDto : bankAccountDtoList){
                if(bankDto.getAccountNumber().equals(element.getAccount_number())){
                    //잔액이 0이면 나누지 않음
                    if(bankDto.getBalance() == 0) percent = 0;
                    else{
                        percent = element.getGoal() / bankDto.getBalance();
                    }
                }
            }

            resultList.add(TeamAccountListDto.builder()
                    .id(element.getId())
                    .name(element.getName())
                    .percent(percent)
                    .endDay(element.getEnd_day())
                    .master(list.getMaster())
                    .build());
        });

        return resultList;
    }

    @Transactional
    @Override
    public void deleteAccount(int accountId){
        teamAccountRepository.deleteById(accountId);
        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByTeamAccount_Id(accountId);
        teamMemberEntityList.forEach(e -> {
            teamMemberRepository.deleteById(e.getId());
        });
    }

    @Override
    public TeamAccountDetailDto getDetailList(String authorization, int accountId) {
        return null;
    }

    private TeamAccountDto convertToDto(TeamAccountEntity teamAccountEntity){
        return TeamAccountDto.builder()
                .id(teamAccountEntity.getId())
                .name(teamAccountEntity.getName())
                .company(teamAccountEntity.getCompany())
                .accountNumber(teamAccountEntity.getAccount_number())
                .endDay(teamAccountEntity.getEnd_day())
                .goal(teamAccountEntity.getGoal())
                .inviteCode(teamAccountEntity.getInviteCode())
                .build();
    }

    private TeamAccountEntity convertToEntity(TeamAccountDto teamAccountDto){
        return TeamAccountEntity.builder()
                .id(teamAccountDto.getId())
                .name(teamAccountDto.getName())
                .company(teamAccountDto.getCompany())
                .account_number(teamAccountDto.getAccountNumber())
                .end_day(teamAccountDto.getEndDay())
                .goal(teamAccountDto.getGoal())
                .inviteCode(teamAccountDto.getInviteCode())
                .build();
    }

}
