package springio.email;

import java.time.LocalDateTime;

public record Email(Long id, String from, String to, String subject, String content, LocalDateTime sentOn) {
}
