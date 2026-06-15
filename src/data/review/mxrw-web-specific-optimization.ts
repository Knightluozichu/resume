/** 复习题库 · Web 专项优化（mxrw-web-specific-optimization）。Unity Mobile/XR/Web 优化 Ch4 改编。 */

import type { ReviewQuestion } from "./types";

export const mxrwWebSpecificOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "mxrw-web-1",
    chapter: "mxrw-web-specific-optimization",
    level: 1,
    question: "Unity WebGL Build 的 C# 代码最终在浏览器中以什么形式执行？",
    answer:
      "IL2CPP 将 C# 编译为 C++ 中间码，再由 Emscripten 交叉编译为 WebAssembly（Wasm）字节码——浏览器在 Wasm 虚拟机中执行。引擎底层（渲染/物理/音频等 C++ 代码）也编译为 Wasm。纹理/网格/音频等资产打成 .data 文件随网页下载。",
    tags: ["WebGL", "WebAssembly", "IL2CPP"],
  },
  {
    id: "mxrw-web-2",
    chapter: "mxrw-web-specific-optimization",
    level: 1,
    question: "Wasm 2023 相比旧版 Wasm 有哪三个关键改进？",
    answer:
      "① Sign Extension / Non-Trapping FP-to-Int / Bulk Memory 等指令集完成——避免 IL2CPP 绕路生成大量辅助指令，.wasm 体积缩 5–15%。② Wasm GC 部分落地——IL2CPP 托管对象与浏览器 JS 引擎 GC 直接协作，效率大幅提升。③ Native Wasm Threads 稳定——C# Job System + Burst 可在浏览器 Worker 线程中并行跑，不阻塞主线程。",
    tags: ["Wasm 2023", "WebAssembly"],
  },
  {
    id: "mxrw-web-3",
    chapter: "mxrw-web-specific-optimization",
    level: 1,
    question: "Web 平台的纹理压缩格式和移动端有什么不同？",
    answer:
      "完全相反：Web 端浏览器用的 GPU 是桌面显卡（通过 WebGL），支持 DXT/BC 系列格式（DXT1/BC1、DXT5/BC3、BC7），不支持 ASTC/ETC2。移动端则相反——支持 ASTC/ETC2、不支持 DXT/BC。因此一个项目同时出 Web+移动端必须按平台 override 纹理格式。",
    tags: ["纹理压缩", "WebGL", "DXT5"],
  },
  {
    id: "mxrw-web-4",
    chapter: "mxrw-web-specific-optimization",
    level: 2,
    question: "Chrome DevTools Performance Panel 如何用来分析 Unity WebGL Build 的性能？",
    answer:
      "打开 DevTools → Performance 面板 → 录制 3–5 秒 → 在 Flame Chart 中：灰色块 = 浏览器原生任务、**黄色块 = Wasm 执行**（你的 C# 代码转成的 Wasm 在跑）。展开黄色块看函数名（IL2CPP 保留的 C# 原名），找 Self Time 最高的函数。底部 Summary 面板显示各函数 Self 时间排行——思路和 Unity Profiler 的 CPU Usage 展开一致。",
    tags: ["Chrome DevTools", "Profiling", "WebGL"],
  },
  {
    id: "mxrw-web-5",
    chapter: "mxrw-web-specific-optimization",
    level: 2,
    question: "Web 端 AssetBundle 加载策略应包含哪些要点？",
    answer:
      "① 首场景资源打进主 build——最小可玩体验（登录/主菜单）不需要额外下载。② 后续 AssetBundle 走 CDN 分发（Addressables Remote Catalog）。③ 必须有下载进度条和预计剩余时间——Web 端用户不知道在下载就会以为卡死了。④ 缓存策略：`Caching.compressionEnabled = true` + 已下载过的 AB 从浏览器缓存读、不重新下载。⑤ 远程 URL 用绝对路径 + CDN 配置 CORS 头。",
    tags: ["AssetBundle", "Web", "CDN"],
  },
  {
    id: "mxrw-web-6",
    chapter: "mxrw-web-specific-optimization",
    level: 2,
    question: "WebGL Build 出来 120MB，用户打开网页白屏 20 秒。列出至少三个体积优化的方向。",
    answer:
      "① 纹理全用 RGBA32 未压缩 = 体积最大元凶 → 按平台 override 为 DXT5/BC7。② 音频未压缩（PCM）→ 全部压缩为 Vorbis（Quality 50–70%）。③ Managed Stripping Level 未开 = 不用的 C# 代码全编译进了 Wasm → 设为 High。④ 用 Build Report 看各资源体积分布，从最大的文件开始砍。⑤ 删除不用的内置 Shader Variant。",
    tags: ["体积优化", "WebGL", "Build Report"],
  },
  {
    id: "mxrw-web-7",
    chapter: "mxrw-web-specific-optimization",
    level: 3,
    question: "AssetBundle 在 Editor 里加载正常，WebGL Build 上线后 404 或 CORS 错误。排查步骤？",
    answer:
      "① 检查 Addressables Remote Catalog 是否使用了相对路径（Web 端相对路径以网页域名为基础 ≠ 你想要的 CDN 路径）→ 改为绝对 URL（如 `https://cdn.example.com/bundles/`）。② CDN 服务器是否配置了 `Access-Control-Allow-Origin: *` CORS 头。③ Safari 还要求 CDN 返回 `Cross-Origin-Resource-Policy: cross-origin` 头。④ 用 DevTools Network Panel 看实际的请求 URL 和响应状态码。",
    tags: ["AssetBundle", "WebGL", "CORS", "排查"],
  },
  {
    id: "mxrw-web-8",
    chapter: "mxrw-web-specific-optimization",
    level: 3,
    question: "网站在 Chrome 上跑 60 FPS 流畅，Safari 上只有 15 FPS。什么原因？",
    answer:
      "Safari 的 WebGL 2.0 实现在一些操作上比 Chrome 慢得多：频繁切换 Render Target 和多次 Post-processing Pass 在 Safari 上的开销远大于 Chrome（Chrome 有 ANGLE 层优化）。iOS Safari 上 JS→Wasm→WebGL 多跳开销还被限制的浏览器进程优先级放大。修法：减少全屏 Post Pass（合并到一个 Pass）、Render Scale 设 0.8–0.9、不用 CPU-heavy 的每帧操作（如 `Camera.main` 在 Update 反复调）。",
    tags: ["Safari", "兼容性", "WebGL"],
  },
  {
    id: "mxrw-web-9",
    chapter: "mxrw-web-specific-optimization",
    level: 2,
    question: "WebGL Build 的 IL2CPP 函数名映射如何在 DevTools 中看到？",
    answer:
      "Player Settings → Publishing Settings → 启用 `Enable Exceptions` 至少选择 `Explicitly Thrown Exceptions Only`——这会保留部分异常信息和函数名映射。如果彻底关掉异常（None），DevTools  Flame Chart 里 Wasm 栈只显示十六进制地址，无法定位到具体 C# 函数。代价是包体稍大——Web 端需要函数名时值得开。",
    tags: ["IL2CPP", "DevTools", "函数名映射"],
  },
  {
    id: "mxrw-web-10",
    chapter: "mxrw-web-specific-optimization",
    level: 3,
    question: "Web 端的主菜单帧率正常（60FPS），进入战斗关卡掉到 20FPS。DevTools 显示黄色 Wasm 块中 BattleManager.Update() 的 Self Time 占 70%。排查并给修复路径。",
    answer:
      "① 展开 `BattleManager.Update()` 旗下的子函数，找 Self Time 最高的子函数（AI 逻辑/物理查询/调试日志）。② 检查是否有每帧 GC 分配（`new List<T>()`、字符串拼接、`foreach` over non-generic）→ IL2CPP GC 在 Wasm 环境代价极高。③ 检查 `Find()`/`GetComponent()` 在 Update 反复调 → 改为 Awake() 缓存。④ 纯计算太多（如 500 单位每帧视线判断）→ 分帧执行（每帧 1/N）或切 Job System+Burst（如果开了 Wasm Threads）。⑤ 降级 AI 更新频率从每帧到每 3 帧。",
    tags: ["DevTools", "排查", "WebGL"],
  },
  {
    id: "mxrw-web-11",
    chapter: "mxrw-web-specific-optimization",
    level: 2,
    question: "WebGL Build 上线前需要在哪些浏览器上测试？为什么不能只测 Chrome？",
    answer:
      "至少测试 Chrome + Safari + Firefox + 移动端 Safari/Chrome。原因：① Safari 的 WebGL 2.0 部分扩展支持有限（如浮点 RT 可能不可用）→ 效果可能黑屏；② iOS Safari 的 Wasm 内存上限约 1.2GB（比桌面小得多）→ 复杂场景可能崩溃；③ Firefox Wasm 编译速度通常慢于 Chrome（不同编译器后端）→ 首帧启动慢 2–3 秒；④ 微信内置浏览器 X5 内核对 WebGL 兼容极差。Chrome 好不等于所有浏览器都好。",
    tags: ["浏览器兼容", "测试", "WebGL"],
  },
];
