package com.tjoeun.jj.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.ChatGroupMember;

public interface ChatGroupMemberRepository extends JpaRepository<ChatGroupMember, Integer>{

}
