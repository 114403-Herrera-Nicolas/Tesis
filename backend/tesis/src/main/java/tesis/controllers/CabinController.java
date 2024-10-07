package tesis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tesis.dtos.cabin.CreateCabinRequest;
import tesis.dtos.cabin.CreateCabinResponse;
import tesis.services.CabinService;

@RestController

public class CabinController {
    @Autowired
    private CabinService cabinService;
    @PostMapping
    public CreateCabinResponse createCabin(@RequestBody CreateCabinRequest cabinRequest) {
        return cabinService.createCabin(cabinRequest);
    }
}
