package com.d109.waffle.common.card;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExchangeValue {
	private static Map<String, double[]> exchangeValue = new HashMap<>(); // 1번이 트래블로그, 2번이 트래블월렛

	static {
		exchangeValue.put("USA", new double[] {0, 0});
		exchangeValue.put("Japan", new double[] {0, 0});
		exchangeValue.put("England", new double[] {0, 0.004});
		exchangeValue.put("Europe", new double[] {0, 0.025});
		exchangeValue.put("Thailand", new double[] {0, 0.019});
		exchangeValue.put("China", new double[] {0, 0.007});
		exchangeValue.put("Hongkong", new double[] {0, 0.008});
		exchangeValue.put("Singapore", new double[] {0, 0.007});
	}

	public static Map<String, double[]> getExchangeValue() {
		return exchangeValue;
	}
}
