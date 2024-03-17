package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Integer>{

	List<Reply> findAllByFeedid(Integer feedid);
	
}
