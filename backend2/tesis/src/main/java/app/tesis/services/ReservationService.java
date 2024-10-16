package app.tesis.services;

import app.tesis.dtos.reservation.GetReservationByUserResponse;
import app.tesis.dtos.reservation.ReservationRequest;
import app.tesis.dtos.reservation.ReservationResponse;
import app.tesis.entities.ReservationState;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.merchantorder.MerchantOrderPayment;
import com.mercadopago.resources.payment.Payment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {
    ReservationResponse createReservation(ReservationRequest createReservationDto) throws MPException, MPApiException;

    List<GetReservationByUserResponse> getReservationsByUserId(Long userId);

    void updateReservationState(Integer id, ReservationState reservationState);

    void updateStatusFromPayment(Long id,Payment payment);

    void updateStatusFromOrder(List<MerchantOrderPayment> payments,Long id);
}
