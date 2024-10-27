package app.tesis.services.impl;

import app.tesis.entities.Reservation;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class EmailService {

    private final JavaMailSender mailSender; // Cambiado a final para asegurar la inyección correcta

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender; // Asignación a la variable final
    }



    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("zambottinico@gmail.com");


        mailSender.send(message);
    }
    public void sendReservationConfirmationEmail(Reservation reservation) throws MessagingException {
        var total = reservation.getPriceForNight().multiply(BigDecimal.valueOf(reservation.getTotalNights()));

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setTo(reservation.getUser().getUsername());
        helper.setSubject("Confirmación de tu reserva en " + reservation.getCabin().getName());

        String emailBody = "<html>"
                + "<body>"
                + "<h2>Hola " + reservation.getUser().getFirstname() + ",</h2>"
                + "<p>¡Gracias por reservar con nosotros! Aquí están los detalles de tu reserva:</p>"
                + "<ul>"
                + "<li><strong>Número de Reserva:</strong> " + reservation.getId() + "</li>"
                + "<li><strong>Cabaña:</strong> " + reservation.getCabin().getName() + "</li>"
                + "<li><strong>Fechas:</strong> Del " + reservation.getStartDate() + " al " + reservation.getEndDate() + "</li>"
                + "<li><strong>Precio Total:</strong> $" + total + "</li>"
                + "</ul>"
                + "<h3>¡Esperamos que disfrutes de tu estancia!</h3>"
                + "<p>Saludos,<br>Viaje Total</p>"
                + "</body>"
                + "</html>";


        helper.setText(emailBody, true);

        mailSender.send(mimeMessage);
    }

    public void sendReservationPendingEmail(Reservation reservation) throws MessagingException {
        var total = reservation.getPriceForNight().multiply(BigDecimal.valueOf(reservation.getTotalNights()));


        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setTo(reservation.getUser().getUsername());
        helper.setSubject("Tu reserva está pendiente - " + reservation.getCabin().getName());

        String emailBody = "<html>"
                + "<body>"
                + "<h2>Hola " + reservation.getUser().getFirstname() + ",</h2>"
                + "<p>Hemos recibido tu solicitud de reserva para la cabaña <strong>" + reservation.getCabin().getName() + "</strong>.</p>"
                + "<p>Tu reserva está actualmente <strong>Pendiente de Confirmación</strong>.</p>"
                + "<p>A continuación, te dejamos los detalles de la reserva:</p>"
                + "<ul>"
                + "<li><strong>Número de Reserva:</strong> " + reservation.getId() + "</li>"
                + "<li><strong>Cabaña:</strong> " + reservation.getCabin().getName() + "</li>"
                + "<li><strong>Fechas:</strong> Del " + reservation.getStartDate() + " al " + reservation.getEndDate() + "</li>"
                + "<li><strong>Precio Total:</strong> $" + total + "</li>"
                + "</ul>"
                + "<p>Te notificaremos en cuanto tu reserva sea confirmada.</p>"
                + "<p>Gracias por tu paciencia,</p>"
                + "<p>Saludos,<br>Viaje Total</p>"
                + "</body>"
                + "</html>";
        helper.setText(emailBody, true);
        mailSender.send(mimeMessage);
    }

    public void sendReservationCancelledEmail(Reservation reservation) throws MessagingException {
        var total = reservation.getPriceForNight().multiply(BigDecimal.valueOf(reservation.getTotalNights()));

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setTo(reservation.getUser().getUsername());
        helper.setSubject("Tu reserva ha sido cancelada - " + reservation.getCabin().getName());
        String emailBody = "<html>"
                + "<body>"
                + "<h2>Hola " + reservation.getUser().getFirstname() + ",</h2>"
                + "<p>Lamentamos informarte que tu reserva para la cabaña <strong>" + reservation.getCabin().getName() + "</strong> ha sido cancelada.</p>"
                + "<p>Aquí están los detalles de la reserva cancelada:</p>"
                + "<ul>"
                + "<li><strong>Número de Reserva:</strong> " + reservation.getId() + "</li>"
                + "<li><strong>Cabaña:</strong> " + reservation.getCabin().getName() + "</li>"
                + "</ul>"
                + "<p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>"
                + "<p>Esperamos poder atenderte en el futuro.</p>"
                + "<p>Saludos,<br>Viaje Total</p>"
                + "</body>"
                + "</html>";
        helper.setText(emailBody, true);
        mailSender.send(mimeMessage);
    }
}
