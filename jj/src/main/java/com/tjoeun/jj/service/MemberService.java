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
	
}
