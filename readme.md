# 静态同步建站项目约束文档
## 1. 本地根目录
工作根目录：D:\github_static
## 目录上传约束补充
1. theme/templates（原2023）：本地PHP模板源码，禁止推送GitHub
2. theme/dist：构建输出成品静态资源，允许推送GitHub
3. 所有.php脚本、.json缓存、WANLAI.md全程本地私有
## 2. 上游SDCMS动态源
物理路径：D:\wwwroot\fanren.westiger.com
访问地址：http://127.0.0.1:8297
程序：SDCMS
数据库：库frxxz，账号root，密码123
数据来源：站点API输出JSON

## 3. Git与Cloudflare部署规则
GitHub仓库：ceolion112/lyz.westiger.com
线上域名：https://lyz.westiger.com
强制规则：
1. 仅推送**渲染完成的纯静态成品**：index.html、pages目录、assets资源、.gitignore
2. 所有php同步/构建脚本、templates模板、cache缓存、WANLAI.md约束文档、调试文件禁止推送仓库
3. 仓库绑定CF Pages，推送后自动部署公网站点

## 4. 预览测试站点
路径：D:\wwwroot\demo.westiger.com
预览地址：http://127.0.0.1:8294
流程：渲染生成静态文件 → 复制至demo目录预览无误 → 再推送GitHub

## 5. 运行流程
1. 执行sync_data.php：拉取API数据存入cache JSON缓存
2. 执行build.php：读取缓存 + 拼接header/footer模板，批量生成纯净HTML
3. 复制成品到demo预览测试
4. 合规文件git push至仓库，CF自动发布

## 6. 技术规范
1. PHP仅作为本地构建工具，线上无PHP环境
2. 公共头尾由本地PHP渲染拼接进完整HTML，不使用前端JS动态加载公共块
3. 页面直出完整内容，适配SEO
4. 上游数据频繁更新时，重复【同步→构建→预览→推送】循环