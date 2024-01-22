package lm.swith.user.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import lm.swith.user.model.SwithUser;

@Mapper
public interface UsersMapper {
	void insertUser(SwithUser swithUser);
	
	
	SwithUser findUserRole(String role);
	
	
	List<SwithUser> findUsersAll();
	
	SwithUser findByEmail(String email);
	
	Boolean existsByEmail(String email);

	SwithUser findByEmailAndPassword(String email, String password);
	

}
