package my.project.storage.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
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
        } else {
            return supplier.get();
        }
    }

//    TODO checks
    public void saveSupplier(Supplier supplier) {
        supplierRepository.save(supplier);
    }

    public void deleteSupplier(Long supplierId, HttpServletResponse response, HttpServletRequest request) {
        Optional<Supplier> supplierToDelete = supplierRepository.findById(supplierId);
        if (supplierToDelete.isPresent()) {
            supplierRepository.delete(supplierToDelete.get());
        } else {
//            TODO maybe different code?
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

}
