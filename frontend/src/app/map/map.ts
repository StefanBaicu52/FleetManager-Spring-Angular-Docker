import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { VehicleService } from '../vehicle';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markersMap = new Map<number, L.Marker>();

  // Setări Geofencing (Centru Cluj)
  private fenceCenter = L.latLng(46.7712, 23.5923);
  private fenceRadius = 2000; // 2 kilometri
  private weatherApiKey = 'put here your weather api key';

  constructor(
    private vehicleService: VehicleService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.refreshData();
      setInterval(() => this.refreshData(), 5000);
    }
  }

  private initMap(): void {
    this.map = L.map('map-container').setView([46.7712, 23.5923], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // Cercul vizual pe hartă
    L.circle(this.fenceCenter, {
      color: '#27ae60',
      fillColor: '#2ecc71',
      fillOpacity: 0.1,
      radius: this.fenceRadius
    }).addTo(this.map);
  }

  private refreshData(): void {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      vehicles.forEach(v => {
        const pos = L.latLng(v.latitude, v.longitude);

        // CALCUL DISTANȚĂ: Aici verificăm dacă e afară
        const distance = pos.distanceTo(this.fenceCenter);
        const isOutside = distance > this.fenceRadius;

        if (this.markersMap.has(v.id)) {
          const marker = this.markersMap.get(v.id);
          marker?.setLatLng(pos);

          // ACTUALIZARE VIZUALĂ (Culoare prin filtru CSS)
          const element = marker?.getElement();
          if (element) {
            element.style.filter = isOutside
              ? 'hue-rotate(120deg) brightness(0.8) saturate(5)' // Face markerul ROȘU
              : 'none'; // Albastru standard
          }

          // Update conținut popup dacă e deja deschis
          marker?.getPopup()?.setContent(this.generateBasicPopup(v, isOutside));
        } else {
          // CREARE MARKER NOU
          const newMarker = L.marker(pos).addTo(this.map)
            .bindPopup(this.generateBasicPopup(v, isOutside));

          // Când dai click, încarcă vremea REALA
          newMarker.on('click', () => this.loadWeatherAndOpenPopup(v, newMarker, isOutside));

          this.markersMap.set(v.id, newMarker);
        }
      });
    });
  }

  private generateBasicPopup(v: any, isOutside: boolean): string {
    const statusText = isOutside
      ? '<b style="color:red">⚠️ OUT OF ZONE</b>'
      : '<b style="color:green">✅ IN ZONE</b>';

    return `
      <div style="text-align: center;">
        <b>${v.model}</b><br>
        ${statusText}<br>
        <small>Click pt. meteo</small>
      </div>
    `;
  }

  private loadWeatherAndOpenPopup(v: any, marker: L.Marker, isOutside: boolean) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${v.latitude}&lon=${v.longitude}&appid=${this.weatherApiKey}&units=metric&lang=ro`;

    this.http.get(url).subscribe({
      next: (weather: any) => {
        const statusText = isOutside
          ? '<b style="color:red">⚠️ OUT OF ZONE</b>'
          : '<b style="color:green">✅ IN ZONE</b>';

        const content = `
          <div style="min-width: 140px">
            <b>${v.model}</b><br><hr>
            🌡️ Temp: ${weather.main.temp}°C<br>
            ☁️ ${weather.weather[0].description}<br>
            ⛽ Fuel: ${v.fuelLevel.toFixed(1)}%<br>
            ${statusText}
          </div>
        `;
        marker.setPopupContent(content).openPopup();
      },
      error: () => {
        marker.setPopupContent("Vreme indisponibilă (Cheie inactivă încă)").openPopup();
      }
    });
  }
}
