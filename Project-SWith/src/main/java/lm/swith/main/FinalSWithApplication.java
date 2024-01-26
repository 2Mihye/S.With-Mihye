package lm.swith.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FinalSWithApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalSWithApplication.class, args);
	}
	
	//http://localhost:3000/ to 8080
	//Cross Origin Requests : 브라우저에서 다른 출처의 리소스를 공유하는 방법
	//Allow all requests only from http://localhost:3000/
	
	@Bean
	public WebMvcConfigurer corsConfigure() {
		return new WebMvcConfigurer(){
			
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedMethods("*")
				.allowedOrigins("http://localhost:3000");
			}
		};
	}
}
