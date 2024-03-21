package com.tjoeun.jj.service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.BookmarksRepository;
import com.tjoeun.jj.dao.FeedHashtagRepository;
import com.tjoeun.jj.dao.FeedImgRepository;
import com.tjoeun.jj.dao.FeedMentionRepository;
import com.tjoeun.jj.dao.FeedRepository;
import com.tjoeun.jj.dao.HashtagRepository;
import com.tjoeun.jj.dao.LikesRepository;
import com.tjoeun.jj.dao.MemberRepository;
import com.tjoeun.jj.dao.ReplyRepository;
import com.tjoeun.jj.dao.ReplyViewRepository;
import com.tjoeun.jj.dto.PostDto;
import com.tjoeun.jj.entity.Bookmarks;
import com.tjoeun.jj.entity.Feed;
import com.tjoeun.jj.entity.FeedHashtag;
import com.tjoeun.jj.entity.FeedMention;
import com.tjoeun.jj.entity.Feedimg;
import com.tjoeun.jj.entity.Hashtag;
import com.tjoeun.jj.entity.Likes;
import com.tjoeun.jj.entity.Member;
import com.tjoeun.jj.entity.Reply;
import com.tjoeun.jj.entity.ReplyView;
import com.tjoeun.jj.entity.SummaryView;

@Service
@Transactional
public class FeedService {

	@Autowired
	FeedRepository fr;

	@Autowired
	FeedImgRepository fir;

	@Autowired
	LikesRepository lr;

	@Autowired
	ReplyRepository rr;
	
	@Autowired
	ReplyViewRepository rvr;

	@Autowired
	BookmarksRepository br;

	@Autowired
	HashtagRepository hr;

	@Autowired
	FeedHashtagRepository fhr;

	@Autowired
	FeedMentionRepository fmr;

	@Autowired
	MemberRepository mr;

	
	public Feed postFeed(PostDto post) {
		Feed fdto = null;

		try {
			// 1. 전달받은 post에 feedid가 없다면 insert / 있다면 update 실행
			if (post.getFeedid() == null) {
				fdto = new Feed(); // insert하기 위해 FeedEntity 객체 생성
			} else {
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

	public List<SummaryView> getSummarysByNickname(String nickname) {
		return fr.findSurmmarysByNickname(nickname);
	}

	public void deleteFeed(Feed feed) {
		fr.delete(feed);

	}

	public List<Likes> getLikesByFeedid(Likes likes) {
		return lr.findAllByFeedid(likes.getFeedid());
	}

	public void toggleLike(Likes likes) {
		Optional<Likes> ldto = lr.findByFeedidAndNickname(likes.getFeedid(), likes.getNickname());

		if (ldto.isPresent()) {
			lr.delete(ldto.get());
		} else {
			lr.save(likes);
		}
	}

	public List<ReplyView> getReplysByFeedid(ReplyView replyview) {
		return rvr.findAllByFeedidOrderByIdAsc(replyview.getFeedid());
	}

	public void insertReply(Reply reply) {
		rr.save(reply);
	}

	public List<Bookmarks> getBookmarksByFeedid(Bookmarks bookmarks) {
		return br.findAllByFeedid(bookmarks.getFeedid());
	}

	public void toggleBookmark(Bookmarks bookmarks) {
		Optional<Bookmarks> bdto = br.findByFeedidAndNickname(bookmarks.getFeedid(), bookmarks.getNickname());

		if (bdto.isPresent()) {
			br.delete(bdto.get());
		} else {
			br.save(bookmarks);
		}
	}

	public Feed getFeedById(Feed feed) {
		Optional<Feed> fdto = fr.findById(feed.getId());
		return fdto.isPresent() ? fdto.get() : null;
	}

	public Integer getFeedCountByNickname(String nickname) {
		return fr.findByNickname(nickname);
	}

	public void insertHashTag(int feedid, String content) {

		Matcher h = Pattern.compile("#([0-9a-zA-Z가-힣]*)").matcher(content);
		// List<String> tags = new ArrayList<String>();

		while (h.find()) {
			// tags.add(m.group(1));
			// hashtag 테이블 조회하여 id 저장
			Optional<Hashtag> hashtag = hr.findByWord(h.group(1));
			int hashtagid = 0;

			if (hashtag.isPresent()) {
				hashtagid = hashtag.get().getId();
			} else {
				// hashtag 테이블에 없는 경우 삽입하고 id 저장
				Hashtag hdto = new Hashtag();
				hdto.setWord(h.group(1));
				hashtagid = hr.save(hdto).getId();
			}

			// feedhashtag insert
			FeedHashtag fhdto = new FeedHashtag();

			fhdto.setFeedid(feedid);
			fhdto.setHashtagid(hashtagid);

			fhr.save(fhdto);
		}
	}

	public void insertMention(int feedid, String content) {
		Matcher m = Pattern.compile("@([0-9a-zA-Z가-힣]*)").matcher(content);

		while (m.find()) {

			// member 테이블 조회하여 id 저장
			Optional<Member> member = mr.findByNickname(m.group(1));

			if (member.isPresent()) {

				// feedmention insert
				FeedMention fmdto = new FeedMention();

				fmdto.setFeedid(feedid);
				fmdto.setNickname(member.get().getNickname());

				fmr.save(fmdto);

			}
		}

	}
	
	public List<Feed> getFeedByKeyword(String keyword) {
		
		
		return fr.findByKeyword(keyword);
	}


	public List<Feed> getBookmarkfeedsBynickname(PageRequest pageRequest, String nickname) {
		
		return  fr.findByBookmark(pageRequest, nickname);
	}

	public List<SummaryView> getMentionsByNickname(String nickname) {
		
		return fr.findMentionsByNickname(nickname);
	}

	
}
