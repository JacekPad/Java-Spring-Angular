package my.project.storage.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.data.ResultStatus;
import my.project.storage.model.entity.Supplier;
import my.project.storage.service.SupplierService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@Validated
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
    public ResultStatus addSupplier(@RequestBody @Valid Supplier supplier, HttpServletResponse response, HttpServletRequest request) {
        ResultStatus result = supplierService.saveSupplier(supplier);
        if (result != null && !result.getErrors().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return result;
    }

    @GetMapping("/delete/{id}")
    public void deleteSupplier(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
        supplierService.deleteSupplier(id, response, request);
    }
}
