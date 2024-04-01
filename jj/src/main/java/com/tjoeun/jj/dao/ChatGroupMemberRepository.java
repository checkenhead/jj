package com.tjoeun.jj.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.ChatGroupMember;

public interface ChatGroupMemberRepository extends JpaRepository<ChatGroupMember, Integer>{

	Optional<ChatGroupMember> findByChatgroupidAndNickname(Integer chatgroupid, String nickname);

	List<ChatGroupMember> findAllByChatgroupid(Integer chatgroupid);

}
