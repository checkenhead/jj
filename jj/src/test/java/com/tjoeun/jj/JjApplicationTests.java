package com.tjoeun.jj;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tjoeun.jj.dao.MemberRepository;
import com.tjoeun.jj.entity.Member;
import com.tjoeun.jj.entity.MemberRole;

@SpringBootTest
class JjApplicationTests {
	
	@Autowired
	private MemberRepository mr;
	
	@Autowired
	private PasswordEncoder pe;
	
	@Test
	void contextLoads() {
		Member member1 = Member.builder()
				.email("123")
				.pwd(pe.encode("123"))
				.nickname("123")
				.build();
		member1.addRole(MemberRole.USER);
		mr.save(member1);
		
		Member member2 = Member.builder()
				.email("scott@gmail.com")
				.pwd(pe.encode("1234"))
				.nickname("scott")
				.build();
		member2.addRole(MemberRole.USER);
		mr.save(member2);
		
		Member member3 = Member.builder()
				.email("scott2@gmail.com")
				.pwd(pe.encode("1234"))
				.nickname("김스캇스캇")
				.build();
		member3.addRole(MemberRole.USER);
		mr.save(member3);
	}

}
