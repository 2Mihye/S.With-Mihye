package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.main.model.StudyPost;

@Mapper
public interface StudyPostMapper {
	// Main Part
	// 스터디 목록
	List<StudyPost> getAllStudyPostWithSkills();
	
	// 스터디 조건 검색
	List<StudyPost> getStudiesBySelect(String recruit_type, String study_method, String study_location, Long skill_no);
		
	// 스터디 제목+내용 검색
	List<StudyPost> getStudiesBySearch(String study_title, String study_content);
	
	// 스터디 등록
	void insertStudyPost (StudyPost studyPost);
	
	
	
	// Detail Part	
	// 스터디 삭제
	void deleteStudyPost (Long post_no);
	
	// 스터디 상세 페이지
	StudyPost getStudyPostByPostNo(@Param("post_no") Long post_no);
	
	// 스터디 수정
	void updateStudyPost (StudyPost studyPost);
	
}
