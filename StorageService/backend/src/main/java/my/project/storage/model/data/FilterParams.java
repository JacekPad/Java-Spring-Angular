package my.project.storage.model.data;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FilterParams {

    private String name;
    private String type;
    private LocalDateTime created;
    private String supplier;
    private String status;
    private Long quantityMin;
    private Long quantityMax;
}
