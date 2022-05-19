package springio.bff;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestCustomizers;
import org.springframework.security.oauth2.client.web.server.DefaultServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;

@Configuration
public class BffSecurityConfiguration {

	@Bean
	SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http, ReactiveClientRegistrationRepository clientRegistrationRepository) {
		DefaultServerOAuth2AuthorizationRequestResolver pkceResolver = new DefaultServerOAuth2AuthorizationRequestResolver(clientRegistrationRepository);
		pkceResolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());
		// @formatter:off
		http
				.headers(headers -> headers
						.contentSecurityPolicy("script-src 'self'")
				)
				.authorizeExchange((authorize) -> authorize
						.anyExchange().authenticated()
				)
				.oauth2Login(login -> login
						.authorizationRequestResolver(pkceResolver)
				)
				.csrf((csrf) -> csrf
						.csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse())
				);
		// @formatter:on
		return http.build();
	}

}
