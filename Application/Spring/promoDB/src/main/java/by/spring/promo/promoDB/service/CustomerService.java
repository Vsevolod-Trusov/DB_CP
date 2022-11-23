package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.Good;
import by.spring.promo.promoDB.entity.Order;
import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.repository.CustomerRepository;
import by.spring.promo.promoDB.rowmapper.GoodRowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public void addReview(Review getReview) throws DataNotFoundException {
        customerRepository.addReview(getReview);
    }

    @Transactional
    public Good findGoodByName(String getGoodId) throws DataNotFoundException {
        return customerRepository.findGoodByName(getGoodId);
    }

    @Transactional
    public List findAllGoods() {
        return customerRepository.findAllGoods();
    }

    @Transactional
    public void addOrder(Order getOrder) {
        customerRepository.addOrder(getOrder);
    }
}