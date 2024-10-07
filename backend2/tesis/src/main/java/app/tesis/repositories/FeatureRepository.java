package app.tesis.repositories;

import app.tesis.entities.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FeatureRepository extends JpaRepository<Feature,Long> {


}
