FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/communication-service/pom.xml communication-service/
COPY backend/communication-service/src communication-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f communication-service/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/communication-service/target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
