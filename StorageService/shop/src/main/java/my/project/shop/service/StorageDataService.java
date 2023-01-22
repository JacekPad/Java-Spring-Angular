package my.project.shop.service;

import my.project.shop.model.entity.Product;
import my.project.shop.repository.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StorageDataService {

    ProductRepo productRepo;

    StorageDataService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }
        public List<Product> getProducts() {
            return productRepo.findAllByOrderByIdAsc();
        }
}
