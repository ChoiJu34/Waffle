package com.d109.waffle.api.teamaccount.service;

import com.d109.waffle.api.teamaccount.dto.*;
import com.d109.waffle.api.teamaccount.entity.InviteCodeEntity;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import com.d109.waffle.api.teamaccount.entity.TeamMemberEntity;
import com.d109.waffle.api.teamaccount.repository.InviteCodeRepository;
import com.d109.waffle.api.teamaccount.repository.TeamAccountRepository;
import com.d109.waffle.api.teamaccount.repository.TeamMemberRepository;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.common.auth.service.JwtService;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.hibernate.TransactionException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional

public class TeamAccountServiceImpl implements TeamAccountService {

    private final TeamMemberRepository teamMemberRepository;
    private final TeamAccountRepository teamAccountRepository;
    private final InviteCodeRepository inviteCodeRepository;
    private final JwtService jwtService;

    @Value("${request.chocobank.base_url}")
    private String bank_url;

    @Transactional
    @Override
    public TeamAccountEntity addTeamAccount(String authorization, TeamAccountEntity teamAccountEntity) {
        // get userEntity from Access Token
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        Boolean isExist = teamAccountRepository.existsByAccountNumber(teamAccountEntity.getAccountNumber());
        if(!userEntity.isPresent()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        if(isExist){
            throw new IllegalArgumentException("이미 존재하는 계좌번호입니다.");
        }
        UserEntity user = userEntity.get();

        HashMap<String, String> body = new HashMap<>();
        body.put("accountNumber", teamAccountEntity.getAccountNumber());
        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Type", "application/json");
        HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<BankAccountResponseDto> response = restTemplate.exchange(
                bank_url+"/account/service",
                HttpMethod.POST,
                entity,
                BankAccountResponseDto.class
        );

        if(response.getBody().getMessage().equals("SUCCESS")) {
            TeamAccountEntity returnEntity = teamAccountRepository.save(teamAccountEntity);
            TeamMemberEntity teamMemberEntity;
            teamMemberEntity = TeamMemberEntity.builder()
                    .user(user)
                    .teamAccount(returnEntity)
                    .master(true)
                    .nickname(user.getName())
                    .build();
            teamMemberRepository.save(teamMemberEntity);
            return returnEntity;
        } else if(response.getBody().getMessage().equals("FAIL")){
            return TeamAccountEntity.builder().id(0).build();
        }
        else{
            return null;
        }

    }

    @Transactional
    @Override
    public List<TeamAccountListDto> getAccountList(String authorization){
        List<TeamAccountListDto> teamAccountListDtoList = new ArrayList<>();
        // *유저 정보를 들고온다.
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        UserEntity user = userEntity.get();

        // *유저 정보로 연결된 계좌들 들고오기
        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByUser_Id(user.getId());
        for(int i=0, size=teamMemberEntityList.size();i<size;i++){
            TeamMemberEntity teamMemberEntity = teamMemberEntityList.get(i);
            TeamAccountEntity teamAccountEntity = teamMemberEntity.getTeamAccount();
            
            // 계좌를 가지고 계좌 내역 들고 오기
            HashMap<String, String> body = new HashMap<>();
            body.put("accountNumber", teamAccountEntity.getAccountNumber());
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json");
            HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<BankAccountResponseDto> response = restTemplate.exchange(
                    bank_url+"/account/service",
                    HttpMethod.POST,
                    entity,
                    BankAccountResponseDto.class
            );
            
            if(response.getBody().getMessage().equals("FAIL")){
                throw new TransactionException("계좌 정보를 불러오는데 실패했습니다.");
            }
            
            // 불러온 계좌의 잔액 조회
            int percent = 0;
            int balance = 0;
            BankAccountDto bankAccountDto = response.getBody().getBankAccountDto();
            balance = bankAccountDto.getBalance();

            // 퍼센트 구하기
            percent = balance / teamAccountEntity.getGoal() * 100;
                
            // 구한 퍼센트로 TeamAccountListDto 만들고 list에 추가하기
            teamAccountListDtoList.add(
                    TeamAccountListDto.builder()
                    .id(teamAccountEntity.getId())
                    .name(teamAccountEntity.getName())
                    .percent(percent)
                    .endDay(teamAccountEntity.getEndDay())
                    .master(teamMemberEntity.getMaster())
                    .build()
            );
        }

        return teamAccountListDtoList;
    }

    @Transactional
    @Override
    public void deleteAccount(int accountId){
        if(!teamAccountRepository.existsById(accountId)){
            throw new NoSuchElementException();
        }

        teamAccountRepository.deleteById(accountId);
        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByTeamAccount_Id(accountId);
        teamMemberEntityList.forEach(e -> {
            teamMemberRepository.deleteById(e.getId());
        });
    }

    @Override
    @Transactional
    public TeamAccountDetailDto getDetailList(String authorization, int accountId) {
        // *get UserEntity from AccessToken
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()){
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }

        UserEntity user = userEntity.get();

        // *get TeamAccountEntity by accountId
        Optional<TeamAccountEntity> teamAccountEntityOptional = teamAccountRepository.findById(accountId);
        if(!teamAccountEntityOptional.isPresent()){
            throw new NoSuchElementException("계좌를 찾을 수 없습니다.");
        }
        TeamAccountEntity teamAccountEntity = teamAccountEntityOptional.get();
        
        // *초코뱅크와 통신 해서 계좌 내역 들고 오기
        HashMap<String, String> body = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        body.put("accountNumber", teamAccountEntity.getAccountNumber());

        HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<BankAccountHistoryResponseDto> response = restTemplate.exchange(
                bank_url+"/account/service/history",
                HttpMethod.POST,
                entity,
                BankAccountHistoryResponseDto.class
        );

        if(response.getBody().getMessage().equals("FAIL")){
            throw new TransactionException("초코뱅크와 통신 실패");
        }

        // *계좌에 연결되어 있는 nickname들고오기 + 이 계좌의 master인가
        Boolean master = false;
        int masterIndex = 0;
        int me = 0; // group에 있는 member중에 나인지 확인할 수 있는 id

        List<Group> groupList = new ArrayList<>();

        // 그 외 추가
        Group group = new Group();
        group.setId(0);
        group.setName("그 외");
        groupList.add(group);

        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByTeamAccount_Id(teamAccountEntity.getId());
        for(int i=0, size=teamMemberEntityList.size();i<size;i++){
            TeamMemberEntity e = teamMemberEntityList.get(i);
            Group addGroup = new Group();
            addGroup.setName(e.getNickname());
            addGroup.setId(e.getId());
            addGroup.setGoal(e.getGoal());
            groupList.add(addGroup);
            if(user.getId() == e.getUser().getId()){
                if(e.getMaster()) {
                    masterIndex = i + 1; // 그 외 생각해서 +1
                    master = true;
                }
                me = e.getId();
            }
        }


        // *계좌 내역의 보내는 사람 이름과 계좌에 연결된 nickname을 비교해서 사람마다 money 카운트
        int totalAdd = 0;
        int totalSub = 0;

        for(BankAccountHistoryDto e : response.getBody().getBankAccountHistoryDtoList()){
            int money = Integer.parseInt(e.getMoney());

            if(money < 0){
                int calculatedMoney = groupList.get(masterIndex).getMoney() + money;
                groupList.get(masterIndex).setMoney(calculatedMoney);
                totalSub += money;
            }
            else{
                // 그 외를 빼고 생각하기 때문에 i = 1부터 그 외의 index는 0
                for(int i=1,size=groupList.size();i<=size;i++){
                    Group g = groupList.get(i);
                    int calculatedMoney = g.getMoney() + money;
                    if(e.getSenderName().equals(g.getName())){
                        // 닉네임이 일치하는 사람에게 돈이 올라감
                        g.setMoney(calculatedMoney);
                    }else{
                        // 그 외에 돈이 올라감
                        groupList.get(0).setMoney(calculatedMoney);
                    }
                }
                totalAdd += money;
            }
        }

        TeamAccountDetailDto teamAccountDetailDto;
        teamAccountDetailDto = TeamAccountDetailDto.builder()
                .id(teamAccountEntity.getId())
                .name(teamAccountEntity.getName())
                .goal(teamAccountEntity.getGoal())
                .endDay(teamAccountEntity.getEndDay())
                .totalAdd(totalAdd)
                .totalSub(totalSub)
                .master(master)
                .me(me)
                .group(groupList)
                .build();


        return teamAccountDetailDto;
    }

