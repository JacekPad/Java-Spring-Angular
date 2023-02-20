package my.project.storage.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.mappers.QueryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class SupplierRepositoryExtImpl implements SupplierRepositoryExt{

    @PersistenceContext
    private EntityManager em;

    @Autowired
    QueryMapper queryMapper;

    @Override
    public Long ProductCountForSupplier(Long supplierId) {
        String queryString = "SELECT COUNT(*) FROM PRODUCTS p WHERE p.supplier = :id";

        Query query = em.createNativeQuery(queryString);
        query.setParameter("id",supplierId);

        Long count = (Long) query.getResultList().get(0);
        log.debug("number of products for supplier {}: {}", supplierId, count);
        return 1L;
    }
}
