package my.project.shop.repository;

import my.project.shop.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderByIdAsc();
}
