package com.tjoeun.jj.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
//@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "memberRoleList")
public class Member {
	@Id
	private String email;
	private String pwd;
	private String nickname;
	private String profileimg;
	private String intro;
	private String snsid;
	private String provider;
	@CreationTimestamp
	private Timestamp createdat;
	private String zipnum;
	private String address1;
	private String address2;
	private String address3;

	@ElementCollection(fetch = FetchType.LAZY)
	@Builder.Default // Default : new ArrayList<>() 비어있는 리스트로 객체 저장
	private List<MemberRole> memberRoleList = new ArrayList<>();

	public void addRole(MemberRole memberRole) {
		memberRoleList.add(memberRole);
	}

	public void clearRole() {
		memberRoleList.clear();
	}

	public void changeNickname(String nickname) {
		this.nickname = nickname;
	}

	public void changePwd(String pwd) {
		this.pwd = pwd;
	}

	public void changeSnsid(String snsid) {
		this.snsid = snsid;
	}

	public void changeProfileimg(String profileimg) {
		this.profileimg = profileimg;
	}

	public void changeIntro(String intro) {
		this.intro = intro;
	}

	public void changeProvider(String provider) {
		this.provider = provider;
	}

	public void changeZipnum(String zipnum) {
		this.zipnum = zipnum;
	}

	public void changeAddress1(String address1) {
		this.address1 = address1;
	}

	public void changeAddress2(String address2) {
		this.address2 = address2;
	}

	public void changeAddress3(String address3) {
		this.address3 = address3;
	}
}
