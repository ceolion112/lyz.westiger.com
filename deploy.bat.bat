@echo off
chcp 65001 >nul
cd /d %~dp0

echo ========================================
echo   落云宗静态站同步构建工具
echo   8297 (SDCMS) -> 本地构建 -> 8294 (预览)
echo ========================================
echo.

echo [1/4] 正在从 8297 拉取最新数据到 data.json ...
php sync_data.php
if errorlevel 1 goto :err
echo.

echo [2/4] 正在从 8297 同步静态资源 (CSS/JS/图片/上传文件) ...
php sync_static.php
if errorlevel 1 goto :err
echo.

echo [3/4] 正在构建静态 HTML ...
php build.php
if errorlevel 1 goto :err
echo.

echo [4/4] 正在同步到 8294 预览目录 ...
if not exist "D:\wwwroot\demo.westiger.com" (
    echo   ⚠  警告：预览目录不存在，跳过复制
    echo   请确认 8294 站点路径是否正确
) else (
    echo   复制 index.html ...
    copy /y "index.html" "D:\wwwroot\demo.westiger.com\index.html" >nul
    
    echo   复制 pages/ ...
    if exist "pages" xcopy "pages" "D:\wwwroot\demo.westiger.com\pages" /E /I /Y >nul
    
    echo   复制 theme/2023/ ...
    if exist "theme\2023" xcopy "theme\2023" "D:\wwwroot\demo.westiger.com\theme\2023" /E /I /Y >nul
    
    echo   复制 public/ ...
    if exist "public" xcopy "public" "D:\wwwroot\demo.westiger.com\public" /E /I /Y >nul
    
    echo   复制 upfile/ ...
    if exist "upfile" xcopy "upfile" "D:\wwwroot\demo.westiger.com\upfile" /E /I /Y >nul
    
    echo   复制 favicon.ico ...
    if exist "favicon.ico" copy /y "favicon.ico" "D:\wwwroot\demo.westiger.com\favicon.ico" >nul
    
    echo   复制 .htaccess ...
    if exist ".htaccess" copy /y ".htaccess" "D:\wwwroot\demo.westiger.com\.htaccess" >nul
)
echo.

echo ========================================
echo   ✅ 完成！
echo   请在浏览器打开：http://127.0.0.1:8294
echo   确认无误后，告诉我"确认推送"再推 GitHub
echo ========================================
pause
goto :eof

:err
echo.
echo ❌ 出错了，请查看上面的错误信息
pause