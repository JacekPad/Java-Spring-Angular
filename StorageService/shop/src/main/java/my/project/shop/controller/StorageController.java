package my.project.shop.controller;

import my.project.shop.model.entity.Product;
import my.project.shop.repository.ProductRepo;
import my.project.shop.service.StorageDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/storage")
public class StorageController {

    private ProductRepo productRepo;
    private StorageDataService storageService;

    StorageController(ProductRepo productRepo, StorageDataService storageService) {
        this.productRepo = productRepo;
        this.storageService = storageService;
    }

    @GetMapping ("/list")
    public List<Product> productList() {
       return storageService.getProducts();
    }

    @GetMapping("/createProduct")
    public String create() {
        Product product = new Product();
        product.setName("autoName");
        product.setType("autoType");
        product.setQuantity(5L);
        productRepo.save(product);
        return "created product";
    }
}
