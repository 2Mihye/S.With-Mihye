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
	// 스터디 게시글 ===================== 여기까지 Study_Post 테이블 칼럼
	
    private int mentorCount; // mentor에서 status가 '승인'인 user count
    private int menteeCount; // mentee에서 status가 '승인'인 user count
    private int applicationCount; // study_application에서 status가 '승인'인 user count
    private String skill_name; // join 했을 때 skill 이름 받을 곳
    private String skill_img; // join 했을 때 skill img 받을 곳
	
	private List<Skill> studyPostWithSkills; // 같은 post_no 와 함께있는 skill_no 리스트로 저장
	
	private List<Comments> comments; // 댓글들 담을 곳
	
	private Users user; // 유저테이블
	
    private Mentor mentor; // 멘토 테이블
    private Mentee mentee; // 멘티 테이블
    private StudyApplication studyApplication; // 스터디 참가 현황 테이블
	
}
