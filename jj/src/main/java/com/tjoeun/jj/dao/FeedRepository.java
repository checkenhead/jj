package com.tjoeun.jj.dao;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.Feed;
import com.tjoeun.jj.entity.FeedMention;
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

	@Query("select f from Feed f where f.id in (select b.feedid from Bookmarks b where b.nickname = :nickname) order by f.id desc")
	List<Feed> findByBookmark(PageRequest pageRequest, @Param("nickname") String nickname);

	@Query("select sv from SummaryView sv where sv.id in "
			+ "(select min(sv.id) from SummaryView sv where sv.feedid in"
			+ "(select fm.feedid from FeedMention fm where fm.nickname = :nickname)"
			+ " group by sv.feedid)"
			+ " order by sv.id desc")
	List<SummaryView> findMentionsByNickname(@Param("nickname") String nickname);
	
	@Query("select f from Feed f where f.writer in"
			+ "(select fw.following from Follow fw where fw.follower = :nickname)"
			+ "order by f.id desc")
	List<Feed> findFollowingsByOrderByIdDesc(PageRequest pageRequest, @Param("nickname") String nickname);

	@Query("select f from Feed f where f.id in"
			+ "	(select fh.feedid from FeedHashtag fh where fh.id in"
			+ "		(select h.id from Hashtag h where h.word in"
			+ "			(select h.word from Hashtag h where h.id in"
			+ "				(select fh.hashtagid from FeedHashtag fh where fh.feedid in"
			+ "					(select f.id from Feed f where f.id in"
			+ "						(select f.id from Feed f where f.writer = :nickname ) or id in"
			+ "						(select b.feedid from Bookmarks b where b.nickname = :nickname ) or id in"
			+ "						(select l.feedid from Likes l  where l.nickname = :nickname ) or id in"
			+ "						(select r.feedid from Reply r where r.writer = :nickname )"
			+ "					)"
			+ "				)"
			+ "			)"
			+ "		)"
			+ "	) and f.writer not in (:nickname) "
			+ " and f.id not in (select l.feedid from Likes l where l.nickname = :nickname) "
			+ "union "
			+ "select f from Feed f where f.writer in"
			+ "	(select f.writer from Feed f where f.id in"
			+ "		(select fm.feedid from FeedMention fm where fm.nickname = :nickname )"
			+ "	) and f.writer not in (:nickname)"
			+ " and f.id not in (select l.feedid from Likes l where l.nickname = :nickname) "
			+ " order by rand() desc limit 3")
	List<Feed> findRecommendFeedsByNickname(@Param("nickname")String nickname);
	
	@Query("select f from Feed f where f.id not in "
			+ " (select l.feedid from Likes l where l.nickname = : nickname ) "
			+ " and f.id not in (select f.id from Feed f where f.writer = :nickname ) "
			+ " and f.id not in (select b.feedid from Bookmarks b where b.nickname = :nickname ) "
			+ " order by rand() desc limit 5")
	List<Feed> findRandomFeed(@Param("nickname")String nickname);
	
	
	
}