package springio;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class EmailService {

	private final Map<String, Email> emails = new ConcurrentHashMap<>();

	public void sendEmail(String sender, SendEmailRequest request) {
		Email email = new Email(sender, request.to(), request.subject(), request.message(), LocalDateTime.now());
		this.emails.put(email.to(), email);
	}

	public List<Email> findEmails(String receiver) {
		return this.emails.values().stream()
				.filter(email -> email.to().equals(receiver))
				.collect(Collectors.toList());
	}

}
