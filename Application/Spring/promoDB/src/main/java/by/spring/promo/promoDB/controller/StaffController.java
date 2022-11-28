package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.entity.UserLogin;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.repository.StaffRepository;
import by.spring.promo.promoDB.service.AdminService;
import by.spring.promo.promoDB.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StaffController {

    private final StaffService staffService;
    private final AdminService adminService;

    @Autowired
    public StaffController(StaffService staffService, StaffRepository staffRepository, AdminService adminService) {
        this.staffService = staffService;
        this.adminService = adminService;
    }


    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody UserLogin userLogin) throws SuchProfileLoginExistsException {
        adminService.registerUserNote(userLogin.getLogin(), userLogin.getPassword(),
                userLogin.getRole(), userLogin.getEmail(), userLogin.getPointName());
        return ResponseEntity.ok("User "+ userLogin.getLogin()+" registered");
    }

    @PostMapping("/authorization")
    public ResponseEntity<Authorization> authorization(@RequestBody UserLogin getAuthorization) {
        return ResponseEntity.ok(adminService.authorizationUserNote(getAuthorization.getLogin(),
                getAuthorization.getPassword()));
    }
    @GetMapping("/reviews")
    public List<Review> getReviews(){
        return staffService.findAllReviews();
    }

    @GetMapping("/order/{orderName}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable String orderName){
        staffService.updateOrderStatus(orderName, "executed");
        return ResponseEntity.ok("Order "+orderName+" updated successfully");
    }

    @GetMapping("/orders/{staffLogin}")
    public ResponseEntity<List> getOrdersByStaffLogin(@PathVariable String staffLogin){
        return ResponseEntity.ok(staffService.getOrdersByStaffLogin(staffLogin));
    }

}
