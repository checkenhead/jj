package com.tjoeun.jj.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String>{

	Optional<Member> getMemberByNickname(String nickname);

}
