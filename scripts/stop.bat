@echo off
REM SchoolConnect - Stop Script
REM Stops all running services

echo ========================================
echo SchoolConnect - Stopping Services
echo ========================================
echo.

docker-compose down

echo.
echo All services stopped successfully!
echo.
echo To start again, run: start.bat
echo For a clean build, run: deploy.bat
echo.
pause
