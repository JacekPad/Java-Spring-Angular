package my.project.storage.repository;

import my.project.storage.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorageRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderByIdAsc();
}
