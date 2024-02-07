package lm.swith.studyroom.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lm.swith.studyroom.model.StudyMoment;
import lm.swith.studyroom.model.StudyRoomNotice;
import lm.swith.studyroom.service.StudyRoomService;
import lombok.RequiredArgsConstructor;

//@RestController
@Controller
@RequestMapping("/studyRoom")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class StudyRoomController {
	private final StudyRoomService studyRoomService;

	
	// Study Moment
	@PostMapping("/create/StudyMoment/{post_no}") // INSERT
	public ResponseEntity<?> createStudyMoment(@PathVariable Long post_no,@RequestBody StudyMoment studyMoment){
		studyRoomService.createStudyMoment(studyMoment);
		return ResponseEntity.ok("Success");
	}

	// StudyRoomNotice
	@PostMapping("/create/StudyNoticeMoment/{post_no}") // INSERT
	public ResponseEntity<?> createStudyRoomNotice(@PathVariable Long post_no, @RequestBody StudyRoomNotice studyRoomNotice){
		studyRoomService.createStudyRoomNotice(studyRoomNotice);
		return ResponseEntity.ok("Success");
	}
}