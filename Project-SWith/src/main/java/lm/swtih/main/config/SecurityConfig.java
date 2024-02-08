package lm.swtih.main.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	 @Bean
	    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		 

	        http
	        .cors(cors -> cors.disable()).csrf(csrf -> csrf.disable())
	            .authorizeHttpRequests(authorizeRequests -> 
	                authorizeRequests
	                    .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
	            )
	            .formLogin(formLogin ->
	                formLogin
	                    .loginPage("/users/login")
	                    .usernameParameter("email")
	                    .defaultSuccessUrl("/users/home")
	            )
	            .logout(logout ->
	                logout
	                    .logoutRequestMatcher(new AntPathRequestMatcher("/users/logout"))
	                    .logoutSuccessUrl("/")
	                    .invalidateHttpSession(true)
	            );
	             // Disable CSRF protection

	        return http.build();
	    }

		
	@Bean
	static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // 기본형식인 Security는 기본적으로 DelegatingPasswordEncoder를 BCryptPasswordEncoder() 형식으로 저장
	}
		

}