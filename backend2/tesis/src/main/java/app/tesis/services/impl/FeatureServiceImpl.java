package app.tesis.services.impl;

import app.tesis.dtos.feature.CreateFeatureDto;
import app.tesis.dtos.feature.FeatureDto;
import app.tesis.entities.Feature;
import app.tesis.repositories.FeatureRepository;
import app.tesis.services.FeatureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeatureServiceImpl implements FeatureService {
    @Autowired
    private FeatureRepository featureRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public FeatureDto createFeature(CreateFeatureDto createFeatureDto) {
        Feature feature = modelMapper.map(createFeatureDto,Feature.class);
        featureRepository.save(feature);
        return modelMapper.map(feature,FeatureDto.class);
    }

    @Override
    public FeatureDto updateFeature(FeatureDto featureDto) {
        Feature feature = featureRepository.getReferenceById(featureDto.getId());
        feature.setName(featureDto.getName());
        feature.setDescription(featureDto.getDescription());

        feature = featureRepository.save(feature);
        return modelMapper.map(feature, FeatureDto.class);
    }

    @Override
    public FeatureDto deleteFeature(Long id) {
        Feature feature = featureRepository.getReferenceById(id);
        featureRepository.deleteById(id);
        return modelMapper.map(feature, FeatureDto.class);
    }

    @Override
    public FeatureDto getFeatureById(Long id) {
        Feature feature = featureRepository.getReferenceById(id);

        return modelMapper.map(feature, FeatureDto.class);
    }

    @Override
    public List<FeatureDto> getFeatures() {
        List<Feature> featureList = featureRepository.findAll();
        List<FeatureDto> rta = new ArrayList<>();
        featureList.forEach(feature -> {
            rta.add(modelMapper.map(feature, FeatureDto.class));
        });

        return rta;
    }
}
