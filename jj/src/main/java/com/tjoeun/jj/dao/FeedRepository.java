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
	
	@Query("select count(fd.writer) from Feed fd where fd.writer = :nickname"
			+ " order by fd.id desc")
	Integer findByNickname(@Param("nickname") String nickname);

	@Query("select f from Feed f where f.id in (select fh.feedid from FeedHashtag fh where fh.hashtagid in (select h.id from Hashtag h where h.word=:keyword))")
	List<Feed> findByKeyword (@Param("keyword") String keyword);
}