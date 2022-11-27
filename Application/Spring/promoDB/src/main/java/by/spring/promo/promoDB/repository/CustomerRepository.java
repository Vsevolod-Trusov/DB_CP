package by.spring.promo.promoDB.repository;

import by.spring.promo.promoDB.entity.Good;
import by.spring.promo.promoDB.entity.Order;
import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.rowmapper.GoodRowMapper;
import by.spring.promo.promoDB.rowmapper.HistoryRowMapper;
import by.spring.promo.promoDB.rowmapper.OrderRowMapper;
import by.spring.promo.promoDB.rowmapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.SqlReturnType;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Repository
public class CustomerRepository {
    @Autowired
    @Qualifier("customerJdbcTemplate")
    private final JdbcTemplate customerJdbcTemplate;

    public CustomerRepository(JdbcTemplate customerJdbcTemplate) {
        this.customerJdbcTemplate = customerJdbcTemplate;
    }

    public void addReview(Review getReview) throws DataNotFoundException {
       try{
           SimpleJdbcCall insertReview = new SimpleJdbcCall(customerJdbcTemplate)
                   .withSchemaName("ADMIN")
                   .withCatalogName("user_package")
                   .declareParameters(new SqlParameter("get_content", Types.NVARCHAR),
                           new SqlParameter("get_estimation", Types.INTEGER),
                           new SqlParameter("get_login", Types.NVARCHAR))
                   .withProcedureName("add_review");
           SqlParameterSource in = new MapSqlParameterSource()
                   .addValue("get_content", getReview.getContent())
                   .addValue("get_estimation", getReview.getEstimation())
                   .addValue("get_login", getReview.getReviewerLogin());;
           insertReview.execute(in);
       }catch(DataIntegrityViolationException exception){
           throw new DataNotFoundException("Such login: "+getReview.getReviewerLogin()+" do not exist");
       }
    }

    public List findAllGoods() {
        //TODO: add pagination
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("get_all_goods")
                .returningResultSet("goods", new GoodRowMapper());
        return simpleJdbcCall.executeFunction(List.class);
    }

    public Good findGoodByName(String getGoodName) throws DataNotFoundException {
        try{
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
                    .withSchemaName("ADMIN")
                    .withCatalogName("user_package")
                    .withFunctionName("get_good_by_name")
                    .declareParameters(new SqlParameter("good_name", Types.NVARCHAR))
                    .returningResultSet("goods", new GoodRowMapper());
            SqlParameterSource in = new MapSqlParameterSource().addValue("good_name", getGoodName);
            List goods = simpleJdbcCall.executeFunction(List.class, in);

            return (Good) goods.get(0);
        }
        catch(DataIntegrityViolationException dataNotFoundException)
        {
            throw new DataNotFoundException("Good with name: "+getGoodName+" do not exist");
        }
    }

    public String addOrder(Order getOrder){
        try{
            SimpleJdbcCall insertOrder = new SimpleJdbcCall(customerJdbcTemplate)
                    .withSchemaName("ADMIN")
                    .withCatalogName("user_package")
                    .withFunctionName("add_order")
                    .declareParameters(new SqlParameter("customer_login", Types.NVARCHAR),
                            new SqlParameter("good_name", Types.NVARCHAR),
                            new SqlParameter("get_data_order", Types.DATE),
                            new SqlParameter("get_delivery_date", Types.DATE),
                            new SqlParameter("get_delivery_type", Types.NVARCHAR),
                            new SqlParameter("get_order_price", Types.DECIMAL));
            SqlParameterSource in = new MapSqlParameterSource().addValue("customer_login", getOrder.getCustomerLogin())
                    .addValue("good_name", getOrder.getGoodName())
                    .addValue("get_data_order", getOrder.getOrderDate())
                    .addValue("get_delivery_date", getOrder.getDeliveryDate())
                    .addValue("get_delivery_type", getOrder.getDeliveryType())
                    .addValue("get_order_price", getOrder.getPrice());
            String order = insertOrder.executeFunction(String.class, in);
            return order;
        }catch(DataIntegrityViolationException dataNotFound){
            throw new DataNotFoundException("Wrong good name or login");
        }
    }

    public List getNotExecutedOrdersByLogin(String getLogin){
        SimpleJdbcCall getOrders = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("get_orders_not_executed_by_login")
                .declareParameters(new SqlParameter("user_login", Types.NVARCHAR))
                .returningResultSet("orders", new OrderRowMapper());
        SqlParameterSource in = new MapSqlParameterSource().addValue("user_login", getLogin);
        List ordersList =  getOrders.executeFunction(List.class, in);
        return ordersList;
    }

    public List getHistoryByLogin(String getLogin){
        SimpleJdbcCall getHistory = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("get_history_by_login")
                .declareParameters(new SqlParameter("customer_login", Types.NVARCHAR))
                .returningResultSet("history", new HistoryRowMapper());
        SqlParameterSource in = new MapSqlParameterSource().addValue("customer_login", getLogin);
        List historyList =  getHistory.executeFunction(List.class, in);
        return historyList;
    }

    public void deleteOrderByName(String orderName){
        SimpleJdbcCall deleteOrder = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .declareParameters(new SqlParameter("order_name", Types.NVARCHAR))
                .withProcedureName("delete_order_by_name");
        SqlParameterSource in = new MapSqlParameterSource().addValue("order_name", orderName);
        deleteOrder.execute(in);
    }


}
