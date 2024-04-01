package com.tjoeun.jj.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.jj.dto.ChatGroupDto;
import com.tjoeun.jj.dto.ChatGroupMemberDto;
import com.tjoeun.jj.entity.Chat;
import com.tjoeun.jj.service.ChatService;

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
	
//	@PostMapping("/getAllChatBySenderAndReceiver")
//	public HashMap<String, Object> getAllChatBySenderAndReceiver (@RequestBody Chat chat) {
//		HashMap<String, Object> result = new HashMap<String, Object>();
//		
//		List<Chat> chats = cs.getAllChatBySenderAndReceiver(chat);
//		
//		result.put("chats", chats);
//		
//		return result;
//	}
	
	@PostMapping("/getNewChat")
	public HashMap<String, Object> getNewChat (@RequestBody Chat chat) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("chats", cs.getNewChat(chat));
		
		return result;
	}
	
	@PostMapping("/getallchatgroupsbynickanme")
	public HashMap<String, Object> getAllChatGroupsByNickname (@RequestParam("nickname") String nickname) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		//nickname이 참가하고 있는 chatgroup 리스트
		List<ChatGroupDto> groups= cs.getAllChatGroupsByNickname(nickname);
		
		//각 chatgroup에 참가하고 있는 멤버 정보 추가
		for(ChatGroupDto group : groups) {
			group.setMembers(cs.getMemberByChatgroupid(group.getId()));
		}
		
		result.put("groups", groups);
		
		return result;
	}
	
	@PostMapping("/creategroup")
	public HashMap<String, Object> createGroup(@RequestBody ChatGroupMemberDto cgmdto){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		ChatGroupDto group = cs.createGroup(cgmdto.getMembers());
		group.setMembers(cs.getMemberByChatgroupid(group.getId()));
		
		result.put("group", group);
//		System.out.println(cgmdto.getMembers().size());
		
		return result;
	}
	
	@PostMapping("/invitegroup")
	public void inviteGroup(@RequestParam("chatgroupid") Integer chatgroupid, @RequestBody ChatGroupMemberDto cgmdto) {
		cs.inviteGroup(chatgroupid, cgmdto.getMembers());
	}
	
	@PostMapping("/leavegroup")
	public void leaveGroup(@RequestParam("chatgroupid") Integer chatgroupid, @RequestParam("nickname") String nickname){
		cs.leaveGroup(chatgroupid, nickname);
	}
}
