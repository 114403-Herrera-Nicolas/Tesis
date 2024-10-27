package app.tesis.services.impl;

import app.tesis.User.UserRepository;
import app.tesis.dtos.review.ReviewRequest;
import app.tesis.dtos.review.ReviewResponse;
import app.tesis.entities.Cabin;
import app.tesis.entities.Review;
import app.tesis.repositories.CabinRepository;
import app.tesis.repositories.ReviewRepository;
import app.tesis.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private CabinRepository cabinRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public ReviewResponse createReview(ReviewRequest request) {
        Review review = new Review();
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        Cabin cabin = cabinRepository.getReferenceById(request.getCabinId());
        review.setCabin(cabin);
        review.setUser(userRepository.getReferenceById(request.getUserId()));
        review.setDate(LocalDateTime.now());
        reviewRepository.save(review);
        return new ReviewResponse(review.getId(),review.getRating() ,review.getComment(),review.getDate(),review.getUser().getUsername(), cabin.getId());
    }

    @Override
    public List<ReviewResponse> getAllReviewsByCabin(Long cabinId) {
        List<Review> reviews = reviewRepository.findByCabin_Id(cabinId);
        List<ReviewResponse> responseList = new ArrayList<>();
        reviews.forEach(entity->{
            ReviewResponse response = new ReviewResponse(
                    entity.getId(),
                    entity.getRating(),
                    entity.getComment(),
                    entity.getDate(),
                    entity.getUser().getUsername(),
                    entity.getCabin().getId()
            );
            responseList.add(response);
        });
        return responseList;
    }
}
