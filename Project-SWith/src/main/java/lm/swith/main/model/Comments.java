package lm.swith.main.model;

import java.sql.Date;
import java.util.List;

import lombok.*;

@Getter @Setter
public class Comments {
	private Long comment_no;
	private Long user_no;
	private Long post_no;
	private String nickname;
	private byte[] user_profile;
	private String comment_content;
	private Date comment_post_time;

	private Users user;
}