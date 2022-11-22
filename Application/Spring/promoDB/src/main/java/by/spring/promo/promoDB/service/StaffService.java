package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class StaffService {
    private final StaffRepository staffRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Transactional
    public List<Review> findAllReviews() {
        return staffRepository.findAllReviews();
    }
}
