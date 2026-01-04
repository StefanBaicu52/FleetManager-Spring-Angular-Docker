package com.stefan.fleetmanager.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vin;
    private String model;
    private Double latitude;
    private Double longitude;
    private Double fuelLevel;
    private LocalDateTime lastUpdate;
}