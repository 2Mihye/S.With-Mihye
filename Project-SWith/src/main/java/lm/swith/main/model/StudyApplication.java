package lm.swith.main.model;

import lombok.*;

@Getter @Setter
public class StudyApplication { // 스터디 신청 현황 테이블
	private Long post_no;
	private Long user_no;
	private String nickname; // join 해서 받아올 nickname 받을 변수명
	private String status;
	private int max_study_applicants;
}