    @Override
    public TeamAccountDetailDto updateDetail(String authorization, TeamAccountEntity teamAccountEntity){
        // *get UserEntity from AccessToken
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()){
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }

        UserEntity user = userEntity.get();

        Optional<TeamAccountEntity> beforeTeamAccountEntityOptional = teamAccountRepository.findById(teamAccountEntity.getId());
        if(!beforeTeamAccountEntityOptional.isPresent()){
            throw new NoSuchElementException("수정할 계좌가 잘못 되었습니다.");
        }

        // beforeTeamAccountEntity를 수정하기
        TeamAccountEntity beforeTeamAccountEntity = beforeTeamAccountEntityOptional.get();
        beforeTeamAccountEntity.setName(teamAccountEntity.getName());
        beforeTeamAccountEntity.setGoal(teamAccountEntity.getGoal());
        beforeTeamAccountEntity.setEndDay(teamAccountEntity.getEndDay());

        teamAccountRepository.save(beforeTeamAccountEntity);

        // *초코뱅크와 통신 해서 계좌 내역 들고 오기
        HashMap<String, String> body = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        body.put("accountNumber", teamAccountEntity.getAccountNumber());

        HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<BankAccountHistoryResponseDto> response = restTemplate.exchange(
                bank_url+"/account/service/history",
                HttpMethod.POST,
                entity,
                BankAccountHistoryResponseDto.class
        );

