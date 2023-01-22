package my.project.storage.service;

import my.project.storage.model.entity.Product;
import my.project.storage.repository.StorageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StorageService {

    private StorageRepository storageRepository;

    StorageService (StorageRepository storageRepository) {
        this.storageRepository = storageRepository;
    }

    public List<Product> getProducts() {
        return storageRepository.findAllByOrderByIdAsc();
    }

}
