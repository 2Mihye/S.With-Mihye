package lm.swith.studyroom.mapper;

import org.apache.ibatis.annotations.Mapper;

import lm.swith.studyroom.model.StudyMoment;
import lm.swith.studyroom.model.StudyRoomNotice;

@Mapper
public interface StudyRoomMapper {
//  StudyRoomNotice Mapper 
	// INSERT
	void createStudyRoomNotice(StudyRoomNotice studyRoomNotice);
	
	// SELECT
	StudyRoomNotice findByStudyRoomNotice(StudyRoomNotice studyRoomNotice);
	
	//DELETE
	void deleteStudyRoom(StudyRoomNotice studyRoomNotice);
	
	
// StudyMoment Mapper
	// INSERT
	void createStudyMoment(StudyMoment studyMoment);
	
	// SELECT
	StudyMoment findByStudyMoment(StudyMoment studyMoment);
	
	//DELETE
	void deleteStudyMoment(StudyMoment studyMoment);
}
	
	
	