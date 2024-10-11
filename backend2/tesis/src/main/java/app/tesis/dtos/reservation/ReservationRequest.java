package app.tesis.dtos.reservation;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequest {
    private Long cabinId;
    private String userName;
    private LocalDate startDate;
    private LocalDate endDate;

}
