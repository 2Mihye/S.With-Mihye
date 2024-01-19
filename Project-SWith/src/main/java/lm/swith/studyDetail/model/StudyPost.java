package lm.swith.studyDetail.model;

import java.sql.Date;
import java.util.List;

import lm.swith.main.model.Skill;
import lm.swith.main.model.Users;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StudyPost {
	private Long post_no;
	private Long user_no;
	private String nickname;
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
	private List<Skill> studyPostWithSkills;
	
	private Users user;
	
    public List<Skill> getStudyPostWithSkills() {
        return studyPostWithSkills;
    }
    
    public void setStudyPostWithSkills(List<Skill> studyPostWithSkills) {
        this.studyPostWithSkills = studyPostWithSkills;
    }
    
    
    public String getNickname() {
        return user != null ? user.getNickname() : null;
    }
}
