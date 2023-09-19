package com.d109.chocobank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class ChocobankApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChocobankApplication.class, args);
	}
}
