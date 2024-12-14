package app.tesis.services.impl;

import app.tesis.User.User;
import app.tesis.User.UserRepository;
import app.tesis.dtos.review.ReviewRequest;
import app.tesis.dtos.review.ReviewResponse;
import app.tesis.entities.Cabin;
import app.tesis.entities.Review;
import app.tesis.repositories.CabinRepository;
import app.tesis.repositories.ReviewRepository;
import app.tesis.services.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ReviewServiceImplTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private CabinRepository cabinRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReviewServiceImpl reviewService;  // Asegúrate de inyectar tu servicio aquí

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Inicializa los mocks
    }

    @Test
    void createReview() {
        // Aquí puedes escribir la prueba para el método createReview
    }

    @Test
    void getAllReviewsByCabin() {
        List<Review> reviews = new ArrayList<>();
        User user = new User();
        Cabin cabin = new Cabin();
        cabin.setId(1L);
        user.setFirstname("Nico");
        user.setLastname("Herrera");

        Review review = new Review(
                1L,
                user,
                cabin,
                5,
                "Comentario",
                null
        );

        reviews.add(review);

        // Simulamos el comportamiento del repositorio para que devuelva los reviews
        when(reviewRepository.findByCabin_Id(1L)).thenReturn(reviews);

        // Ejecutamos el servicio
        var result = reviewService.getAllReviewsByCabin(1L);

        // Verificamos los resultados
        assertNotNull(result);
        assertEquals(1, result.size());
    }
    @Test
    void shouldCreateReviewWithCorrectRatingAndCommentWhenValidInputProvided() {
        // Arrange
        ReviewRequest reviewRequest = new ReviewRequest();
        reviewRequest.setRating(5);
        reviewRequest.setComment("Great place!");
        reviewRequest.setCabinId(1L);
        reviewRequest.setUserId(1);

        Cabin cabin = new Cabin();
        cabin.setId(1L);

        User user = new User();
        user.setId(1);
        user.setUsername("testuser");

        when(cabinRepository.getReferenceById(1L)).thenReturn(cabin);
        when(userRepository.getReferenceById(1)).thenReturn(user);

        // Act
        ReviewResponse response = reviewService.createReview(reviewRequest);

        // Assert
        assertNotNull(response);
        assertEquals(5, response.getRating());
        assertEquals("Great place!", response.getComment());
        assertEquals("testuser", response.getUsername());
        assertEquals(1L, response.getCabinId());
    }

}
