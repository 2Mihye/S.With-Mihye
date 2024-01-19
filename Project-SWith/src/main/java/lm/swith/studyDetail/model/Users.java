package lm.swith.studyDetail.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Users {
	private Long user_no;
	private String email;
	private String nickname;
	private String user_password;
	private String user_name;
	private String user_profile;
	private String user_address;
	private String user_introduction;
	private String user_role;
}
