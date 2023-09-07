package com.d109.waffle.api.teamaccount.controller;

import com.d109.waffle.api.teamaccount.dto.TeamAccountDto;
import com.d109.waffle.api.teamaccount.service.TeamAccountServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/team-account")
@RequiredArgsConstructor
@Slf4j
public class TeamAccountController {

    private final TeamAccountServiceImpl teamAccountService;

    @PostMapping("/add-list")
    public ResponseEntity<?> addTeamAccount(@RequestBody TeamAccountDto teamAccountDto) throws Exception{
        Map<String, String> result = new HashMap<>();

//        System.out.println("teamAccountDto = " + teamAccountDto);

        try{
            TeamAccountDto returnDto = teamAccountService.addTeamAccount(teamAccountDto);
//            System.out.println("returnDto = " + returnDto);
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList() throws Exception{
        Map<String, String> result = new HashMap<>();

        try{

            return new ResponseEntity<>(result, HttpStatus.OK);

        }catch(Exception e){
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }



}
