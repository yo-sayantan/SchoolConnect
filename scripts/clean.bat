@echo off
REM SchoolConnect - Clean Script
REM Stops all services and removes all data (complete reset)

echo ========================================
echo SchoolConnect - Clean Reset
echo ========================================
echo.
echo WARNING: This will remove all containers, volumes, and data!
echo.
set /p confirm="Are you sure you want to continue? (y/n): "

if /i not "%confirm%"=="y" (
    echo Operation cancelled.
    pause
    exit /b 0
)

echo.
echo [1/3] Stopping all services...
docker-compose down -v

echo.
echo [2/3] Removing all SchoolConnect containers and images...
docker-compose rm -f

echo.
echo [3/3] Cleaning Docker system...
docker system prune -f

echo.
echo ========================================
echo Clean Complete!
echo ========================================
echo.
echo All services, containers, and data have been removed.
echo.
echo To rebuild and deploy, run: deploy.bat
echo.
pause
