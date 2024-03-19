package com.tjoeun.jj.dto;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
	
	@Id
	private String email;
	private String nickname;
	private String pwd;
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
	private Integer count;
	private List<String> followers;
	private List<String> followings;

}
