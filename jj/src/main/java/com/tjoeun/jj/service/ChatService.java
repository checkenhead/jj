package com.tjoeun.jj.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.ChatGroupRepository;
import com.tjoeun.jj.dao.ChatRepository;
import com.tjoeun.jj.dao.MemberRepository;
import com.tjoeun.jj.dto.ChatGroupDto;
import com.tjoeun.jj.entity.Chat;
import com.tjoeun.jj.entity.ChatGroup;
import com.tjoeun.jj.entity.Member;

@Service
@Transactional
public class ChatService {
	
	@Autowired
	ChatRepository cr;
	
	@Autowired
	ChatGroupRepository cgr;
	
	@Autowired
	MemberRepository mr;

	public Chat insertChat(Chat chat) {
		return cr.save(chat);
	}

//	public List<Chat> getAllChatBySenderAndReceiver(Chat chat) {
//		
//		return cr.getAllChatBySenderAndReceiver(chat.getSender(),chat.getReceiver());
//	}

	public List<Chat> getNewChat(Chat chat) {
		return cr.getNewChat(chat.getChatgroupid(), chat.getId());
	}

	public List<ChatGroupDto> getChatGroupsByNickname(String nickname) {
		List<ChatGroupDto> groups= new ArrayList<ChatGroupDto>();
		List<ChatGroup> result = cgr.findAllByNickname(nickname);
		
		for(ChatGroup cgdto : result) {
			groups.add(new ChatGroupDto(cgdto.getId(), cgdto.getCreatedby(), null));
		}

		return groups;
	}

	public List<Member> getMemberByChatgroupid(Integer chatgroupid) {
		return mr.findAllByChatgroupidInChatGroupMember(chatgroupid);
	}



}
