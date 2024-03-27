package com.tjoeun.jj.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class MemberDto extends User {
	public MemberDto(String username, String password, String nickname, String provider, String snsid, String profileimg, String intro, List<String> roleNames) {

		super(username, password,
				roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()));
		this.email = username;
		this.pwd = password;
		this.nickname = nickname;
		this.provider = provider;
		this.snsid = snsid;
		this.profileimg = profileimg;
		this.intro = intro;
		this.roleNames = roleNames;
	}

	private String email;
	private String pwd;
	private String nickname;
	private String provider;
	private String snsid;
	private String profileimg;
	private String intro;
	private List<String> roleNames = new ArrayList<>();

	// JWT 토큰 생성 시에 그 안에 넣을 개인 정보들을 Map 형식으로 구성
	// 암호화 JWT 생성 시에 그 Map을 암호화합니다.

	public Map<String, Object> getClaims() {
		Map<String, Object> dataMap = new HashMap<>();

		dataMap.put("email", email);
		dataMap.put("pwd", pwd);
		dataMap.put("nickname", nickname);
		dataMap.put("provider", provider);
		dataMap.put("snsid", snsid);
		dataMap.put("profileimg", profileimg);
		dataMap.put("intro", intro);
		dataMap.put("roleNames", roleNames);

		return dataMap;
	}
}
