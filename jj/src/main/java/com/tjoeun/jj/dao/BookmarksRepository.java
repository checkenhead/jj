package com.tjoeun.jj.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Bookmarks;

public interface BookmarksRepository extends JpaRepository<Bookmarks, Integer>{

	List<Bookmarks> findAllByFeedid(Integer feedid);

	Optional<Bookmarks> findByFeedidAndNickname(Integer feedid, String nickname);

}
