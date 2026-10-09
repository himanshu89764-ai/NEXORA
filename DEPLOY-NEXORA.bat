@echo off
cd /d "%~dp0"
echo ===== NEXORA ONE-CLICK DEPLOY =====
git status --short
node --check backend/server.js
if errorlevel 1 (echo ERROR: Syntax check failed. Push cancelled.& pause & exit /b 1)
git diff --check
if errorlevel 1 (echo ERROR: Diff check failed. Push cancelled.& pause & exit /b 1)
git add -u && git add -- DEPLOY-NEXORA.bat
if errorlevel 1 (echo ERROR: Git add failed.& pause & exit /b 1)
git diff --cached --quiet
if not errorlevel 1 (echo No changes to deploy.& pause & exit /b 0)
git commit -m "Deploy NEXORA update"
if errorlevel 1 (echo ERROR: Commit failed.& pause & exit /b 1)
git push origin main
if errorlevel 1 (echo ERROR: Push failed.& pause & exit /b 1)
echo SUCCESS: Pushed to GitHub. Wait for Render deployment to become Live.
pause
