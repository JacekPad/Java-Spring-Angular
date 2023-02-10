package my.project.storage.model.data;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductListData {

    private String id;
    private String name;
    private String type;
    private String quantity;
    private String status;
    private String supplier;
    private LocalDateTime created;
    private LocalDateTime modified;


}
