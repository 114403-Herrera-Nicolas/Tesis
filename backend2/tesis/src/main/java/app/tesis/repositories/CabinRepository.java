package app.tesis.repositories;

import app.tesis.entities.Cabin;
import app.tesis.entities.Feature;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public interface CabinRepository extends JpaRepository<Cabin,Long> {
    List<Cabin> findByNameContaining(String name);


    List<Cabin> findByLocationContaining(String location);

    List<Cabin> findByPricePerNightBetween(BigDecimal minPrice, BigDecimal maxPrice);

    List<Cabin> findByCapacityGreaterThanEqual(int capacity);

    @Query("SELECT c FROM Cabin c JOIN c.features f WHERE f.id IN :featureIds GROUP BY c.id HAVING COUNT(f.id) = :size")
    List<Cabin> findByFeatureIds(Set<Long> featureIds, int size);
    @Query("SELECT c.features FROM Cabin c WHERE c.id = :cabinId")
    Set<Feature> findFeaturesByCabinId(@Param("cabinId") Long cabinId);

    @Modifying
    @Query("DELETE FROM Cabin c WHERE c.id = :cabinId")
    void deleteCabinFeaturesById(@Param("cabinId") Long cabinId);






}
