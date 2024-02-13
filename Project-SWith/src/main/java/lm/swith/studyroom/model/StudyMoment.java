package lm.swith.studyroom.model;

import java.util.Date;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudyMoment {
	private Long post_no;
	private Long user_no;
	private byte[] moment_picture;
	private String moment_title;
	private Date moment_post_date;

}