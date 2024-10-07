package app.tesis.services;

import app.tesis.dtos.feature.CreateFeatureDto;
import app.tesis.dtos.feature.FeatureDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FeatureService {
    FeatureDto createFeature(CreateFeatureDto createFeatureDto);

    FeatureDto updateFeature(FeatureDto featureDto);

    FeatureDto deleteFeature(Long id);

    FeatureDto getFeatureById(Long id);

    List<FeatureDto> getFeatures();
}
