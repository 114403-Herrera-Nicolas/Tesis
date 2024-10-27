package app.tesis.dtos.review;

import app.tesis.User.User;
import app.tesis.entities.Cabin;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {

    @NotNull(message = "User ID cannot be null")
    private Integer userId;

    @NotNull(message = "Cabin ID cannot be null")
    private Long cabinId;
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int rating;
    @Size(max = 500, message = "Comment cannot exceed 500 characters")
    private String comment;
}
