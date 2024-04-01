package com.tjoeun.jj.controller;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.tjoeun.jj.dto.KakaoProfile;
import com.tjoeun.jj.dto.KakaoProfile.KakaoAccount;
import com.tjoeun.jj.dto.KakaoProfile.KakaoAccount.Profile;
import com.tjoeun.jj.dto.MemberDto;
import com.tjoeun.jj.dto.OAuthToken;
import com.tjoeun.jj.dto.UserInfoDto;
import com.tjoeun.jj.entity.Follow;
import com.tjoeun.jj.entity.Member;
import com.tjoeun.jj.entity.MemberRole;
import com.tjoeun.jj.security.util.CustomJwtException;
import com.tjoeun.jj.security.util.JwtUtil;
import com.tjoeun.jj.service.FeedService;
import com.tjoeun.jj.service.MemberService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/members")
public class MemberController {

	@Autowired
	MemberService ms;

	@Autowired
	FeedService fs;

//	@PostMapping("/loginlocal")
//	public HashMap<String, Object> loginLocal(@RequestBody Member member, HttpServletRequest request) {
//		HashMap<String, Object> result = new HashMap<String, Object>();
//
//		Member mdto = ms.getMemberByEmail(member.getEmail());
//
//		// email이 존재하지 않는 경우
//		if (mdto == null) {
//			result.put("message", "이메일이 존재하지 않습니다.");
//
//			// pwd가 일치하지 않는 경우
//		} else if (!mdto.getPwd().equals(member.getPwd())) {
//			result.put("message", "비밀번호가 틀립니다.");
//
//			// sns계정이 비정상적으로 로그인하는 경우
//		} else if (mdto.getProvider() != null) {
//			result.put("message", "SNS로 로그인해주세요.");
//
//			// 정상 로그인
//		} else {
//			mdto.changePwd(null);
//			result.put("message", "OK");
//			result.put("loginUser", mdto);
//
//			// session에 저장
//			request.getSession().setAttribute("loginUser", mdto);
//		}
//
//		return result;
//	}
	

//	@GetMapping("/logout")
//	public HashMap<String, Object> logout(HttpServletRequest request) {
//		HashMap<String, Object> result = new HashMap<String, Object>();
//		HttpSession session = request.getSession();
//		session.removeAttribute("loginUser");
//		return result;
//	}

