FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -N install
COPY backend/auth-service/pom.xml auth-service/
COPY backend/auth-service/src auth-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f auth-service/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/auth-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
