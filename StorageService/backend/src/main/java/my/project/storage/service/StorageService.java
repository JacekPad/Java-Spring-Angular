package my.project.storage.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.StatusData;
import my.project.storage.model.entity.Product;
import my.project.storage.model.enums.StatusEnum;
import my.project.storage.repository.StorageRepository;
import my.project.storage.repository.StorageRepositoryExt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class StorageService {

    private StorageRepository storageRepository;

    private StorageRepositoryExt storageRepositoryExt;


    StorageService (StorageRepository storageRepository, StorageRepositoryExt storageRepositoryExt) {
        this.storageRepository = storageRepository;
        this.storageRepositoryExt = storageRepositoryExt;
    }
    public List<Product> getProductsFiltered(FilterParams params) {
        return storageRepositoryExt.findByFilters(params);
    }
    public List<Product> getAllProducts() {
        return storageRepository.findAll();
    }

    public void addProduct(Product product) {
        log.info("Adding product: {}", product);
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

    public List<StatusData> getStatus() {
        return StatusData.convertToStatusData(List.of(StatusEnum.values()));
    }
}
