package my.project.storage.repository;

import my.project.storage.model.data.FilterParams;
import my.project.storage.model.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorageRepositoryExt {

    List<Product> findByFilters(FilterParams params);

}
