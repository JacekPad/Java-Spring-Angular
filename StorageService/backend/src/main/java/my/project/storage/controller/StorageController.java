package my.project.storage.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.ResultStatus;
import my.project.storage.model.data.StatusData;
import my.project.storage.model.entity.Product;
import my.project.storage.service.StorageService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storage")
@Validated
public class StorageController {

    private final StorageService storageService;

    StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("")
    public List<Product> getProducts(@RequestBody FilterParams params) {
        List<Product> productsFiltered = storageService.getProductsFiltered(params);
        return productsFiltered;
    }

    @GetMapping("")
    public List<Product> getProduct() {
        return storageService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
        //        TODO securityCheck etc
        return storageService.getProduct(id, response, request);
    }

    @PostMapping("/add")
    public ResultStatus addProduct(@RequestBody @Valid Product product, HttpServletRequest request, HttpServletResponse response) {
        //        TODO securityCheck etc
        ResultStatus result = storageService.addProduct(product);
        if (result != null && !result.getErrors().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return result;
    }

    @GetMapping("/remove/{id}")
    //        TODO securityCheck etc
    public void removeProduct(@PathVariable Long id) {
        storageService.removeProduct(id);
    }

    @GetMapping("/status")
    public List<StatusData> getStatus() {
        return storageService.getStatus();
    }

    @GetMapping("/product-count/{id}")
    public Long countBySupplier(@PathVariable(name = "id") Long supplierId) {
        return storageService.countBySupplier(supplierId);
    }

    @GetMapping("/supplier-products/{id}")
    public List<Product> getProductsForSupplier(@PathVariable(name = "id") Long supplierId, HttpServletResponse response, HttpServletRequest request) {
        return storageService.getProductsForSupplier(supplierId, response, request);
    }

}
