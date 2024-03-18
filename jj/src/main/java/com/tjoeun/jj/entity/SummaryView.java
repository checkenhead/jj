package com.tjoeun.jj.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SummaryView {

	@Id
	private Integer id;
	private String filename;
	private String style;
	private Integer feedid;
	private String writer;
	
}
