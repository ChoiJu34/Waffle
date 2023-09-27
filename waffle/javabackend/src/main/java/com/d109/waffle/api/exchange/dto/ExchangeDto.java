package com.d109.waffle.api.exchange.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeDto {
		private int result;
		private String cur_unit;
		private String ttb;
		private String tts;
		private String deal_bas_r;
		private String bkpr;
		private String yy_efee_r;
		private String ten_dd_efee_r;
		private String kftc_bkpr;
		private String kftc_deal_bas_r;
		private String cur_nm;
}
