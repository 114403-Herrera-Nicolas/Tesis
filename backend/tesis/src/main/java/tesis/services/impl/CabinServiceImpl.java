package tesis.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tesis.dtos.cabin.CreateCabinRequest;
import tesis.dtos.cabin.CreateCabinResponse;
import tesis.entities.Cabin;
import tesis.services.CabinService;

@Service
public class CabinServiceImpl implements CabinService {
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public CreateCabinResponse createCabin(CreateCabinRequest cabinRequest) {
        // Implement logic to create cabin and return response
        Cabin cabin = modelMapper.map(cabinRequest,Cabin.class);

        return null;
    }
}
