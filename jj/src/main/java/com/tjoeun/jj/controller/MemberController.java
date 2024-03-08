package com.tjoeun.jj.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.jj.entity.Member;
import com.tjoeun.jj.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/members")
public class MemberController {
	
	@Autowired
	MemberService ms;
	
	@PostMapping("/loginlocal")
	public HashMap<String, Object> loginLocal(@RequestBody Member member, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Member mdto = ms.getMemberByEmail(member.getEmail());
		
		// email이 존재하지 않는 경우
		if(mdto == null) {
			result.put("message", "이메일이 존재하지 않습니다.");
			
		// pwd가 일치하지 않는 경우
		}else if(!mdto.getPwd().equals(member.getPwd())) {
			result.put("message", "비밀번호가 틀립니다.");
		
		// sns계정이 비정상적으로 로그인하는 경우
		}else if(!mdto.getProvider().equals("jj")) {
			result.put("message", "SNS로 로그인해주세요.");
			
		// 정상 로그인
		}else {
			result.put("message", "OK");
			result.put("loginUser", mdto);
			
			// session에 저장
			request.getSession().setAttribute("loginUser", mdto);
		}
		
		return result;
	}
	
}
