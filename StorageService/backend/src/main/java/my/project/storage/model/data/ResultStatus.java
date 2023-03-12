package my.project.storage.model.data;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class ResultStatus {
    private boolean isSuccess; // operation is a success

    private Map<String, String> errors;

    private Object result;

    public ResultStatus() {
        this.isSuccess = false;
        this.errors = new HashMap<>();
    }
}
