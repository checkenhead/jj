package com.tjoeun.jj.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.FeedMention;


public interface FeedMentionRepository extends JpaRepository <FeedMention, Integer>{
	
	Optional<FeedMention> findByNickname(String nickname);

}
