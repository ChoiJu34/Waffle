package com.d109.waffle.api.card.service;

import com.d109.waffle.api.card.dto.CardListResponseDto;
import com.d109.waffle.api.card.dto.CardResponseDto;
import com.d109.waffle.api.card.dto.UserCardDto;
import com.d109.waffle.api.card.dto.UserCardListDto;
import com.d109.waffle.api.card.entity.CardEntity;
import com.d109.waffle.api.card.entity.UserCardEntity;
import com.d109.waffle.api.card.repository.CardRepository;
import com.d109.waffle.api.card.repository.UserCardRepository;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.api.user.repository.UserRepository;
import com.d109.waffle.common.auth.service.JwtService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserCardServiceImpl implements UserCardService {
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final UserCardRepository userCardRepository;
    private final JwtService jwtService;

    @Value("${request.chocobank.base_url}")
    private String bank_url;

    @Override
    public void addCard(String authorization, String cardBin, String cardNumber, String cardNickname, String cardValidDate) throws Exception {
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        UserEntity user = userEntity.get();

        HashMap<String, String> body = new HashMap<>();
        body.put("cardNumber", cardBin);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        // headers.add("Authorization-uuid", user.getUuid());
        HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<CardResponseDto> response = restTemplate.exchange(
                bank_url+"/card/service",
                HttpMethod.POST,
                entity,
                CardResponseDto.class
        );

        // log.info("res: {}", response);

        if(response.getBody().getMessage().equals("SUCCESS")) {
            Optional<CardEntity> cardEntity = cardRepository.findByName(response.getBody().getResult());
            // log.info("cardEntity: {}", cardEntity);
            if(cardEntity.isEmpty()) {
                throw new NoSuchElementException("해당 카드의 정보를 찾지 못했습니다.");
            }
            if(userCardRepository.existsByCardNumber(cardNumber)) {
                throw new Exception("이미 등록된 카드입니다.");
            }
            UserCardEntity userCardEntity = UserCardEntity.builder()
                .cardEntity(cardEntity.get())
                .cardValidDate(cardValidDate)
                .cardNickname(cardNickname)
                .cardNumber(cardNumber)
                .userEntity(user)
                .build();
            userCardRepository.save(userCardEntity);
        }
        throw new Exception("해당 카드의 정보를 찾지 못했습니다.");
    }

    @Override
    public List<UserCardDto> getBankUserCardList(String authorization) throws Exception {
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        UserEntity user = userEntity.get();

        HashMap<String, String> body = new HashMap<>();
//        body.put("uuid", cardNumber);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("Authorization-uuid", user.getUuid());
        HttpEntity<HashMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<CardListResponseDto> response = restTemplate.exchange(
                bank_url+"/card/service/list",
                HttpMethod.GET,
                entity,
                CardListResponseDto.class
        );

        if(response.getBody().getMessage().equals("SUCCESS")) {
            List<UserCardDto> userCardDtoList = response.getBody().getUserCardDtoList();
            return userCardDtoList;
        } else {
            throw new Exception("bank FAIL");
        }
    }

    @Override
    public void addBankCard(String authorization) throws Exception {
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        List<UserCardDto> userCardDtoList = getBankUserCardList(authorization);

        Boolean flag = false;
        for(UserCardDto userCardDto : userCardDtoList) {
            Optional<CardEntity> cardEntity = cardRepository.findByName(userCardDto.getName());
            if(cardEntity.isEmpty()) {
//                throw new Exception("서비스에 등록되지 않은 카드입니다.");
                flag = true;
                continue;
            }
            if(userCardRepository.existsByCardEntity_IdAndUserEntity_Id(cardEntity.get().getId(), userEntity.get().getId())) {
                continue;
            }
            UserCardEntity userCardEntity = UserCardEntity.builder()
                    .userEntity(userEntity.get())
                    .cardEntity(cardEntity.get())
                    .build();
            userCardRepository.save(userCardEntity);
        }
        if(flag) {
            throw new Exception("서비스에 등록되지 않은 카드가 존재합니다.");
        }
    }

    @Override
    public List<UserCardListDto> getUserCardList(String authorization) throws Exception {
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new Exception("사용자 정보를 찾을 수 없습니다.");
        }
        // log.info("usercardlist: {}", userCardRepository.findByUserEntity_IdAndGetCardNameList(userEntity.get().getId()));
        return userCardRepository.findByUserEntity_IdAndGetCardNameList(userEntity.get().getId());
    }

    @Override
    public void deleteUserCard(String authorization, int id) throws Exception {
        Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
        if(!userEntity.isPresent()) {
            throw new Exception("사용자 정보를 찾을 수 없습니다.");
        }
        if(userCardRepository.findById(id).get().getUserEntity().getId() != userEntity.get().getId()) {
            throw new Exception("본인의 카드가 아닙니다.");
        }
        userCardRepository.deleteById(id);
    }
}
