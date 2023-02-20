package my.project.storage.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import my.project.storage.model.data.FilterParams;
import my.project.storage.model.data.StatusData;
import my.project.storage.model.entity.Product;
import my.project.storage.service.StorageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storage")
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
        List<Product> productsFiltered = storageService.getAllProducts();
        return productsFiltered;
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
        //        TODO securityCheck etc
        return storageService.getProduct(id, response, request);
    }

    @PostMapping("/add")
    public void addProduct(@RequestBody Product product) {
        //        TODO securityCheck etc
        storageService.addProduct(product);
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

}
