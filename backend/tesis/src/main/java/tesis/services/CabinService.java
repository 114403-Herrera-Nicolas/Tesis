package tesis.services;

import org.springframework.stereotype.Service;
import tesis.dtos.cabin.CreateCabinRequest;
import tesis.dtos.cabin.CreateCabinResponse;

@Service
public interface CabinService {
    CreateCabinResponse createCabin(CreateCabinRequest cabinRequest);
}
