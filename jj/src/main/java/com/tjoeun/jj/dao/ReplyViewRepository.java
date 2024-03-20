package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.ReplyView;

public interface ReplyViewRepository extends JpaRepository<ReplyView, Integer>{

	List<ReplyView> findAllByFeedidOrderByIdAsc(Integer feedid);
	
}
