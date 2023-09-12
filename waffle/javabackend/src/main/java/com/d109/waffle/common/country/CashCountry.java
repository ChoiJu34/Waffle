package com.d109.waffle.common.country;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class CashCountry {
	private static List<String> cashCountry = new ArrayList<>();

	static {
		cashCountry.add("Thailand");
	}

	public static List<String>  getCashCountry() {
		return cashCountry;
	}
}
