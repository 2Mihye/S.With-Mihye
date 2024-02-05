package lm.swith.main.common.model;

import lombok.*;

@Getter @Setter
public class Mentee { // 멘티
	private Long mentee_no;
	private Long user_no;
	private Long post_no;
	private int max_mentee_applicants;
	private int mentee_join_member;
	private String mentee_status;
}
