package com.tjoeun.jj.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Keyword;

public interface KeywordRepository extends JpaRepository<Keyword, Integer>{

	Optional<Keyword> findByWord(String keyword);

}
