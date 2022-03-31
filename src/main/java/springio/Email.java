package springio;

import java.time.LocalDateTime;

public record Email(String from, String to, String subject, String message, LocalDateTime sentOn) {
}
