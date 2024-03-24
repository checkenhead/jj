package com.tjoeun.jj.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tjoeun.jj.entity.Keyword;

public interface KeywordRepository extends JpaRepository<Keyword, Integer>{

	Optional<Keyword> findByWord(String keyword);

	@Query("select k.word from Keyword k order by count desc limit 5")
	List<String> findRecentKeyword();

}
