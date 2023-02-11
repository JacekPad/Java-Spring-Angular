package my.project.storage.config;

import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.format.DateTimeFormatter;

public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    private static final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern(
            "yyyy.MM.dd'T'HH.mm.ss");

//    TODO do some generic exception handlers
}
