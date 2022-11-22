package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.repository.StaffRepository;
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
    private final StaffRepository staffRepository;

    @Autowired
    public StaffController(StaffService staffService, StaffRepository staffRepository) {
        this.staffService = staffService;
        this.staffRepository = staffRepository;
    }

    @GetMapping("/reviews")
    public List<Review> getReviews(){
        return staffService.findAllReviews();
    }

    @GetMapping("/update/{orderId}")
    public ResponseEntity<Object> updateOrderStatus(@PathVariable String orderId){
        staffRepository.updateOrderStatus(orderId, "executed");
        return ResponseEntity.ok().build();
    }

}
