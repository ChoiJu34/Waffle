package com.d109.chocobank.config;

import javax.print.Doc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket accountApi() {
		return new Docket(DocumentationType.SWAGGER_2)
			.groupName("Account API")
			.select()
			.apis(RequestHandlerSelectors.basePackage("com.d109.chocobank.api"))
			.paths(PathSelectors.ant("/account/**"))
			.build();
	}

	@Bean
	public Docket cardApi() {
		return new Docket(DocumentationType.SWAGGER_2)
			.groupName("Card API")
			.select()
			.apis(RequestHandlerSelectors.basePackage("com.d109.chocobank.api"))
			.paths(PathSelectors.ant("/card/**"))
			.build();
	}

	@Bean
	public Docket userApi() {
		return new Docket(DocumentationType.SWAGGER_2)
			.groupName("User API")
			.select()
			.apis(RequestHandlerSelectors.basePackage("com.d109.chocobank.api"))
			.paths(PathSelectors.ant("/user/**"))
			.build();
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
			.groupName("All API")
			.select()
			.apis(RequestHandlerSelectors.basePackage("com.d109.chocobank.api"))
			.paths(PathSelectors.any())
			.build();
	}
}
