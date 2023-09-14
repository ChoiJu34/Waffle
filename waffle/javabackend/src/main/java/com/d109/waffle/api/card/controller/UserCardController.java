package com.d109.waffle.api.card.controller;

import com.d109.waffle.api.card.service.UserCardServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
}
