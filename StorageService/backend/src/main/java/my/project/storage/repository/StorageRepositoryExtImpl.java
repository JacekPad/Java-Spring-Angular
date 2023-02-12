package my.project.storage.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.mappers.QueryMapper;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class StorageRepositoryExtImpl implements StorageRepositoryExt {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    QueryMapper queryMapper;

    /** Taking search params from frontend request and querying results from database **/
    @Override
    public List<Product> findByFilters(FilterParams params) {
        StringBuilder querySelect = new StringBuilder("SELECT * FROM PRODUCTS p");
        StringBuilder whereParamsQuery = new StringBuilder();

//      Adding search params
        if (params != null) {
            if (params.getName() != null && !params.getName().isBlank()) {
                whereParamsQuery.append(" UPPER(p.NAME) LIKE UPPER(:name)");
            }
            if (params.getType() != null && !params.getType().isBlank()) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" UPPER(p.TYPE) LIKE UPPER(:type)");
            }
            if (params.getCreated() != null) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" UPPER(p.CREATED) <= UPPER(:created)");
            }
            if (params.getSupplier() != null && !params.getSupplier().isBlank()) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" UPPER(p.SUPPLIER) LIKE UPPER(:supplier)");
            }
            if (params.getStatus() != null && !params.getStatus().isBlank()) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" UPPER(p.STATUS) LIKE UPPER(:status)");
            }
            if (params.getQuantityMin() != null && params.getQuantityMin() != -1) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" UPPER(p.QUANTITY) >= UPPER(:quantityMin)");
            }
            if (params.getQuantityMax() != null && params.getQuantityMax() != -1) {
                if (!whereParamsQuery.isEmpty()) {
                    whereParamsQuery.append(" AND");
                }
                whereParamsQuery.append(" UPPER(p.QUANTITY) <= UPPER(:quantityMax)");
            }
        }
        StringBuilder queryString = querySelect.append(" WHERE").append(whereParamsQuery);

        log.debug("sql query where section: {}", queryString);

        Query query = em.createNativeQuery(queryString.toString());

        if (params != null) {
            if (params.getName() != null && !params.getName().isBlank()) {
                query.setParameter("name", params.getName());
            }
            if (params.getType() != null && !params.getType().isBlank()) {
                query.setParameter("type", params.getType());
            }
            if (params.getCreated() != null) {
                query.setParameter("created", params.getCreated());
            }
            if (params.getSupplier() != null && !params.getSupplier().isBlank()) {
                query.setParameter("supplier", params.getSupplier());
            }
            if (params.getStatus() != null && !params.getStatus().isBlank()) {
                query.setParameter("status", params.getStatus());
            }
            if (params.getQuantityMin() != null && params.getQuantityMin() != -1) {
                query.setParameter("quantityMin", params.getQuantityMin());
            }
            if (params.getQuantityMax() != null && params.getQuantityMax() != -1) {
                query.setParameter("quantityMax", params.getQuantityMax());
            }
        }
        @SuppressWarnings("unchecked")
        List<Object[]> queryResultList = query.getResultList();
        if (!queryResultList.isEmpty()) {
            //Mapping all query results to product object
            return queryMapper.mapQueryResultToProductList(queryResultList);
        }
        return List.of();
    }
}
