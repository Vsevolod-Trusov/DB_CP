package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.Authorization;
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
    public void registerUserNote(String getLogin, String getPassword, String getRole, String getEmail,
                                 String getPointName){
         adminRepository.register(getLogin, getPassword, getRole, getEmail, getPointName);
    }

    @Transactional
    public Authorization authorizationUserNote(String getLogin, String getPassword){
        return adminRepository.authorization(getLogin, getPassword);
    }

    @Transactional
    public List<UserLogin> findAllPersonsByRole(String role) {
        return adminRepository.findAllPersonsByRole(role);
    }

    @Transactional
    public List findUnprocessedOrders(){
        return adminRepository.findUnprocessedOrders();
    }
    @Transactional
    public void updateOrderExecutorAndDeliveryPoint(String getOrderName,
                                                    String getExecutorLogin,
                                                    String deliveryPointName)
    { adminRepository.updateOrderSetExecutorAndDeliveryPoint(getOrderName,
            getExecutorLogin,  deliveryPointName);
    }

    @Transactional
    public List getRouteAnalysisBetweenTwoPoints(String getCustomerPointName){
        return adminRepository.getAnalysisBetweenTwoPointsInfo(getCustomerPointName);
    }

    public List getAllPoitNames() {
        return adminRepository.getAllPointNames();
    }
}