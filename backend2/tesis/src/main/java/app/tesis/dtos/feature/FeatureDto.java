package app.tesis.dtos.feature;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeatureDto {
    private Long id;
    private String name;
    private String description;
}
