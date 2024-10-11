package app.tesis.services.impl;

import app.tesis.Jwt.JwtService;
import app.tesis.User.Role;
import app.tesis.User.UserService;
import app.tesis.dtos.cabin.GetCabinDto;
import app.tesis.dtos.cabin.UpdateCabinRequest;
import app.tesis.dtos.feature.FeatureDto;
import app.tesis.entities.Feature;
import app.tesis.entities.Reservation;
import app.tesis.repositories.CabinRepository;
import app.tesis.repositories.FeatureRepository;
import app.tesis.repositories.ReservationRepository;
import app.tesis.services.PhotoService;
import app.tesis.services.ReservationService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.tesis.dtos.cabin.CreateCabinRequest;
import app.tesis.dtos.cabin.CreateCabinResponse;
import app.tesis.entities.Cabin;
import app.tesis.services.CabinService;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CabinServiceImpl implements CabinService {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CabinRepository cabinRepository;
    @Autowired
    private FeatureRepository featureRepository;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ReservationRepository reservationRepository;


    @Autowired
    private PhotoService photoService;
    @Override
    @Transactional
    public CreateCabinResponse createCabin(CreateCabinRequest cabinRequest, String token) {
       //  Validate JWT token
       if (!userService.isAdmin(token)){
            throw new RuntimeException("El token no tiene permisos para crear una cabaña");
        }
        Cabin cabin = modelMapper.map(cabinRequest, Cabin.class);
        Set<Feature> featuresSet = new HashSet<>();

        cabinRequest.getFeatureIds().forEach(id -> {
            featuresSet.add(featureRepository.getReferenceById(id));
        });
        cabin.setFeatures(featuresSet);
        cabinRepository.save(cabin);
        return new CreateCabinResponse("Se creó la cabaña con id: " + cabin.getId());
    }


    @Override
    public List<GetCabinDto> getCabins() {
        return null;
    }
    public Set<FeatureDto> getFeaturesDtoByCabinId(Long cabinId) {
        Set<Feature> features= cabinRepository.findFeaturesByCabinId(cabinId);
        Set<FeatureDto> rta = new HashSet<>();
        features.forEach(feature -> {
            rta.add(modelMapper.map(feature, FeatureDto.class));
        });
        return rta;
    }


    @Override
    public List<GetCabinDto> searchCabins(String name, String location, BigDecimal minPrice, BigDecimal maxPrice, Integer capacity, Set<Long> featureIds) {
        // Empezar por una búsqueda base, por ejemplo, buscando todas las cabinas
        List<Cabin> cabins = cabinRepository.findAll();
        List<GetCabinDto> getCabinDtoList = new ArrayList<>();

        // Filtrar por nombre si se proporciona
        if (name != null && !name.isEmpty()) {
            cabins.retainAll(cabinRepository.findByNameContaining(name));
        }

        // Filtrar por ubicación si se proporciona
        if (location != null && !location.isEmpty()) {
            cabins.retainAll(cabinRepository.findByLocationContaining(location));
        }

        // Filtrar por rango de precios si se proporciona
        if (minPrice != null && maxPrice != null) {
            cabins.retainAll(cabinRepository.findByPricePerNightBetween(minPrice, maxPrice));
        }

        // Filtrar por capacidad si se proporciona
        if (capacity != null) {
            cabins.retainAll(cabinRepository.findByCapacityGreaterThanEqual(capacity));
        }

        // Filtrar por características (features) si se proporciona
        if (featureIds != null && !featureIds.isEmpty()) {
            cabins.retainAll(cabinRepository.findByFeatureIds(featureIds, featureIds.size()));
        }
        for (Cabin c:cabins
             ) {
            Set<FeatureDto> features= getFeaturesDtoByCabinId(c.getId());
            GetCabinDto dto = modelMapper.map(c, GetCabinDto.class);
            dto.setFeatures(features);
            getCabinDtoList.add(dto);
        }
        return getCabinDtoList;
    }

    @Override
    public GetCabinDto getCabinById(Long id) {
        Optional<Cabin> cabinOptional = cabinRepository.findById(id);
        if (cabinOptional.isPresent()) {
            Cabin cabin = cabinOptional.get();
            Set<FeatureDto> features = getFeaturesDtoByCabinId(cabin.getId());

            // Obtener las fechas reservadas
            List<LocalDate> reservedDates = getReservedDatesByCabinId(cabin.getId());

            GetCabinDto dto = modelMapper.map(cabin, GetCabinDto.class);
            dto.setFeatures(features);
            dto.setReservedDates(reservedDates); // Asumiendo que has agregado este campo en GetCabinDto
            return dto;
        }

        throw new RuntimeException("No existe la cabaña con id: " + id);
    }

    // Método para obtener las fechas reservadas por cabaña
    private List<LocalDate> getReservedDatesByCabinId(Long cabinId) {
        List<Reservation> reservations = reservationRepository.findByCabinId(cabinId);
        List<LocalDate> reservedDates = new ArrayList<>();

        for (Reservation reservation : reservations) {
            LocalDate startDate = reservation.getStartDate(); // Suponiendo que tienes estos métodos
            LocalDate endDate = reservation.getEndDate(); // Suponiendo que tienes estos métodos
            LocalDate date = startDate;

            // Agregar todas las fechas del rango de la reserva
            while (!date.isAfter(endDate)) {
                reservedDates.add(date);
                date = date.plusDays(1);
            }
        }

        return reservedDates;
    }

    @Override
    @Transactional
    public CreateCabinResponse updateCabin(UpdateCabinRequest cabinRequest, String token) throws IOException {
        // Validar JWT token
        if (!userService.isAdmin(token)) {
            throw new RuntimeException("El token no tiene permisos para modificar una cabaña");
        }

        // Obtener la cabaña a partir del ID
        Cabin cabin = cabinRepository.getReferenceById(cabinRequest.getId());

        // Limpiar las asociaciones de features antiguas de la tabla intermedia
        cabin.getFeatures().clear();
        cabinRepository.saveAndFlush(cabin);  // Forzar el vaciado de la tabla intermedia

        // Eliminar las fotos antiguas
        for (String url : cabin.getPhotos()) {
            photoService.deletePhoto(url);
        }

        // Actualizar los valores del request en la cabaña
        cabin.setName(cabinRequest.getName());
        cabin.setDescription(cabinRequest.getDescription());
        cabin.setLocation(cabinRequest.getLocation());
        cabin.setPricePerNight(cabinRequest.getPricePerNight());
        cabin.setCapacity(cabinRequest.getCapacity());
        cabin.setPhotos(cabinRequest.getPhotos());
        cabin.setAvailability(cabinRequest.isAvailability());

        // Obtener los IDs de features del request y asignarlos a la cabaña
        Set<Feature> featuresSet = new HashSet<>();
        if (cabinRequest.getFeatureIds() != null) {
            cabinRequest.getFeatureIds().forEach(id -> {
                featuresSet.add(featureRepository.getReferenceById(id));
            });
        }

        // Asignar el nuevo conjunto de características a la cabaña
        cabin.setFeatures(featuresSet);

        // Guardar la cabaña con las características actualizadas
        cabinRepository.save(cabin);

        return new CreateCabinResponse("Se actualizó la cabaña con id: " + cabin.getId());
    }

}
