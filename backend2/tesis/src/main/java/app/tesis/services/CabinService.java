package app.tesis.services;

import app.tesis.dtos.cabin.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Service
public interface CabinService {
    CreateCabinResponse createCabin(CreateCabinRequest cabinRequest,String token);

    List<GetCabinDto> getCabins();

    List<GetCabinDto> searchCabins(String name, String location, BigDecimal minPrice, BigDecimal maxPrice, Integer capacity, Set<Long> featureIds);

    GetCabinDto getCabinById(Long id);
    List<CabinReservationReportDTO> getReservationReport();

    CreateCabinResponse updateCabin(UpdateCabinRequest cabinRequest, String token) throws IOException;
}
