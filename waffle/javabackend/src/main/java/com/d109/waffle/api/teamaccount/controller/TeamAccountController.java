package com.d109.waffle.api.teamaccount.controller;

import com.d109.waffle.api.teamaccount.dto.TeamAccountDetailDto;
import com.d109.waffle.api.teamaccount.dto.TeamAccountDto;
import com.d109.waffle.api.teamaccount.dto.TeamAccountListDto;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import com.d109.waffle.api.teamaccount.entity.TeamMemberEntity;
import com.d109.waffle.api.teamaccount.service.TeamAccountServiceImpl;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.hibernate.TransactionException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/team-account")
@RequiredArgsConstructor
@Slf4j
public class TeamAccountController {

    private final TeamAccountServiceImpl teamAccountService;

    @PostMapping("/add-list")
    public ResponseEntity<?> addTeamAccount(@RequestHeader("Authorization") String authorization, @RequestBody TeamAccountEntity teamAccountEntity){
        Map<String, Object> result = new HashMap<>();

        try{
            TeamAccountEntity returnEntity = teamAccountService.addTeamAccount(authorization, teamAccountEntity);
            if(returnEntity.getId() != 0){
                result.put("message", "계좌 등록에 성공했습니다.");
            }
            else if(returnEntity == null){
                result.put("message", "FAIL");
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else{
                result.put("message", "없는 계좌 번호입니다.");
            }
            result.put("teamAccount", returnEntity);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(NoSuchElementException e){
            result.put("message", "사용자 정보 조회에 실패했습니다.");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(IllegalArgumentException e){
            result.put("message", "이미 등록된 계좌번호입니다.");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList(@RequestHeader("Authorization") String authorization) throws Exception{
        Map<String, Object> result = new HashMap<>();

        try{
            List<TeamAccountListDto> list = teamAccountService.getAccountList(authorization);
            result.put("count", list.size());
            result.put("list", list);
            return new ResponseEntity<>(result, HttpStatus.OK);

        }catch(TransactionException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteList(@PathVariable("id") int accountId){
        Map<String, String> result = new HashMap<>();

        try{
            teamAccountService.deleteAccount(accountId);
            result.put("message", "삭제에 성공했습니다.");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(NoSuchElementException e){
            result.put("message", "잘못된 정보를 입력했습니다.");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getDetailList(@RequestHeader("Authorization") String authorization, @PathVariable("id") int accountId){
        Map<String, Object> result = new HashMap<>();
        try{
            TeamAccountDetailDto teamAccountDetailDto = teamAccountService.getDetailList(authorization, accountId);
            result.put("message", "SUCCESS");
            result.put("id", teamAccountDetailDto.getId());
            result.put("name", teamAccountDetailDto.getName());
            result.put("goal", teamAccountDetailDto.getGoal());
            result.put("endDay", teamAccountDetailDto.getEndDay());
            result.put("totalAdd", teamAccountDetailDto.getTotalAdd());
            result.put("totalSub", teamAccountDetailDto.getTotalSub());
            result.put("master", teamAccountDetailDto.getMaster());
            result.put("group", teamAccountDetailDto.getGroup());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(NoSuchElementException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(TransactionException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PutMapping("/update-detail")
    public ResponseEntity<?> updateDetail(@RequestHeader("Authorization") String authorization, @RequestBody TeamAccountEntity teamAccountEntity){
        Map<String, Object> result = new HashMap<>();

        try{
            TeamAccountDetailDto teamAccountDetailDto;
            teamAccountDetailDto = teamAccountService.updateDetail(authorization, teamAccountEntity);
            result.put("message", "SUCCESS");
            result.put("id", teamAccountDetailDto.getId());
            result.put("name", teamAccountDetailDto.getName());
            result.put("goal", teamAccountDetailDto.getGoal());
            result.put("endDay", teamAccountDetailDto.getEndDay());
            result.put("totalAdd", teamAccountDetailDto.getTotalAdd());
            result.put("totalSub", teamAccountDetailDto.getTotalSub());
            result.put("master", teamAccountDetailDto.getMaster());
            result.put("group", teamAccountDetailDto.getGroup());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(NoSuchElementException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(TransactionException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch(Exception e){
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/member-list/{id}")
    public ResponseEntity<?> getMemberList(@RequestHeader("Authorization") String authorization, @PathVariable("id") int accountId){
        Map<String, Object> result = new HashMap<>();

        try{
            List<TeamMemberEntity> teamMemberEntityList = teamAccountService.getMemberList(authorization, accountId);
            List<Map<String, Object>> list = new ArrayList<>();
            for(int i=0, size=teamMemberEntityList.size();i<size;i++){
                TeamMemberEntity e = teamMemberEntityList.get(i);

                Map<String, Object> dto = new HashMap<>();
                dto.put("id", e.getId());
                dto.put("name", e.getNickname());
                dto.put("master", e.getMaster());

                list.add(dto);
            }
            result.put("list", list);
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(NoSuchElementException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @DeleteMapping("delete-member/{groupId}")
    public ResponseEntity<?> deleteMember(@RequestHeader("Authorization") String authorization, @PathVariable("groupId") int groupId) {
        Map<String, Object> result = new HashMap<>();

        try{
            teamAccountService.deleteMember(authorization, groupId);
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("update-nickname")
    public ResponseEntity<?> updateNickname(@RequestHeader("Authorization") String authorization, @RequestBody TeamMemberEntity teamMemberEntity){
        Map<String, Object> result = new HashMap<>();

        try{
            TeamAccountDetailDto teamAccountDetailDto = teamAccountService.updateNickname(authorization, teamMemberEntity);
            result.put("message", "SUCCESS");
            result.put("id", teamAccountDetailDto.getId());
            result.put("name", teamAccountDetailDto.getName());
            result.put("goal", teamAccountDetailDto.getGoal());
            result.put("endDay", teamAccountDetailDto.getEndDay());
            result.put("totalAdd", teamAccountDetailDto.getTotalAdd());
            result.put("totalSub", teamAccountDetailDto.getTotalSub());
            result.put("master", teamAccountDetailDto.getMaster());
            result.put("group", teamAccountDetailDto.getGroup());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(NoSuchElementException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(TransactionException e){
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("create-code/{accountId}")
    public ResponseEntity<?> createInviteCode(@RequestHeader("Authorization") String authorization, @PathVariable("accountId") int accountId){
        Map<String, Object> result = new HashMap<>();

        try{
            String inviteCode = teamAccountService.createInviteCode(authorization, accountId);
            result.put("code", inviteCode);
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
