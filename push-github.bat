@echo off
chcp 65001 >nul
cd /d %~dp0

echo ========================================
echo   推送到 GitHub -> Cloudflare Pages
echo   注意：仅推送静态成品，不包含 PHP/JSON/模板
echo ========================================
echo.

echo [1/3] git 状态 ...
git status --short
echo.

set /p msg=请输入提交说明（直接回车使用默认）: 
if "%msg%"=="" set msg=sync: update static pages

echo.
echo [2/3] 提交变更 ...
git add -A
git commit -m "%msg%"
if errorlevel 1 (
    echo   (没有变更需要提交)
    pause
    goto :eof
)

echo.
echo [3/3] 推送到 GitHub ...
git push
echo.

echo ========================================
echo   ✅ 推送完成！
echo   Cloudflare Pages 约 1~2 分钟后自动部署
echo   线上地址：https://lyz.westiger.com
echo ========================================
pause