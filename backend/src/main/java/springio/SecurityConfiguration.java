package springio;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class SecurityConfiguration {

	@Bean
	SecurityFilterChain appSecurity(HttpSecurity http) throws Exception {
		http
			.cors(Customizer.withDefaults())
			.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
			.authorizeHttpRequests((requests) -> requests
				.anyRequest().authenticated()
			)
			.formLogin((form) -> form
				.successHandler((req, res, auth) -> res.setStatus(HttpStatus.OK.value()))
				.failureHandler((req, res, auth) -> res.setStatus(HttpStatus.UNAUTHORIZED.value()))
			)
			.exceptionHandling((exception) -> exception
				.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
			);
		return http.build();
	}

	@Bean
	UserDetailsService userDetailsService() {
		UserDetails marcus = User.withDefaultPasswordEncoder().username("marcus@example.com").password("password").roles("USER").build();
		UserDetails rob = User.withDefaultPasswordEncoder().username("rob@example.com").password("password").roles("USER").build();
		UserDetails josh = User.withDefaultPasswordEncoder().username("josh@example.com").password("password").roles("USER").build();
		return new InMemoryUserDetailsManager(marcus, rob, josh);
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		config.addAllowedOrigin("http://localhost:4200");
		config.setAllowCredentials(true);
		source.registerCorsConfiguration("/**", config);
		return source;
	}

}
