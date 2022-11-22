package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.UserLogin;
import by.spring.promo.promoDB.repository.AdminRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminService(AdminRepository adminRepository, ModelMapper modelMapper){
        this.adminRepository = adminRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public List<UserLogin> findAllPersonsByRole(String role) {
        return adminRepository.findAllPersonsByRole(role);
    }
}