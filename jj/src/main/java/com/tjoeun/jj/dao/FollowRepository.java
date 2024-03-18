package com.tjoeun.jj.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Follow;

public interface FollowRepository extends JpaRepository<Follow, Integer>{
	
	Optional<Follow> findByFollowerAndFollowing(String follower, String following);
	
	Optional<List<Follow>> findByFollowing(String nickname);
	
}
