package lm.swith.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lm.swith.main.mapper.StudyPostMapper;
import lm.swith.main.vo.StudyPost;

@Service
public class StudyPostService {
	@Autowired
	private StudyPostMapper studyPostMapper;
	
	public List<StudyPost> getAllStudyPost(){
		return studyPostMapper.getAllStudyPost();
	}
	
}
