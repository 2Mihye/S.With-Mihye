package lm.swith.studyroom.service;

import java.util.List;

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
	
	public  List<StudyMoment> findByStudyMoment(Long post_no) {
		return studyRoomMapper.findByStudyMoment(post_no);
	}
	public void deleteStudyMoment(Long moment_no, Long user_no) {
		studyRoomMapper.deleteStudyMoment(moment_no, user_no);
	}
	
	
	
	
	
	// StudyRoomNotice Service
	public void createStudyRoomNotice(StudyRoomNotice studyRoomNotice) {
		studyRoomMapper.createStudyRoomNotice(studyRoomNotice);
	}
	public List<StudyRoomNotice> findByStudyNoticeWithNickname(Long post_no){
		return studyRoomMapper.findByStudyNoticeWithNickname(post_no);
	}
	public void deleteStudyRoomNotice(Long notice_no, String notice_password) {
		studyRoomMapper.deleteStudyRoomNotice(notice_no, notice_password);
	}
}