        if(response.getBody().getMessage().equals("FAIL")){
            throw new TransactionException("초코뱅크와 통신 실패");
        }

        // *계좌에 연결되어 있는 nickname들고오기 + 이 계좌의 master인가
        Boolean master = false;
        int masterIndex = 0;

        List<Group> groupList = new ArrayList<>();

        // 그 외 추가
        Group group = new Group();
        group.setId(0);
        group.setName("그 외");
        groupList.add(group);

        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByTeamAccount_Id(teamAccountEntity.getId());
        for(int i=0, size=teamMemberEntityList.size();i<size;i++){
            TeamMemberEntity e = teamMemberEntityList.get(i);
            Group addGroup = new Group();
            addGroup.setName(e.getNickname());
            addGroup.setId(e.getId());
            groupList.add(addGroup);
            if(user.getId() == e.getUser().getId()){
                if(e.getMaster()) {
                    masterIndex = i + 1; // 그 외 생각해서 +1
                    master = true;
                }
            }
        }


        // *계좌 내역의 보내는 사람 이름과 계좌에 연결된 nickname을 비교해서 사람마다 money 카운트
        int totalAdd = 0;
        int totalSub = 0;

        for(BankAccountHistoryDto e : response.getBody().getBankAccountHistoryDtoList()){
            int money = Integer.parseInt(e.getMoney());

            if(money < 0){
                int calculatedMoney = groupList.get(masterIndex).getMoney() + money;
                groupList.get(masterIndex).setMoney(calculatedMoney);
                totalSub += money;
            }
            else{
                // 그 외를 빼고 생각하기 때문에 i = 1부터 그 외의 index는 0
                for(int i=1,size=groupList.size();i<=size;i++){
                    Group g = groupList.get(i);
                    int calculatedMoney = g.getMoney() + money;
                    if(e.getSenderName().equals(g.getName())){
                        // 닉네임이 일치하는 사람에게 돈이 올라감
                        g.setMoney(calculatedMoney);
                    }else{
                        // 그 외에 돈이 올라감
                        groupList.get(0).setMoney(calculatedMoney);
                    }
                }
                totalAdd += money;
            }
        }

