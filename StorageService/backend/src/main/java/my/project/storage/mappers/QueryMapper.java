package my.project.storage.mappers;

import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.entity.Product;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Component
@Slf4j
public class QueryMapper {

    public List<Product> mapQueryResultToProductList(List<Object[]> queryResult) {
        log.debug(queryResult.toString());
        log.debug(Arrays.toString(queryResult.get(0)));

        List<Product> productList = new ArrayList<>();
        queryResult.forEach(product -> {
            Product productData = new Product();
            productData.setId(((Float) product[0]).longValue());
            productData.setName((String) product[1]);
            productData.setType((String) product[2]);
            productData.setQuantity(((Float) product[3]).longValue());
            productData.setCreated(((Timestamp) product[4]).toLocalDateTime());
            productData.setStatus((String) product[5]);
            productData.setSupplier((String) product[6]);
            if (product[7] != null) {
                productData.setModified(((Timestamp) product[7]).toLocalDateTime());
            }
            productList.add(productData);
        });
        log.debug(productList.toString());
        return productList;
    }
}
