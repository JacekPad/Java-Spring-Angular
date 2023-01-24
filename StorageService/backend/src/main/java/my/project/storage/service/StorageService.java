package my.project.storage.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import my.project.storage.model.entity.Product;
import my.project.storage.repository.StorageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StorageService {

    private StorageRepository storageRepository;

    StorageService (StorageRepository storageRepository) {
        this.storageRepository = storageRepository;
    }

    public List<Product> getProducts() {
        return storageRepository.findAllByOrderByIdAsc();
    }

    public void addProduct(Product product) {
        storageRepository.save(product);
    }

    public Product getProduct(Long id, HttpServletResponse response, HttpServletRequest request) {
        Optional<Product> product = storageRepository.findById(id);
        if (!product.isPresent()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        } else {
            return product.get();
        }
    }

    public void removeProduct(Long id) {
        storageRepository.delete(storageRepository.findById(id).get());
    }

    public void updateProduct(Long id) {
//        TODO changePut????
        storageRepository.save(storageRepository.findById(id).get());

    }
}
