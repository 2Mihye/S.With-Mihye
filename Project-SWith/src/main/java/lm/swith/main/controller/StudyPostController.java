package lm.swith.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import lm.swith.main.model.StudyPost;
import lm.swith.main.service.StudyPostService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class StudyPostController {
	private final StudyPostService studyPostService;
	
    public StudyPostController(StudyPostService studyPostService) {
        this.studyPostService = studyPostService;
    }
	
	// 스터디 목록
    @GetMapping ("/post_list")
    public ResponseEntity<List<StudyPost>> getAllStudyPostWithSkills() {
        List<StudyPost> studyPost = studyPostService.getAllStudyPostWithSkills();
        return ResponseEntity.ok(studyPost);
    }
	
	// 스터디 상세 페이지
	@GetMapping("/post_detail/{post_no}")
	public String getStudyPostByPostNo(@PathVariable Long post_no) {
		studyPostService.getStudyPostByPostNo(post_no);  
		return "/post_detail";
	}
	
	// 스터디 등록 페이지
	@GetMapping("/post")
	public String showPostForm (Model model) {
		return "/post_form";
	}
	
    // 스터디 생성 처리
    @PostMapping("/create")
    public String insertStudyPost(@ModelAttribute StudyPost studyPost) {
        studyPostService.insertStudyPost(studyPost);
        return "redirect:/";
    }
	
	
	// 스터디 삭제
	@PostMapping("/delete/{post_no}")
	public String deleteStudyPost (@PathVariable Long post_no) {
		studyPostService.deleteStudyPost(post_no);
		return "redirect:/";
	}
	
	// 스터디 수정 페이지 이동
	@GetMapping("update/{post_no}")
	public String showUpdateFrom (@PathVariable Long post_no, Model model) {
        // 스터디 정보 및 관련 스킬 정보를 불러오는 서비스 메서드 호출
        StudyPost studyPost = studyPostService.getStudyPostByPostNo(post_no);
        model.addAttribute("studyPost", studyPost);
        return "/update_study";
	}
	
	// 스터디 수정 적용
	@PostMapping("update/{post_no}")
	public String updateStudyPost(@ModelAttribute StudyPost studyPost) {
		studyPostService.updateStudyPost(studyPost);
		return "redirect:/post_detail/" + studyPost.getPost_no();
	}
	
	
    // 조건 스터디 목록
    @GetMapping ("/getSelectedList")
    public String getStudiesBySelect(@RequestParam(required = false) String recruit_type,
                                     @RequestParam(required = false) String study_method,
                                     @RequestParam(required = false) String study_location,
                                     @RequestParam(required = false) Long skill_no,
                                     Model model) {
        List<StudyPost> studyPosts = studyPostService.getStudiesBySelect(recruit_type, study_method, study_location, skill_no);
        model.addAttribute("studyPosts", studyPosts);
        return "/";
    }
    
    // 검색 스터디 목록
    @GetMapping("/KeywordStudy")
	public String getStudiesByKeyword(String study_title, String study_content, Model model) {
    	List<StudyPost> studyPosts = studyPostService.getStudiesByKeyword(study_title, study_content);
    	model.addAttribute("studyPosts", studyPosts);
    	return "/";
    }
}
