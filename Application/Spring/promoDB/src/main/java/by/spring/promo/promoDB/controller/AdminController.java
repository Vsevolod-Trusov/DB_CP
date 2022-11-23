package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.UserLogin;
import by.spring.promo.promoDB.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/users")
    public List<UserLogin> getUsers() {
        return adminService.findAllPersonsByRole("user");
    }

    @GetMapping("/hello")
    public String getHello() {
        return "Hello";
    }

}
