package my.project.storage.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import my.project.storage.model.data.ResultStatus;
import my.project.storage.model.entity.Supplier;
import my.project.storage.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SupplierService {
    final private SupplierRepository supplierRepository;

    SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> getSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplier(Long id, HttpServletResponse response, HttpServletRequest request) {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if (supplier.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
//        if (user == null) {
//            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//            return null;
//        }
            return supplier.get();

    }

    public ResultStatus saveSupplier(Supplier supplier) {
        log.info("Adding product: {}", supplier);
        ResultStatus result = new ResultStatus();
        validateSupplier(result,supplier);
        try {
            supplierRepository.save(supplier);
            result.setSuccess(true);
            result.setResult(supplier);
            return result;
        } catch (Exception e) {
            log.error("Saving supplier failed: " + e.getMessage());
            result.getErrors().put("failed","Supplier was not saved. Error: " + e.getMessage());
            return result;
        }
    }

//    TODO checks
    public void deleteSupplier(Long supplierId, HttpServletResponse response, HttpServletRequest request) {
        Optional<Supplier> supplierToDelete = supplierRepository.findById(supplierId);
        if (supplierToDelete.isPresent()) {
            supplierRepository.delete(supplierToDelete.get());
        } else {
//            TODO maybe different code?
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    private void validateSupplier(ResultStatus result, Supplier supplier) {
        if (supplier.getAddress() == null) {
            result.getErrors().put("address","Supplier's address cannot be empty");
        }
        if (supplier.getName() == null) {
            result.getErrors().put("name","Supplier's name cannot be empty");
        }
        if (supplier.getCountry() == null) {
            result.getErrors().put("country","Supplier's country cannot be empty");
        }
        if (supplier.getPhoneNumber() == null) {
            result.getErrors().put("phoneNumber","Supplier's phone number cannot be empty");
        }
        if (supplier.getZipCode() == null) {
            result.getErrors().put("zipCode","Supplier's zip-code cannot be empty");
        }
    }

}