	@RequestMapping("/kakaoLogin")
	public void kakaoLogin(
			@RequestParam("code") String code,
			@RequestParam("apikey") String apikey,
			@RequestParam("redirectUri") String redirectUri,
			HttpServletRequest request, 
			HttpServletResponse response) 
					throws UnsupportedEncodingException, IOException {
		
		String endpoint = "https://kauth.kakao.com/oauth/token";
		URL url = new URL(endpoint); // import java.net.URL;
		String bodyData = "grant_type=authorization_code&";
		bodyData += "client_id="+ apikey +"&";
		bodyData += "redirect_uri="+ redirectUri + "&";
		bodyData += "code=" + code;

		
		HttpURLConnection conn = (HttpURLConnection) url.openConnection(); // import java.net.HttpURLConnection;
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		conn.setDoOutput(true);
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "UTF-8"));
		bw.write(bodyData);
		bw.flush();
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
		String input = "";
		StringBuilder sb = new StringBuilder(); // 조각난 String 을 조립하기위한 객체
		while ((input = br.readLine()) != null) {
			sb.append(input);
			//System.out.println(input); // 수신된 토큰을 콘솔에 출력합니다
		}
		Gson gson = new Gson();
		OAuthToken oAuthToken = gson.fromJson(sb.toString(), OAuthToken.class);
		String endpoint2 = "https://kapi.kakao.com/v2/user/me";
		URL url2 = new URL(endpoint2);
		
		HttpsURLConnection conn2 = (HttpsURLConnection) url2.openConnection();
		conn2.setRequestProperty("Authorization", "Bearer " + oAuthToken.getAccess_token());
		conn2.setDoOutput(true);
		BufferedReader br2 = new BufferedReader(new InputStreamReader(conn2.getInputStream(), "UTF-8"));
		String input2 = "";
		StringBuilder sb2 = new StringBuilder();
		while ((input2 = br2.readLine()) != null) {
			sb2.append(input2);
			//System.out.println(input2);
		}
		Gson gson2 = new Gson();
		KakaoProfile kakaoProfile = gson2.fromJson(sb2.toString(), KakaoProfile.class);
		KakaoAccount ac = kakaoProfile.getAccount();
		Profile pf = ac.getProfile();
				
		MemberDto member = ms.getMemberByEmail( ac.getEmail() );
		if( member == null) {
			Member member1 = Member.builder()
					.email(ac.getEmail())
					.pwd("kakao")
					.snsid(kakaoProfile.getId())
					.profileimg(pf.getProfile_image_url())
					.nickname(pf.getNickname())
					.provider("Kakao")
					.build();
			member1.addRole(MemberRole.USER);
			ms.insertMember(member1);
			member = ms.getMemberByEmail( ac.getEmail() );
		}
		Map<String, Object> claims = member.getClaims();
		String accessToken = JwtUtil.generateToken(claims, 1);
		String refreshToken = JwtUtil.generateToken(claims,60*24);
		claims.put("accessToken", accessToken);
		claims.put("refreshToken", refreshToken);
		
		// 완성된 객체를 Json 형식으로 변경하고 client 로 전송
		gson = new Gson();
		String jsonStr = gson.toJson(claims);
		log.info("jsonStr" + jsonStr);
		response.setContentType("application/json");
		
		response.setCharacterEncoding("UTF-8");
		PrintWriter printWriter = response.getWriter();
		printWriter.println(jsonStr);
		printWriter.close();
	}
	
	@PostMapping("/join")
	public HashMap<String, Object> join(@RequestBody Member member) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		MemberDto CheckEmail = ms.getMemberByEmail(member.getEmail());

		if (CheckEmail != null) {
			result.put("message", "email");

		} else {
			MemberDto CheckNickname = ms.getMemberByNickname(member.getNickname());

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

	@PostMapping("/updateprofile")
	public HashMap<String, Object> updateProfile(@RequestBody Member member, @RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		MemberDto CheckNickname = ms.getMemberByNickname(member.getNickname());
		// 닉네임이 중복된 경우
		if (CheckNickname != null && !member.getNickname().equals(nickname)) {
			result.put("message", "no");
		} else {
			// 정상 회원정보수정완료
			MemberDto mdto = ms.getMemberByEmail(member.getEmail());
//			mdto.setPwd(mdto.getPwd());

			result.put("message", "ok");
			result.put("loginUser", ms.updateMember(mdto));
		}

		return result;
	}

	@PostMapping("/getmemberbynickname")
	public HashMap<String, Object> getMemberByNickname(@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		MemberDto mdto = ms.getMemberByNickname(nickname);

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
	public HashMap<String, Object> getAllMembersNickname(Member member) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("members", ms.getAllMembers());
		return result;
	}

	@PostMapping("/getUserInfo")
	public HashMap<String, Object> getUserInfo(@RequestParam("nickname") String nickname) {
		
		System.out.println("nickname : " + nickname);
		
		HashMap<String, Object> result = new HashMap<String, Object>();

		MemberDto mdto = ms.getMemberByNickname(nickname);
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

		MemberDto mdto = ms.getMemberByNickname(nickname);
			result.put("message", ms.passwordCheck(mdto.getPassword(), curpwd)? "OK" : "비밀번호가 틀립니다.");
			


		return result;
	}

	@PostMapping("/passwordUpdate")
	public HashMap<String, Object> updateProfile(@RequestParam("newpwd") String newpwd,
			@RequestParam("nickname") String nickname) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		MemberDto mdto = ms.getMemberByNickname(nickname);
		mdto.setPwd(newpwd);
		// 1. 받아온 member로 insert
			ms.updatePwdOnly(mdto); 
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
		
		System.out.println("followers : " + result.get("followers"));
		System.out.println("followings : " + result.get("followings"));
		
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

	@PostMapping("/getrecommendpeoplebynickname")
	public HashMap<String, Object> getRecommnedPeopleByNickname(@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();
			
		List<String> list = ms.getRecommendPeopleByNickname(nickname);
		
		result.put("recommendmembers", list);
		
		return result;
	}
	
	@GetMapping("/refreshtoken/{refreshToken}")
	public Map<String, Object> refreshToken(@RequestHeader("Authorization") String authHeader,
			@PathVariable("refreshToken") String refreshToken) throws CustomJwtException {

		if (refreshToken == null) {
			throw new CustomJwtException("NULL_REFRESH");
		}
		if (authHeader == null || authHeader.length() < 7) {
			throw new CustomJwtException("INVALID_STRING");
		}
		String accessToken = authHeader.substring(7);

		// Access 토큰이 만료되지 않았다면
		if (checkExpiredToken(accessToken) == false) {
			return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
		}

		// Refresh토큰 검증
		Map<String, Object> claims = JwtUtil.validateToken(refreshToken);
		log.info("refresh ... claims: " + claims);
		String newAccessToken = JwtUtil.generateToken(claims, 10);
		String newRefreshToken = checkTime((Integer) claims.get("exp")) == true ? JwtUtil.generateToken(claims, 60 * 24)
				: refreshToken;
		return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
	}

	// 시간이 1시간 미만으로 남았다면
	private boolean checkTime(Integer exp) {
		// JWT exp를 날짜로 변환
		java.util.Date expDate = new java.util.Date((long) exp * (1000));
		// 현재 시간과의 차이 계산 - 밀리세컨즈
		long gap = expDate.getTime() - System.currentTimeMillis();
		// 분단위 계산
		long leftMin = gap / (1000 * 60);
		// 1시간도 안남았는지..
		return leftMin < 60;
	}

	private boolean checkExpiredToken(String token) {
		try {
			JwtUtil.validateToken(token);
		} catch (CustomJwtException ex) {
			if (ex.getMessage().equals("Expired")) {
				return true;
			}
		}
		return false;
	}
}
