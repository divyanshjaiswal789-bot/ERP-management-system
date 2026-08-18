@echo off
title ERP Management System - Server
color 0A

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   ERP Management System - Local Server                 ║
echo ║   Simple Edition (No Database Needed!)                 ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo Checking for Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing npm packages... (This may take a minute)
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ npm install failed
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

echo.
echo ════════════════════════════════════════════════════════
echo ✅ All systems ready! Starting server...
echo ════════════════════════════════════════════════════════
echo.

cls
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   ✅ ERP Management System is Running!                ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo 🌐 Open your browser and go to:
echo    http://localhost:5000
echo.
echo 📧 Demo Login:
echo    Email: admin@test.com
echo    Password: admin123
echo.
echo 🛑 Press Ctrl+C to stop the server
echo.

call npm start

pause

