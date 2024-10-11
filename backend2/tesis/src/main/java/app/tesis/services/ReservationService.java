package app.tesis.services;

import app.tesis.dtos.reservation.ReservationRequest;
import app.tesis.dtos.reservation.ReservationResponse;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import org.springframework.stereotype.Service;

@Service
public interface ReservationService {
    ReservationResponse createReservation(ReservationRequest createReservationDto) throws MPException, MPApiException;
}
