package my.project.storage.utils.validators;

import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import lombok.RequiredArgsConstructor;

import java.lang.annotation.*;

@Constraint(validatedBy = StringValidator.class)
@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface StringValid {
    /**
     * Default error message
     */
    String message() default "String format is invalid";

    /**
     * method setting validation groups
     */
    Class<?>[] groups() default {};

    /**
     * method setting custom payload
     */
    Class<? extends Payload>[] payload() default {};

    /**
     * method setting default validation regex
     */
    String regex() default "[^<>]";

    /**
     * default validation requirement
     */
    boolean required() default false;

    /**
     * default max string size
     */
    int maxSize() default 2000;
}

