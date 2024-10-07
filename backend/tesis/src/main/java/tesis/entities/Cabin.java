package tesis.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cabins")

public class Cabin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private String location;

    private BigDecimal pricePerNight;

    private int capacity;



    @ElementCollection
    private List<String> photos;

    private boolean availability;


    @OneToMany(mappedBy = "cabin", cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    @ManyToMany
    @JoinTable(
            name = "cabin_feature",
            joinColumns = @JoinColumn(name = "cabin_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private Set<Feature> features;

}
