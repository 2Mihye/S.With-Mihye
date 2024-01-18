package lm.swith.main.model;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class StudyPost {
	private Long post_no;
	private Long user_no;
	private String study_title;
	private String study_content;
	private String study_method;
	private String recruit_type;
	private Date study_date;
	private Date recruit_deadline;
	private char study_status;
	private Long study_likes;
	private String study_location;
	private String study_place;
	private Date study_post_time;
}
