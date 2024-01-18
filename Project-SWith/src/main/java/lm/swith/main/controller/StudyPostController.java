package lm.swith.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import lm.swith.main.service.StudyPostService;
import lm.swith.main.vo.StudyPost;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class StudyPostController {
	private final StudyPostService studyPostService;
	
	@Autowired
    public StudyPostController(StudyPostService studyPostService) {
        this.studyPostService = studyPostService;
    }
	
	// 스터디 목록
	@GetMapping
	public ResponseEntity<List<StudyPost>> getAllStudyPost() {
		List<StudyPost> studyPost = studyPostService.getAllStudyPost();
		return ResponseEntity.ok(studyPost);
	}
	
	// 스터디 등록 페이지
	@GetMapping("/post")
	public String showPostForm (Model model) {
		return "post_form";
	}
	
    // 스터디 생성 처리
    @PostMapping("/create")
    public String insertStudyPost(@ModelAttribute StudyPost studyPost) {
        studyPostService.insertStudyPost(studyPost);
        return "redirect:/";
    }
	
	
	// 스터디 삭제
	@PostMapping("/delete/{post_no}")
	public String deleteStudyPost (@PathVariable Long postNo) {
		studyPostService.deleteStudyPost(postNo);
		return "redirect:/";
	}
	
	
	
}
