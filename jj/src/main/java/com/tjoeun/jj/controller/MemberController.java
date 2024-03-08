package com.tjoeun.jj.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.jj.entity.Member;
import com.tjoeun.jj.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

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

	@PostMapping("/join")
	public HashMap<String, Object> join(@RequestBody Member member){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		
		Member checkEmail = ms.getMemberByEmail(member.getEmail());
		
		if(checkEmail != null) {
			result.put("message", "이미 가입된 이메일입니다.");
		}else {
			Member checkNickname = ms.getMemberByNickname(member.getNickname());
			
			if(checkNickname != null) {
				result.put("message", "이미 가입된 이메일입니다.");
			}else {
				ms.insertMember(member);
				result.put("message", "OK");
			}
		}
		
		return result;
	}
	
	@GetMapping("/logout")
	public HashMap<String, Object> logout(HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		HttpSession session = request.getSession();
		session.removeAttribute("loginUser");
		return result;
	}
	
	
	@PostMapping("/emailcheck")
	public HashMap<String, Object> emailcheck(@RequestParam("email") String email, Member member){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Member mdto = ms.getMemberByEmail(member.getEmail());
		if( mdto != null ) result.put("msg", "no");
		else result.put("msg", "yes");
		
		return result;
	}
	
	@PostMapping("/nickcheck")
	public HashMap<String, Object> nickcheck(@RequestParam("nickname") String nickname){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Member mdto = ms.getMemberByNick(nickname);
		if( mdto != null ) result.put("msg", "no");
		else result.put("msg", "yes");
		
		return result;
	}

	
	/*
	@Autowired
	ServletContext context;
	@PostMapping("/fileupload")
	public HashMap<String, Object> fileup(@RequestParam("image")  MultipartFile file){
		HashMap<String, Object> result = new HashMap<String, Object>();
		String path = context.getRealPath("/images");
		Calendar today = Calendar.getInstance();
		long dt = today.getTimeInMillis();
		String filename = file.getOriginalFilename();
		String fn1 = filename.substring(0, filename.indexOf(".") ); 
 		String fn2 = filename.substring(filename.indexOf(".") ); 
 		String uploadPath = path + "/" + fn1 + dt + fn2;		
 		try {
			file.transferTo( new File(uploadPath) );
			result.put("filename", fn1 + dt + fn2);
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		return result;
	}
	*/

}
