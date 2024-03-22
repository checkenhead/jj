package com.tjoeun.jj.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.jj.service.SearchService;

@RestController
@RequestMapping("/api/search")
public class SearchController {
	
	@Autowired
	SearchService ss;
	
	@PostMapping("/stats")
	public void stats(@RequestParam("keyword") String keyword) {
		ss.insertKeyword(keyword);
	}
	
	@GetMapping("/getrecentkeyword")
	public HashMap<String, Object> getRecentKeyword(){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("recent", ss.getRecentKeyword());
		
		return result;
	}
	
}
