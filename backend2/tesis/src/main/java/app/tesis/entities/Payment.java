package app.tesis.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "reservation_id",referencedColumnName = "id")
    private Reservation reservation;

    private BigDecimal amount;

    private String paymentMethod; // e.g., "Credit Card", "Mercado Pago"

    private String status; // e.g., "Paid", "Pending", "Refunded"

    private LocalDate date;
}
