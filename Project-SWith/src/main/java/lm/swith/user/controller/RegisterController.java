package lm.swith.user.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import lm.swith.user.Service.UserService;
import lm.swith.user.common.MsgEntity;
import lm.swith.user.model.ResponseDTO;
import lm.swith.user.model.SwithDTO;
import lm.swith.user.model.SwithUser;
import lm.swith.user.token.TokenProvider;
import lombok.RequiredArgsConstructor;

//@RestController
@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class RegisterController {
	private final UserService userService;
	private final TokenProvider tokenProvider;
	
	private final PasswordEncoder passwordEncoder;
	private SwithDTO convertToDTO(SwithUser user) {
		SwithDTO userDTO = new SwithDTO();
		userDTO.setEmail(user.getEmail());
		userDTO.setUser_no(user.getUser_no());
        userDTO.setUsername(user.getUsername());
        // 필요한 경우, 다른 필드도 추가로 복사

        return userDTO;
        }
	// -------- 토큰 발급 --------
	@PostMapping("/signin")
	public ResponseEntity<?> authenticate(@RequestBody SwithDTO siwthDTO) {
		SwithUser user = userService.getByCredentials(siwthDTO.getEmail(), siwthDTO.getPassword(), passwordEncoder);
		
        	// 사용자의 id, pwd 일치할 경우
		if(user != null) {
			// 토큰 생성
			final String token = tokenProvider.createAccessToken(user);  
			final SwithDTO responseUserDTO = SwithDTO.builder()
					.email(user.getEmail())
					.user_no(user.getUser_no())
					.username(user.getUsername())
					.token(token)          //반환된 토큰 적용
					.build();
			return ResponseEntity.ok().body(responseUserDTO);
		} else {
			ResponseDTO responseDTO = ResponseDTO.builder()
					.error("Login faild.")
					.build();
			return ResponseEntity.badRequest().body(responseDTO);
		}
		
	}
	
	@GetMapping("/userinfo")
	public ResponseEntity<SwithDTO> getUserInfo() {
        // 현재 인증된 사용자의 정보를 가져오는 로직
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        String userEmail = authentication.getName();
        System.out.println(userEmail);
        System.out.println("email" + userEmail);

        // MyBatis를 이용하여 사용자 정보를 조회
        SwithUser user = userService.getUserByEmail(userEmail);
        
        System.out.println("userno : " + user.getUser_no());
        System.out.println("username : " + user.getUsername());
        // User 엔터티를 UserDTO로 변환하여 반환
        SwithDTO userDTO = convertToDTO(user);
        System.out.println("usernoDT : " + userDTO.getUser_no());
        System.out.println("usernameDT : " + userDTO.getUsername());
        return ResponseEntity.ok(userDTO);
    }
	  @GetMapping("/")
	  public String MailPage(){
	      return "/";
	  }


		@PostMapping("/register")
		public ResponseEntity<SwithUser> registerUser(@RequestBody SwithUser swithUser){
			SwithUser createUser = userService.signUpUser(swithUser);
			return ResponseEntity.ok(createUser);
		}
}
