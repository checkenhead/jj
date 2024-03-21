package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.ChatGroup;

public interface ChatGroupRepository extends JpaRepository<ChatGroup, Integer>{
	
	@Query("select cg from ChatGroup cg where id in (select cgm.chatgroupid from ChatGroupMember cgm where nickname = :nickname)")
	List<ChatGroup> findAllByNickname(@Param("nickname") String nickname);

	@Query("select cg from ChatGroup cg where id = ("
			+ "select cgm.chatgroupid from ChatGroupMember cgm where cgm.chatgroupid in"
			+ " (select cg.id from ChatGroup cg where cg.createdby = :member1 and membercount = 2)"
			+ " and cgm.nickname = :member2"
			+ ")")
	ChatGroup findGroupByTwoMembers(@Param("member1") String member1, @Param("member2") String member2);

}
