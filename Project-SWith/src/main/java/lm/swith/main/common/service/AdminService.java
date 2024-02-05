package lm.swith.main.common.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lm.swith.main.common.mapper.StudyPostMapper;
import lm.swith.main.common.model.Comments;
import lm.swith.main.common.model.StudyPost;

@Service
public class AdminService {
	@Autowired
	private final StudyPostMapper studyPostMapper;
	
    public AdminService(StudyPostMapper studyPostMapper) {
        this.studyPostMapper = studyPostMapper;
    }
    
    // 닉네임으로 게시글 검색
    public List<StudyPost> getStudiesByNickname(String nickname) {
    	return studyPostMapper.getStudiesByNickname(nickname);
    }
    
    // 닉네임으로 댓글 검색
    public List<Comments> getCommentsByNickname(String nickname) {
    	return studyPostMapper.getCommentsByNickname(nickname);
    }
    
    // 유저 삭제(탈퇴)
    public void deleteUser(String nickname) {
    	studyPostMapper.deleteUser(nickname);
    }
    
	
    
}
