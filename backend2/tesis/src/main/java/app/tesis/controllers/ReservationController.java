package app.tesis.controllers;

import app.tesis.dtos.reservation.GetReservationByUserResponse;
import app.tesis.dtos.reservation.ReservationRequest;
import app.tesis.dtos.reservation.ReservationResponse;
import app.tesis.entities.ReservationState;
import app.tesis.services.ReservationService;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.merchantorder.MerchantOrderClient;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.merchantorder.MerchantOrder;
import com.mercadopago.resources.payment.Payment;
import org.modelmapper.internal.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/api/v1/reservation")
public class ReservationController {
    private final PaymentClient paymentClient;
    private final MerchantOrderClient merchantOrderClient;

    public ReservationController(){
        merchantOrderClient=new MerchantOrderClient();
        paymentClient=new PaymentClient();
        MercadoPagoConfig.setAccessToken("APP_USR-7848850847971168-082612-f385dde860029e2422c49038f24b3867-1963279530");
    }
    @Autowired
    private ReservationService reservationService;

    @PostMapping()
    public ResponseEntity<ReservationResponse> createReservation(@RequestBody ReservationRequest createReservationDto) throws MPException, MPApiException {
      return ResponseEntity.ok(reservationService.createReservation(createReservationDto));
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<GetReservationByUserResponse>> getReservationsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.getReservationsByUserId(userId));
    }

    @PostMapping("/webhook/{id}")
    @CrossOrigin(origins = {"http://localhost:4200", "https://www.mercadopago.com", "https://api.mercadopago.com"})

    public ResponseEntity<Void> handleWebhook(@RequestBody Map<String, Object> payload, @RequestHeader Map<String, String> headers, @PathVariable Integer id) {
        System.out.println("Recibido webhook de Mercado Pago");
        System.out.println("Headers: " + headers);
        System.out.println("Payload: " + payload);
        System.out.println("mi orden: " + id);

        String topic = (String) payload.get("topic");  // Puede ser "merchant_order" o "payment"
        try {
            if ("merchant_order".equals(topic)) {
                // Obtener Merchant Order desde Mercado Pago usando el SDK
                String resourceUrl = (String) payload.get("resource");
                String orderId = resourceUrl.split("/")[4];  // Extraer el ID de la orden desde el URL
                MerchantOrder merchantOrder = merchantOrderClient.get(Long.valueOf(orderId));
                System.out.println("Estado de la orden: " + merchantOrder);
                // Actualizar el estado de la orden en tu sistema
                reservationService.updateStatusFromOrder(merchantOrder.getPayments(), Long.valueOf(id));
            }

            if ("payment".equals(topic)) {
                // Obtener Payment desde Mercado Pago usando el SDK
                Map<String, Object> data = (Map<String, Object>) payload.get("data");
                Long paymentId = ((Number) data.get("id")).longValue();
                Payment payment = paymentClient.get(paymentId);
                System.out.println("Estado del pago: " + payment);
                // Actualizar el estado de tu reserva en base al estado del pago
                reservationService.updateStatusFromPayment(Long.valueOf(id),payment);
            }

        } catch (MPException | MPApiException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().build();  // Devolver 200 OK para confirmar recepción
    }



}
