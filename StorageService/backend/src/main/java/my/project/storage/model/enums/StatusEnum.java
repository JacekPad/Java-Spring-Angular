package my.project.storage.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StatusEnum {

    OK("OK","Ok"),
    EMPTY("EMPTY","Empty"),
    WARNING("WARNING","Warning"),
    ALMOST_EMPTY("ALMOST_EMPTY","Almost empty"),
    DELIVERING("DELIVERING","Delivering");
    
    private final String code;
    private final String value;

    }
