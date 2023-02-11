package my.project.storage.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StatusEnum {
    OK,
    EMPTY,
    WARNING,
    ALMOST_EMPTY,
    DELIVERING
}
