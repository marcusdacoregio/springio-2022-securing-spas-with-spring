package springio.email;

public record SendEmailRequest(String to, String subject, String content) {
}
