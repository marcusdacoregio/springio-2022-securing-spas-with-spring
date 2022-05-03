package springio.email;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class EmailService {

	private final Deque<Email> emails;

	private long currentEmailId = 10;

	public EmailService() {
		this.emails = this.initializeDefaultEmails();
	}

	private LinkedList<Email> initializeDefaultEmails() {
		var email1 = new Email(this.currentEmailId++, "marcus@example.com", "crowd@example.com", "Hello", "Thanks for attending Spring I/O 2022!", LocalDateTime.now());
		var email2 = new Email(this.currentEmailId++, "rob@example.com", "marcus@example.com", "Subject 1", "Content 1", LocalDateTime.now());
		var email3 = new Email(this.currentEmailId++, "josh@example.com", "rob@example.com", "Very high sensitive content", "Content 2", LocalDateTime.now());

		return new LinkedList<>(Arrays.asList(email1, email2, email3));
	}

	public void send(String from, SendEmailRequest request) {
		Email email = new Email(this.currentEmailId++, from, request.to(), request.subject(), request.content(), LocalDateTime.now());
		this.emails.addFirst(email);
	}

	public List<Email> findAll(String to) {
		return this.emails.stream().filter(e -> to.equals(e.to())).toList();
	}

	public Optional<Email> findById(Long id) {
		return this.emails.stream().filter(email -> email.id().equals(id)).findFirst();
	}

	public void delete(Long id) {
		this.emails.removeIf(email -> email.id().equals(id));
	}
}
