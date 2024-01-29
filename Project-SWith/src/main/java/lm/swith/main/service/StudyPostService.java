package lm.swith.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lm.swith.main.mapper.StudyPostMapper;
import lm.swith.main.model.Cafes;
import lm.swith.main.model.Comments;
import lm.swith.main.model.Likes;
import lm.swith.main.model.StudyApplication;
import lm.swith.main.model.StudyPost;

@Service
public class StudyPostService {
	@Autowired
	private final StudyPostMapper studyPostMapper;
	
    @Autowired
    public StudyPostService(StudyPostMapper studyPostMapper) {
        this.studyPostMapper = studyPostMapper;
    }
    
	// Main Part
    // 스터디 등록하기
	public void insertStudyPost (StudyPost studyPost) {
		studyPostMapper.insertStudyPost(studyPost);
	}
	
	// 스터디 게시글 작성 내 첫모임 장소 카페 리스트
    public List<Cafes> getAllCafes(String bplcnm, String sitewhladdr, String x, String y) {
        return studyPostMapper.getAllCafes(bplcnm, sitewhladdr, x, y);
    }
    	
	
	// 스터디 목록 불러오기	
    public List<StudyPost> getAllStudyPostWithSkills() {
        return studyPostMapper.getAllStudyPostWithSkills();
    }
    
    // 내가 쓴 스터디 목록
    public List<StudyPost> getAllStudyPostsWithUserNo(Long user_no) {
    	return studyPostMapper.getAllStudyPostsWithUserNo(user_no);
    }
    
    // 스터디 조건 검색
    public List<StudyPost> getStudiesBySelect(String recruit_type, String study_method, String study_location, Long skill_no) {
        return studyPostMapper.getStudiesBySelect(recruit_type, study_method, study_location, skill_no);
    }
    
    // 스터디 키워드 검색
    public List<StudyPost> getStudiesByKeyword(String keyword) {
        return studyPostMapper.getStudiesByKeyword(keyword);
    }
	
    
    
    // Detail Part
    // 스터디 상세 페이지 불러오기
    public StudyPost getStudyPostByPostNo(Long post_no) {
        StudyPost studyPost = studyPostMapper.getStudyPostByPostNo(post_no);

        if (studyPost != null) {
            List<Comments> comments = studyPostMapper.getCommentsByPostNo(post_no);
            studyPost.setComments(comments);
        }

        return studyPost;
    }

    
    // 스터디 수정
    public void updateStudyPost(StudyPost studyPost) {
    	studyPostMapper.updateStudyPost(studyPost);
    }
    
    // 스터디 삭제
    public void deleteStudyPost(Long post_no, Long user_no) {
    	studyPostMapper.deleteStudyPost(post_no, user_no);
    }
    
    // 스터디 신청
    public void addUsersByPostNo(StudyApplication studyApplication) {
    	studyPostMapper.addUsersByPostNo(studyApplication);
    }
    
    // 스터디 찜
    public void addLikesByPostNo(Likes likes) {
    	if (likes.getLikes() = null) {
    		Likes likes = studyPostMapper.addLikes(likes);
    	} else if (likes.getLikes() = 'F') {
    		
    	}
    }
    
    
    // MyPage Part
    // 스터디 게시글 작성 내 첫모임 장소 검색
    public List<Cafes> searchCafes(String keyword) {
        return studyPostMapper.searchCafes(keyword);
    }
    
    
    
    // Comments Part
    // 댓글 등록
    public void insertComment(Comments comment) {
    	studyPostMapper.insertComment(comment);
    }
    
    // 댓글 불러오기
    public List<Comments> getCommentsByPostNo(Long post_no) {
    	return studyPostMapper.getCommentsByPostNo(post_no);
    }
    
    // 댓글 수정
    public void updateComment(Comments comment) {
    	studyPostMapper.updateComment(comment);
    }
    
    
    // 댓글 삭제
    public void deleteComment(Long post_no, Long user_no) {
    	studyPostMapper.deleteComment(post_no, user_no);
    }
}
