@echo off
REM SchoolConnect - Clean Build Deploy and Run Script
REM This script performs a complete clean build and deployment

echo ========================================
echo SchoolConnect - Clean Build Deploy
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo [1/5] Stopping existing containers...
docker-compose down -v
echo.

echo [2/5] Cleaning Docker system...
echo This will remove unused containers, networks, and images.
docker system prune -f
echo.

echo [3/5] Building all services...
echo This may take 5-10 minutes on first run...
docker-compose build --no-cache
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

echo [4/5] Starting all services...
docker-compose up -d
if errorlevel 1 (
    echo ERROR: Failed to start services!
    pause
    exit /b 1
)
echo.

echo [5/5] Waiting for services to be ready...
echo This may take 2-3 minutes...
timeout /t 30 /nobreak >nul
echo.

echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Services are starting up. Please wait 1-2 minutes for all services to be ready.
echo.
echo Access the application at:
echo   Frontend:  http://localhost:3000
echo   API:       http://localhost:8080
echo   Eureka:    http://localhost:8761
echo.
echo To view logs, run: docker-compose logs -f
echo To stop services, run: stop.bat
echo.
pause
