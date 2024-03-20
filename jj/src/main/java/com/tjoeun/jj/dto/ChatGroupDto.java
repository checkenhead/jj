package com.tjoeun.jj.dto;

import java.util.List;

import com.tjoeun.jj.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatGroupDto{
	private Integer id;
	private String createdby;
	private List<Member> members;
	
}
