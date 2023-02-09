package my.project.storage.repository;

import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.ProductListData;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepositoryExt {

    Page<ProductListData> findByFilters(FilterParams params);

}
