package app.tesis.services.impl;

import app.tesis.entities.Reservation;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class MpService {
    public String createPreference(Reservation reservation) throws MPException, MPApiException {
        MercadoPagoConfig.setAccessToken("APP_USR-7848850847971168-082612-f385dde860029e2422c49038f24b3867-1963279530");

        PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                .id(String.valueOf(reservation.getCabin().getId()))
                .title("Reserva de cabaña: " + reservation.getCabin().getName())
                .description("Reserva por " + reservation.getTotalNights() + " noche(s) en " + reservation.getCabin().getLocation())
                .quantity(reservation.getTotalNights())
                .currencyId("ARS")
                .unitPrice(reservation.getPriceForNight())
                .build();

        List<PreferenceItemRequest> items = new ArrayList<>();
        items.add(itemRequest);

        //id de mi orden
        String MiOrdenId= String.valueOf(reservation.getId());
        // Configura la URL de notificación
        String notificationUrl = "https://d4a4-190-96-112-182.ngrok-free.app/api/v1/reservation/webhook/"+MiOrdenId;
        PreferenceBackUrlsRequest preferenceBackUrlsRequest = PreferenceBackUrlsRequest.builder()
                .success("http://localhost:4200/success/"+reservation.getId())
                .pending("http://localhost:4200/pending/"+reservation.getId())
                .failure("http://localhost:4200/error/"+reservation.getId())
                .build();



        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .notificationUrl(notificationUrl)
                .backUrls(preferenceBackUrlsRequest)
                .build();

        try{
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            System.out.println("Preference id: " + preference.getId());

            // Devuelve el ID de la preferencia
            return preference.getId();
        }catch (MPApiException e){
            System.err.println("Error creating preference: " + e.getApiResponse().getContent());
        }

        throw new RuntimeException("error");
    }
}
