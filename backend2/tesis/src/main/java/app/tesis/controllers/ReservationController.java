package app.tesis.controllers;

import app.tesis.dtos.reservation.ReservationRequest;
import app.tesis.dtos.reservation.ReservationResponse;
import app.tesis.services.ReservationService;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import org.modelmapper.internal.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/v1/reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping()
    public ResponseEntity<ReservationResponse> createReservation(@RequestBody ReservationRequest createReservationDto) throws MPException, MPApiException {
      return ResponseEntity.ok(reservationService.createReservation(createReservationDto));
    }


}
