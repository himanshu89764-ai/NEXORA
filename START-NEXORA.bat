@echo off
title NEXORA STARTUP

echo ===============================
echo NEXORA STARTUP
echo ===============================
echo.

echo Checking Ollama...
ollama list >nul 2>&1

if %errorlevel% neq 0 (
    echo Starting Ollama...
    start "" ollama serve
    timeout /t 5 /nobreak >nul
) else (
    echo Ollama is already running.
)

echo.
echo Checking NEXORA Backend...

netstat -ano | findstr ":5000" >nul

if %errorlevel% neq 0 (
    echo Starting NEXORA Backend...
    cd /d "C:\Users\HP\Documents\NEXORA\backend"
    start "" node server.js
    timeout /t 5 /nobreak >nul
) else (
    echo NEXORA Backend is already running on port 5000.
)

echo.
echo ===============================
echo NEXORA READY
echo ===============================
echo.
echo Opening NEXORA...

start "" "http://localhost:5000"

exit

