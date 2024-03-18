package com.tjoeun.jj.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.jj.entity.Chat;
import com.tjoeun.jj.service.ChatService;
import com.tjoeun.jj.service.MemberService;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
	
	@Autowired
	ChatService cs;
	
	@PostMapping("/send")
	public HashMap<String, Object> send (@RequestBody Chat chat) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Chat cdto = cs.insertChat(chat);
		
		if(cdto == null) {
			result.put("message", "Error");
		}else {
			result.put("message", "OK");
			result.put("chat", cdto);
		}
		
		return result;
	}
	
	@PostMapping("/getAllChatBySenderAndReceiver")
	public HashMap<String, Object> getAllChatBySenderAndReceiver (@RequestBody Chat chat) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		List<Chat> chats = cs.getAllChatBySenderAndReceiver(chat);
		
		result.put("chats", chats);
		
		return result;
	}
	
	@PostMapping("/getNewChat")
	public HashMap<String, Object> getNewChat (@RequestBody Chat chat) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("chats", cs.getNewChat(chat));
		
		return result;
	}
	
	@Autowired
	MemberService ms;
	
	@GetMapping("/getAllMembers")
	public HashMap<String, Object> getAllMembers () {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("members", ms.getAllMembers());
		
		return result;
	}
}
