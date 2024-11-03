package app.tesis.dtos.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReservationSummaryDTO {
    private Integer userId;
    private String firstName;
    private String lastName;
    private Long reservationCount;
    private BigDecimal totalSpent;


}
