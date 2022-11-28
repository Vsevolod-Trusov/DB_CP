package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.Good;
import by.spring.promo.promoDB.entity.Order;
import by.spring.promo.promoDB.entity.UserLogin;
import by.spring.promo.promoDB.repository.AdminRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
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
    public void updateOrderExecutorAndDeliveryPoint(Order order)
    { adminRepository.updateOrderSetExecutorAndDeliveryPoint(order);
    }

    @Transactional
    public List getRouteAnalysisBetweenTwoPoints(String getCustomerPointName){
        return adminRepository.getAnalysisBetweenTwoPointsInfo(getCustomerPointName);
    }

    @Transactional
    public List getAllPoitNames() {
        return adminRepository.getAllPointNames();
    }

    @Transactional
    public void addGood(String getName, String getDescription, BigDecimal getPrice ) {
        adminRepository.addGood(getName, getDescription, getPrice);
    }
    @Transactional
    public void deleteGoodByName(String getName) {
        adminRepository.deleteGoodByName(getName);
    }

    public List getStaffByDeliveryPointName(String deliveryPointName) {
        return adminRepository.getStaffByDeliveryPointName(deliveryPointName);
    }
}