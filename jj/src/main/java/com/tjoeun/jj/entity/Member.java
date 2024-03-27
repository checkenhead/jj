package com.tjoeun.jj.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

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
@ToString(exclude="memberRoleList")
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
	
	@ElementCollection(fetch=FetchType.LAZY)
	@Builder.Default // Default : new ArrayList<>()  비어있는 리스트로 객체 저장
	private List<MemberRole> memberRoleList = new ArrayList<>();
	
	public Member addRole(MemberRole memberRole) {
		memberRoleList.add(memberRole);
		return this;
	}
	
	public Member clearRole() {
		memberRoleList.clear();
		return this;
	}
	
	public Member changeNickname(String nickname) {
		this.nickname = nickname;
		return this;
	}
	
	public Member changePwd(String pwd) {
		this.pwd = pwd;
		return this;
	}
	
	public Member changeSnsid(String snsid) {
		this.snsid = snsid;
		return this;
	}
	
	public Member changeProfileimg(String profileimg) {
		this.profileimg = profileimg;
		return this;
	}
	
	public Member changeIntro(String intro) {
		this.intro = intro;
		return this;
	}
	
	public Member changeProvider(String provider) {
		this.provider = provider;
		return this;
	}
	
	public Member changeZipnum(String zipnum) {
		this.zipnum = zipnum;
		return this;
	}
	
	public Member changeAddress1(String address1) {
		this.address1 = address1;
		return this;
	}
	
	public Member changeAddress2(String address2) {
		this.address2 = address2;
		return this;
	}
	
	public Member changeAddress3(String address3) {
		this.address3 = address3;
		return this;
	}
}
