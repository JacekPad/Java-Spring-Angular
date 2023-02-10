package my.project.storage.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.ProductListData;
import my.project.storage.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Repository
@Slf4j
public class StorageRepositoryExtImpl implements StorageRepositoryExt{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<ProductListData> findByFilters(FilterParams params) {
//        TODO fix exception when no results
//         fix created date too detailed (only date month year)
//         maybe change to CREATED BEFORE (<=) :date
        StringBuilder querySelect = new StringBuilder("SELECT * FROM PRODUCTS p");
        StringBuilder whereParamsQuery = new StringBuilder();

        if (params!= null) {
            if (params.getName() != null && !params.getName().isBlank()) {
                whereParamsQuery.append(" UPPER(p.NAME) LIKE UPPER(:name)" );
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
                whereParamsQuery.append(" UPPER(p.CREATED) LIKE UPPER(:created)");
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

        log.info("sql query where section: {}" , queryString);



        Query query = em.createNativeQuery(queryString.toString());

        if (params!= null) {
            if (params.getName() != null && !params.getName().isBlank()) {
                query.setParameter("name",params.getName());
            }
            if (params.getType() != null && !params.getType().isBlank()) {
                query.setParameter("type",params.getType());
            }
            if (params.getCreated() != null) {
                query.setParameter("created",params.getCreated());
            }
            if (params.getSupplier() != null && !params.getSupplier().isBlank()) {
                query.setParameter("supplier",params.getSupplier());
            }
            if (params.getStatus() != null && !params.getStatus().isBlank()) {
                query.setParameter("status",params.getStatus());
            }
            if (params.getQuantityMin() != null && params.getQuantityMin() != -1) {
                query.setParameter("quantityMin",params.getQuantityMin());
            }
            if (params.getQuantityMax() != null && params.getQuantityMax() != -1) {
                query.setParameter("quantityMax",params.getQuantityMax());
            }
        }

        @SuppressWarnings("unchecked")
        List<Object[]> list = query.getResultList();

        log.debug(list.toString());
        log.debug(Arrays.toString(list.get(0)));

        List<ProductListData> productList = new ArrayList<>();
        list.forEach(product -> {
            ProductListData productData = new ProductListData();
            productData.setId(String.valueOf(((Float) product[0]).longValue()));
            productData.setName((String) product[1]);
            productData.setType((String) product[2]);
            productData.setQuantity(String.valueOf(((Float) product[3]).longValue()));
            productData.setCreated(((Timestamp) product[4]).toLocalDateTime());
            productData.setStatus((String) product[5]);
            productData.setSupplier((String) product[6]);
            if (product[7]!=null) {
                productData.setModified(((Timestamp) product[7]).toLocalDateTime());
            }
            productList.add(productData);
        });
        log.debug(productList.toString());
        return productList;

    }
}
