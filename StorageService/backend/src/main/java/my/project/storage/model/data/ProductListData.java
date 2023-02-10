package my.project.storage.model.data;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProductListData {

    private String id;
    private String name;
    private String type;
    private String quantity;
    private String status;
    private String supplier;
    private LocalDate created;
    private LocalDate modified;


}
