package lm.swith.user.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.user.model.SwithUser;

@Mapper
public interface UsersMapper {
	void insertUser(SwithUser swithUser);
	
	
	SwithUser findUserRole(String role);
	
	
	List<SwithUser> findUsersAll();
	
	SwithUser findByEmail(String email);
	
	SwithUser findByNickname(String nickname);

	SwithUser findByEmailAndPassword(String email, String password);
	
	//void updateIntroduction(String email, String newIntroduction);
	void updateUser(SwithUser swithUser);
	
	void updatePassword (SwithUser swithUser); //update password
	
	void updateUserProfile(SwithUser swithUser);
	
	void deleteUser(SwithUser swithUser);
	
	SwithUser findByUserNo(Long user_no);
}
