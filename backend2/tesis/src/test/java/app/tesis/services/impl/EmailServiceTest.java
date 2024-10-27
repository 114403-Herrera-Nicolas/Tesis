package app.tesis.services.impl;

import app.tesis.User.Role;
import app.tesis.User.User;
import app.tesis.entities.Cabin;
import app.tesis.entities.Reservation;
import app.tesis.entities.ReservationState;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmailServiceTest {
    @SpyBean
    EmailService emailService;


    @Test
    void sendEmail() throws MessagingException {
        Cabin cabin = new Cabin(1L,"cabaña linda","muy bonita","sierras", BigDecimal.valueOf(6000),2,null,true,null,null);
        User user =  new User(1,"dreamduck420@gmail.com","Herrera","Nicolas","bljskjf", Role.USER,null);
        Reservation reservation = new Reservation(
                1L, // id
                cabin, // cabin (relación con la cabaña)
                user, // user (relación con el usuario)
                LocalDate.of(2024, 11, 15), // startDate
                LocalDate.of(2024, 11, 20), // endDate
                BigDecimal.valueOf(6000), // priceForNight
                5, // totalNights
                ReservationState.COMPLETED, // status
                null // payment (puedes agregar un objeto Payment si lo tienes)
        );
        emailService.sendReservationConfirmationEmail(reservation);
    }
}