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

import jakarta.persistence.EntityManager;

@Service
@Transactional
public class MemberService {
	
	@Autowired
	EntityManager em;
	
	@Autowired
	MemberRepository mr;

	@Autowired
	FollowRepository fr;

	public Member getMemberByEmail(String email) {
		Optional<Member> member = mr.findById(email);
		em.clear();
		return member.isPresent() ? member.get() : null;
	}

	public Member getMemberByNickname(String nickname) {
		Optional<Member> member = mr.findByNickname(nickname);
		em.clear();
		return member.isPresent() ? member.get() : null;
	}

	public Member insertMember(Member member) {
		return mr.save(member);
	}

	public List<Member> getAllMembers() {
		return mr.findAll();
	}

	public void toggleFollow(Follow follow) {
		Optional<Follow> fdto = fr.findByFollowerAndFollowing(follow.getFollower(), follow.getFollowing());

		if (fdto.isPresent()) {	
			fr.delete(fdto.get());
		} else {
			fr.save(follow);
		}

	}

	public List<String> getFollowingsByNickname(String nickname) {

		return fr.findFollowingsByNickname(nickname);

	}

	public List<String> getFollowersByNickname(String nickname) {

		return fr.findFollowersByNickname(nickname);
	}

	public List<Member> getMembersByKeyword(String keyword) {
		
		return mr.findByKeyword("%" + keyword + "%");
	}

}
