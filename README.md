# Walter Projects 网站

轻量的四项目中文介绍网站：Duo、NativeAlbumFilter、PhotosVideo2x、Venera-Max。

## 预览

直接打开 `index.html`。也可在本目录运行：

```sh
python3 -m http.server 8000
```

访问 http://localhost:8000 。无需 npm、打包器、第三方 CDN 或外部字体。

## 文件

- `index.html`：页面内容与结构，未启用 JavaScript 时仍能查看简介和仓库链接。
- `style.css`：浅色、深色、桌面与手机响应式布局。
- `projects.js`：详细介绍、功能、兼容说明与入口。
- `app.js`：分类筛选、详情弹窗、主题记忆、FAQ 和四项目交互演示。
- `favicon.svg`：网页标识。
- `standalone.html`：打包生成的单文件版，包含 CSS 和 JavaScript，便于分享和离线预览。
- `build.py`：重新生成单文件版。修改后运行 `python3 build.py`。

请同步维护首页 `index.html` 与详情 `projects.js` 中的项目文案。不要将候选修复写成已验证稳定。

## 交互

- 全部 / iPhone 插件 / 跨平台应用分类。
- 原生 dialog 项目详情：键盘 Esc 关闭、焦点返回、背景点击关闭、内部滚动。
- 主题切换并保存在本机。
- FAQ 展开收起。
- Duo：缩放竖排电量与网络组、切换 Wi-Fi / 5G。
- NativeAlbumFilter：切换未归类筛选，24 个示例色块真正减少到 7 个。
- PhotosVideo2x：90 秒计时、播放暂停、1/2/3 倍速和拖动定位；关闭弹窗 / 页面隐藏时暂停。
- Venera-Max：纸张 / 夜间主题及三页演示翻页。

功能演示仅在网页中运行，不连接设备或项目服务；颜色块、书封与阅读文字为示意，不是实际 App 截图。

## 发布

### GitHub Pages

把目录里的网页文件上传到你的站点仓库。Settings → Pages → Deploy from a branch，选择目标分支的根目录。网页是相对路径，可部署在子路径中。

### Netlify / Cloudflare Pages

以本目录作为静态资源目录。无需构建命令。也可以使用 `standalone.html` 并重命名为 `index.html` 上传。

正式站点：https://walter498.github.io/walter-projects-site/

源码仓库：https://github.com/Walter498/walter-projects-site

「查看更多」直接打开对应 GitHub 项目仓库；「功能演示」打开站内介绍和交互演示。NativeAlbumFilter 当前为私有仓库，访客访问需要权限；本站部署不改变任何项目仓库的可见性。

## 设计参考

- Apple Human Interface Guidelines / Buttons：https://developer.apple.com/design/human-interface-guidelines/buttons
  - 清晰标签、至少 44×44 的触控区域、按下反馈、主要操作层级。
- MDN / dialog：https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
  - 原生模态、初始焦点、Esc、背景不可交互。
- W3C WCAG 2.2：https://www.w3.org/TR/WCAG22/
  - 键盘操作、可见焦点、语义标签、减少动态效果。

参考原则已落实到触控尺寸、focus-visible、aria-pressed、原生 dialog、prefers-reduced-motion；未进行完整 WCAG 合规认证。

## 验收（2026-10-11）

内置 Safari 预览：390×844 手机 / 1440×1000 桌面。

已检查：无横向溢出、四张卡片布局、分类结果、详情焦点、关闭后焦点返回、24→7→24 筛选、Duo 135% 缩放与网络切换、65 秒显示 01:05、3× 真实时间计数、暂停、阅读主题与翻页、全站主题切换。

仓库入口链接保留用户提供的四个地址。私有仓库可能需要访问权限；各项目的实际兼容性、发布状态和安装方法以项目文档为准。
