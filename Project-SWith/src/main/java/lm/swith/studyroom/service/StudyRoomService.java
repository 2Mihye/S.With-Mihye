package lm.swith.studyroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lm.swith.studyroom.mapper.StudyRoomMapper;
import lm.swith.studyroom.model.StudyMoment;
import lm.swith.studyroom.model.StudyRoomNotice;

@Service
public class StudyRoomService {
	
	@Autowired
	private StudyRoomMapper studyRoomMapper;
	
	// StudyMomnet Service
	public void createStudyMoment(StudyMoment studyMoment) {
		studyRoomMapper.createStudyMoment(studyMoment);
	}
	
	
	// StudyRoomNotice Service
	
	public void createStudyRoomNotice(StudyRoomNotice studyRoomNotice) {
		studyRoomMapper.createStudyRoomNotice(studyRoomNotice);
	}
	
}
