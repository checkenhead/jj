package com.tjoeun.jj.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReplyView {

	@Id
	private Integer id;
	private Integer feedid;
	private String profileimg;
	private String writer;
	private String content;
	private Timestamp createdat;
}