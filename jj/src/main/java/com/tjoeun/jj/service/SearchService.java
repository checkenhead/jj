package com.tjoeun.jj.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.jj.dao.KeywordRepository;
import com.tjoeun.jj.entity.Keyword;

@Service
@Transactional
public class SearchService {
	
	@Autowired
	KeywordRepository kr;
	
	public void insertKeyword(String keyword) {
		// 1. Keyword로 select
		// 2. Keyword가 이미 존재하면 count + 1
		Optional<Keyword> optional = kr.findByWord(keyword);
		Keyword kdto = optional.isPresent() ? optional.get() : new Keyword();
		
		if(kdto.getId() == null) {
			kdto.setWord(keyword);
			kdto.setCount(1);
		}else {
			kdto.setCount(kdto.getCount() + 1);
		}
		
		kr.save(kdto);
	}

	public List<String> getRecentKeyword() {
		return kr.findRecentKeyword();
	}

}
