package app.tesis.repositories;

import app.tesis.dtos.cabin.CabinReservationReportDTO;
import app.tesis.entities.Cabin;
import app.tesis.entities.Feature;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface CabinRepository extends JpaRepository<Cabin,Long> {

    List<Cabin> findByNameContainingIgnoreCase(String name);

    List<Cabin> findByLocationContainingIgnoreCase(String location);

    List<Cabin> findByPricePerNightBetween(BigDecimal minPrice, BigDecimal maxPrice);

    List<Cabin> findByCapacityGreaterThanEqual(int capacity);

    @Query("SELECT c FROM Cabin c JOIN c.features f WHERE f.id IN :featureIds GROUP BY c.id HAVING COUNT(f.id) = :size")
    List<Cabin> findByFeatureIds(Set<Long> featureIds, int size);
    @Query("SELECT c.features FROM Cabin c WHERE c.id = :cabinId")
    Set<Feature> findFeaturesByCabinId(@Param("cabinId") Long cabinId);

    @Modifying
    @Query("DELETE FROM Cabin c WHERE c.id = :cabinId")
    void deleteCabinFeaturesById(@Param("cabinId") Long cabinId);





    @Query("SELECT c.name, COUNT(r), SUM(r.priceForNight * r.totalNights) " +
            "FROM Cabin c JOIN c.reservations r " +
            "WHERE r.status = 'COMPLETED' " +
            "AND ( r.startDate < :endDate AND r.startDate > :startDate)"+
            "GROUP BY c.name")
    List<Object[]> findTotalBilledAndReservationCountByCabin(@Param("startDate") LocalDate startDate,
                                                             @Param("endDate") LocalDate endDate);


    @Query("SELECT r.user.id, r.user.firstname,r.user.lastname, COUNT(r), SUM(r.priceForNight * r.totalNights) " +
            "FROM Reservation r " +
            "WHERE r.status = 'COMPLETED' "+
            "AND (r.startDate < :endDate AND r.startDate > :startDate)"+
            "GROUP BY r.user.id, r.user.firstname,r.user.lastname")
    List<Object[]> findReservationCountAndTotalSpentByUser(@Param("startDate") LocalDate startDate,
                                                           @Param("endDate") LocalDate endDate);


    @Query("SELECT c.name, MONTH(r.startDate) AS month, COUNT(r), SUM(r.priceForNight * r.totalNights) " +
            "FROM Cabin c JOIN c.reservations r " +
            "WHERE r.status = 'COMPLETED' " +
            "AND r.startDate BETWEEN :startDate AND :endDate " +
            "GROUP BY c.name, MONTH(r.startDate) " +
            "ORDER BY c.name, month")
    List<Object[]> findTotalBilledAndReservationCountByCabinAndMonth(@Param("startDate") LocalDate startDate,
                                                                     @Param("endDate") LocalDate endDate);




}
