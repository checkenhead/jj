package com.tjoeun.jj.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
	private String writer;
	private String content;
	private List<String> filenames;
	private List<String> styles;
}
