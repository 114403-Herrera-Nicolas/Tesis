package app.tesis.dtos.reservation;

import app.tesis.entities.ReservationState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponse {
    private Long id;
    private String preferenceId;
    private ReservationState status;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal priceForNight;
    private Integer totalNights;
}
