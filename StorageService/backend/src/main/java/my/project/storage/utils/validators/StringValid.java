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

@RequiredArgsConstructor
class StringValidator implements ConstraintValidator<StringValid, String> {
    private String regex;

    private int maxSize;

    private boolean required;

    @Override
    public void initialize(StringValid constraintAnnotation) {
        this.maxSize = constraintAnnotation.maxSize();
        this.regex = constraintAnnotation.regex();
        this.required = constraintAnnotation.required();
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return isSizeOk(s) && isRegexOk(s, required);
    }

    private boolean isSizeOk(String stringField) {
        if (stringField != null) {
            return stringField.length() <= maxSize;
        }
        return true;
    }

    private boolean isRegexOk(String stringField, boolean required) {
        if (stringField != null) {
            if (required) {
                return stringField.matches(regex + "+");
            } else {
                return stringField.matches(regex + "*");
            }
        }
        return true;
    }
}
