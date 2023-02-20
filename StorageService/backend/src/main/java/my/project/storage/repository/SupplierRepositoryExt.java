package my.project.storage.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepositoryExt {

    Long ProductCountForSupplier(Long supplierId);
}
