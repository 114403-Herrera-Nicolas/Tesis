package tesis.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tesis.User.User;

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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cabin_id", referencedColumnName = "id")
    private Cabin cabin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
        private User user;

    private LocalDate startDate;

    private LocalDate endDate;

    private BigDecimal totalPrice;

    private String status; // e.g., "Confirmed", "Pending", "Cancelled"

    @OneToOne
    @JoinColumn(name = "payment_id",referencedColumnName = "id")
    private Payment payment;
}
