@echo off
REM SchoolConnect - Logs Viewer
REM View real-time logs from all services

echo ========================================
echo SchoolConnect - Service Logs
echo ========================================
echo.
echo Showing logs from all services...
echo Press Ctrl+C to stop viewing logs
echo.
timeout /t 2 /nobreak >nul

docker-compose logs -f --tail=100
