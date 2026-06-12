@echo off
chcp 65001 >nul
cd /d %~dp0

echo ========================================
echo   推送到 GitHub main主分支 -> Cloudflare Pages
echo   以 8294 预览目录成品覆盖仓库源码
echo ========================================
echo.

REM ===== 第一步：从 8294 复制成品到本地仓库目录 =====
if not exist "D:\wwwroot\demo.westiger.com" (
    echo ❌ 找不到 8294 预览目录，请先运行 deploy.bat
    pause
    goto :eof
)

echo [1/3] 复制8294成品覆盖本地仓库文件 ...
xcopy "D:\wwwroot\demo.westiger.com\*" "%~dp0" /E /I /Y /R
echo   (✅ 本地文件完全对齐8294预览站结构)
echo.

REM ===== 第二步：提交所有变更 =====
echo [2/3] 扫描文件变更并提交
git add -A

set /p msg=输入本次更新备注(回车默认): 
if "%msg%"=="" set msg=sync: update static site assets

git commit -m "%msg%"
if errorlevel 1 (
    echo ⚠ 无文件改动，无需推送
    pause
    goto :eof
)
echo.

REM ===== 第三步：推送到线上main分支（Pages部署分支） =====
echo [3/3] 推送至GitHub main主分支
git push origin main
if errorlevel 1 (
    echo ❌ 推送失败！检查网络、权限或分支冲突
    pause
    goto :eof
)
echo.

echo ========================================
echo ✅ 推送完成！Cloudflare Pages 1-2分钟自动构建上线
echo 线上地址：https://lyz.westiger.com
echo 样式异常请浏览器 Ctrl+F5 强制清除缓存
echo ========================================
pause