package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.Feed;
import com.tjoeun.jj.entity.Feedimg;

public interface FeedRepository extends JpaRepository<Feed, Integer>{

	List<Feed> findAllByOrderByIdDesc(PageRequest pageRequest);
	
	@Query("select fi from Feedimg fi where fi.id in"
			+ " (select min(fi.id) from Feedimg fi where fi.feedid in"
				+ " (select f.id from Feed f where f.writer = :nickname)"
			+ " group by fi.feedid)"
		+ " order by fi.feedid desc")
	List<Feedimg> findSurmmarysByNickname(@Param("nickname") String nickname);

}
