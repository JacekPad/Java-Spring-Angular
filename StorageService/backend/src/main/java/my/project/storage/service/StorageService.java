package my.project.storage.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.ProductListData;
import my.project.storage.model.entity.Product;
import my.project.storage.repository.StorageRepository;
import my.project.storage.repository.StorageRepositoryExt;
import my.project.storage.repository.StorageRepositoryExtImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StorageService {

    private StorageRepository storageRepository;

    private StorageRepositoryExt storageRepositoryExt;

    StorageService (StorageRepository storageRepository, StorageRepositoryExt storageRepositoryExt) {
        this.storageRepository = storageRepository;
        this.storageRepositoryExt = storageRepositoryExt;
    }
    public List<ProductListData> getProductsFiltered(FilterParams params) {
        return storageRepositoryExt.findByFilters(params);
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
