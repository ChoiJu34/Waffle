package com.d109.waffle.api.card.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.d109.waffle.api.card.controller.CardInfoController;
import com.d109.waffle.api.card.dto.CardBenefitDto;
import com.d109.waffle.api.card.dto.CardInfoDto;
import com.d109.waffle.api.card.entity.BenefitEntity;
import com.d109.waffle.api.card.entity.CardEntity;
import com.d109.waffle.api.card.repository.CardBenefitRepository;
import com.d109.waffle.api.card.repository.CardRecommendRepository;
import com.d109.waffle.api.card.repository.CardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardInfoServiceImpl implements CardInfoService {
	private static final Logger logger = LoggerFactory.getLogger(CardInfoServiceImpl.class);
	private final CardRepository cardRepository;
	private final CardBenefitRepository cardBenefitRepository;

	@Override
	public CardInfoDto getCardInfo(int cardId) throws Exception {
		CardInfoDto cardInfoDto = new CardInfoDto();

		CardEntity cardEntity = cardRepository.findById(cardId);
		cardInfoDto.setCardEntity(cardEntity);

		List<BenefitEntity> benefitEntityList = cardBenefitRepository.findAllByCardDto_Id(cardId);
		Map<String, List<CardBenefitDto>> tripBenefitMap = new HashMap();

		for (BenefitEntity benefitEntity : benefitEntityList) {
			CardBenefitDto cardBenefitDto = new CardBenefitDto();

			if (benefitEntity.getWhat() != null) {
				cardBenefitDto.setCheck(true);
			} else {
				cardBenefitDto.setCheck(false);
			}
			cardBenefitDto.setBenefitEntity(benefitEntity);

			if (benefitEntity.getBenefitCase().equals("면세점")) {
				if (tripBenefitMap.containsKey("면세점")) {
					List<CardBenefitDto> cardBenefitDtoList = tripBenefitMap.get("면세점");
					cardBenefitDtoList.add(cardBenefitDto);
					tripBenefitMap.put("면세점", cardBenefitDtoList);
				} else {
					List<CardBenefitDto> cardBenefitDtoList = new ArrayList<>();
					cardBenefitDtoList.add(cardBenefitDto);

					tripBenefitMap.put("면세점", cardBenefitDtoList);
				}
			} else if (benefitEntity.getBenefitCase().equals("해외가맹점")) {
				if (tripBenefitMap.containsKey("해외가맹점")) {
					List<CardBenefitDto> cardBenefitDtoList = tripBenefitMap.get("해외가맹점");
					cardBenefitDtoList.add(cardBenefitDto);
					tripBenefitMap.put("해외가맹점", cardBenefitDtoList);
				} else {
					List<CardBenefitDto> cardBenefitDtoList = new ArrayList<>();
					cardBenefitDtoList.add(cardBenefitDto);

					tripBenefitMap.put("해외가맹점", cardBenefitDtoList);
				}
			} else if (benefitEntity.getBenefitCase().equals("해외이용액")) {
				if (tripBenefitMap.containsKey("해외이용액")) {
					List<CardBenefitDto> cardBenefitDtoList = tripBenefitMap.get("해외이용액");
					cardBenefitDtoList.add(cardBenefitDto);
					tripBenefitMap.put("해외이용액", cardBenefitDtoList);
				} else {
					List<CardBenefitDto> cardBenefitDtoList = new ArrayList<>();
					cardBenefitDtoList.add(cardBenefitDto);

					tripBenefitMap.put("해외이용액", cardBenefitDtoList);
				}
			} else if (benefitEntity.getType() == 5) {
				if (benefitEntity.getBenefitCase().substring(0, 2).equals("공항")) {
					if (tripBenefitMap.containsKey("공항서비스")) {
						List<CardBenefitDto> cardBenefitDtoList = tripBenefitMap.get("공항서비스");
						cardBenefitDtoList.add(cardBenefitDto);
						tripBenefitMap.put("공항서비스", cardBenefitDtoList);
					} else {
						List<CardBenefitDto> cardBenefitDtoList = new ArrayList<>();
						cardBenefitDtoList.add(cardBenefitDto);

						tripBenefitMap.put("공항서비스", cardBenefitDtoList);
					}
				} else {
					if (tripBenefitMap.containsKey("기타서비스")) {
						List<CardBenefitDto> cardBenefitDtoList = tripBenefitMap.get("기타서비스");
						cardBenefitDtoList.add(cardBenefitDto);
						tripBenefitMap.put("기타서비스", cardBenefitDtoList);
					} else {
						List<CardBenefitDto> cardBenefitDtoList = new ArrayList<>();
						cardBenefitDtoList.add(cardBenefitDto);

						tripBenefitMap.put("기타서비스", cardBenefitDtoList);
					}
				}
			}
		}

		cardInfoDto.setCardBenefitMap(tripBenefitMap);

		return cardInfoDto;
	}
}
