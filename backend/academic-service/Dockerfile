FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/academic-service/pom.xml academic-service/
COPY backend/academic-service/src academic-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f academic-service/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/academic-service/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
