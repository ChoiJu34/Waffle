package com.d109.waffle.api.trippackage.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.d109.waffle.api.trippackage.dto.RecommendDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TripPackageService {
	private RestTemplate restTemplate;
	class cardpq{
		String cardName;
		int planePrice;
		int originPirce;
		int planeListJ;
		int planeDateK;
		public cardpq(String cardName, int planePrice, int originPrice, int planeListJ, int planeDateK){
			this.cardName=cardName;
			this.planePrice=planePrice;
			this.originPirce = originPrice;
			this.planeListJ = planeListJ;
			this.planeDateK = planeDateK;
		}
	}

	class IHotel{
		String img;
		int price;
		String name;
		String url;
		public IHotel(String img, int price, String name, String url){
			this.img=img;
			this.price = price;
			this.name = name;
			this.url = url;
		}
	}

	@Autowired
	public void TripPackageService(RestTemplate restTemplate){
		this.restTemplate = restTemplate;
	}

	public Map<String, Object> all(RecommendDto recommendDto) throws JsonProcessingException {
		Map<String, Object> map1 = interparkPlane(recommendDto);
		Map<String, Object> map2 = interparkHotel(recommendDto);
		Map<String, Object> result = new HashMap<>();
		result.put("plane", map1);
		result.put("hotel", map2);
		return result;
	}

	public Map<String, Object> interparkPlane(RecommendDto recommendDto) throws JsonProcessingException {
		String s = restTemplate.postForObject("http://127.0.0.1:8000/interparkPlane", recommendDto, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(s, new TypeReference<Map<String, Object>>() {});
		Map<String, Object> planeInfo = new HashMap<>();
		// data:[{
		// 	plane:[[[],[],[],[]],[],[]]
		// 	card:[[[],[],[],[],[]],[],[]]},{...}]
		for(int i=0; i<dataMap.size(); i++){//비행기 탑승 횟수
			PriorityQueue<cardpq> pq = new PriorityQueue<>((o1, o2) -> (o1.planePrice-o2.planePrice));
			List<Map<String,List<List<List<String>>>>> planPlane = (List<Map<String, List<List<List<String>>>>>)dataMap.get("data");
			for(int k=0; k<planPlane.get(i).get("plane").size(); k++){//비행기 출발 날짜 범위
				List<List<String>> planeList = planPlane.get(i).get("plane").get(k);//k번째 날 비행기 목록
				List<List<String>> cardList = planPlane.get(i).get("card").get(k);
				for(int j=0; j<planeList.size(); j++){//0:비행기 회사, 1:출발 위치, 2:시간, 3:도착위치, 4:시간, 5:경유, 6: 걸리는 시간, 7:걸리는 분
					for(int r=1; r<cardList.get(j).size()-1; r++) {
						pq.add(new cardpq(cardList.get(j).get(r).split(" ")[0], Integer.parseInt(cardList.get(j).get(r).split(" ")[1]),
							Integer.parseInt(cardList.get(j).get(cardList.get(j).size()-1)), j, k));
					}
				}
			}
			cardpq info = pq.peek();
			planeInfo.put("startPlace", planPlane.get(i).get("plane").get(info.planeDateK).get(info.planeListJ).get(1));
			planeInfo.put("startTime", planPlane.get(i).get("plane").get(info.planeDateK).get(info.planeListJ).get(2));
			planeInfo.put("endPlace", planPlane.get(i).get("plane").get(info.planeDateK).get(info.planeListJ).get(3));
			planeInfo.put("endTime", planPlane.get(i).get("plane").get(info.planeDateK).get(info.planeListJ).get(4));
			planeInfo.put("long", planPlane.get(i).get("plane").get(info.planeDateK).get(info.planeListJ).get(6) + planPlane.get(i).get("plane").get(info.planeDateK).get(info.planeListJ).get(6));
			planeInfo.put("endCompany", planPlane.get(i).get("plane").get(info.planeDateK).get(info.planeListJ).get(0));
			Map<String, Object> card = new HashMap<>();
			card.put("cardCompany", info.cardName);
			planeInfo.put("card", card);
			planeInfo.put("originPrice", info.originPirce);
			planeInfo.put("discountPrice", info.planePrice);
			planeInfo.put("discount", info.planePrice/info.originPirce*100);
		}
		return planeInfo;
	}

	public Map<String, Object> interparkHotel(RecommendDto recommendDto) throws JsonProcessingException {
		String cardName="신한카드";
		int cardIf=200000;
		int cardBenefitPercent=5;
		int cardTop=100000;
		String s = restTemplate.postForObject("http://127.0.0.1:8000/interparkHotel", recommendDto, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(s, new TypeReference<Map<String, Object>>() {});
		List<List<String>> hotelList = (List<List<String>>) dataMap.get("hotel");
		List<Map<String, String>> hotels = new ArrayList<>();
		Map<String,Object> result = new HashMap<>();
		PriorityQueue<IHotel> pq = new PriorityQueue<>((o1, o2) -> (o1.price-o2.price));
		for(List<String> hotelInfo : hotelList){
			Map<String, String> hotel = new HashMap<>();
			int n = hotelInfo.size();
			String name="";
			int price = 0;
			if(isInteger(hotelInfo.get(n-4))){
				for(int i=0; i<n-4; i++){
					name+= hotelInfo.get(i);
				}
				price = Integer.parseInt(hotelInfo.get(n-4));
			}else {
				for (int i = 0; i < n - 3; i++) {
					name += hotelInfo.get(i);
				}
				price = Integer.parseInt(hotelInfo.get(n-3));
			}
			IHotel iHotel = new IHotel(hotelInfo.get(n-2), price, name, hotelInfo.get(n-1));
			pq.add(iHotel);
		}
		IHotel pop = pq.peek();
		result.put("hotelName", pop.name);
		result.put("hotelUrl", pop.url);
		result.put("hotelImg", pop.img);
		result.put("hotelPrice", pop.price);
		return result;
	}

	public static boolean isInteger(String strValue) {
		try {
			Integer.parseInt(strValue);
			return true;
		} catch (NumberFormatException ex) {
			return false;
		}
	}
}
