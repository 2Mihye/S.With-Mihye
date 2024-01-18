package lm.swith.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lm.swith.main.mapper.StudyPostMapper;
import lm.swith.main.vo.StudyPost;

@Service
public class StudyPostService {
	@Autowired
	private final StudyPostMapper studyPostMapper;
	
    @Autowired
    public StudyPostService(StudyPostMapper studyPostMapper) {
        this.studyPostMapper = studyPostMapper;
    }
	
    // 게시글 등록하기
	public void insertStudyPost (StudyPost studyPost) {
		studyPostMapper.insertStudyPost(studyPost);
	}
	
    // 게시글 업데이트
    public void updateStudyPost(StudyPost studyPost) {
    	studyPostMapper.updateStudyPost(studyPost);
    }
    
    // 게시글 삭제
    public void deleteStudyPost(Long postNo) {
    	studyPostMapper.deleteStudyPost(postNo);
    }
	
	// 게시글 목록 불러오기
	public List<StudyPost> getAllStudyPost() {
		return studyPostMapper.getAllStudyPost();
	}
	
	// 게시글 상세 페이지 불러오기
    public StudyPost getStudyPostByPostNo(Long postNo) {
        return studyPostMapper.getStudyPostByPostNo(postNo);
    }
   
}
