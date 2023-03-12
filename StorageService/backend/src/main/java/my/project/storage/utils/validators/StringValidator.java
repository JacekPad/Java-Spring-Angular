package my.project.storage.utils.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class StringValidator implements ConstraintValidator<StringValid, String> {
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
