package app.tesis.services.impl;

import app.tesis.dtos.cabin.CreateCabinRequest;
import app.tesis.services.CabinService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest

class CabinServiceImplTest {

    @SpyBean
    private CabinService cabinService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCabin() {
        BigDecimal price = new BigDecimal(12);
        CreateCabinRequest cabinRequest = new CreateCabinRequest("nombre","descripcion","sierras",price,2,null,true,null);

        var result = cabinService.createCabin(cabinRequest,"");
        assertNotNull(result);
    }
}