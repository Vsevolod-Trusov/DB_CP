package by.spring.promo.promoDB.repository;

import by.spring.promo.promoDB.rowmapper.OrderRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class AdminRepository {
    @Autowired
    @Qualifier("adminJdbcTemplate")
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public List findAllPersonsByRole(String role){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("get_all_persons_by_role");

        List res = simpleJdbcCall.executeFunction(List.class , role);
        return res;
    }

    @Transactional
    public List findUnprocessedOrders() {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("GET_UNPROCESSED_ORDERS")
                .returningResultSet("orders", new OrderRowMapper());

        List res = simpleJdbcCall.executeFunction(List.class);
        return res;
    }
}
