package com.tjoeun.jj.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.MemberRepository;
import com.tjoeun.jj.entity.Member;

@Service
@Transactional
public class MemberService {

	@Autowired
	MemberRepository mr;
	
	public Member getMemberByEmail(String email) {
		Optional<Member> member = mr.findById(email);
		
		return member.isPresent() ? member.get() : null;
	}


	public Member getMemberByNickname(String nickname) {
		Optional<Member> member = mr.findByNickname(nickname);
		
		return member.isPresent() ? member.get() : null;
	}

	public void insertMember(Member member) {
		mr.save(member);
	}

	public Member getMemberByNick(String nickname) {
		
		Optional<Member> member = mr.findById(nickname);
		
		return member.isPresent() ? member.get() : null;
	}
	
}
