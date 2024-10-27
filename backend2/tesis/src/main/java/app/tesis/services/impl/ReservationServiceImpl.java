package app.tesis.services.impl;

import app.tesis.User.User;
import app.tesis.User.UserRepository;
import app.tesis.dtos.reservation.GetReservationByUserResponse;
import app.tesis.dtos.reservation.ReservationRequest;
import app.tesis.dtos.reservation.ReservationResponse;
import app.tesis.entities.Cabin;
import app.tesis.entities.Reservation;
import app.tesis.entities.ReservationState;
import app.tesis.repositories.CabinRepository;
import app.tesis.repositories.ReservationRepository;
import app.tesis.services.ReservationService;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.merchantorder.MerchantOrderPayment;
import com.mercadopago.resources.payment.Payment;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    private CabinRepository cabinRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private MpService mpService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;
    @Override
    @Transactional
    public ReservationResponse createReservation(ReservationRequest request) throws MPException, MPApiException {
       if (request.getStartDate().isBefore(LocalDate.now())){
           throw new IllegalArgumentException("La fecha de la reservación no puede ser anterior a la fecha actual.");

       }
       if (request.getEndDate().isBefore(request.getStartDate())){
           throw new IllegalArgumentException("La fecha de final no puede ser anterior a la fecha de inicio de la reservación.");
       }

        // Verificar si ya existe una reservación para las fechas indicadas
        boolean exists = reservationRepository.existsByCabinIdAndDatesOverlap(
                request.getCabinId(),
                request.getStartDate(),
                request.getEndDate()
        );
        if (exists) {
            throw new IllegalArgumentException("La cabaña ya está reservada en las fechas seleccionadas.");
        }
        Optional<User> userOptional = userRepository.findByUsername(request.getUserName());
        if (userOptional.isEmpty()){
            throw new RuntimeException("No existe el usuario con el nombre: "+request.getUserName());
        }
        User user = userOptional.get();
        // Crear nueva reservación
        Reservation reservation = new Reservation();
        reservation.setStartDate(request.getStartDate());
        reservation.setEndDate(request.getEndDate());
        Cabin cabin = cabinRepository.getReferenceById(request.getCabinId());


        reservation.setCabin(cabin);
        reservation.setPriceForNight(cabin.getPricePerNight());
        reservation.setStatus(ReservationState.PENDING);
        reservation.setUser(user);
        user.getReservations().add(reservation);
        cabin.getReservations().add(reservation);
        reservation.setTotalNights(getDaysBetween(request.getStartDate(),request.getEndDate()));

        reservationRepository.save(reservation);
        String preferenceId= mpService.createPreference(reservation);

        ReservationResponse response = modelMapper.map(reservation,ReservationResponse.class);
       response.setPreferenceId(preferenceId);
        return response; // Deberías retornar una respuesta apropiada
    }

    @Override
    public List<GetReservationByUserResponse> getReservationsByUserId(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(Math.toIntExact(userId));
        List<GetReservationByUserResponse> rta = new ArrayList<>();
        reservations.forEach(reservation -> {
            GetReservationByUserResponse response= modelMapper.map(reservation, GetReservationByUserResponse.class);
            response.setUrlPhotoPreview(reservation.getCabin().getPhotos().get(0));
            response.setCabinName(reservation.getCabin().getName());
            rta.add(response);
        });
        return rta;
    }

    @Override
    public void updateReservationState(Integer id, ReservationState reservationState) {
        Reservation reservation = reservationRepository.getReferenceById(Long.valueOf(id));
        reservation.setStatus(reservationState);
        reservationRepository.save(reservation);
    }

    @Override
    public void updateStatusFromPayment(Long id,Payment payment) {
        Reservation reservation = reservationRepository.getReferenceById(id);

        switch (payment.getStatus()){
            case "paid": reservation.setStatus(ReservationState.COMPLETED);

        }


        reservationRepository.save(reservation);
    }

    @Override
    public void updateStatusFromOrder(List<MerchantOrderPayment> payments, Long id)  {
        payments.forEach(payment -> {
            Reservation reservation = reservationRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Reservación no encontrada"));

            switch (payment.getStatus()) {
                case "approved":
                    reservation.setStatus(ReservationState.COMPLETED);
                    try {
                        emailService.sendReservationConfirmationEmail(reservation);
                    } catch (MessagingException e) {
                        throw new RuntimeException(e);
                    }
                    break;
                case "pending":
                case "in_process":
                    reservation.setStatus(ReservationState.PENDING);
                    try {
                        emailService.sendReservationPendingEmail(reservation);
                    } catch (MessagingException e) {
                        throw new RuntimeException(e);
                    }
                    break;
                case "cancelled":
                case "refunded":
                case "rejected":
                    reservation.setStatus(ReservationState.CANCELLED);
                    try {
                        emailService.sendReservationCancelledEmail(reservation);
                    } catch (MessagingException e) {
                        throw new RuntimeException(e);
                    }
                    break;
                default:
                    throw new RuntimeException("Estado de pago no reconocido: " + payment.getStatus());
            }

            reservationRepository.save(reservation);
        });
    }

    @Override
    public GetReservationByUserResponse getReservationById(Long id) {
        Reservation reservation = reservationRepository.getReferenceById(id);
        GetReservationByUserResponse response= modelMapper.map(reservation, GetReservationByUserResponse.class);
        response.setCabinName(reservation.getCabin().getName());
        response.setCabinId(response.getCabinId());
        return response;
    }


    public Integer getDaysBetween(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null) {
            return (int) ChronoUnit.DAYS.between(startDate, endDate) + 1;
        }
        return 0;
    }
}
