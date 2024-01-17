package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.main.vo.StudyPost;

@Mapper
public interface StudyPostMapper {
	List<StudyPost> getAllStudyPost();

	StudyPost getStudyPostById(@Param("post_no") Long post_no);
	
}
