package com.tjoeun.jj.security.service;


import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.MemberRepository;
import com.tjoeun.jj.dto.MemberDto;
import com.tjoeun.jj.entity.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
	private final MemberRepository mr;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//loadUserByUsername 역할은 getMember 메서드의 역할
		// UserDetails는 MemberDto가 상속한 User클래스의 부모 클래스, MemberDto는 UserDetails의 손자
		
		// 로그인 요청에 전달된 이메일은 username 매개변수에 전달됨
		log.info("-------------------------loadUserByUsername-------------------------" + username);
		
		Optional<Member> optmember = mr.getWithRolesById(username);
		Member member = null;
		
		if(optmember.isEmpty()){
//			System.out.println("USER NOT FOUND");
			throw new UsernameNotFoundException("Not Found");
		}else {
			member = optmember.get();
		}
		
		MemberDto memberdto = new MemberDto(
				member.getEmail(),
				member.getPwd(),
				member.getNickname(),
				member.getProvider(),
				member.getSnsid(),
				member.getProfileimg(),
				member.getIntro(),
				member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList())
				);
				
		log.info(memberdto);
		
		return memberdto;
	}
}
