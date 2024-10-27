package app.tesis.services;

import app.tesis.dtos.review.ReviewRequest;
import app.tesis.dtos.review.ReviewResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReviewService {
    ReviewResponse createReview(ReviewRequest review);

    List<ReviewResponse> getAllReviewsByCabin(Long cabinId);
}
