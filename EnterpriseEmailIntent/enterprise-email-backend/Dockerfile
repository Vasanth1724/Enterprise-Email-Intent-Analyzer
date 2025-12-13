# 1️⃣ Use official Java 21 runtime (lightweight)
FROM eclipse-temurin:21-jre

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy built jar from target folder
COPY target/*.jar app.jar

# 4️⃣ Expose Spring Boot port
EXPOSE 8080

# 5️⃣ Run Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
