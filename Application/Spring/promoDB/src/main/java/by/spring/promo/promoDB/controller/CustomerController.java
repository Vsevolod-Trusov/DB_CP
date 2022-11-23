package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.Good;
import by.spring.promo.promoDB.entity.Order;
import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.rowmapper.GoodRowMapper;
import by.spring.promo.promoDB.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/review")
    public ResponseEntity<String> addReview(@RequestBody Review getReview) throws DataNotFoundException {
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
    public ResponseEntity<String> getGood(@RequestBody Order getOrder) {
        customerService.addOrder(getOrder);
        return ResponseEntity.ok("Order added successfully");
    }

}
