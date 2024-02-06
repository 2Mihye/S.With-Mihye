package lm.swith.main.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lm.swith.main.model.*;
import lm.swith.main.service.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://1.221.120.194:3000", allowCredentials="true", allowedHeaders="*")
public class StudyPostController {
	private final StudyPostService studyPostService;
	
    public StudyPostController(StudyPostService studyPostService) {
        this.studyPostService = studyPostService;
    }
	
	// 스터디 목록
    @GetMapping("/post_list")
    public ResponseEntity<List<StudyPost>> getAllStudyPostWithSkills() {
        List<StudyPost> studyPost = studyPostService.getAllStudyPostWithSkills();
        studyPostService.runUpdateStudyStatus();
        studyPostService.updateStudyStatus();
        if (!studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
    
    // 찜하기
    @PostMapping("/likesUpdate")
    public String likesUpdate( @RequestParam("user_no") Long user_no, @RequestParam("post_no") Long post_no) {
        studyPostService.likesUpdate(user_no, post_no);
        return "redirect:/post_list";
    }

    @GetMapping("/likesUpdate")
    public ResponseEntity<Boolean> isLiked(
            @RequestParam("user_no") Long user_no,
            @RequestParam("post_no") Long post_no) {
        
        List<Likes> likesList = studyPostService.isLiked(post_no, user_no);

        // 해당 post_no와 user_no에 대한 레코드가 존재하는지 여부 확인
        boolean isLiked = !likesList.isEmpty();

        return ResponseEntity.ok(isLiked);
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
	
	
	// 스터디 신청
	@PostMapping("/add_applicants")
	public String addUsersByPostNo ( @RequestParam("user_no") Long user_no, @RequestParam("post_no") Long post_no) {
		studyPostService.addUsersByPostNo(post_no, user_no);
		return "redirect:/post_detail/" + post_no;
	}
	
	
	// 스터디 신청자 목록
	@GetMapping("/application_update/{post_no}")
    public ResponseEntity<List<StudyApplication>> getAllApplicantsByPostNo(@PathVariable Long post_no) {
        List<StudyApplication> studyApplicants = studyPostService.getAllApplicants(post_no);
        if (!studyApplicants.isEmpty()) {
            return ResponseEntity.ok(studyApplicants);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
	
	// 스터디 신청 목록 업데이트 (승인/거절)
	@PostMapping("/application_update/{post_no}")
	public ResponseEntity<List<StudyApplication>> updateApplication(
	        @RequestParam("post_no") Long post_no,
	        @RequestParam("user_no") Long user_no,
	        @RequestParam("action") String action) { // action은 HTTP 요청에서 "action"이라는 이름의 파라미터를 String 타입으로 받아옴 (accept 혹은 reject로)
	    List<StudyApplication> studyApplication = studyPostService.getAllApplicants(post_no);
	    try {
	        boolean accept = "accept".equalsIgnoreCase(action); // 대소문자 상관없이 action으로 accept를 가져오면 수락
	        if (accept || "reject".equalsIgnoreCase(action)) { // action으로 reject를 가져와서 accept이거나 reject라면
	            studyPostService.updateApplicantsStatus(user_no, post_no, accept); // service코드 실행
	            return ResponseEntity.ok(studyApplication); // 처리 성공
	        } else { // 값이 accept나 reject가 아닌 경우
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400 bad request 반환
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 예외인 경우 HTTP 500 서버 에러 오류 상태코드 반환
	    }
	}

	
	
	// 댓글 등록
    @PostMapping("/add_comment/{post_no}/{user_no}")
    public ResponseEntity<?> addComment(@PathVariable Long post_no, @PathVariable Long user_no, @RequestBody Comments comment) {
        Comments comm = new Comments();
        comm.setUser_no(user_no);
        comm.setPost_no(post_no);
        comm.setComment_no(user_no);
        comm.setComment_content(comment.getComment_content());
        studyPostService.insertComment(comm);

        return ResponseEntity.ok("댓글이 등록되었습니다.");
    }
    
    
    // 댓글 삭제
    @DeleteMapping("/delete_comment/{post_no}/{user_no}/{comment_no}")
    public String deleteComment(@PathVariable Long post_no, @PathVariable Long user_no, @PathVariable Long comment_no) {
        studyPostService.deleteComment(post_no, user_no, comment_no);
//        System.out.println(post_no);
//        System.out.println(user_no);
//        System.out.println(comment_no);
        return "redirect:/post_detail/" + post_no;
    }
    
    
    
    // 댓글 수정
    @PostMapping("/update_comment/{post_no}/{user_no}/{comment_no}")
    public String updateComment(@PathVariable Long post_no, @PathVariable Long user_no, @PathVariable Long comment_no ,@RequestBody Comments comments) {
//    	System.out.println(comment_no + " comment_no");
//    	System.out.println(post_no + " post");
//    	System.out.println(user_no + " user");
//    	System.out.println(comments.getComment_content() + " 내용!!!");
        studyPostService.updateComment(post_no, user_no, comment_no, comments.getComment_content());
        return "redirect:/post_detail/";
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
    public ResponseEntity<?> insertStudyPost(@RequestBody StudyPost studyPost) {
    	  LocalDate now = LocalDate.now(); // now(현재날짜) 
			LocalDate recruitDeadline = LocalDate.parse(studyPost.getRecruit_deadline()); // 문자열을 날짜 형식으로 가져옴
			int comparison = recruitDeadline.compareTo(now); //  recruitDeadline이  now랑같으면 0 을반환
															// recruitDeadline이 now 보다 작으면 음수 반환
															//recruitDeadline 이 now  보다 크면 큰 많큼 값을 반환		
			if (comparison == 0) {
				System.out.println("두 날짜는 같습니다.");
				return ResponseEntity.ok("같다");
			} else if (comparison < 0) {
				System.out.println("recruitDeadline은 현재 날짜 이전입니다.");
				
				return ResponseEntity.ok("success"); 
			} else {
				System.out.println("recruitDeadline은 현재 날짜 이후입니다.");
				studyPostService.insertStudyPost(studyPost);
				System.out.println(comparison + " 크기");
				
				return ResponseEntity.ok("false1");
			}
    }
    
    
    
    // 내가 쓴 스터디 목록
    @GetMapping("/my_own_studies/{user_no}")
    public ResponseEntity<List<StudyPost>> getOwnStudiesWithUserNo(@PathVariable Long user_no) {
    	List<StudyPost> studyPost = studyPostService.getOwnStudiesWithUserNo(user_no);
        if (studyPost != null  && !studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
    
    // 찜한 스터디 목록
    @GetMapping("/liked_studies/{user_no}")
    public ResponseEntity<List<StudyPost>> getAllStudiesWithLikes(@PathVariable("user_no") Long user_no) {
        List<StudyPost> studyPost = studyPostService.getAllStudiesWithLikes(user_no);
        
        if (studyPost != null && !studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
    
    // 내가 참여한 스터디 목록
    @GetMapping("/attending_studies/{user_no}")
    public ResponseEntity<List<StudyPost>> getAllStudiesWithUserNo(@PathVariable Long user_no) {
    	List<StudyPost> studyPost = studyPostService.getAllStudiesWithUserNo(user_no);
        if (!studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
	
	
    // 스터디 삭제
    @GetMapping("/delete/{post_no}")
    public String deleteStudyPost(@PathVariable Long post_no) {
        studyPostService.deleteStudyPost(post_no);
        return "redirect:/";
    }
	
//	// 스터디 수정 페이지 이동
//	@GetMapping("update/{post_no}")
//	public String showUpdateFrom (@PathVariable Long post_no, Model model) {
//        // 스터디 정보 및 관련 스킬 정보를 불러오는 서비스 메서드 호출
//        StudyPost studyPost = studyPostService.getStudyPostByPostNo(post_no);
//        model.addAttribute("studyPost", studyPost);
//        return "/update_study";
//	}
	
//	// 스터디 수정 적용
//	@PostMapping("update/{post_no}")
//	public String updateStudyPost(@ModelAttribute StudyPost studyPost) {
//		studyPostService.updateStudyPost(studyPost);
//		return "redirect:/post_detail/" + studyPost.getPost_no();
//	}
	
	
	// 조건 스터디 목록    
    @GetMapping("/getSelectedList")
    public ResponseEntity<List<StudyPost>> getStudiesBySelect(@RequestParam Map<String, Object> params) {
        List<StudyPost> studyPost = studyPostService.getStudiesBySelect(params);
        if (!studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    

    // 검색 스터디 목록
    @GetMapping("/KeywordStudy")
    public List<StudyPost> getStudiesByKeyword(@RequestParam(required = false) String keyword) {
    	return studyPostService.getStudiesByKeyword(keyword);
    }

    
    
    // 유저 프로필
    @GetMapping("/userProfile/{user_no}")
    public ResponseEntity<Users> getUserByUserNo (@PathVariable Long user_no) {
    	Users user = studyPostService.getUserByUserNo(user_no);
    	return ResponseEntity.ok(user);
    }
    
    
    // Admin Part
	// 닉네임 검색 스터디 목록
	@GetMapping("/nicknameStudies")
	public List<StudyPost> getStudiesByNickname(@RequestParam(required = false) String nickname) {
		return studyPostService.getStudiesByNickname(nickname);
	}
	
	// 닉네임 검색 댓글 목록
	@GetMapping("/nicknameComments")
	public List<Comments> getCommentsByNickname(@RequestParam(required = false) String nickname) {
		return studyPostService.getCommentsByNickname(nickname);
	}
	
	// 유저 삭제
	@DeleteMapping("/delete_comment/{nickname}")
	public String deleteUser(@PathVariable String nickname) {
		studyPostService.deleteUser(nickname);
		return "redirect:/nicknameStudies/" + nickname;
	}
}
