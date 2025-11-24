@echo off
REM SchoolConnect - Rebuild Single Service
REM Rebuild and restart a specific service

echo ========================================
echo SchoolConnect - Rebuild Service
echo ========================================
echo.
echo Available services:
echo   1. auth-service
echo   2. academic-service
echo   3. communication-service
echo   4. calendar-service
echo   5. api-gateway
echo   6. discovery-service
echo   7. frontend
echo   8. mysql
echo.
set /p service="Enter service name: "

if "%service%"=="" (
    echo ERROR: No service specified!
    pause
    exit /b 1
)

echo.
echo Rebuilding %service%...
docker-compose up -d --build %service%

if errorlevel 1 (
    echo ERROR: Failed to rebuild %service%!
    pause
    exit /b 1
)

echo.
echo %service% rebuilt and restarted successfully!
echo.
echo To view logs: docker-compose logs -f %service%
echo.
pause
