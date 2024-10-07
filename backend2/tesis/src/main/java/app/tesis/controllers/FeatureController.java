package app.tesis.controllers;

import app.tesis.dtos.feature.CreateFeatureDto;
import app.tesis.dtos.feature.FeatureDto;
import app.tesis.services.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/feature")
@CrossOrigin(origins = "*")
public class FeatureController {
    @Autowired
    private FeatureService featureService;

    @PostMapping()
    public ResponseEntity<FeatureDto> createFeature(@RequestBody CreateFeatureDto createFeatureDto) {
        return ResponseEntity.ok(featureService.createFeature(createFeatureDto));
    }
    @PutMapping
    public ResponseEntity<FeatureDto> updateFeature(@RequestBody FeatureDto featureDto) {
        return ResponseEntity.ok(featureService.updateFeature(featureDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<FeatureDto> deleteFeature(@PathVariable Long id) {
        return ResponseEntity.ok(featureService.deleteFeature(id));
    }
    @GetMapping("/{id}")
    public ResponseEntity<FeatureDto> getFeatureById(@PathVariable Long id) {
        return ResponseEntity.ok(featureService.getFeatureById(id));
    }
    @GetMapping()
    public ResponseEntity<List<FeatureDto>> getAllFeatures() {
        return ResponseEntity.ok(featureService.getFeatures());
    }
}
