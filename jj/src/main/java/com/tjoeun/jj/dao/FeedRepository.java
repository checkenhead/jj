package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Feed;

public interface FeedRepository extends JpaRepository<Feed, Integer>{

	List<Feed> findAllByOrderByIdDesc(PageRequest pageRequest);

}
