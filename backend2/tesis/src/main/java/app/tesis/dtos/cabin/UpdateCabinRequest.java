package app.tesis.dtos.cabin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCabinRequest {
    private Long id;
    private String name;
    private String description;
    private String location;
    private BigDecimal pricePerNight;
    private int capacity;
    private List<String> photos;
    private boolean availability;
    private Set<Long> featureIds;
}
