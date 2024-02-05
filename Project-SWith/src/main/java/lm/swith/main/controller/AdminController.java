package lm.swith.main.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lm.swith.main.common.model.Comments;
import lm.swith.main.common.model.StudyPost;
import lm.swith.main.common.service.AdminService;


@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://1.221.120.194:3000", allowCredentials="true", allowedHeaders="*")
public class AdminController {
	private final AdminService adminService;
	
	public AdminController (AdminService adminService) {
		this.adminService = adminService;
	}
	
	// 닉네임 검색 스터디 목록
	@GetMapping("/nicknameStudies/{nickname}")
	public List<StudyPost> getStudiesByNickname(@RequestParam(required = false) String nickname) {
		return adminService.getStudiesByNickname(nickname);
	}
	
	// 닉네임 검색 댓글 목록
	@GetMapping("/nicknameComments/{nickname}")
	public List<Comments> getCommentsByNickname(@RequestParam(required = false) String nickname) {
		return adminService.getCommentsByNickname(nickname);
	}
	
	// 유저 삭제
	@DeleteMapping("/delete_comment/{nickname}")
	public String deleteUser(@PathVariable String nickname) {
		adminService.deleteUser(nickname);
		return "redirect:/nicknameStudies/" + nickname;
	}
}
