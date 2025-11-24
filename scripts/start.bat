@echo off
REM SchoolConnect - Quick Start Script
REM Starts all services (assumes they are already built)

echo ========================================
echo SchoolConnect - Starting Services
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

echo Starting all services...
docker-compose up -d

if errorlevel 1 (
    echo ERROR: Failed to start services!
    echo Try running deploy.bat for a clean build.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Services Started Successfully!
echo ========================================
echo.
echo Please wait 1-2 minutes for all services to be ready.
echo.
echo Access the application at:
echo   Frontend:  http://localhost:3000
echo   API:       http://localhost:8080
echo   Eureka:    http://localhost:8761
echo.
echo To view logs, run: logs.bat
echo To stop services, run: stop.bat
echo.
pause
