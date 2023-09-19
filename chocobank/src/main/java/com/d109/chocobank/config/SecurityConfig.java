package com.d109.chocobank.config;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.d109.chocobank.api.user.repository.UserRepository;
import com.d109.chocobank.common.auth.Role;
import com.d109.chocobank.common.auth.filter.CustomJsonAuthenticationFilter;
import com.d109.chocobank.common.auth.filter.JwtAuthenticationProcessingFilter;
import com.d109.chocobank.common.auth.filter.OauthJsonAuthenticationFilter;
import com.d109.chocobank.common.auth.handler.LoginFailureHandler;
import com.d109.chocobank.common.auth.handler.LoginSuccessHandler;
import com.d109.chocobank.common.auth.handler.OauthFailureHandler;
import com.d109.chocobank.common.auth.handler.OauthSuccessHandler;
import com.d109.chocobank.common.auth.service.JwtService;
import com.d109.chocobank.common.auth.service.LoginService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final LoginService loginService;
	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.formLogin()
			.disable() // FormLogin 사용 X
			.httpBasic()
			.disable() // httpBasic 사용 X
			.cors()
			.configurationSource(corsConfigurationSource())
			.and()
			.csrf()
			.disable() // csrf 보안 사용 X
			.headers()
			.frameOptions()
			.disable()
			.and()

			// 세션 사용하지 않으므로 STATELESS로 설정
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)

			.and()

			//== URL별 권한 관리 옵션 ==//
			.authorizeRequests()

			// 아이콘, css, js 관련
			// 기본 페이지, css, image, js 하위 폴더에 있는 자료들은 모두 접근 가능
			.antMatchers("/**", "/css/**", "/images/**", "/js/**", "/favicon.ico", "/file/**")
			.permitAll()
			.antMatchers("/user/sign-up", "/user/validate-email", "/user/find-email")
			.permitAll()
			// .antMatchers("/search/getAllGroup")
			// .permitAll()
			// .antMatchers(HttpMethod.GET, "/search/{group}")
			// .permitAll()
			// .antMatchers("/fan/sign-up", "/fan/email-duplicate-check", "/fan/nickname-duplicate-check", "/artist/sign-up")
			// .permitAll() // 회원가입 접근 가능	// TODO: 아티스트 회원가입은 막던지 인증을 거치던지 수정해야 함
			// .antMatchers("/find/**")
			// .permitAll()	// 아이디(이메일), 비밀번호 찾기 접근 가능
			.antMatchers("/admin").hasRole(Role.ADMIN.toString())	// 회원 관리 기능은 admin만 접근 가능
			.anyRequest()
			.authenticated() // 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
			;


		http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
		http.addFilterBefore(oauthJsonAuthenticaitonFilter(), CustomJsonAuthenticationFilter.class);
		http.addFilterBefore(jwtAuthenticationProcessingFilter(), OauthJsonAuthenticationFilter.class);

		return http.build();
	}


	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.addAllowedMethod("*");
		corsConfiguration.addAllowedMethod(HttpMethod.OPTIONS);
		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.addAllowedOrigin("*");
		corsConfiguration.setMaxAge(7200L);
		corsConfiguration.addExposedHeader("Authorization");
		corsConfiguration.addExposedHeader("Authorization-refresh");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder());
		provider.setUserDetailsService(loginService);
		return new ProviderManager(provider);
	}

	@Bean
	public LoginSuccessHandler loginSuccessHandler() {
		return new LoginSuccessHandler(jwtService, userRepository);
	}

	@Bean
	public LoginFailureHandler loginFailureHandler() {
		return new LoginFailureHandler();
	}

	@Bean OauthSuccessHandler oauthSuccessHandler() {
		return new OauthSuccessHandler(jwtService, userRepository);
	}

	@Bean
	public OauthFailureHandler oauthFailureHandler() {
		return new OauthFailureHandler();
	}


	@Bean
	public CustomJsonAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
		CustomJsonAuthenticationFilter customJsonUsernamePasswordLoginFilter
			= new CustomJsonAuthenticationFilter(objectMapper);
		customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
		customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
		customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
		return customJsonUsernamePasswordLoginFilter;
	}

	@Bean
	public OauthJsonAuthenticationFilter oauthJsonAuthenticaitonFilter() {
		OauthJsonAuthenticationFilter oauthJsonAuthenticationFilter
			= new OauthJsonAuthenticationFilter(objectMapper);
		oauthJsonAuthenticationFilter.setAuthenticationManager(authenticationManager());
		oauthJsonAuthenticationFilter.setAuthenticationSuccessHandler(oauthSuccessHandler());
		oauthJsonAuthenticationFilter.setAuthenticationFailureHandler(oauthFailureHandler());
		return oauthJsonAuthenticationFilter;
	}

	@Bean
	public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
		JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService,
			userRepository);
		return jwtAuthenticationFilter;
	}
}
