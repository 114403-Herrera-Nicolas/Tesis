package app.tesis.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import app.tesis.User.User;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cabin_id", referencedColumnName = "id")
    private Cabin cabin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
        private User user;

    private LocalDate startDate;

    private LocalDate endDate;

    private BigDecimal priceForNight;
    private Integer totalNights;

    @Enumerated(EnumType.STRING)
    private ReservationState status;

    @OneToOne
    @JoinColumn(name = "payment_id",referencedColumnName = "id")
    private Payment payment;
}
