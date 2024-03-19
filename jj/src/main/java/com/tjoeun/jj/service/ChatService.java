package com.tjoeun.jj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.ChatRepository;
import com.tjoeun.jj.entity.Chat;

@Service
@Transactional
public class ChatService {
	
	@Autowired
	ChatRepository cr;

	public Chat insertChat(Chat chat) {
		return cr.save(chat);
	}

	public List<Chat> getAllChatBySenderAndReceiver(Chat chat) {
		
		return cr.getAllChatBySenderAndReceiver(chat.getSender(),chat.getReceiver());
	}

	public List<Chat> getNewChat(Chat chat) {
		List<Chat> list = cr.getNewChat(chat.getId(),chat.getSender(),chat.getReceiver());
		
		for(Chat c : list) {

		}
		
		return list;
	}



}
