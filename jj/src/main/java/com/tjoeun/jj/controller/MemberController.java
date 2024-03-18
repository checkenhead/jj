package com.tjoeun.jj.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD
import com.tjoeun.jj.entity.Feedimg;
=======
import com.tjoeun.jj.entity.Follow;
>>>>>>> branch 'main' of https://github.com/checkenhead/jj
import com.tjoeun.jj.entity.Member;
import com.tjoeun.jj.entity.SummaryView;
import com.tjoeun.jj.service.FeedService;
import com.tjoeun.jj.service.MemberService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	@Autowired
	MemberService ms;

	@Autowired
	FeedService fs;
	
	@PostMapping("/loginlocal")
	public HashMap<String, Object> loginLocal(@RequestBody Member member, HttpServletRequest request) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		Member mdto = ms.getMemberByEmail(member.getEmail());

		// email이 존재하지 않는 경우
		if (mdto == null) {
			result.put("message", "이메일이 존재하지 않습니다.");

			// pwd가 일치하지 않는 경우
		} else if (!mdto.getPwd().equals(member.getPwd())) {
			result.put("message", "비밀번호가 틀립니다.");

			// sns계정이 비정상적으로 로그인하는 경우
		} else if (mdto.getProvider() != null) {
			result.put("message", "SNS로 로그인해주세요.");

			// 정상 로그인
		} else {
			mdto.setPwd(null);
			result.put("message", "OK");
			result.put("loginUser", mdto);

			// session에 저장
			request.getSession().setAttribute("loginUser", mdto);
		}

		return result;
	}

	@GetMapping("/logout")
	public HashMap<String, Object> logout(HttpServletRequest request) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		HttpSession session = request.getSession();
		session.removeAttribute("loginUser");
		return result;
	}

	@PostMapping("/join")
	public HashMap<String, Object> join(@RequestBody Member member) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		Member CheckEmail = ms.getMemberByEmail(member.getEmail());

		if (CheckEmail != null) {
			result.put("message", "nickname");

		} else {
			Member CheckNickname = ms.getMemberByNickname(member.getNickname());

			if (CheckNickname != null) {
				result.put("message", "email");

			} else {
				ms.insertMember(member);
				result.put("message", "ok");
			}
		}

		return result;
	}

	@Autowired
	ServletContext context;

	@PostMapping("/fileupload")
	public HashMap<String, Object> fileup(@RequestParam("image") MultipartFile file) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		String path = context.getRealPath("/images");
		Calendar today = Calendar.getInstance();
		long dt = today.getTimeInMillis();
		String filename = file.getOriginalFilename();
		String fn1 = filename.substring(0, filename.indexOf("."));
		String fn2 = filename.substring(filename.indexOf("."));
		String uploadPath = path + "/" + fn1 + dt + fn2;
		try {
			file.transferTo(new File(uploadPath));
			result.put("filename", fn1 + dt + fn2);
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	@PostMapping("/updateProfile")
	public HashMap<String, Object> updateProfile(@RequestBody Member member, HttpServletRequest request) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		Member CheckNickname = ms.getMemberByNickname(member.getNickname());
		// 닉네임이 중복된 경우
		if (CheckNickname != null) {
			result.put("message", "no");
		} else {
			// 정상 회원정보수정완료
			Member CheckEmail = ms.getMemberByEmail(member.getEmail());
			member.setPwd(CheckEmail.getPwd());
			ms.insertMember(member);

			Member mdto = ms.insertMember(member);

			mdto.setPwd(null);
			request.getSession().setAttribute("loginUser", mdto);

			result.put("message", "ok");
		}

		return result;
	}

	@PostMapping("/getmemberbynickname")
	public HashMap<String, Object> getMemberByNickname(@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		Member mdto = ms.getMemberByNickname(nickname);

		if (mdto == null) {
			result.put("message", "user not found");
		} else {
			result.put("message", "OK");

			mdto.setPwd(null);
			result.put("user", mdto);
		}
		return result;
	}
	
	@PostMapping("/getUserInfo")
	public HashMap<String, Object> getUserInfo(@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Member mdto = ms.getMemberByNickname(nickname);
		
		
		if (mdto == null) {
			result.put("message", "data not found");
		} else {
			result.put("message", "OK");
			
			mdto.setPwd(null);
			result.put("user", mdto);
		}
		return result;
	}

	@PostMapping("/passwordCheck")
	public HashMap<String, Object> passwordCheck(@RequestParam("curpwd") String curpwd,
			@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		Member mdto = ms.getMemberByNickname(nickname);
		if (mdto == null) {
			result.put("message", "Password is different");
		} else if (!mdto.getPwd().equals(curpwd)) {
			result.put("message", "비밀번호가 틀립니다.");
		} else {
			result.put("message", "OK");
			mdto.setPwd(null);
		}

		return result;
	}

	@PostMapping("/passwordUpdate")
	public HashMap<String, Object> updateProfile(@RequestParam("newpwd") String newpwd, @RequestParam("nickname") String nickname) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		Member mdto = ms.getMemberByNickname(nickname);
		mdto.setPwd(newpwd);
		// 1. 받아온 member로 insert
		ms.insertMember(mdto);
		// 2. result에 메세지 담아서 return
		result.put("message", "ok");
		return result;
	}
	
	@PostMapping("togglefollow")
	public void togglefollow(@RequestBody Follow follow) {
		ms.toggleFollow(follow);
	}
}
