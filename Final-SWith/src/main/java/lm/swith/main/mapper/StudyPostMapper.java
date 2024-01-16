package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import lm.swith.main.vo.StudyPost;

@Mapper
public interface StudyPostMapper {
	List<StudyPost> getAllStudyPost();
}
