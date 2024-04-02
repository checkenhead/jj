package com.tjoeun.jj.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.FollowRepository;
import com.tjoeun.jj.dao.MemberRepository;
import com.tjoeun.jj.dto.MemberDto;
import com.tjoeun.jj.entity.Follow;
import com.tjoeun.jj.entity.Member;
import com.tjoeun.jj.entity.MemberRole;

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

	@Autowired
	private PasswordEncoder pe;

	public MemberDto getMemberByEmail(String email) {
		Optional<Member> member = mr.findById(email);

//		em.clear();
		return member.isPresent() ? new MemberDto(member.get()) : null;
	}

	public MemberDto getMemberByNickname(String nickname) {
		Optional<Member> member = mr.findByNickname(nickname);
//		em.clear();
		return member.isPresent() ? new MemberDto(member.get()) : null;
	}

	public Member insertMember(Member member) {
		Member member1 = Member.builder().email(member.getEmail()).pwd(pe.encode(member.getPwd())) // pe.encode("1234")
				.nickname(member.getNickname()).intro(member.getIntro()).profileimg(member.getProfileimg())
				.provider(member.getProvider()).zipnum(member.getZipnum()).address1(member.getAddress1())
				.address2(member.getAddress2()).address3(member.getAddress3()).build();
		member1.addRole(MemberRole.USER);
		return mr.save(member1);
	}

	
	public Member updatePwdOnly(MemberDto mdto) {
		Member member1 = Member.builder().email(mdto.getEmail()).pwd(pe.encode(mdto.getPwd())) // pe.encode("1234")
				.nickname(mdto.getNickname()).intro(mdto.getIntro()).profileimg(mdto.getProfileimg())
				.provider(mdto.getProvider()).createdat(java.sql.Timestamp.valueOf(mdto.getCreatedat()))
				.zipnum(mdto.getZipnum()).address1(mdto.getAddress1()).address2(mdto.getAddress2())
				.address3(mdto.getAddress3()).build();
		member1.addRole(MemberRole.USER);
		return mr.save(member1);
	}
	public Member updateMember(MemberDto mdto) {
		Member member1 = Member.builder().email(mdto.getEmail()).pwd(mdto.getPwd()) // pe.encode("1234")
				.nickname(mdto.getNickname()).intro(mdto.getIntro()).profileimg(mdto.getProfileimg())
				.provider(mdto.getProvider()).createdat(java.sql.Timestamp.valueOf(mdto.getCreatedat()))
				.zipnum(mdto.getZipnum()).address1(mdto.getAddress1()).address2(mdto.getAddress2())
				.address3(mdto.getAddress3()).build();
		member1.addRole(MemberRole.USER);
		return mr.save(member1);
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

	public List<String> getRecommendPeopleByNickname(String nickname) {

		return mr.findRecommendPeopleByNickname(nickname);
	}

	public boolean passwordCheck(String encodedpwd, String curpwd) {
		
		return pe.matches(curpwd, encodedpwd);
	}

	public List<Member> getRecommendPeopleByFeedid(String nickname, String feedid) {

		return mr.findRecommendPeopleByFeedid(nickname, feedid);
	}

	public List<Member> getRandomPeople(String nickname) {
		return mr.findRandomMember(nickname);
	}

}
