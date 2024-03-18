package com.tjoeun.jj.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.jj.entity.Follow;

public interface FollowRepository extends JpaRepository<Follow, Integer>{
	
	Optional<Follow> findByFollowerAndFollowing(String follower, String following);
	
	// 팔로잉(nickname)으로 팔로워 찾기
	Optional<List<Follow>> findByFollowing(String nickname);

	// 팔로워(nickname)으로 팔로잉찾기
	Optional<List<Follow>> findByFollower(String nickname);
	
}
