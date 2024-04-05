package com.tjoeun.jj.security.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.google.gson.Gson;
import com.tjoeun.jj.dto.MemberDto;
import com.tjoeun.jj.security.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class APILoginSuccessHandler implements AuthenticationSuccessHandler{
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// getClaim 사용자 정보가 담긴 Map 추출, JWT 데이터를 추가하여 클라인트로 전송
		MemberDto memberdto = (MemberDto)authentication.getPrincipal();
		Map<String, Object> claims = memberdto.getClaims();
		
		String accessToken = JwtUtil.generateToken(claims, 60 * 24);
		String refreshToken = JwtUtil.generateToken(claims, 60 * 24 * 30);
		
		claims.put("accessToken", accessToken);
		claims.put("refreshToken", refreshToken);
		
		// 완성된 객체를 Json 형식으로 변경하고 client로 전송
		Gson gson = new Gson();
		String jsonStr = gson.toJson(claims);
		response.setContentType("application/json");
		PrintWriter printWriter = response.getWriter();
		printWriter.println(jsonStr);
		printWriter.close();
	}
}
