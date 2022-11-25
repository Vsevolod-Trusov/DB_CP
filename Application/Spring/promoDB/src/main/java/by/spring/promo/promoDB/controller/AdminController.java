package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.Order;
import by.spring.promo.promoDB.entity.UserLogin;
import by.spring.promo.promoDB.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
    private final Logger log = Logger.getLogger(CustomerController.class.getName());
    private final AdminService adminService;
    private final ModelMapper modelMapper;

    public AdminController(AdminService adminService, ModelMapper modelMapper) {
        this.adminService = adminService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/points")
    public ResponseEntity<List> getAllPointNames() {
        return ResponseEntity.ok(adminService.getAllPoitNames());
    }
    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody UserLogin userLogin) {
        adminService.registerUserNote(userLogin.getLogin(), userLogin.getPassword(),
                userLogin.getRole(), userLogin.getEmail(), userLogin.getPointName());
        return ResponseEntity.ok("User "+ userLogin.getLogin()+" registered");
    }

    @PostMapping("/authorization")
    public ResponseEntity<Authorization> authorization(@RequestBody UserLogin getAuthorization) {
        return ResponseEntity.ok(adminService.authorizationUserNote(getAuthorization.getLogin(),
                getAuthorization.getPassword()));
    }
    @GetMapping("/users")
    public List<UserLogin> getUsers() {
        return adminService.findAllPersonsByRole("user");
    }


    @GetMapping("/orders")
    public ResponseEntity<List> getUnprocessedOrders() {
        return ResponseEntity.ok(adminService.findUnprocessedOrders());
    }

    @PostMapping("/order")
    public ResponseEntity<String> updateOrderExecutorAndDeliveryPoint(@RequestBody Order getOrder){
        adminService.updateOrderExecutorAndDeliveryPoint(getOrder.getOrderName(),
                getOrder.getExecutorLogin(), getOrder.getDeliveryAddress());
        return ResponseEntity.ok("Order "+ getOrder.getOrderName()+" updated successfully");
    }

    @GetMapping("/route/{customerPointName}")
    public ResponseEntity<List> getRouteAnalysisBetweenTwoPoints(@PathVariable String customerPointName){
        return ResponseEntity.ok(adminService.getRouteAnalysisBetweenTwoPoints(customerPointName));
    }
}
