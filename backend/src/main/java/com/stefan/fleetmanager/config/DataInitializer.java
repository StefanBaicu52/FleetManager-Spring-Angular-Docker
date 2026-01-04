package com.stefan.fleetmanager.config;

import com.stefan.fleetmanager.model.Vehicle;
import com.stefan.fleetmanager.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(VehicleRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        createV("BMW-I4-2024", "BMW i4 M50", 46.7712, 23.5923, 85.0),
                        createV("BMW-X5-2023", "BMW X5 xDrive40i", 46.7670, 23.5850, 40.0),
                        createV("AUDI-Q8-2024", "Audi Q8 e-tron", 46.7500, 23.5500, 12.0),
                        createV("TESLA-S-2024", "Tesla Model S", 46.7850, 23.6150, 60.0),
                        createV("DACIA-SPRING", "Dacia Spring", 46.7400, 23.5900, 8.0)
                ));
                System.out.println("Flota de 5 mașini a fost inserată!");
            }
        };
    }

    private Vehicle createV(String vin, String model, double lat, double lon, double fuel) {
        Vehicle v = new Vehicle();
        v.setVin(vin);
        v.setModel(model);
        v.setLatitude(lat);
        v.setLongitude(lon);
        v.setFuelLevel(fuel);
        v.setLastUpdate(LocalDateTime.now());
        return v;
    }
}