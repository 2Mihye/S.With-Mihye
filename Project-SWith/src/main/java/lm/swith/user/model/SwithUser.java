package lm.swith.user.model;
import java.sql.Blob;

/*
 USER_NO -> userNO
 USER_ID ->userID
 USER_PASSWORD ->password
 USER_NAME ->userName
 USER_NICKNAME->userNickname
 USER_PROFILE->userProfile
 USER_ADDRESS ->userAddress
 USER_INTRODUCTION
 USER_ROLE ->role
 * */
import lombok.*;

@Builder
@Getter
@Setter
public class SwithUser {
	private Long user_no; //sequence
	private String email; //email
	private String password;//pw
	private String username;//real name
	private String nickname;//nickname
	private String userprofile; //profile img
	private String useraddress;//address
	private String userintroduction;//introduction
	private String role;// authorization(user / admin) kakao,github
	
	public SwithUser() {};
	
	public SwithUser(Long user_no, String email, String password, String username, String nickname,
            String userprofile, String useraddress, String userintroduction, String role) {
				this.user_no = user_no;
				this.email = email;
				this.password = password;
				this.username = username;
				this.nickname = nickname;
				this.userprofile = userprofile;
				this.useraddress = useraddress;
				this.userintroduction = userintroduction;
				this.role = role;
		}
}
