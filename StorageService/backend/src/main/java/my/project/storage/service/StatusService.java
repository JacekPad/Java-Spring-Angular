package my.project.storage.service;

import my.project.storage.model.entity.Status;
import my.project.storage.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;

    public List<Status> getStatus() {
        return statusRepository.findAll();
    }
}
