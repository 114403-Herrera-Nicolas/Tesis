package app.tesis.dtos.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthReservationSummaryDTO {
    private String cabinName;
    private int month;
    private Integer year;
    private long reservationCount;
    private BigDecimal totalBilled;
}
