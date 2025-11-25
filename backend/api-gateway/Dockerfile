FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/api-gateway/pom.xml api-gateway/
COPY backend/api-gateway/src api-gateway/src
RUN --mount=type=cache,target=/root/.m2 mvn -f api-gateway/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/api-gateway/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
