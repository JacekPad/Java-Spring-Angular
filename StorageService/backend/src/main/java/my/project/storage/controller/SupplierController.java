package my.project.storage.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.entity.Supplier;
import my.project.storage.service.SupplierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/supplier")
public class SupplierController {
//TODO checks validations security etc.
    private final SupplierService supplierService;

    SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping("")
    public List<Supplier> getSuppliers() {
        return supplierService.getSuppliers();
    }

    @GetMapping("/{id}")
    public Supplier getSupplier(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
        return supplierService.getSupplier(id, response, request);
    }

    @PostMapping("/add")
    public void addSupplier(@RequestBody Supplier supplier) {
        supplierService.saveSupplier(supplier);
    }

    @GetMapping("/delete/{id}")
    public void deleteSupplier(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
        supplierService.deleteSupplier(id, response, request);
    }
}
