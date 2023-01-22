package my.project.storage.controller;

import my.project.storage.model.entity.Product;
import my.project.storage.service.StorageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/storage")
public class StorageController {

    private StorageService storageService;

    StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return storageService.getProducts();
    }
}
