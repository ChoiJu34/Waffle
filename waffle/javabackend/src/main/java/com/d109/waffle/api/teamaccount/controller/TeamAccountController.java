package com.d109.waffle.api.teamaccount.controller;

import com.d109.waffle.api.teamaccount.dto.TeamAccountDto;
import com.d109.waffle.api.teamaccount.dto.TeamAccountListDto;
import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import com.d109.waffle.api.teamaccount.service.TeamAccountServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/team-account")
@RequiredArgsConstructor
@Slf4j
public class TeamAccountController {

    private final TeamAccountServiceImpl teamAccountService;

    @PostMapping("/add-list")
    public ResponseEntity<?> addTeamAccount(@RequestHeader("Authorization") String authorization, @RequestBody TeamAccountDto teamAccountDto) throws Exception{
        Map<String, String> result = new HashMap<>();

        try{
            TeamAccountDto returnDto = teamAccountService.addTeamAccount(authorization, teamAccountDto);
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.OK);
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
            result.put("message", "SUCCESS");
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
            teamAccountService.getDetailList(authorization, accountId);
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }






}
