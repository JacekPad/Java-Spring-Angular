package my.project.storage.model.data;

import lombok.Data;
import my.project.storage.model.enums.StatusEnum;

import java.util.ArrayList;
import java.util.List;

@Data
public class StatusData {

    private String code;
    private String value;

    public static List<StatusData> convertToStatusData(List<StatusEnum> enumList) {
        List<StatusData> statusDataList = new ArrayList<>();
        enumList.forEach(status -> {
            StatusData statusData = new StatusData();
            statusData.setCode(status.getCode());
            statusData.setValue(status.getValue());
            statusDataList.add(statusData);
        });
        return statusDataList;
    }
}
