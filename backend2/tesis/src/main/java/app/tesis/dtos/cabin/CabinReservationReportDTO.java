package app.tesis.dtos.cabin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CabinReservationReportDTO {
    private String cabinName;
    private long totalReservations;
    private BigDecimal totalBilled;

    private List<ReservationDetail> reservations;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReservationDetail {
        private Long reservationId;
        private LocalDate startDate;
        private LocalDate endDate;
        private String user;

    }
}
