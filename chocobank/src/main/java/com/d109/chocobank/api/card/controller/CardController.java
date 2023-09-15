package com.d109.chocobank.api.card.controller;

import com.d109.chocobank.api.card.service.CardServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
@Slf4j
public class CardController {
    private final CardServiceImpl cardService;

    // 서비스에서 사용자 카드 리스트 조회
    @GetMapping("/service/list")
    public ResponseEntity<?> getServiceUserCardList(@RequestHeader("Authorization-uuid") String uuid) throws Exception {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", cardService.getUserCardList(uuid));
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 서비스에서 카드 번호로 카드 정보 조회
    @PostMapping("/service")
    public ResponseEntity<?> getCard(@RequestHeader("Authorization-uuid") String uuid, @RequestBody Map<String, String> map) throws Exception {
        log.info("chocobank getCard controller");
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", cardService.getCard(uuid, map.get("cardNumber")).getName());
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 은행에서 사용자 카드 리스트 조회
    @GetMapping("/list/user")
    public ResponseEntity<?> getUserCardList(@RequestHeader("Authorization") String authorization) throws Exception {
        return null;
    }

    // 은행에서 모든 카드 리스트 조회
    @GetMapping("/list")
    public ResponseEntity<?> getCardList() throws Exception {
        return null;
    }

    // 은행에서 단일 카드 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getCard() throws Exception {
        return null;
    }

    // 은행에서 카드 생성
    @PostMapping("/add/{id}")
    public ResponseEntity<?> addCard(@RequestHeader("Authorization") String authorization, @PathVariable int id) throws Exception {
        Map<String, Object> result = new HashMap<>();
        try {
            cardService.addCard(authorization, id);
            result.put("message", "SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            result.put("message", "FAIL");
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
