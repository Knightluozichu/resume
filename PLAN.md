# remuse — Shader 教学网站总体计划

> 创建于 2026-06-12 ｜ 域名：blog.luozichu.ink ｜ 服务器：腾讯云 Lighthouse（配置见 local.env，已 gitignore）

## 一、目标

做一个现代化的 Shader 教学网站：

- 首页：3D 炫酷跑车模型（实时渲染，展示本站技术力）
- 内容：以 LearnOpenGL-CN 为蓝本改编（CC BY-NC 4.0，注明出处并链接原文），按原书章节体系推进
- 核心卖点：**每章配可交互的可视化组件**，让读者吃透每个知识点和算法
- 路线：先在本地 Mac 开发完善 → 部署到腾讯云服务器 → blog.luozichu.ink 上线

## 二、已确认的技术决策

| 决策点 | 选择 | 理由 |
|---|---|---|
| 技术栈 | Next.js (App Router) + TypeScript | 全栈一体化：页面/MDX 内容/3D/API 一个框架全包 |
| 3D 渲染 | React Three Fiber + Three.js + drei | 首页跑车场景；教学 Demo 用自研 WebGL2 组件 |
| 样式 | Tailwind CSS，暗色现代主题 | |
| 内容 | MDX 文件，git 即 CMS | 纯静态起步，不引入数据库 |
| 代码高亮 / 数学 | shiki / KaTeX | |
| 部署 | 本地 build → rsync 产物 → pm2 守护 → nginx 反代 | 轻量服务器内存友好，deploy.sh 一键部署 |
| 评论（后期） | giscus（GitHub Discussions） | 无需数据库 |

### 关键认知：OpenGL vs WebGL2

原书是桌面 OpenGL 3.3 + C++，浏览器跑 WebGL2（GLSL ES 3.0），概念一一对应。
教学形态：讲 OpenGL 概念 → 代码 Tab 同时展示原版 C++/GLSL 330 → 页面内嵌 WebGL2 实时交互 Demo。

## 三、教学组件库（本站护城河，长期迭代）

| 组件 | 用途 |
|---|---|
| `ShaderCanvas` | WebGL2 实时渲染，传入 vert/frag 即跑 |
| `ShaderEditor` | CodeMirror 6 在线改 GLSL，实时重编译 + 错误行高亮 |
| `UniformControls` | 自动生成滑块/颜色选择器调 uniform |
| `PipelineViz` | 渲染管线分步动画（顶点→图元装配→光栅化→片段→测试混合） |
| `MathViz` | 向量/矩阵/坐标变换交互可视化（变换/坐标系统/摄像机三章核心） |
| `CompareSlider` | 左右拖动对比（如 Phong vs Blinn-Phong） |

## 四、里程碑

- [ ] **M0 骨架**（半天）：git init、Next.js + Tailwind 脚手架、暗色主题、基础布局（导航/页脚/首页占位）
- [ ] **M1 先上线**（1 天）：
  - SSH 盘点服务器：nginx 配置方式、80/443 现状、Node/pm2 是否已装、内存余量、确认备案状态
  - 编写 `deploy.sh`：本地 `next build`（standalone 输出）→ rsync → pm2 reload
  - nginx 新增 blog.luozichu.ink vhost + SSL（证书路径见 local.env）
  - 骨架站在 blog.luozichu.ink 可访问 ✅ 此后每次迭代线上可见
- [ ] **M2 首页 3D 跑车**（1–2 天）：
  - 找 CC 协议 glTF 跑车模型（Sketchfab 等），gltf-transform + Draco/KTX2 压缩至 ≤3MB
  - R3F 场景：HDRI 环境光、Bloom 后处理、车漆 clearcoat 材质、鼠标视差/滚动驱动镜头
  - 低端设备/弱网降级：静态海报图 + 懒加载
- [ ] **M3 内容系统**（1–2 天）：MDX 管线、章节侧边栏（入门/光照/模型加载/高级 OpenGL/高级光照/PBR）、shiki、KaTeX、C++/GLSL 代码 Tab 组件
- [ ] **M4 Shader 组件库**（2–3 天起步）：先做 ShaderCanvas + UniformControls + ShaderEditor 最小可用版
- [ ] **M5 内容冲刺**（持续）：入门章开打——你好窗口 → 三角形 → 着色器 → 纹理 → 变换 → 坐标系统 → 摄像机，每章至少 1 个交互 Demo
- [ ] **M6 增强**：pagefind 站内搜索、giscus 评论、umami 自托管统计；学习进度等动态功能需要时再加 SQLite

## 五、风险与注意点

1. **版权**：CC BY-NC 4.0 — 改编而非搬运，每章显著注明出处并链接 learnopengl.com 与中文版
2. **备案**：大陆服务器走 80/443 需 ICP 备案；同 IP 已有多个子域在线，应已备案，M1 时确认
3. **性能预算**：Three.js 按需 code-split；所有 Canvas 组件客户端懒加载（`next/dynamic` ssr:false）；首页模型压缩是体验生死线
4. **服务器共存**：同机已挂 love/h5/wechat/dj/divine 等站点，部署只能"新增 vhost + 内部端口"，不得动现有配置
5. local.env 含密钥，已 gitignore，**永远不进 git**；`.venv` 为资源查询脚本遗留，与网站无关

## 六、服务器现状速查（来自 local.env，2026-06-12）

- Lighthouse 轻量服务器一台，blog.luozichu.ink A 记录已指向它
- 未开通：COS / CDN / 云数据库 / 容器服务 —— 一切单机自托管
- SSL 证书已配置（DNSPod 自动验证）
