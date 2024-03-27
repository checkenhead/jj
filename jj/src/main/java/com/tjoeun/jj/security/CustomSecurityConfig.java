package com.tjoeun.jj.security;



import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.tjoeun.jj.security.filter.JwtCheckFilter;
import com.tjoeun.jj.security.handler.APILoginFailHandler;
import com.tjoeun.jj.security.handler.APILoginSuccessHandler;
import com.tjoeun.jj.security.handler.CustomAccessDeniedHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Configuration // 이 클래스를 스프링 컨테이너로 사용하기 위한 어노테이션
@Log4j2 // lombok의 log 출력 기능을 사용하기 위한 어노테이션
@RequiredArgsConstructor
public class CustomSecurityConfig {
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		log.info("-------------------------security config-------------------------");
		http.cors(httpSecurityCorsConfigurer -> {
			httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
			});
		
		// CSRF : 리퀘스트 위조 방지 - REST API 서버에서 사용하기엔 일이 복잡해지고 현재는 잘 사용하지 않는 방향
		// CSRF의 취약점은 공격자가 "사용자가 의도하지 않는 요청"을 수행하게 하는 취약점입니다.
		// 즉 공격자는 사용자가 가지고 있는 권한 범위 내에세 악의적인 행위를 할 수 있습니다.
		// 일반적으로 해당 권한은 쿠기와 세션을 이용하여 인증을 하고 있기때문에 발생합니다.
		// 하지만 REST API를 이용한 서버라면 session 기반 인증과는 다르게 stateless하기 때문에 서버에 인증 정보를 보관하지 않습니다.
		// 일반적으로 JWT같은 토큰을 사용하여 인증하기 때문에 해당 토큰을 Cookie에 저장하지 않는다면 CSRF 취약점에 대해서는
		// 기본적으로 안전하다고 말할 수 있습니다.
		http.csrf(config -> config.disable());
		
		// 세션에 상대저장을 하지 않을 환결 설정
		http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.formLogin(config -> {
			config.loginPage("/api/members/loginlocal"); // loadUserByUsername 자동 호출
			config.successHandler(new APILoginSuccessHandler());
			config.failureHandler(new APILoginFailHandler());
		});
		
		http.addFilterBefore(new JwtCheckFilter(), UsernamePasswordAuthenticationFilter.class); // JWT 체크
		
		http.exceptionHandling(config -> {
			config.accessDeniedHandler(new CustomAccessDeniedHandler());
			});
		
		return http.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	// CORS(Cross Origin Resource Sharing) : cross-origin HTTP 요청들을 제한합니다.
	// cross-origin 요청을 하기위햐서는 서버의 동의가 필요합니다.
	// 서버가 동의하면 브라우저에서는 요청을 수락하고 동의하지 않는다면 브라우저는 거절합니다.
	// 이러한 허락을 구하고 거절하는 메커니즘을 HTTP-Header를 이용해 가능한데 이를 CORS라고 합니다.
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		
		return source;
	}
	
}
