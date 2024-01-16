package lm.swith.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lm.swith.main.service.StudyPostService;
import lm.swith.main.vo.StudyPost;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class StudyPostController {
	@Autowired
	private StudyPostService studyPostService;
	
	@GetMapping
	public ResponseEntity<List<StudyPost>> getAllStudyPost() {
		List<StudyPost> studyPost = studyPostService.getAllStudyPost();
		return ResponseEntity.ok(studyPost);
	}
	
	
}
