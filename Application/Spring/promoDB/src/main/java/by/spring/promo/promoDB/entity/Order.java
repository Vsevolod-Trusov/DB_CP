package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Order {
    private String customerLogin;
    private String executorLogin;
    private String goodName;
    private String orderName;
    private Date orderDate;
    private Date deliveryDate;
}
