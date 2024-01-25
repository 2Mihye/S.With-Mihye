package lm.swith.main.model;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class StudyPost {
	private Long post_no;
	private Long user_no;
	private Long comment_no;
	private String nickname;
	private String study_title;
	private String study_content;
	private String study_method;
	private String recruit_type;
	private String study_period;
	private Date study_start;
	private Date recruit_deadline;
	private char study_status;
	private Long study_likes;
	private String study_location;
	private String first_study;
	private Date study_post_time;
    private int mentorCount;
    private int menteeCount;
    private int applicationCount;
	
	private List<Skill> studyPostWithSkills;
	
	private Users user;
	
    private Mentor mentor;
    private Mentee mentee;
    private StudyApplication studyApplication;
	
    public List<Skill> getStudyPostWithSkills() {
        return studyPostWithSkills;
    }
    
    public void setStudyPostWithSkills(List<Skill> studyPostWithSkills) {
        this.studyPostWithSkills = studyPostWithSkills;
    }
    
    
    public String getNickname() {
        return user != null ? user.getNickname() : null;
    }

    public Mentor getMentor() {
        return mentor;
    }

    public void setMentor(Mentor mentor) {
        this.mentor = mentor;
    }
    
    public Mentee getMentee() {
    	return mentee;
    }
    
    public void setMentee(Mentee mentee) {
    	this.mentee = mentee;
    }
    
    public StudyApplication getStudyApplication() {
    	return studyApplication;
    }
    
    public void setStudyApplication(StudyApplication studyApplication) {
    	this.studyApplication = studyApplication;
    }
    
    public int getMentorCount() {
        return mentorCount;
    }

    public void setMentorCount(int mentorCount) {
        this.mentorCount = mentorCount;
    }

    public int getMenteeCount() {
        return menteeCount;
    }

    public void setMenteeCount(int menteeCount) {
        this.menteeCount = menteeCount;
    }

    public int getApplicationCount() {
        return applicationCount;
    }

    public void setApplicationCount(int applicationCount) {
        this.applicationCount = applicationCount;
    }
    
    
}
