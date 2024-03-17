package com.tjoeun.jj.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Likes;

public interface LikesRepository extends JpaRepository<Likes, Integer>{

	Optional<Likes> findByFeedidAndNickname(Integer feedid, String nickname);

	List<Likes> findAllByFeedid(Integer feedid);

}
