package com.d109.waffle.api.card.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.d109.waffle.api.card.controller.CardRecommendController;
import com.d109.waffle.api.card.entity.BenefitEntity;
import com.d109.waffle.api.card.entity.CardEntity;
import com.d109.waffle.api.card.dto.RecommendCardDto;
import com.d109.waffle.api.card.dto.SurveyDto;
import com.d109.waffle.api.card.repository.CardBenefitRepository;
import com.d109.waffle.api.card.repository.CardRecommendRepository;
import com.d109.waffle.common.card.ExchangeValue;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardRecommendServiceImpl implements CardRecommendService {
	private static final Logger logger = LoggerFactory.getLogger(CardRecommendController.class);
	private final CardRecommendRepository cardRecommendRepository;
	private final CardBenefitRepository cardBenefitRepository;
	private final Map<String, double[]> exchangeValue = ExchangeValue.getExchangeValue();

	@Override
	public List<RecommendCardDto> getRecommendCardList(SurveyDto surveyDto) throws Exception {
		int credit = surveyDto.getCard();
		List<String> company = surveyDto.getFavoriteCompany();

		// 특정 국가 Dto 설정해두기
		RecommendCardDto chinaPriceRecommendCardDto = new RecommendCardDto();
		RecommendCardDto japanPriceRecommendCardDto = new RecommendCardDto();
		RecommendCardDto chinaOtherRecommendCardDto = new RecommendCardDto();
		RecommendCardDto japanOtherRecommendCardDto = new RecommendCardDto();

		List<CardEntity> cardList;

		// 조건에 맞는 card List에 넣기
		if (credit == 1) {
			if (company.isEmpty()) {
				cardList = cardRecommendRepository.findByCreditTrue();
			} else {
				cardList = cardRecommendRepository.findByCreditTrueAndCompanyIsIn(company);
			}
		} else if (credit == 2) {
			if (company.isEmpty()) {
				cardList = cardRecommendRepository.findByCreditFalse();
			} else {
        		cardList = cardRecommendRepository.findByCreditFalseAndCompanyIsIn(company);
			}
		} else {
			if (company.isEmpty()) {
				cardList = cardRecommendRepository.findAll();
			} else {
				cardList = cardRecommendRepository.findByCompanyIsIn(company);
			}
		}

		PriorityQueue<RecommendCardDto> pricePQ = new PriorityQueue<>(new Comparator<RecommendCardDto>() { // 순수 가격
			@Override
			public int compare(RecommendCardDto r1, RecommendCardDto r2) {
				return r1.getDiscountPrice().get("total") - r2.getDiscountPrice().get("total");
			}
		});

		PriorityQueue<RecommendCardDto> benefitPQ = new PriorityQueue<>(new Comparator<RecommendCardDto>() { // 카드 회사 별 혜택 갯수 (갯수가 같으면 가격 오름차순)
			@Override
			public int compare(RecommendCardDto r1, RecommendCardDto r2) {
				if ((r1.getGetBenefit().size() + r1.getOtherBenefit().size()) == (r2.getGetBenefit().size() + r2.getOtherBenefit().size())) {
					return r1.getDiscountPrice().get("total") - r2.getDiscountPrice().get("total");
				}

				return -((r1.getGetBenefit().size() + r1.getOtherBenefit().size()) - (r2.getGetBenefit().size() + r2.getOtherBenefit().size()));
			}
		});

		for (CardEntity card : cardList) {
			// 원가
			Map<String, Integer> originalPrice = new HashMap<>();
			originalPrice.put("dutyFree", surveyDto.getDutyFree());
			originalPrice.put("use", surveyDto.getUse() + (int) (surveyDto.getUse() * card.getUsageFee()));
			originalPrice.put("annualFee", card.getAnnualFee());
			originalPrice.put("total", originalPrice.get("dutyFree") + originalPrice.get("use") + originalPrice.get("annualFee"));

			// 할인 가격
			Map<String, Integer> getPrice = new HashMap<>();

			// 할인 혜택
			List<String[]> getBenefit = new ArrayList<>();

			// 금액 할인 외 여행 혜택
			List<String> otherBenefit = new ArrayList<>();

			List<BenefitEntity> benefitDtoList = cardBenefitRepository.findAllByCardDto_Id(card.getId());

			for (BenefitEntity benefit : benefitDtoList) {
				if (benefit.getType() == 7) { // 해외 여행과 상관없는 서비스

				} else if (benefit.getType() == 5) { // 해외 여행과 상관있지만 가격과 상관없는 서비스
					otherBenefit.add(benefit.getAt() + " " + benefit.getBenefitCase() + " 무료 이용");
				} else { // 해외 여행과 상관있고 가격과 상관있는 서비스
					if (benefit.getBenefitCase().equals("면세점")) { // 면세점 혜택
						int price = 0;
						String content = "면세점";

						if (benefit.getBase() == null) {
							if (benefit.getPercent() == null) { // 금액이 원으로 까질 때
								price = benefit.getPrice();
								content += " " + benefit.getPrice() + "원";
							} else { // 금액이 %로 까질 때
								price = (int) (surveyDto.getDutyFree() * benefit.getPercent());
								content += " " + benefit.getPercent() * 100 + "%";
							}
						} else { // 금액이 단위 금액으로 까질 때
							price = (int) (surveyDto.getDutyFree() / benefit.getBase()) * benefit.getBasePer();
							content += " " + benefit.getBase() + "원 당 " + benefit.getBasePer() + "원";
						}

						if (benefit.getType() == 1) {
							content += " 청구할인";
						} else if (benefit.getType() == 2) {
							content += " 결제일할인";
						} else if (benefit.getType() == 3) {
							content += " 캐시백";
						} else if (benefit.getType() == 4) {
							content += " 마일리지 적립";
						} else if (benefit.getType() == 6) {
							content += " 바우처 제공";
						}

						if (benefit.getMax() != null) { // 최대 금액 한도가 있으면
							price = Math.min(price, benefit.getMax());
						}

						if (surveyDto.getDutyFree() - price < 0) { // 결과 금액이 0보다 작을 때
							price = price - Math.abs(surveyDto.getDutyFree() - price);
						}

						getPrice.put("dutyFree", price);

						String[] tempStr = new String[3];

						tempStr[0] = "dutyFree";
						tempStr[1] = content;
						tempStr[2] = String.valueOf(price);

						getBenefit.add(tempStr);

					} else if (benefit.getBenefitCase().equals("해외가맹점")) { // 해외가맹점 혜택
						int price = 0;
						String content = "해외가맹점";
						
						if (benefit.getBase() == null) {
							if (benefit.getPercent() == null) { // 금액이 원으로 까질 때
								price = benefit.getPrice();
								content += " " + benefit.getPrice() + "원";
							} else { // 금액이 %로 까질 때
								price = (int) (surveyDto.getUse() * benefit.getPercent());
								content += " " + benefit.getPercent() * 100 + "%";
							}
						} else {
							price = (int) (surveyDto.getUse() / benefit.getBase()) * benefit.getBasePer();
							content += " " + benefit.getBase() + "원 당 " + benefit.getBasePer() + "원";
						}

						if (benefit.getType() == 1) {
							content += " 청구할인";
						} else if (benefit.getType() == 2)
							content += " 결제일할인";
						else if (benefit.getType() == 3) {
							content += " 캐시백";
						} else if (benefit.getType() == 4) {
							content += " 마일리지 적립";
						} else if (benefit.getType() == 6) {
							content += " 바우처 제공";
						}

						if (benefit.getMax() != null) { // 최대 금액 한도가 있으면
							price = Math.min(price, benefit.getMax());
						}

						if (surveyDto.getUse() - price < 0) { // 결과 금액이 0보다 작을 때
							price -= Math.abs(surveyDto.getUse() - price);
						}

						if (getPrice.containsKey("use")) {
							if (surveyDto.getUse() - (getPrice.get("use") + price) < 0) { // 현재 use와 price 합이 0보다 작을 떄
								price = price - Math.abs(surveyDto.getUse() - (getPrice.get("use") + price));
							}
							getPrice.put("use", getPrice.get("use") + price);
						} else {
							getPrice.put("use", price);
						}

						String[] tempStr = new String[3];

						tempStr[0] = "use";
						tempStr[1] = content;
						tempStr[2] = String.valueOf(price);

						getBenefit.add(tempStr);

					} else if (benefit.getBenefitCase().equals("해외이용액")) { // 해외이용액 혜택
						int price = 0;
						String content = "해외이용액";

						if (benefit.getBase() == null) {
							if (benefit.getPercent() == null) { // 금액이 원으로 까질 때
								price = benefit.getPrice();
								content += " " + benefit.getPrice() + "원";
							} else { // 금액이 %로 까질 때
								price = (int) (surveyDto.getUse() * benefit.getPercent());
								content += " " + benefit.getPercent() * 100 + "%";
							}
						} else {
							price = (int) (surveyDto.getUse() / benefit.getBase()) * benefit.getBasePer();
							content += " " + benefit.getBase() + "원 당 " + benefit.getBasePer() + "원";
						}

						if (benefit.getType() == 1) {
							content += " 청구할인";
						} else if (benefit.getType() == 2)
							content += " 결제일할인";
						else if (benefit.getType() == 3) {
							content += " 캐시백";
						} else if (benefit.getType() == 4) {
							content += " 마일리지 적립";
						} else if (benefit.getType() == 6) {
							content += " 바우처 제공";
						}

						if (benefit.getMax() != null) { // 최대 금액 한도가 있으면
							price = Math.min(price, benefit.getMax());
						}

						if (surveyDto.getUse() - price < 0) { // 결과 금액이 0보다 작을 때
							price -= Math.abs(surveyDto.getUse() - price);
						}

						if (getPrice.containsKey("use")) {
							if (surveyDto.getUse() - (getPrice.get("use") + price) < 0) { // 현재 use와 price 합이 0보다 작을 떄
								price = price - Math.abs(surveyDto.getUse() - (getPrice.get("use") + price));
							}
							getPrice.put("use", getPrice.get("use") + price);
						} else {
							getPrice.put("use", price);
						}

						String[] tempStr = new String[3];

						tempStr[0] = "use";
						tempStr[1] = content;
						tempStr[2] = String.valueOf(price);

						getBenefit.add(tempStr);
					}
				}
			}

			if (!getPrice.containsKey("dutyFree")) {
				getPrice.put("dutyFree", 0);
			}

			if (!getPrice.containsKey("use")) {
				getPrice.put("use", 0);
			}

			int total = 0;

			for (Map.Entry<String, Integer> entry : getPrice.entrySet()) {
				total += entry.getValue();
			}

			getPrice.put("total", total);

			Map<String, Integer> discountPrice = new HashMap<>();

			discountPrice.put("dutyFree", originalPrice.get("dutyFree") - getPrice.get("dutyFree"));
			discountPrice.put("use", originalPrice.get("use") - getPrice.get("use"));
			discountPrice.put("annualFee", originalPrice.get("annualFee"));
			discountPrice.put("total", discountPrice.get("dutyFree") + discountPrice.get("use") + discountPrice.get("annualFee"));

			RecommendCardDto recommendCardDto = new RecommendCardDto();

			recommendCardDto.setCardId(card.getId());
			recommendCardDto.setCardCompany(card.getCompany());
			recommendCardDto.setCardBrand(card.getBrand());
			recommendCardDto.setCardName(card.getName());
			recommendCardDto.setOriginalPrice(originalPrice);
			recommendCardDto.setGetPrice(getPrice);
			recommendCardDto.setDiscountPrice(discountPrice);
			recommendCardDto.setGetBenefit(getBenefit);
			recommendCardDto.setOtherBenefit(otherBenefit);
			recommendCardDto.setLink(card.getLink());

			// pq에 RecommendCard 넣어주기 (jcb랑 unionpay는 특별취급)
			if (card.getBrand().equals("mastercard") || card.getBrand().equals("visa")) {
				pricePQ.offer(recommendCardDto);

				if (card.getAnnualFee() <= surveyDto.getAnnualFee()) {
					benefitPQ.offer(recommendCardDto);
				}
			}

			if (surveyDto.getCountry().equals("Japan") && card.getBrand().equals("jcb")) {
				if (japanPriceRecommendCardDto.getCardName() == null) {
					japanPriceRecommendCardDto = recommendCardDto;
				} else if (japanPriceRecommendCardDto.getCardName() != null && recommendCardDto.getDiscountPrice().get("total") < japanPriceRecommendCardDto.getDiscountPrice().get("total")) {
					japanPriceRecommendCardDto = recommendCardDto;
				}

				if (card.getAnnualFee() <= surveyDto.getAnnualFee()) {
					if (japanOtherRecommendCardDto.getCardName() == null) {
						japanOtherRecommendCardDto = recommendCardDto;
					} else if (japanOtherRecommendCardDto.getCardName() != null
						&& (recommendCardDto.getGetBenefit().size() + recommendCardDto.getOtherBenefit().size()) >= (
						japanOtherRecommendCardDto.getGetBenefit().size() + japanOtherRecommendCardDto.getOtherBenefit()
							.size())) {
						if ((recommendCardDto.getGetBenefit().size() + recommendCardDto.getOtherBenefit().size()) == (
							japanOtherRecommendCardDto.getGetBenefit().size()
								+ japanOtherRecommendCardDto.getOtherBenefit().size())
							&& recommendCardDto.getDiscountPrice().get("total")
							< japanOtherRecommendCardDto.getDiscountPrice().get("total")) {
							japanOtherRecommendCardDto = recommendCardDto;
						} else {
							japanOtherRecommendCardDto = recommendCardDto;
						}
					}
				}
			}

			if (surveyDto.getCountry().equals("China") && card.getBrand().equals("unionpay")) {
				if (chinaPriceRecommendCardDto.getCardName() == null) {
					chinaPriceRecommendCardDto = recommendCardDto;
				} else if (chinaPriceRecommendCardDto.getCardName() != null && recommendCardDto.getDiscountPrice().get("total") < chinaPriceRecommendCardDto.getDiscountPrice().get("total")) {
					chinaPriceRecommendCardDto = recommendCardDto;
				}

				if (card.getAnnualFee() <= surveyDto.getAnnualFee()) {
					if (chinaOtherRecommendCardDto.getCardName() == null) {
						chinaOtherRecommendCardDto = recommendCardDto;
					} else if (chinaOtherRecommendCardDto.getCardName() != null
						&& (recommendCardDto.getGetBenefit().size() + recommendCardDto.getOtherBenefit().size()) >= (
						chinaOtherRecommendCardDto.getGetBenefit().size() + chinaOtherRecommendCardDto.getOtherBenefit()
							.size())) {
						if ((recommendCardDto.getGetBenefit().size() + recommendCardDto.getOtherBenefit().size()) == (
							chinaOtherRecommendCardDto.getGetBenefit().size()
								+ chinaOtherRecommendCardDto.getOtherBenefit().size())
							&& recommendCardDto.getDiscountPrice().get("total")
							< chinaOtherRecommendCardDto.getDiscountPrice().get("total")) {
							chinaOtherRecommendCardDto = recommendCardDto;
						} else {
							chinaOtherRecommendCardDto = recommendCardDto;
						}
					}
				}
			}
		}

		RecommendCardDto priceRecommendCard = pricePQ.poll(); // 순수 가격 추천
		RecommendCardDto otherRecommendCard = null;

		if (!benefitPQ.isEmpty()) {
			otherRecommendCard = benefitPQ.poll(); // 혜택이 가장 많은 카드 추천 (같으면 가격이 가장 낮은 거)
		}

		if (surveyDto.getCountry().equals("Japan") && japanPriceRecommendCardDto.getCardName() != null) {
			priceRecommendCard = japanPriceRecommendCardDto;
		}

		if (surveyDto.getCountry().equals("Japan") && japanOtherRecommendCardDto.getCardName() != null) {
			otherRecommendCard = japanOtherRecommendCardDto;
		}

		if (surveyDto.getCountry().equals("China") && chinaPriceRecommendCardDto.getCardName() != null) {
			priceRecommendCard = chinaPriceRecommendCardDto;
		}

		if (surveyDto.getCountry().equals("China") && chinaOtherRecommendCardDto.getCardName() != null) {
			otherRecommendCard = chinaOtherRecommendCardDto;
		}

		List<RecommendCardDto> result = new ArrayList<>();

		priceRecommendCard.setRecommendNumber(1);
		result.add(priceRecommendCard);

		if (otherRecommendCard != null) {
			otherRecommendCard.setRecommendNumber(2);
			result.add(otherRecommendCard);
		}

		RecommendCardDto exchangeRecommendCard = new RecommendCardDto();

		double[] exchange = exchangeValue.get(surveyDto.getCountry());
		exchangeRecommendCard.setRecommendNumber(3);

		if (exchange[0] >= exchange[1]) {
			exchangeRecommendCard.setCardName("트래블월렛");
			exchangeRecommendCard.setLink("환전 수수료 " + String.valueOf(exchange[0] * 100) + "%");
		} else {
			exchangeRecommendCard.setCardName("트래블로그");
			exchangeRecommendCard.setLink("환전 수수료 " + String.valueOf(exchange[0] * 100) + "%");
		}

		result.add(exchangeRecommendCard);

		return result;
	}
}
