package com.d109.waffle.api.card.controller;

import com.d109.waffle.api.card.dto.UserCardDto;
import com.d109.waffle.api.card.service.UserCardServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-card")
@Slf4j
public class UserCardController {
    private final UserCardServiceImpl userCardService;

    @PostMapping("/add")
    public ResponseEntity<?> addCard(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, String> map) {
        Map<String, String> result = new HashMap<>();
        try {
            userCardService.addCard(authorization, map.get("cardNumber"));
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
        }
    }

    @GetMapping("/bank/list")
    public ResponseEntity<?> getBankUserCardList(@RequestHeader("Authorization") String authorization) throws Exception {
        Map<String, Object> result = new HashMap<>();
        try {
//            List<UserCardDto> li = userCardService.getBankUserCardList(authorization);
//            log.info("controller: ", li);
//            System.out.println(li);
//            result.put("result", li);
            result.put("result", userCardService.getBankUserCardList(authorization));
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
        }
    }
}
