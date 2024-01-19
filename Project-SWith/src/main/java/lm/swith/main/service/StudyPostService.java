package lm.swith.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lm.swith.main.mapper.StudyPostMapper;
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
	
	// 스터디 목록 불러오기	
    public List<StudyPost> getAllStudyPostWithSkills() {
        return studyPostMapper.getAllStudyPostWithSkills();
    }
    
    // 스터디 조건 검색
    public List<StudyPost> getStudiesBySelect(String recruit_type, String study_method, String study_location, Long skill_no) {
        return studyPostMapper.getStudiesBySelect(recruit_type, study_method, study_location, skill_no);
    }
    
    // 스터디 키워드 검색
    public List<StudyPost> getStudiesByKeyword(String study_title, String study_content) {
        return studyPostMapper.getStudiesBySearch(study_title, study_content);
    }
	
    
    
    // Detail Part
	// 스터디 상세 페이지 불러오기
    public StudyPost getStudyPostByPostNo(Long post_no) {
        return studyPostMapper.getStudyPostByPostNo(post_no);
    }
    
    // 스터디 수정
    public void updateStudyPost(StudyPost studyPost) {
    	studyPostMapper.updateStudyPost(studyPost);
    }
    
    // 스터디 삭제
    public void deleteStudyPost(Long post_no) {
    	studyPostMapper.deleteStudyPost(post_no);
    }
	  

}
