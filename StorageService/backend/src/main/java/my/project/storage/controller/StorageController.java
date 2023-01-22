package my.project.storage.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import my.project.storage.model.entity.Product;
import my.project.storage.service.StorageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storage")
public class StorageController {

    private StorageService storageService;

    StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("")
    public List<Product> getProducts() {
        //        TODO securityCheck etc
        return storageService.getProducts();
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

    @PutMapping("/{id}")
    //        TODO securityCheck etc
    public void updateProduct(@PathVariable Long id) {
        storageService.updateProduct(id);
    }

}
