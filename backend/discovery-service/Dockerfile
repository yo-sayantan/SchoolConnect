FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/discovery-service/pom.xml discovery-service/
COPY backend/discovery-service/src discovery-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f discovery-service/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/discovery-service/target/*.jar app.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "app.jar"]
