package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.CustomerInfo;
import by.spring.promo.promoDB.entity.Good;
import by.spring.promo.promoDB.entity.Order;
import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.repository.CustomerRepository;
import by.spring.promo.promoDB.rowmapper.GoodRowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public void addReview(Review getReview) throws DataNotFoundException, SQLException {
        customerRepository.addReview(getReview);
    }

    @Transactional
    public Good findGoodByName(String getGoodId) throws DataNotFoundException {
        return customerRepository.findGoodByName(getGoodId);
    }

    @Transactional
    public List findAllGoods(int startValue, int endValue) {
        return customerRepository.findAllGoods(startValue, endValue);
    }

    @Transactional
    public String addOrder(Order getOrder) throws SQLException {
        return customerRepository.addOrder(getOrder);
    }
    @Transactional
    public List getHistoryByLogin(String login) {
        return customerRepository.getHistoryByLogin(login);
    }

    @Transactional
    public void deleteOrderByName(String orderName) {
        customerRepository.deleteOrderByName(orderName);
    }

    @Transactional
    public List getNotExecutedOrdersByLogin(String login) {
        return customerRepository.getNotExecutedOrdersByLogin(login);
    }

    public CustomerInfo getCustomerInfo(String login) {
        return customerRepository.getCustomerInfo(login);
    }

    public BigDecimal getGoodsRowsCount(){
        return customerRepository.getGoodsRowsCount();
    }


    public List getRoutesByUserLogin(String userLogin) {
        return customerRepository.getRoutesByUserLogin(userLogin);
    }
}
