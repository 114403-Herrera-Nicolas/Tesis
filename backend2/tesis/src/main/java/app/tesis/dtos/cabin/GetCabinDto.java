package app.tesis.dtos.cabin;

import app.tesis.dtos.feature.FeatureDto;
import app.tesis.entities.Feature;
import app.tesis.entities.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCabinDto {
    private Long id;
    private String name;
    private String description;
    private String location;
    private BigDecimal pricePerNight;
    private int capacity;
    private List<String> photos;
    private Set<FeatureDto> features;

    private List<LocalDate> reservedDates;
    private BigDecimal rating;
    private Integer CommentsCount;

}
