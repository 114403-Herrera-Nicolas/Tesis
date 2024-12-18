package app.tesis.controllers;

import app.tesis.dtos.cabin.*;
import app.tesis.dtos.reservation.MonthReservationSummaryDTO;
import app.tesis.dtos.reservation.UserReservationSummaryDTO;
import app.tesis.services.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import app.tesis.services.CabinService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/cabin")
@CrossOrigin(origins = "*")
public class CabinController {
    @Autowired
    private CabinService cabinService;
    @Autowired
    private PhotoService photoService;

    @PostMapping(consumes = {"multipart/form-data"})
    public CreateCabinResponse createCabin(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("pricePerNight") BigDecimal pricePerNight,
            @RequestParam("capacity") int capacity,
            @RequestParam("availability") boolean availability,
            @RequestParam(value = "featureIds",required = false) Set<Long> featureIds,
            @RequestParam("photos") List<MultipartFile> photos,
            @RequestHeader("Authorization") String authorizationHeader
    ) {

        String token = authorizationHeader.replace("Bearer ", "");

        // Guardar cada foto y obtener sus rutas
        List<String> photoUrls = new ArrayList<>();
        for (MultipartFile photo : photos) {
            try {
                String photoUrl = photoService.savePhoto(photo);
                photoUrls.add(photoUrl);
            } catch (IOException e) {
                e.printStackTrace();
                // Maneja el error aquí, podrías lanzar una excepción personalizada
            }
        }

        // Crea el objeto request con los datos
        CreateCabinRequest cabinRequest = new CreateCabinRequest();
        cabinRequest.setName(name);
        cabinRequest.setDescription(description);
        cabinRequest.setLocation(location);
        cabinRequest.setPricePerNight(pricePerNight);
        cabinRequest.setCapacity(capacity);
        cabinRequest.setAvailability(availability);
        cabinRequest.setFeatureIds(featureIds);
        cabinRequest.setPhotos(photoUrls);  // Aquí agregas las URLs de las fotos

        return cabinService.createCabin(cabinRequest, token);
    }

    @PutMapping(consumes = {"multipart/form-data"})
    public CreateCabinResponse updateCabin(
            @RequestParam("id") Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("pricePerNight") BigDecimal pricePerNight,
            @RequestParam("capacity") int capacity,
            @RequestParam("availability") boolean availability,
            @RequestParam(value = "featureIds",required = false) Set<Long> featureIds,
            @RequestParam("photos") List<MultipartFile> photos,
            @RequestHeader("Authorization") String authorizationHeader
    ) throws IOException {

        String token = authorizationHeader.replace("Bearer ", "");

        // Guardar cada foto y obtener sus rutas
        List<String> photoUrls = new ArrayList<>();
        for (MultipartFile photo : photos) {
            try {
                String photoUrl = photoService.savePhoto(photo);
                photoUrls.add(photoUrl);
            } catch (IOException e) {
                e.printStackTrace();
                // Maneja el error aquí, podrías lanzar una excepción personalizada
            }
        }

        // Crea el objeto request con los datos
        UpdateCabinRequest cabinRequest = new UpdateCabinRequest(
                id,
                name,
                description,
                location,
                pricePerNight,
                capacity,
                photoUrls,
                availability,
                featureIds

        );


        return cabinService.updateCabin(cabinRequest, token);
    }

    @GetMapping("/search")
    public ResponseEntity<List<GetCabinDto>> searchCabins(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) Set<Long> featureIds) {
        List<GetCabinDto> cabins = cabinService.searchCabins(name, location, minPrice, maxPrice, capacity, featureIds);
        return ResponseEntity.ok(cabins);
    }
    @GetMapping("/{id}")
    public ResponseEntity<GetCabinDto> getCabinById(@PathVariable Long id) {
        return ResponseEntity.ok(cabinService.getCabinById(id));
    }
    @GetMapping("/cabin-reservations")
    public ResponseEntity<List<CabinReservationReportDTO>> getCabinReservationReport(
            @RequestParam(value = "startDate", required = false) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) LocalDate endDate

    ) {

        // Llama al servicio con las fechas especificadas (o valores predeterminados si son nulos)
        List<CabinReservationReportDTO> report = cabinService.getReservationReport(startDate,endDate);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/cabin-reservations/user")
    public ResponseEntity<List<UserReservationSummaryDTO>> getCabinReservationReportByUserId(
            @RequestParam(value = "startDate", required = false) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) LocalDate endDate
    ) {

        // Llama al servicio con las fechas especificadas (o valores predeterminados si son nulos)
        List<UserReservationSummaryDTO> report = cabinService.getReservationReportByUser(startDate,endDate);
        return ResponseEntity.ok(report);
    }
    @GetMapping("/cabin-reservations/year")
    public ResponseEntity<List<MonthReservationSummaryDTO>> getCabinReservationReportByYear(
            @RequestParam(value = "year", required = false) Integer year
    ) {

        // Llama al servicio con las fechas especificadas (o valores predeterminados si son nulos)
        List<MonthReservationSummaryDTO> report = cabinService.getReservationReportByYear(year);
        return ResponseEntity.ok(report);
    }

}
