package com.stefan.fleetmanager.controller;

import com.stefan.fleetmanager.model.Vehicle;
import com.stefan.fleetmanager.repository.VehicleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:4200")
public class VehicleController {

    private final VehicleRepository repository;

    public VehicleController(VehicleRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }
}