        TeamAccountDetailDto teamAccountDetailDto;
        teamAccountDetailDto = TeamAccountDetailDto.builder()
                .id(beforeTeamAccountEntity.getId())
                .name(beforeTeamAccountEntity.getName())
                .goal(beforeTeamAccountEntity.getGoal())
                .endDay(beforeTeamAccountEntity.getEndDay())
                .totalAdd(totalAdd)
                .totalSub(totalSub)
                .master(master)
                .group(groupList)
                .build();

        return teamAccountDetailDto;
    }

    @Override
    public List<TeamMemberEntity> getMemberList(String authorization, int accountId){
        // *get UserEntity from AccessToken
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()){
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }

        UserEntity user = userEntity.get();

        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByTeamAccount_Id(accountId);

        return teamMemberEntityList;
    }

    @Override
    public void deleteMember(String authorization, int groupId){
        teamMemberRepository.deleteById(groupId);
    }

    @Override
    public TeamAccountDetailDto updateNickname(String authorization, TeamMemberEntity teamMemberEntity){
        // *get UserEntity from AccessToken
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()){
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }

        UserEntity user = userEntity.get();

        Optional<TeamMemberEntity> findTeamMemberEntityOptional = teamMemberRepository.findById(teamMemberEntity.getId());
        if(!findTeamMemberEntityOptional.isPresent()){
            throw new NoSuchElementException("잘못된 사용자 정보입니다.");
        }

        TeamMemberEntity findTeamMemberEntity = findTeamMemberEntityOptional.get();
        findTeamMemberEntity.setNickname(teamMemberEntity.getNickname());
        teamMemberRepository.save(findTeamMemberEntity);

        TeamAccountEntity teamAccountEntity = findTeamMemberEntity.getTeamAccount();

        // *초코뱅크와 통신 해서 계좌 내역 들고 오기
        HashMap<String, String> body = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        body.put("accountNumber", teamAccountEntity.getAccountNumber());

        HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<BankAccountHistoryResponseDto> response = restTemplate.exchange(
                bank_url+"/account/service/history",
                HttpMethod.POST,
                entity,
                BankAccountHistoryResponseDto.class
        );

        if(response.getBody().getMessage().equals("FAIL")){
            throw new TransactionException("초코뱅크와 통신 실패");
        }

        // *계좌에 연결되어 있는 nickname들고오기 + 이 계좌의 master인가
        Boolean master = false;
        int masterIndex = 0;

        List<Group> groupList = new ArrayList<>();

        // 그 외 추가
        Group group = new Group();
        group.setId(0);
        group.setName("그 외");
        groupList.add(group);

        List<TeamMemberEntity> teamMemberEntityList = teamMemberRepository.findByTeamAccount_Id(teamAccountEntity.getId());
        for(int i=0, size=teamMemberEntityList.size();i<size;i++){
            TeamMemberEntity e = teamMemberEntityList.get(i);
            Group addGroup = new Group();
            addGroup.setName(e.getNickname());
            addGroup.setId(e.getId());
            groupList.add(addGroup);
            if(user.getId() == e.getUser().getId()){
                if(e.getMaster()) {
                    masterIndex = i + 1; // 그 외 생각해서 +1
                    master = true;
                }
            }
        }


        // *계좌 내역의 보내는 사람 이름과 계좌에 연결된 nickname을 비교해서 사람마다 money 카운트
        int totalAdd = 0;
        int totalSub = 0;

        for(BankAccountHistoryDto e : response.getBody().getBankAccountHistoryDtoList()){
            int money = Integer.parseInt(e.getMoney());

            if(money < 0){
                int calculatedMoney = groupList.get(masterIndex).getMoney() + money;
                groupList.get(masterIndex).setMoney(calculatedMoney);
                totalSub += money;
            }
            else{
                // 그 외를 빼고 생각하기 때문에 i = 1부터 그 외의 index는 0
                for(int i=1,size=groupList.size();i<=size;i++){
                    Group g = groupList.get(i);
                    int calculatedMoney = g.getMoney() + money;
                    if(e.getSenderName().equals(g.getName())){
                        // 닉네임이 일치하는 사람에게 돈이 올라감
                        g.setMoney(calculatedMoney);
                    }else{
                        // 그 외에 돈이 올라감
                        groupList.get(0).setMoney(calculatedMoney);
                    }
                }
                totalAdd += money;
            }
        }

        TeamAccountDetailDto teamAccountDetailDto;
        teamAccountDetailDto = TeamAccountDetailDto.builder()
                .id(teamAccountEntity.getId())
                .name(teamAccountEntity.getName())
                .goal(teamAccountEntity.getGoal())
                .endDay(teamAccountEntity.getEndDay())
                .totalAdd(totalAdd)
                .totalSub(totalSub)
                .master(master)
                .group(groupList)
                .build();

        return teamAccountDetailDto;

    }

    @Override
    public String createInviteCode(String authorization, int accountId){
        // *inviteCode 생성하기
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 6;
        Random random = new Random();

        String inviteCode = random.ints(leftLimit,rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        
        // *accountId를 가지고 계좌 정보 가지고 오기
        Optional<TeamAccountEntity> teamAccountEntityOptional = teamAccountRepository.findById(accountId);

        if(!teamAccountEntityOptional.isPresent()){
            throw new NoSuchElementException("잘못된 계좌 정보입니다");
        }

        System.out.println(1);
        // *재생성하는 경우 그 전에 있던 리스트중에서 expired가 안된거를 expired로 바꾼다.
        TeamAccountEntity teamAccountEntity = teamAccountEntityOptional.get();
        Optional<InviteCodeEntity> beforeInviteCodeEntityOptional = inviteCodeRepository.findByTeamAccount_IdAndExpiredIsFalse(teamAccountEntity.getId());
        InviteCodeEntity beforeInviteCodeEntity;

        // 재생성하는 경우
        if(beforeInviteCodeEntityOptional.isPresent()){
             beforeInviteCodeEntity = beforeInviteCodeEntityOptional.get();
             beforeInviteCodeEntity.setExpired(true);
             inviteCodeRepository.save(beforeInviteCodeEntity);
        }

        System.out.println(2);
        // inviteCode 만료일 2분뒤로 설정해서 생성한 invtieCode 넣기
        InviteCodeEntity inviteCodeEntity = InviteCodeEntity.createInviteCode();
        inviteCodeEntity.setCode(inviteCode);
        inviteCodeEntity.setTeamAccount(teamAccountEntity);
        inviteCodeRepository.save(inviteCodeEntity);

        return inviteCode;

    }

    @Override
    public void addInvite(String authorization, InviteCodeEntity inviteCodeEntity){
        // *get UserEntity from AccessToken
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()){
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }

        UserEntity user = userEntity.get();

        Optional<InviteCodeEntity> fullInviteCodeEntityOptional = inviteCodeRepository.findByCodeAndExpiredIsFalse(inviteCodeEntity.getCode());
        if(!fullInviteCodeEntityOptional.isPresent()){
            throw new NoSuchElementException("만료된 코드입니다.");
        }

        InviteCodeEntity fullInviteCodeEntity = fullInviteCodeEntityOptional.get();
        LocalDateTime expirationDate = fullInviteCodeEntity.getExpirationDate();
        LocalDateTime now = LocalDateTime.now();
        // 토큰 시간이 만료됨
        if(expirationDate.isBefore(now)){
            fullInviteCodeEntity.setExpired(true);
            inviteCodeRepository.save(fullInviteCodeEntity);
            throw new NoSuchElementException("만료된 코드입니다.");
        }else{ // 만료되지 않았을 때 구성원으로 추가함
            TeamAccountEntity teamAccountEntity = fullInviteCodeEntity.getTeamAccount();

            Boolean exist = teamMemberRepository.existsByUser_IdAndTeamAccount_Id(user.getId(), teamAccountEntity.getId());
            if(exist){
                throw new NoSuchElementException("이미 등록된 계좌입니다.");
            }

            TeamMemberEntity teamMemberEntity;
            teamMemberEntity = TeamMemberEntity.builder()
                    .user(user)
                    .teamAccount(teamAccountEntity)
                    .master(false)
                    .nickname(user.getName())
                    .build();
            teamMemberRepository.save(teamMemberEntity);
        }

    }
}
