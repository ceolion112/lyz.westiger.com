@echo off
chcp 65001 >nul
cd /d %~dp0

echo ========================================
echo   推送到 GitHub -> Cloudflare Pages
echo   （直接以 8294 预览目录的成品为准）
echo ========================================
echo.

REM ===== 第一步：从 8294 复制成品到本地工作目录 =====
if not exist "D:\wwwroot\demo.westiger.com" (
    echo ❌ 找不到 8294 预览目录，请先运行 deploy.bat
    pause
    goto :eof
)

echo [1/3] 从 8294 复制成品到本地工作目录 ...
xcopy "D:\wwwroot\demo.westiger.com\*" "%~dp0" /E /I /Y /R >nul
echo   (✅ 8294 有什么，这里就有什么)
echo.

REM ===== 第二步：git add -A 全部添加 =====
echo [2/3] 添加变更并提交 ...
git add -A

set /p msg=请输入提交说明（直接回车使用默认）: 
if "%msg%"=="" set msg=sync: update static pages

git commit -m "%msg%"
if errorlevel 1 (
    echo.
    echo   ⚠  没有变更需要提交（所有文件与上次提交相同）
    pause
    goto :eof
)
echo.

REM ===== 第三步：推送 =====
echo [3/3] 推送到 GitHub ...
git push
if errorlevel 1 (
    echo.
    echo   ❌ 推送失败，请检查网络或 git 配置
    pause
    goto :eof
)
echo.

echo ========================================
echo   ✅ 推送完成！
echo   Cloudflare Pages 约 1~2 分钟后自动部署
echo   线上地址：https://lyz.westiger.com
echo ========================================
echo   如线上样式异常，请 Ctrl+F5 强制刷新浏览器
echo ========================================
pause