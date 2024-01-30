package lm.swith.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<StudyPost> getOwnStudiesWithUserNo(Long user_no) {
    	return studyPostMapper.getOwnStudiesWithUserNo(user_no);
    }
    
    // 찜한 스터디 목록
    public List<StudyPost> getAllStudiesWithLikes(Long user_no) {
    	return studyPostMapper.getAllStudiesWithLikes(user_no);
    }
    
    // 내가 참여한 스터디 목록
    public List<StudyPost> getAllStudiesWithUserNo(Long user_no) {
    	return studyPostMapper.getAllStudiesWithUserNo(user_no);
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
    
    // 스터디 신청 상태 업데이트 (승인/거절)
    public void acceptApplicant(Long user_no, Long post_no, boolean accept) {
        // study_application 테이블에서 같은 post_no를 가지고 있는 사용자들의 목록을 확인
        List<StudyApplication> applicantsList = studyPostMapper.getAllApplicantsByPostNo(post_no);

        for (StudyApplication application : applicantsList) {
            if (application.getUser_no().equals(user_no)) {
                // 특정 사용자의 신청 정보가 존재함
                if (accept) {
                    // 승인 버튼을 누르면 '승인'으로 업데이트
                    studyPostMapper.acceptApplicant(post_no);
                } else {
                    // 거절 버튼을 누르면 해당 사용자의 신청 정보를 삭제
                    studyPostMapper.deleteApplicant(post_no, user_no);
                }
                break; // 찾았으면 더 이상 반복할 필요가 없으므로 break
            }
        }
    }
    
    // 스터디 찜
    public void likesUpdate(Long user_no, Long post_no) {
        Likes likes = new Likes();
        likes.setUser_no(user_no);
        likes.setPost_no(post_no);

        List<Likes> likesList = studyPostMapper.isLiked(post_no, user_no);

        if (!likesList.isEmpty()) {
            studyPostMapper.deleteLikes(post_no, user_no);
        } else {
            studyPostMapper.addLikes(likes);
        }
    }
    
    
    // MyPage Part
    // 스터디 게시글 작성 내 첫모임 장소 검색
    public List<Cafes> searchCafes(String keyword) {
        return studyPostMapper.searchCafes(keyword);
    }
    
    
    
    // Comments Part
    // 댓글 등록
    public void insertComment(Comments comments) {
    	studyPostMapper.insertComment(comments);
    }
    
    // 댓글 불러오기
    public List<Comments> getCommentsByPostNo(Long post_no) {
    	return studyPostMapper.getCommentsByPostNo(post_no);
    }
    
    // 댓글 수정
    public void updateComment(Comments comments) {
    	studyPostMapper.updateComment(comments);
    }
    
    
    // 댓글 삭제
    public void deleteComment(Long post_no, Long user_no) {
    	studyPostMapper.deleteComment(post_no, user_no);
    }
}
