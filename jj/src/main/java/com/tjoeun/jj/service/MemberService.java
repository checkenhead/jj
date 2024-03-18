package com.tjoeun.jj.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.FollowRepository;
import com.tjoeun.jj.dao.MemberRepository;
import com.tjoeun.jj.entity.Follow;
import com.tjoeun.jj.entity.Member;

@Service
@Transactional
public class MemberService {

	@Autowired
	MemberRepository mr;
	
	@Autowired
	FollowRepository fr;
	
	public Member getMemberByEmail(String email) {
		Optional<Member> member = mr.findById(email);
		
		return member.isPresent() ? member.get() : null;
	}

	public Member getMemberByNickname(String nickname) {
		Optional<Member> member = mr.findByNickname(nickname);
		
		return member.isPresent() ? member.get() : null;
	}

	public Member insertMember(Member member) {
		return mr.save(member);
	}

	public List<Member> getAllMembers() {
		return mr.findAll();
	}

	public void toggleFollow(Follow follow) {
		Optional<Follow> mdto = fr.findByFollowerAndFollowing(follow.getFollower(), follow.getFollowing());
		
		if(mdto.isPresent()) {
			fr.delete(mdto.get());
		}else {
			fr.save(follow);
		}
		
	}

}

