package lm.swith.studyroom.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudyRoomNotice {

	private Long post_no;
	private Long user_no;
	private String notice_title;
	private String notice_content;
	private String notice_date;
	private Date notice_post_date;
	

}