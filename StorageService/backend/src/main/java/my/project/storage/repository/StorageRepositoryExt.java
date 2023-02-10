package my.project.storage.repository;

import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.ProductListData;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorageRepositoryExt {

    List<ProductListData> findByFilters(FilterParams params);

}
