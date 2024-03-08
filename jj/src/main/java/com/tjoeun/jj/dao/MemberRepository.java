package com.tjoeun.jj.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String>{

}
