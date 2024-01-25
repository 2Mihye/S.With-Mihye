package lm.swith.main.model;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class StudyPost { // 스터디 게시글
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
	
	private List<Skill> studyPostWithSkills; // 같은 post_no 와 함께있는 skill_no 리스트로 저장
	
	private Users user; // 유저테이블
	
    private Mentor mentor; // 멘토 테이블
    private Mentee mentee; // 멘티 테이블
    private StudyApplication studyApplication; // 스터디 참가 현황 테이블
	
    public List<Skill> getStudyPostWithSkills() { // skill_no get
        return studyPostWithSkills;
    }
    
    public void setStudyPostWithSkills(List<Skill> studyPostWithSkills) { // skill_no set
        this.studyPostWithSkills = studyPostWithSkills;
    }
    
    
    public String getNickname() { // 유저 테이블에서 user가 null이 아니라면 nickname 반환 null이면 null 반환
        return user != null ? user.getNickname() : null;
    }

    public Mentor getMentor() { // 멘토 테이블 정보 get
        return mentor;
    }

    public void setMentor(Mentor mentor) { // 멘토 테이블 정보 set
        this.mentor = mentor;
    }
    
    public Mentee getMentee() { // 멘티 테이블 정보 get
    	return mentee;
    }
    
    public void setMentee(Mentee mentee) { // 멘티 테이블 정보 set
    	this.mentee = mentee;
    }
    
    public StudyApplication getStudyApplication() { // 스터디 참가 현황 테이블 정보 get
    	return studyApplication;
    }
    
    public void setStudyApplication(StudyApplication studyApplication) { // 스터디 참가 현황 테이블 정보 set
    	this.studyApplication = studyApplication;
    }
    
    public int getMentorCount() { // 멘토 참가수 get
        return mentorCount;
    }

    public void setMentorCount(int mentorCount) { // 멘토 참가수 set
        this.mentorCount = mentorCount;
    }

    public int getMenteeCount() { // 멘티 참가수 get
        return menteeCount;
    }

    public void setMenteeCount(int menteeCount) { // 멘티 참가수 set
        this.menteeCount = menteeCount;
    }

    public int getApplicationCount() { // 스터디 참가수 get
        return applicationCount;
    }

    public void setApplicationCount(int applicationCount) { // 스터디 참가수 set
        this.applicationCount = applicationCount;
    }
    
    
}
