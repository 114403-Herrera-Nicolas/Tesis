package app.tesis.controllers;

import app.tesis.dtos.review.ReviewRequest;
import app.tesis.dtos.review.ReviewResponse;
import app.tesis.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest review) {
        return ResponseEntity.ok(reviewService.createReview(review));
    }
    @GetMapping("/{cabinId}")
    public ResponseEntity<List<ReviewResponse>> getAllReviewsByCabin(@PathVariable Long cabinId) {
        return ResponseEntity.ok(reviewService.getAllReviewsByCabin(cabinId));
    }
}
