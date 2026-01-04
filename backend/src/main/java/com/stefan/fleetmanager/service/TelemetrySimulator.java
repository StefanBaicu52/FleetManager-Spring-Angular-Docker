package com.stefan.fleetmanager.service;

import com.stefan.fleetmanager.model.Vehicle;
import com.stefan.fleetmanager.repository.VehicleRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TelemetrySimulator {

    private final VehicleRepository repository;

    public TelemetrySimulator(VehicleRepository repository) {
        this.repository = repository;
    }

    @Scheduled(fixedRate = 5000)
    public void simulateMovement() {
        List<Vehicle> vehicles = repository.findAll();
        for (Vehicle v : vehicles) {
            // Modificăm ușor poziția
            v.setLatitude(v.getLatitude() + (Math.random() - 0.5) * 0.002);
            v.setLongitude(v.getLongitude() + (Math.random() - 0.5) * 0.002);
            v.setLastUpdate(LocalDateTime.now());
            v.setFuelLevel(Math.max(0, v.getFuelLevel() - 0.1));

            repository.save(v); // Salvează modificarea pe același ID
        }
    }
}