package com.tjoeun.jj.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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

import com.tjoeun.jj.dto.UserInfoDto;
import com.tjoeun.jj.entity.Follow;
import com.tjoeun.jj.entity.Member;
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
			result.put("message", "email");

		} else {
			Member CheckNickname = ms.getMemberByNickname(member.getNickname());

			if (CheckNickname != null) {
				result.put("message", "nickname");

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
		Member loginUser = ((Member) request.getSession().getAttribute("loginUser"));
		HashMap<String, Object> result = new HashMap<String, Object>();

		Member CheckNickname = ms.getMemberByNickname(member.getNickname());
		// 닉네임이 중복된 경우
		if (CheckNickname != null && !member.getNickname().equals(loginUser.getNickname())) {
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
			result.put("loginUser", mdto);
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
	@PostMapping("/getallmembersnickname")
	public HashMap<String, Object> getAllMembersNickname(Member member){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("members", ms.getAllMembers());
		return result;
	}

	@PostMapping("/getUserInfo")
	public HashMap<String, Object> getUserInfo(@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		Member mdto = ms.getMemberByNickname(nickname);
		Integer count = fs.getFeedCountByNickname(nickname);

		result.put("message", "OK");
		mdto.setPwd(null);
		result.put("user", mdto);
		result.put("followers", ms.getFollowersByNickname(nickname));
		result.put("followings", ms.getFollowingsByNickname(nickname));
		result.put("count", count);
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
	public HashMap<String, Object> updateProfile(@RequestParam("newpwd") String newpwd,
			@RequestParam("nickname") String nickname) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		Member mdto = ms.getMemberByNickname(nickname);
		mdto.setPwd(newpwd);
		// 1. 받아온 member로 insert
		ms.insertMember(mdto);
		// 2. result에 메세지 담아서 return
		result.put("message", "ok");
		return result;
	}

	@PostMapping("/togglefollow")
	public HashMap<String, Object> togglefollow(@RequestBody Follow follow) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		ms.toggleFollow(follow);

		result.put("followers", ms.getFollowersByNickname(follow.getFollower()));
		result.put("followings", ms.getFollowingsByNickname(follow.getFollower()));

		return result;
	}

	@PostMapping("/getfollow")
	public HashMap<String, Object> getFollow(@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("followers", ms.getFollowersByNickname(nickname));
		result.put("followings", ms.getFollowingsByNickname(nickname));

		return result;
	}

//	@PostMapping("/getMembersByKeyword")
//	public HashMap<String, Object> getMembersByKeyword(@RequestParam("keyword") String keyword) {
//		HashMap<String, Object> result = new HashMap<String, Object>();
//
//		result.put("users", ms.getMembersByKeyword(keyword));
//		
//		return result;
//	}

	@PostMapping("/getUserInfoByKeyword")
	public HashMap<String, Object> getUserInfoByKeyword(@RequestParam("keyword") String keyword) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<UserInfoDto> users = new ArrayList<UserInfoDto>();

		List<Member> list = ms.getMembersByKeyword(keyword);
		for (Member mdto : list) {
			UserInfoDto udto = new UserInfoDto();
			udto.setEmail(mdto.getEmail());
			udto.setNickname(mdto.getNickname());
			udto.setProfileimg(mdto.getProfileimg());
			udto.setIntro(mdto.getIntro());
			udto.setFollowers(ms.getFollowersByNickname(mdto.getNickname()));
			udto.setFollowings(ms.getFollowingsByNickname(mdto.getNickname()));
			udto.setCount(fs.getFeedCountByNickname(mdto.getNickname()));
			users.add(udto);
		}
		result.put("users", users);
		return result;
	}

}
