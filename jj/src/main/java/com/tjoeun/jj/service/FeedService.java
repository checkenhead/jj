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

	public boolean insertFeed(PostDto post) {
		try {
			// 1. feed table insert
			Feed fdto = new Feed();

			fdto.setWriter(post.getWriter());
			fdto.setContent(post.getContent());

			Feed insertedFeed = fr.save(fdto);

			// 2. feedimg table insert
			for (int i = 0; i < post.getFilenames().size(); i++) {
				Feedimg fidto = new Feedimg();

				fidto.setFeedid(insertedFeed.getId());
				fidto.setFilename(post.getFilenames().get(i));
				fidto.setStyle(post.getStyles().get(i));
				
				fir.save(fidto);
			}
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	public List<Feed> getAllFeeds(PageRequest pageRequest) {
		
		return fr.findAllByOrderByIdDesc(pageRequest);
	}

	public List<Feedimg> getFeedimgByFeedid(Integer feedid) {
		return fir.findByFeedidOrderById(feedid);
	}

	public List<Feedimg> getSummarysByNickname(String nickname) {
		List<Feedimg> r = fr.findSurmmarysByNickname(nickname);
		
		
		System.out.println(r.get(0).getFilename());
		
		return r;
	}

}
