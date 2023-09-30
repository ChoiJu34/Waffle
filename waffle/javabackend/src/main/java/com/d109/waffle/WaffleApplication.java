package com.d109.waffle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class WaffleApplication {

	public static void main(String[] args) {
		SpringApplication.run(WaffleApplication.class, args);
	}

}
