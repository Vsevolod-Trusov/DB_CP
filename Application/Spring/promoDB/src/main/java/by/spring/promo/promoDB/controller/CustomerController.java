package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.*;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.service.AdminService;
import by.spring.promo.promoDB.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CustomerController {

    private final CustomerService customerService;
    private final AdminService adminService;

    public CustomerController(CustomerService customerService, AdminService adminService) {
        this.customerService = customerService;
        this.adminService = adminService;
    }

    @GetMapping("/routes/{userLogin}")
    public ResponseEntity<List> getRoutesByUserLogin(@PathVariable String userLogin){
        return ResponseEntity.ok(customerService.getRoutesByUserLogin(userLogin));
    }
    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody UserLogin userLogin) throws SuchProfileLoginExistsException {
        adminService.registerUserNote(userLogin.getLogin(), userLogin.getPassword(),
                userLogin.getRole(), userLogin.getEmail(), userLogin.getPointName());
        return ResponseEntity.ok("User "+ userLogin.getLogin()+" registered");
    }

    @PostMapping("/authorization")
    public ResponseEntity<Authorization> authorization(@RequestBody UserLogin getAuthorization) throws SQLException {
        return ResponseEntity.ok(adminService.authorizationUserNote(getAuthorization.getLogin(),
                getAuthorization.getPassword()));
    }
    @PostMapping("/review")
    public ResponseEntity<String> addReview(@RequestBody Review getReview) throws DataNotFoundException, SQLException {
        customerService.addReview(getReview);
        return ResponseEntity.ok("Review added successfully");
    }

    @GetMapping("/goods")
    public ResponseEntity<List> getGoods(){
        return ResponseEntity.ok(customerService.findAllGoods());
    }

    @GetMapping("/good/{goodName}")
    public ResponseEntity<Good> getGood(@PathVariable String goodName) throws DataNotFoundException {
        return ResponseEntity.ok(customerService.findGoodByName(goodName));
    }

    @PostMapping("/order")
    public ResponseEntity<String> addOrder(@RequestBody Order getOrder) throws SQLException {
        String orderName = customerService.addOrder(getOrder);
        return ResponseEntity.ok("Order "+orderName+" added successfully");
    }

    @GetMapping("/history/{login}")
    public ResponseEntity<List> getHistory(@PathVariable String login) {
        return ResponseEntity.ok(customerService.getHistoryByLogin(login));
    }

    @DeleteMapping("/order/{orderName}")
    public ResponseEntity<String> deleteOrder(@PathVariable String orderName) {
        customerService.deleteOrderByName(orderName);
        return ResponseEntity.ok("Order with name: " + orderName + " deleted successfully");
    }

    @PostMapping("/orders/{customerLogin}")
    public ResponseEntity<List> getOrders(@PathVariable String customerLogin) {
        return ResponseEntity.ok(customerService.getNotExecutedOrdersByLogin(customerLogin));
    }

}
