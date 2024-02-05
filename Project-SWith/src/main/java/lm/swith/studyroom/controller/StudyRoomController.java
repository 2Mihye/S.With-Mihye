package lm.swith.studyroom.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lm.swith.studyroom.model.StudyMoment;
import lm.swith.studyroom.model.StudyMomentListResponse;
import lm.swith.studyroom.model.StudyRoomNotice;
import lm.swith.studyroom.service.StudyRoomService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/studyRoom")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class StudyRoomController {
	private final StudyRoomService studyRoomService;

	// StudyRoomNotice
	@PostMapping("/create/StudyNotice/{post_no}") // INSERT
	public ResponseEntity<?> createStudyRoomNotice(@PathVariable Long post_no, @RequestBody StudyRoomNotice notice) {

		System.out.println("getPost_no : " + notice.getPost_no());
		System.out.println("getUser_no : " + notice.getUser_no());
		System.out.println("getNotice_title : " + notice.getNotice_title());
		System.out.println("getNotice_content : " + notice.getNotice_content());
		System.out.println("getNotice_password : " + notice.getNotice_password());
		studyRoomService.createStudyRoomNotice(notice);
		return ResponseEntity.ok(studyRoomService);
	}

	@GetMapping("/select/StudyNotice/{post_no}")
	public ResponseEntity<List<StudyRoomNotice>> findByStudyRoomNotice(@PathVariable Long post_no) {
		System.out.println(post_no);
		 List<StudyRoomNotice> notice = studyRoomService.findByStudyNoticeWithNickname(post_no);
		 if (!notice.isEmpty()) {
		return ResponseEntity.ok(notice);
		 }else {
			 return ResponseEntity.noContent().build();
		 }
	}

	@PostMapping("/delete/StudyNotice/{post_no}")
	public ResponseEntity<?> deleteStudyRoomNotice(@PathVariable Long post_no, @RequestBody StudyRoomNotice notice) {
		
		 System.out.println("getPost_no : " + post_no);
		 System.out.println("getUser_no : " + notice.getUser_no());
		 
		 System.out.println("getNotice_title : " + notice.getNotice_title());
		 System.out.println("getNotice_content : " + notice.getNotice_content());
		 System.out.println("getNotice_post_date : " + notice.getNotice_post_date());
		 System.out.println("getNotice_password : " + notice.getNotice_password());
		 System.out.println("Notice_no : " + notice.getNotice_no());
		
		studyRoomService.deleteStudyRoomNotice(notice.getNotice_no(), notice.getNotice_password());
		return ResponseEntity.ok(notice);
	}

	// Study Moment
	@PostMapping("/create/StudyMoment/{post_no}") // INSERT
	public ResponseEntity<?> createStudyMoment(@PathVariable Long post_no, @RequestParam(value = "img", required = false) MultipartFile img,  @RequestBody StudyMoment studyMoment) throws IOException {
		{
	    	System.out.println("img" + studyMoment.getImg());
	    	System.out.println("=====");

				// resource 폴더에 경로를 읽는다
	        	System.out.println("null아님");
	        	String imageData = studyMoment.getImg().split(",")[1];
		        byte[] imageBytes = Base64.getDecoder().decode(imageData);//디코딩해서 blob 형태로 다시 넣어줌
		        
		     // BufferedImage로 이미지 읽기
		        ByteArrayInputStream bis = new ByteArrayInputStream(imageBytes);
		        BufferedImage originalImage = ImageIO.read(bis);
		        bis.close();

		        // 이미지 크기 조절 (예: 가로 100px로 조절)
		        int newWidth = 500;
		        int newHeight = (int) (originalImage.getHeight() * (1.0 * newWidth / originalImage.getWidth()));
		        BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_ARGB);
		        resizedImage.getGraphics().drawImage(originalImage, 0, 0, newWidth, newHeight, null);

		        // 압축된 이미지를 Base64로 인코딩
		        ByteArrayOutputStream bos = new ByteArrayOutputStream();
		        ImageIO.write(resizedImage, "png", bos);
		        byte[] compressedImageBytes = bos.toByteArray();
		        bos.close();
		        studyMoment.setMoment_picture(compressedImageBytes);
	
	        
			
		studyRoomService.createStudyMoment(studyMoment);
		return ResponseEntity.ok("Success");
		}
	}//select
	@GetMapping("/select/StudyMoment/{post_no}")
	public ResponseEntity<?> findByStudyMoment(@PathVariable Long post_no) {
		
		List<StudyMoment> moment = studyRoomService.findByStudyMoment(post_no);
		
		if (!moment.isEmpty()) {
				return ResponseEntity.ok(moment);
				 }else {
					 return ResponseEntity.noContent().build();
				 }
	
	}
	//delete
	@PostMapping("/delete/StudyMoment/{post_no}")
	public ResponseEntity<?> deleteStudyMoment(@PathVariable Long post_no, @RequestBody StudyMoment moment){
		studyRoomService.deleteStudyMoment(moment.getMoment_no(), moment.getUser_no());
		return ResponseEntity.ok(moment);
	}

}