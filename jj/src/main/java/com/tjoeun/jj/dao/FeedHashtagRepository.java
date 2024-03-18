package com.tjoeun.jj.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.FeedHashtag;

public interface FeedHashtagRepository extends JpaRepository <FeedHashtag, Integer>{
	
	Optional<FeedHashtag> findByHashtagid(Integer hashtagid);
	
}
