package com.tjoeun.jj.security.filter;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.tjoeun.jj.dto.MemberDto;
import com.tjoeun.jj.security.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JwtCheckFilter extends OncePerRequestFilter{
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeaderStr = request.getHeader("Authorization");
	      try {
	         //Bearer accestoken...
	         String accessToken = authHeaderStr.substring(7);
	         Map<String, Object> claims = JwtUtil.validateToken(accessToken);
	         log.info("JWT claims: " + claims);
	         
	         String email = (String) claims.get("email");
	         String pwd = (String) claims.get("pwd");
	         String nickname = (String) claims.get("nickname");
	         String snsid = (String) claims.get("snsid");
	         String provider = (String) claims.get("provider");
	         String profileimg = (String) claims.get("profileimg");
	         String intro = (String) claims.get("intro");
	         String createdat = (String) claims.get("createdat");
	         String zipnum = (String) claims.get("zipnum");
	         String address1 = (String) claims.get("address1");
	         String address2 = (String) claims.get("address2");
	         String address3 = (String) claims.get("address3");
	         
	         List<String> roleNames = (List<String>) claims.get("roleNames");
	         MemberDto memberDTO = new MemberDto( email, pwd, nickname, snsid,
	               provider, profileimg, intro, roleNames, createdat, zipnum, address1, address2, address3);
	         log.info("-----------------------------------");
	         log.info(memberDTO);
	         log.info(memberDTO.getAuthorities()); // 권한 추출
	         
	         UsernamePasswordAuthenticationToken authenticationToken
	         = new UsernamePasswordAuthenticationToken(memberDTO, pwd , memberDTO.getAuthorities());
	         SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	         
	         filterChain.doFilter(request, response);
	      }catch(Exception e){
	         log.error("JWT Check Error..............");
	         log.error(e.getMessage());
	         Gson gson = new Gson();
	         String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
	         response.setContentType("application/json");
	         response.setStatus(401);
	         PrintWriter printWriter = response.getWriter();
	         printWriter.println(msg);
	         printWriter.close();
	      }
	      	
	}
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
		String path = request.getRequestURI();
		
		log.info("check uri..." + path);
		
		if(request.getMethod().equals("OPTION"))
			return true;
		
		if(path.startsWith("/images"))
			return true;
		
		if(path.startsWith("/api/members/refreshtoken"))
			return true;
		
		if(path.startsWith("/api/members/fileupload"))
			return true;
		
		if(path.startsWith("/api/members/loginlocal"))
			return true;
		
		if(path.startsWith("/api/members/kakaoLogin"))
			return true;
		
		if(path.startsWith("/api/members/join"))
			return true;
		
		return false;
	}
}
