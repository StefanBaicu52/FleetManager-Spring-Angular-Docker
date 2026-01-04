# Folosim o imagine de Java ușoară
FROM eclipse-temurin:17-jdk-alpine

# Creăm un director pentru aplicație
WORKDIR /app

# Copiem fișierul JAR generat (trebuie să dai 'mvn clean package' înainte)
COPY target/*.jar app.jar

# Expunem portul pe care rulează Spring Boot
EXPOSE 8080

# Comanda de pornire
ENTRYPOINT ["java", "-jar", "app.jar"]