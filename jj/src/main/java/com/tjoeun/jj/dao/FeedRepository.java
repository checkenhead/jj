package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.Feed;
import com.tjoeun.jj.entity.SummaryView;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

	List<Feed> findAllByOrderByIdDesc(PageRequest pageRequest);

	@Query("select sv from SummaryView sv where sv.id in "
			+ "(select min(sv.id) from SummaryView sv where sv.feedid in"
			+ "(select distinct sv.feedid from SummaryView sv where sv.writer = :nickname)"
			+ " group by sv.feedid)"
			+ " order by sv.id desc")
	List<SummaryView> findSurmmarysByNickname(@Param("nickname") String nickname);

}