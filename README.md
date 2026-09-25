# Eason — Academic Homepage

纯静态个人学术主页。无需安装依赖，无需构建。双击 index.html 即可查看。支持手机和中英文切换，深浅色自动跟随系统设置。

## 发布到 GitHub Pages

1. 在 GitHub 创建名为 `Boiyaaa.github.io` 的公开仓库（已有则使用原仓库，先备份旧内容）。
2. 将本文件夹内的 `index.html`、`styles.css`、`script.js`、`photo.jpg`、`favicon.svg`、`.nojekyll` 上传到仓库根目录，不要把外层文件夹整体上传。
3. 在仓库 Settings → Pages 中选择 Deploy from a branch，分支选择 main，目录选择 / (root)，保存。
4. 部署完成后访问 https://Boiyaaa.github.io/ 。

也支持项目仓库部署：资源采用相对路径。

## 日常维护

页面按职责拆分为三个文件，无需构建即可运行：

- `index.html`：页面结构、文字、代表作、实习经历和邮箱。`data-en` 与 `data-zh` 分别存储两种语言内容；初始显示文字也应同步修改。翻译属性允许使用 `em`、`strong`、`br` 等 HTML，仅填写可信的本地内容。
- `styles.css`：页面样式、手机适配和减少动画偏好，遵循 `design.md` 的设计规范（单一 Action Blue 强调色、系统字体、胶囊按钮、深色 tile 突出重点）。顶部 `:root` 变量控制颜色，深色主题变量在其下方。
- `script.js`：Language 下拉菜单（中文 / English）、年份和滚动导航高亮。选择的语言保存在浏览器中，存储不可用时仍可正常切换。

页面顶部的“近况”（Highlights）列出最重要的三件事，有新消息时直接在 `index.html` 中增删条目。

头像使用根目录中的 `photo.jpg`，位于左侧个人信息栏，按原始比例显示（电脑端宽 200px，平板 112px，手机 88px，均保持在名字左侧）。更换头像时替换此文件即可。

## 内容说明

教育经历按本人提供的信息倒序展示：2026 年 10 月至今，奥克兰大学计算机科学博士在读，导师为 Dr Hong Jia、Dr Xinyu Zhang 和 Associate Professor Jing Sun；2024–2026 年，奥克兰大学人工智能硕士（一等荣誉）；2021–2025 年，西南大学计算机科学与技术学士。日期按提供的信息填写，支持中英文切换。

实习经历根据提供的履历图片整理：2024.03–2024.05，科大讯飞重庆分公司，软件开发实习生，参与小说数据分析平台开发。已替换原来的两个项目，内容支持中英文切换。

代表作根据提供的两篇 PDF 及作者补充的信息整理，并提供中英文简介：

- Trait Collapse in Text-to-Image Generation: Evaluating and Mitigating Personality Inconsistency in Visual Storytelling：ViStoryBench-Personality 基准与 TBV 框架，作者按原稿列出。
- Cognitive alignment in personality reasoning: Leveraging prototype theory for MBTI inference：原型引导的检索增强人格推断。标题、作者名单及顺序按作者补充的信息列出。

根据作者确认，第一篇标注为 EMNLP 2026 主会论文，第二篇标注为 arXiv 预印本。当前未包含 PDF 文件或下载链接。未加入没有资料的任教、获奖、学术服务或 CV。没有统计追踪、第三方字体和外部脚本。

这是可部署的源代码包，本交付不代表已经上传到你的 GitHub 账号。
