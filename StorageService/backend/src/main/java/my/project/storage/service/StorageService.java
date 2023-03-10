package my.project.storage.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.ResultStatus;
import my.project.storage.model.data.StatusData;
import my.project.storage.model.entity.Product;
import my.project.storage.model.enums.StatusEnum;
import my.project.storage.repository.StorageRepository;
import my.project.storage.repository.StorageRepositoryExt;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class StorageService {

    private StorageRepository storageRepository;

    private StorageRepositoryExt storageRepositoryExt;


    StorageService(StorageRepository storageRepository, StorageRepositoryExt storageRepositoryExt) {
        this.storageRepository = storageRepository;
        this.storageRepositoryExt = storageRepositoryExt;
    }

    public List<Product> getProductsFiltered(FilterParams params) {
        return storageRepositoryExt.findByFilters(params);
    }

    public List<Product> getAllProducts() {
        return storageRepository.findAll();
    }

    @Transactional
    public ResultStatus addProduct(Product product) {
        log.info("Adding product: {}", product);
        //        move it somwhere else (custom repo?)
        ResultStatus result = new ResultStatus();
        validateProduct(result,product);
        try {
            storageRepository.save(product);
            result.setSuccess(true);
            result.setResult(product);
            return result;
        } catch (Exception e) {
            log.error("Saving product failed: " + e.getMessage());
            result.getErrors().put("failed", "Product was not saved. Error: " + e.getMessage());
            return result;
        }
    }

    public Product getProduct(Long id, HttpServletResponse response, HttpServletRequest request) {
        Optional<Product> product = storageRepository.findById(id);
        if (!product.isPresent()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
        return product.get();

    }

    public void removeProduct(Long id) {
        storageRepository.delete(storageRepository.findById(id).get());
    }

    public List<StatusData> getStatus() {
        return StatusData.convertToStatusData(List.of(StatusEnum.values()));
    }

    public Long countBySupplier(Long supplierId) {
        return storageRepository.countBySupplier(supplierId);
    }

    private void validateProduct(ResultStatus result, Product product) {
        if (product.getName() == null) {
            result.getErrors().put("name", "Product's name cannot be empty");
        }
        if (product.getType() == null) {
            result.getErrors().put("type", "Product's type cannot be empty");
        }
        if (product.getStatus() == null) {
            result.getErrors().put("status", "Product's status cannot be empty");
        }
        if (product.getSupplier() == null) {
            result.getErrors().put("supplier", "Product's supplier cannot be empty");
        }
        if (product.getQuantity() == null) {
            result.getErrors().put("quantityEmpty", "Product's quantity cannot be empty");
        }
        if (product.getQuantity() < 0) {
            result.getErrors().put("quantityMin", "Product's quantity cannot be less than 0");
        }
    }
}
