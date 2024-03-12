package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.Feedimg;

public interface FeedImgRepository extends JpaRepository<Feedimg, Integer>{

	List<Feedimg> findByFeedidOrderById(@Param("feedid") Integer feedid);

}
