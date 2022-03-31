package springio;

public record SendEmailRequest(String to, String subject, String message) {
}
