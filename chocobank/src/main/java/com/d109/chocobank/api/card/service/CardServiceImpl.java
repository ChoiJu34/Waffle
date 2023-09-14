package com.d109.chocobank.api.card.service;

import com.auth0.jwt.JWT;
import com.d109.chocobank.api.card.entity.CardEntity;
import com.d109.chocobank.api.card.repository.CardRepository;
import com.d109.chocobank.api.user.entity.UserEntity;
import com.d109.chocobank.api.user.repository.UserRepository;
import com.d109.chocobank.common.auth.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CardServiceImpl implements CardService {
    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public CardEntity getCard(String uuid, String cardNumber) throws Exception {
        Optional<UserEntity> user = userRepository.findByUuid(uuid);
        if(user.isEmpty()) {
            throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
        }
        log.info("cardNumber {}", cardNumber);
        Optional<CardEntity> cardEntity = cardRepository.findByCardNumber(cardNumber);
        if(cardEntity.isEmpty()) {
            throw new NoSuchElementException("카드 정보를 찾을 수 없습니다.");
        }
        return cardEntity.get();
    }

    @Override
    public List<CardEntity> getUserCardList(String uuid) throws Exception {
        return null;
    }
}
