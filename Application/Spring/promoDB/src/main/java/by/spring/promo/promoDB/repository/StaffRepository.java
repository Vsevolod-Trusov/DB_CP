package by.spring.promo.promoDB.repository;

import by.spring.promo.promoDB.rowmapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

@Repository
public class StaffRepository {
    @Autowired
    @Qualifier("staffJdbcTemplate")
    private final JdbcTemplate staffJdbcTemplate;

    public StaffRepository(JdbcTemplate staffJdbcTemplate) {
        this.staffJdbcTemplate = staffJdbcTemplate;
    }

    @Transactional
    public List findAllReviews(){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(staffJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("staff_package")
                .withFunctionName("get_reviews")
                .returningResultSet("reviews", new ReviewMapper());
        List reviews = simpleJdbcCall.executeFunction(List.class);
        return reviews;
    }

    @Transactional
    @ExceptionHandler
    public void updateOrderStatus(String orderId, String status){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(staffJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("staff_package")
                .declareParameters(new SqlParameter("order_id", Types.NVARCHAR),
                        new SqlParameter("get_status", Types.NVARCHAR))
                .withProcedureName("change_order_status_by_id");
        SqlParameterSource in = new MapSqlParameterSource().addValue("order_id", orderId)
                .addValue("get_status", status);
        simpleJdbcCall.execute(in);
    }
}
