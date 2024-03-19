package com.tjoeun.jj.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tjoeun.jj.entity.Follow;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

	Optional<Follow> findByFollowerAndFollowing(String follower, String following);

	// 팔로잉(nickname)으로 팔로워 찾기
	@Query("select f.follower from Follow f where f.following = :nickname")
	List<String> findFollowersByNickname(@Param("nickname") String nickname);

	// 팔로워(nickname)으로 팔로잉찾기
	@Query("select f.following from Follow f where f.follower = :nickname")
	List<String> findFollowingsByNickname(@Param("nickname") String nickname);

}
