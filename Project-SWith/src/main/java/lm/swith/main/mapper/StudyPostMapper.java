package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.main.model.Cafes;
import lm.swith.main.model.Comments;
import lm.swith.main.model.Likes;
import lm.swith.main.model.StudyApplication;
import lm.swith.main.model.StudyPost;

@Mapper
public interface StudyPostMapper {
	// Main Part
	// 스터디 목록
	List<StudyPost> getAllStudyPostWithSkills();
	
	// 스터디 찜 등록
	void addLikes (Likes likes);
	
	// 스터디 찜 상태 변화
	void updateLikes (Likes likes);
	
	// 스터디 조건 검색
	List<StudyPost> getStudiesBySelect(String recruit_type, String study_method, String study_location, Long skill_no);
		
	// 스터디 제목+내용 검색
	List<StudyPost> getStudiesByKeyword(String keyword);
	
	// 스터디 등록
	void insertStudyPost (StudyPost studyPost);
	
	// 카페 목록
	List<Cafes> getAllCafes(String bplcnm, String sitewhladdr, String x, String y);
	// 스터디 게시글 작성 내 카페 검색
	List<Cafes> searchCafes(String keyword);
	
	
	
	// My page
	// 마이페이지 내가 쓴 게시물 목록
	List<StudyPost> getAllStudyPostsWithUserNo(Long user_no);
	
	
	
	
	
	
	// Detail Part	
	// 스터디 삭제
	void deleteStudyPost (@Param("post_no") Long postNo, @Param("user_no") Long userNo);
	
	// 스터디 상세 페이지
	StudyPost getStudyPostByPostNo(@Param("post_no") Long post_no);
	
	
	// 스터디 수정
	void updateStudyPost (StudyPost studyPost);
	
	// 스터디 신청
	void addUsersByPostNo (StudyApplication studyApplication);
	
	
	
	// Comment Part
	// 댓글 등록
	void insertComment (Comments comment);
	
	// 댓글 불러오기
	List<Comments> getCommentsByPostNo(Long post_no);
	
	// 댓글 수정
	void updateComment (Comments comments);
	
	// 댓글 삭제
	void deleteComment(@Param("post_no") Long post_no, @Param("user_no") Long user_no);
}
