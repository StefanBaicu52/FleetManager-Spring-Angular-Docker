# FleetConnect-FullStack

### Project Overview
This is a professional full-stack telematics application designed for the comprehensive management of corporate vehicle fleets. The system automates real-time GPS tracking, geographical boundary monitoring (Geofencing), and environmental data integration, providing a streamlined operational experience for fleet supervisors.

### Architecture and Design
The application is built using a modern decoupled and containerized architecture:
* **Backend:** Developed with **Java 17 and Spring Boot**, implementing a clean separation of concerns through REST Controllers, Services, and Repository patterns. It utilizes scheduled tasks for real-time telemetry simulation.
* **Frontend:** A Single Page Application (SPA) built with **Angular 17**, utilizing Leaflet.js for high-performance geospatial rendering and RxJS for reactive data handling.
* **Database:** **PostgreSQL**, managed through Spring Data JPA with Hibernate for consistent schema management and relational integrity.
* **Orchestration:** **Docker Compose** is utilized to standardize the environment, managing the lifecycle of the API, Database, and UI layers.

### Key Features
* **Real-Time Telemetry Simulation:** Advanced background processing that automates vehicle movement updates every 5 seconds, providing a live data stream to the client.
* **Automated Geofencing Logic:** Intelligent calculation of vehicle proximity to designated hubs, featuring real-time visual status updates (Within Zone/Breach) via dynamic CSS filtering.
* **Live Environmental Integration:** Real-time communication with the **OpenWeather API** to provide hyper-local weather conditions based on specific vehicle coordinates.
* **Interactive Fleet Dashboard:** A responsive map-based interface that allows for granular interaction with individual assets, including fuel level tracking and connectivity status.
* **Containerized Infrastructure:** One-command deployment strategy using Docker, ensuring seamless setup across different development environments.

### Technical Stack
* **Server-side:** Java 17, Spring Boot, Spring Data JPA, Hibernate, Maven.
* **Client-side:** Angular 17, TypeScript, Leaflet.js, RxJS, Bootstrap 5.
* **Database:** PostgreSQL.
* **Tools:** IntelliJ IDEA, Docker Desktop, Postman, Git.

### Project Structure
* **/backend**: The Spring Boot source code, including business logic, database entities, and REST API endpoints.
* **/frontend**: The Angular application, containing mapping components, vehicle services, and global styles.
* **/deployment**: Docker orchestration files and environment configurations for rapid deployment.
* **/screenshots**: Visual documentation showcasing the interactive map, geofencing alerts, and weather integration modules.

### Security and Data Integrity
The system employs multiple layers of protection:
* **External API Security:** Secure handling of third-party API credentials through environmental configuration.
* **Sanitized Data Streaming:** Strict DTO (Data Transfer Object) mapping to ensure only necessary telemetry data is exposed to the frontend.
* **Infrastructure Isolation:** Database services are isolated within a private Docker network, accessible only by the backend application.

### Local Installation and Setup

#### Backend & Infrastructure Prerequisites
1. Navigate to the root directory where the `docker-compose.yml` is located.
2. Ensure Docker Desktop is running on your machine.
3. Open `frontend/src/app/map/map.component.ts` and update the `weatherApiKey` with your credentials.
4. Execute `docker-compose up --build` in the terminal to launch all services.

#### Frontend Prerequisites
1. Navigate to the `/frontend` directory.
2. Install all required dependencies by executing `npm install`.
3. Launch the development server with `ng serve`.
4. Access the application via `http://localhost:4200`.

---
*Developed as a full-stack portfolio project to demonstrate proficiency in modern software engineering practices, real-time data orchestration, and containerized system design.*