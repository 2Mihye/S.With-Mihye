package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.main.vo.StudyPost;

@Mapper
public interface StudyPostMapper {
	// 스터디 목록
	List<StudyPost> getAllStudyPost();

	// 스터디 상세 페이지
	StudyPost getStudyPostById(@Param("post_no") Long post_no);
	
	// 스터디 분류
	StudyPost getStudiesBySelect();
	
	// 스터디 제목+내용 검색
	StudyPost getStudiesBySearch();
	
	// 스터디 등록
	void insertStudyPost (StudyPost studyPost);
	
	// 스터디 수정
	void updateStudyPost (StudyPost studyPost);
	
	// 스터디 삭제
	void deleteStudyPost (Long post_no);
}
