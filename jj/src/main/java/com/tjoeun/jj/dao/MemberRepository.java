package com.tjoeun.jj.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String>{
	
	Optional<Member> findByNickname(String nickname);

	@Query("select m from Member m where nickname like :keyword")
	List<Member> findByKeyword(@Param("keyword") String keyword);

	@Query("select m from Member m where nickname in (select cgm.nickname from ChatGroupMember cgm where cgm.chatgroupid = :chatgroupid)")
	List<Member> findAllByChatgroupidInChatGroupMember(@Param("chatgroupid") Integer chatgroupid);



	

}
