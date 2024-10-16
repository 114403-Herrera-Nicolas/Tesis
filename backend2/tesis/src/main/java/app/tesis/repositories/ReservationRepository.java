package app.tesis.repositories;

import app.tesis.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM Reservation r WHERE r.cabin.id = :cabinId " +
            "AND (r.startDate < :endDate AND r.endDate > :startDate)")
    boolean existsByCabinIdAndDatesOverlap(@Param("cabinId") Long cabinId,
                                           @Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);

    List<Reservation> findByCabinId(Long cabinId);

    List<Reservation> findByUserId(Integer user_id);

}
