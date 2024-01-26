package lm.swith.main.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lm.swith.main.model.Cafes;
import lm.swith.main.model.Comments;
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
    @GetMapping("/post_list")
    public ResponseEntity<List<StudyPost>> getAllStudyPostWithSkills() {
        List<StudyPost> studyPost = studyPostService.getAllStudyPostWithSkills();
        if (!studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    


    // 스터디 상세 페이지 + 댓글
    @GetMapping("/post_detail/{post_no}")
    public ResponseEntity<StudyPost> getStudyPostByPostNo(@PathVariable Long post_no) {
        StudyPost studyPost = studyPostService.getStudyPostByPostNo(post_no); 
        List<Comments> comments = studyPostService.getCommentsByPostNo(post_no); // 댓글 목록 조회
        if (studyPost != null) {
            studyPost.setComments(comments); // 스터디 게시물에 댓글 목록 설정
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	// 스터디 등록 페이지
	@GetMapping("/post")
	public String showPostForm (Model model) {
		return "/post_form";
	}
	
	
	// 댓글 등록
    @PostMapping("/add_comment")
    public String addComment(@ModelAttribute Comments comment) {
        studyPostService.insertComment(comment);
        return "redirect:/post_detail/" + comment.getPost_no();
    }
    
    // 댓글 삭제
    @PostMapping("/delete_comment/{post_no}/{user_no}")
    public String deleteComment(@PathVariable Long post_no, @PathVariable Long user_no) {
        studyPostService.deleteComment(post_no, user_no);
        return "redirect:/post_detail/" + post_no;
    }
    
    // 댓글 수정
    @PostMapping("/update_comment/{post_no}/{user_no}")
    public String updateComment(@ModelAttribute Comments comment) {
    	studyPostService.updateComment(comment);
    	return "redirect:/post_detail/" + comment.getPost_no();
    }
    
	
	
	// 카페 리스트
    @GetMapping ("/cafe_list")
    public ResponseEntity<List<Cafes>> getAllCafes(String bplcnm, String sitewhladdr, String x, String y) {
        List<Cafes> cafes = studyPostService.getAllCafes(bplcnm, sitewhladdr, x, y);
        return ResponseEntity.ok(cafes);
    }
    
    // 검색 카페 목록
    @GetMapping("/KeywordCafes")
    public List<Cafes> searchCafes(@RequestParam String keyword) {
        return studyPostService.searchCafes(keyword);
    }
	
	
    
    // 스터디 생성 처리
    @PostMapping("/create")
    public String insertStudyPost(@ModelAttribute StudyPost studyPost) {
        studyPostService.insertStudyPost(studyPost);
        return "redirect:/";
    }
	
	
    // 스터디 삭제
    @PostMapping("/delete/{post_no}")
    public String deleteStudyPost(@PathVariable Long post_no, @RequestParam Long user_no) {
        studyPostService.deleteStudyPost(post_no, user_no);
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
    public List<StudyPost> getStudiesByKeyword(@RequestParam(required = false) String keyword) {
    	return studyPostService.getStudiesByKeyword(keyword);
    }

}
