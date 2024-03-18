package com.tjoeun.jj.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer>{
	
	Optional<Hashtag> findByWord(String group);

	
}
