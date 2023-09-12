package com.d109.waffle.common.country;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CountryCard {
	private static Map<String, List<String>> countryCard = new HashMap<>();

	static {
		countryCard.put("Japan", new ArrayList<>(Arrays.asList("jcb")));
		countryCard.put("China", new ArrayList<>(Arrays.asList("unionpay")));
	}

	public static Map<String, List<String>> getCountryCard() {
		return countryCard;
	}
}
