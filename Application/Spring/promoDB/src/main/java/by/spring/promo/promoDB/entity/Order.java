package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Order {
    private String customerLogin;
    private String goodName;
    private Date orderDate;
    private Date deliveryDate;
}
