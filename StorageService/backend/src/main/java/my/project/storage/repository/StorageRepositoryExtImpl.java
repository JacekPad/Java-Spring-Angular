package my.project.storage.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.ProductListData;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
public class StorageRepositoryExtImpl implements StorageRepositoryExt{

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<ProductListData> findByFilters(FilterParams params) {
        StringBuilder querySelect = new StringBuilder("SELECT * FROM PRODUCTS p");
        StringBuilder whereParamsQuery = new StringBuilder();

        if (params!= null) {
            if (params.getName() != null && !params.getName().isBlank()) {
                whereParamsQuery.append(" p.NAME = :name" );
            }
            if (params.getType() != null && !params.getType().isBlank()) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" p.TYPE = :type");
            }
            if (params.getCreated() != null) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" p.CREATED = :created");
            }
            if (params.getSupplier() != null && !params.getSupplier().isBlank()) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" p.SUPPLIER = :supplier");
            }
            if (params.getStatus() != null && !params.getStatus().isBlank()) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" p.STATUS = :status");
            }
            if (params.getQuantityMin() != null && params.getQuantityMin() != -1) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" p.QUANTITY > :quantity");
            }
            if (params.getQuantityMax() != null && params.getQuantityMax() != -1) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" p.QUANTITY < :quantity");
            }
        }

        log.info("sql query where section: {}" , whereParamsQuery);

//        Query query = em.createNativeQuery(queryWhere.toString());



        return null;
    }
}
