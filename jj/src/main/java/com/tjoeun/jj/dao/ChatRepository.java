package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.Chat;

public interface ChatRepository extends JpaRepository <Chat, Integer>{

	@Query("select c from Chat c where c.sender in (:sender,:receiver) and c.receiver in (:sender,:receiver) order by c.id asc")
	List<Chat> getAllChatBySenderAndReceiver(@Param("sender") String sender, @Param("receiver") String receiver);

	@Query("select c from Chat c where c.sender in (:sender,:receiver) and c.receiver in (:sender,:receiver) and c.id > :id order by c.id asc")
	List<Chat> getNewChat(@Param("id") Integer id, @Param("sender") String sender, @Param("receiver") String receiver);

	
	

	

}
