package com.d109.waffle.api.checklist.dto;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class ChecklistDto {
	int checklistListId;
	int price;
	String currency;
	String content;
	int order;
}
