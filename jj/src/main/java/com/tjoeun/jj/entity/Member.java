package com.tjoeun.jj.entity;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {
	@Id
	private String email;
	private String nickname;
	private String pwd;
	private String profileimg;
	private String intro;
	private String snsid;
	private String provider;
	@CreationTimestamp
	private String createdat;
	private String zipnum;
	private String address1;
	private String address2;
	private String address3;
}
