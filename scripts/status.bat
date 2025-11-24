@echo off
REM SchoolConnect - Status Check
REM Check the status of all services

echo ========================================
echo SchoolConnect - Service Status
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop.
    echo.
    pause
    exit /b 1
)

echo Docker is running.
echo.
echo Service Status:
echo ----------------------------------------
docker-compose ps

echo.
echo ========================================
echo Service URLs:
echo ========================================
echo Frontend:        http://localhost:3000
echo API Gateway:     http://localhost:8080
echo Eureka Dashboard: http://localhost:8761
echo MySQL:           localhost:3306
echo.
echo To view logs: logs.bat
echo To restart:   stop.bat then start.bat
echo.
pause
