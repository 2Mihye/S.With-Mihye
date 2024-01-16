package lm.swith.main.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class StudyPost {
	private Long post_no;
	private Long user_no;
	private Long comment_no;
	private Long study_no;
	private Long skill_no;
	private String study_title;
	private String study_content;
	private String study_method;
	private String recruit_type;
	private String study_period;
	private Date study_start;
	private Date study_deadline;
	private char study_status;
	private int study_likes;
	private String study_location;
	private int mentor_applicants;
	private int max_mentor_applicants;
	private int mentee_applicants;
	private int max_mentee_applicants;
}
