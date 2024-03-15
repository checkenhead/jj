package com.tjoeun.jj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.FeedImgRepository;
import com.tjoeun.jj.dao.FeedRepository;
import com.tjoeun.jj.dto.PostDto;
import com.tjoeun.jj.entity.Feed;
import com.tjoeun.jj.entity.Feedimg;

@Service
@Transactional
public class FeedService {

	@Autowired
	FeedRepository fr;

	@Autowired
	FeedImgRepository fir;

	public Feed postFeed(PostDto post) {
		Feed fdto = null;
		
		try {
			// 1. 전달받은 post에 feedid가 없다면 insert / 있다면 update 실행
			if(post.getFeedid() == null) {
				fdto = new Feed(); // insert하기 위해 FeedEntity 객체 생성
			}else {
				fdto = fr.findById(post.getFeedid()).get(); // update하기 위해 select
			}
			
			fdto.setId(post.getFeedid());
			fdto.setWriter(post.getWriter());
			fdto.setContent(post.getContent());

			Feed insertedFeed = fr.save(fdto);

			// 2. 전달 받은 post에 feedimgid가 없다면 insert / 있다면 update 실행
			for (int i = 0; i < post.getFilenames().size(); i++) {
				Feedimg fidto = new Feedimg();
				
				fidto.setId(post.getFeedimgid().get(i));
				fidto.setFilename(post.getFilenames().get(i));
				fidto.setStyle(post.getStyles().get(i));
				fidto.setFeedid(insertedFeed.getId());
				
				fir.save(fidto);
			}

			return insertedFeed;
		} catch (Exception e) {
			return null;
		}
	}

	public List<Feed> getAllFeeds(PageRequest pageRequest) {
		
		return fr.findAllByOrderByIdDesc(pageRequest);
	}

	public List<Feedimg> getFeedimgByFeedid(Integer feedid) {
		return fir.findByFeedidOrderById(feedid);
	}

	public List<Feedimg> getSummarysByNickname(String nickname) {
		return fr.findSurmmarysByNickname(nickname);
	}

	public void deleteFeed(Feed feed) {
		fr.delete(feed);
		
	}

}
