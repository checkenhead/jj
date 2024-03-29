package com.tjoeun.jj.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.tjoeun.jj.entity.Member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto extends User {
	public MemberDto(String username, String password, String nickname, String provider, String snsid,
			String profileimg, String intro, List<String> roleNames, String createdat, String zipnum, String address1,
			String address2, String address3) {

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
		this.createdat = createdat;
		this.zipnum = zipnum;
		this.address1 = address1;
		this.address2 = address2;
		this.address3 = address3;
	}

	public MemberDto(Member member) {
		super(member.getEmail(), member.getPwd(), member.getMemberRoleList().stream()
				.map(memberRole -> new SimpleGrantedAuthority("" + memberRole.name())).collect(Collectors.toList()));

		this.email = member.getEmail();
		this.pwd = member.getPwd();
		this.nickname = member.getNickname();
		this.provider = member.getProvider();
		this.snsid = member.getSnsid();
		this.profileimg = member.getProfileimg();
		this.intro = member.getIntro();
		this.roleNames = member.getMemberRoleList().stream().map(memberRole -> memberRole.name())
				.collect(Collectors.toList());
		this.createdat = member.getCreatedat().toString();
		this.zipnum = member.getZipnum();
		this.address1 = member.getAddress1();
		this.address2 = member.getAddress2();
		this.address3 = member.getAddress3();
	}

	private String email;
	private String pwd;
	private String nickname;
	private String provider;
	private String snsid;
	private String profileimg;
	private String intro;
	private List<String> roleNames = new ArrayList<>();

	private String createdat;
	private String zipnum;
	private String address1;
	private String address2;
	private String address3;

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
		dataMap.put("createdat", createdat);
		dataMap.put("zipnum", zipnum);
		dataMap.put("address1", address1);
		dataMap.put("address2", address2);
		dataMap.put("address3", address3);

		return dataMap;
	}

}
