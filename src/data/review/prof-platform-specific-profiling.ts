/** 复习题库 · 平台专项 Profiling（prof-platform-specific-profiling）。Unity 官方 Profiling 指南 Ch7 改编。 */

import type { ReviewQuestion } from "./types";

export const profPlatformSpecificProfilingQuestions: ReviewQuestion[] = [
  {
    id: "prof-platform-1",
    chapter: "prof-platform-specific-profiling",
    level: 1,
    question: "Unity Profiler 支持哪些平台的远程连接？各平台常用什么连接方式？",
    answer:
      "Android：USB ADB 端口转发（`adb forward tcp:55000 tcp:55000`）或 WiFi 同网段直连。iOS：USB 连接 Mac → Xcode Devices 窗口勾选「确保可发现」→ Profiler 自动发现。Console（PS5/Xbox/Switch）：通过 DevKit 网络连接（需开发机授权）。PC/Editor：本地直连，最方便。WebGL：无法连接 Unity Profiler——只能用 Chrome DevTools Performance 面板。",
    tags: ["远程连接", "平台"],
  },
  {
    id: "prof-platform-2",
    chapter: "prof-platform-specific-profiling",
    level: 1,
    question: "Android 设备连不上 Profiler——列出至少 4 个常见原因和检查步骤。",
    answer:
      "①Build Settings 里没勾选 `Development Build` 或 `Autoconnect Profiler`——两个都必须勾。②ADB 未连接——`adb devices` 看看设备是否 listed。③USB 线只有充电没开数据传输——换根数据线或检查手机 USB 模式。④防火墙拦截 Unity 多播端口范围 54998–55511。⑤WiFi 模式下 Editor 和设备不在同一子网。⑥AndroidManifest 缺少 `<uses-permission android:name=\"android.permission.INTERNET\"/>`。⑦如果 Autoconnect 失败，手动输入设备 IP：Profiler 窗口 → Active Profiler Target → 输入 `IP:端口`。",
    tags: ["Android", "连接", "排查"],
  },
  {
    id: "prof-platform-3",
    chapter: "prof-platform-specific-profiling",
    level: 1,
    question: "WebGL 构建为什么不能直接用 Unity Profiler？Web 平台用什么替代？",
    answer:
      "WebGL 运行在浏览器沙箱里——Unity Editor 无法通过常规网络协议与浏览器内的 WebAssembly 运行时建立 Profiler 连接。替代方案：用 Chrome DevTools → Performance 面板录制帧时间线（看 JS/WASM 调用耗时）；用 Memory 面板看堆快照（对应 Unity 的 Managed 内存）；用 Rendering 面板看 GPU frame timing。也可在代码里打 `Debug.Log` + 收集日志后分析，或使用 Unity 的 Profiler Recorder API 把部分指标输出到 Console。",
    tags: ["WebGL", "Chrome DevTools"],
  },
  {
    id: "prof-platform-4",
    chapter: "prof-platform-specific-profiling",
    level: 1,
    question: "RenderDoc 是什么？它在 Unity Profiling 工作流中扮演什么角色？",
    answer:
      "RenderDoc 是一款开源 GPU 帧调试器（跨平台、支持 Vulkan/D3D/Metal/GLES）。它能捕获单帧的所有 Draw Call、查看每个 Draw Call 的输入/输出纹理、看 Shader 编译结果和资源绑定——这些 Unity Profiler 的 Rendering 模块做不到。在 Profiling 工作流中：先用 Unity Profiler 发现 GPU Bound → 再用 RenderDoc 捕获那一帧逐 Draw 分析「这个阴影 pass 为什么 4ms」「这个全屏后处理为什么纹理重复 bind」。Web 端不支持 RenderDoc，移动端（Android Vulkan/GLES）和 PC 都支持。",
    tags: ["RenderDoc", "GPU"],
  },
  {
    id: "prof-platform-5",
    chapter: "prof-platform-specific-profiling",
    level: 2,
    question: "Xcode Instruments 和 Unity Profiler 在分析 iOS 性能时各自能看什么？为什么两者需要配合？",
    answer:
      "Unity Profiler 能看：引擎内部 CPU/GPU 模块耗时、Managed 堆/资源分类内存、脚本热点函数。Xcode Instruments 能看：系统级 CPU 能耗等级、GPU 能耗报告、Metal 时间线（看具体渲染命令的 GPU 侧的耗时）、整个进程的物理内存压力（PSS/RSS）、温度状态。Unity Profiler 看不到「系统说你的 GPU 已经热得快降频了」「其他进程在后台吃内存让你被 jetsam 了」——这些必须用 Xcode Instruments 才能感知。两者配合 = Unity 内部 + 系统外部，完整诊断画像。",
    tags: ["Xcode Instruments", "iOS"],
  },
  {
    id: "prof-platform-6",
    chapter: "prof-platform-specific-profiling",
    level: 2,
    question: "Perfdog（性能狗）是什么？它和 Unity Profiler 相比有什么独特的优势？",
    answer:
      "Perfdog 是腾讯出品的移动端性能测试工具，不需要 Development Build——它通过系统级采集（adb shell dumpsys / Xcode instruments）直接读设备的 FPS、CPU/GPU 频率、温度、电流、功耗、网络流量等底层指标。独特优势：①无需 Development Build（Release 包就能测，更接近玩家体验）；②能看到温度、电流曲线——这些 Unity Profiler 完全看不到；③支持长时间录制（几十分钟到小时级）、自动生成统计报告；④支持多设备同时对比。缺点是看不到 Unity 内部的函数级耗时——所以 Perfdog 和 Unity Profiler 是互补关系。",
    tags: ["Perfdog", "移动端"],
  },
  {
    id: "prof-platform-7",
    chapter: "prof-platform-specific-profiling",
    level: 2,
    question: "在 PC 上开发 Unity 游戏，你用 Unity Profiler 发现 GPU Time 很高——下一步用什么工具深入分析 GPU 瓶颈？",
    answer:
      "先确认 GPU 架构（N卡=NSight Graphics、A卡=Radeon GPU Profiler、通用=RenderDoc）。然后用 RenderDoc 捕获一帧：①看每个 Draw Call 的 GPU duration——找到最慢的几个；②对每个慢 Draw 展开像素历史看 Shader 代码、输入纹理和输出——确认是不是过度绘制（同一像素反复画）、是不是 Shader 复杂度过高（一堆采样+分支）、是不是带宽受限（大量纹理来回读）。如果只看 Unity Profiler 的 GPU Usage 条，只知道「GPU 花了 20ms」但不知道是哪几个 Draw 把时间吃了——RenderDoc 逐 Draw 分析是精准定位的必备技能。",
    tags: ["GPU", "RenderDoc", "NSight"],
  },
  {
    id: "prof-platform-8",
    chapter: "prof-platform-specific-profiling",
    level: 2,
    question: "XR 平台（Quest/Vision Pro）的帧预算为什么是 11ms（90FPS）而非 16.67ms（60FPS）？这对开发者意味着什么？",
    answer:
      "Quest 2/3 运行 90FPS 甚至 120FPS（Quest 3 能上 120），90FPS → 每帧预算约 11.1ms。Vision Pro 的目标也是高刷新。在低帧率下用户会感知到延迟从而导致眩晕（Motion Sickness）——与移动端「30FPS 凑合玩」完全不同。对开发者的影响：画质必须大幅让步——不能上复杂的阴影和全局光照、三角形预算极紧、后处理克制、必须用 FFR（Foveated Rendering）和 Single Pass Stereo 等空间优化。在 XR 平台上 Profiling 的第一件事不是找热点——是检查「这帧能不能在 11ms 内跑完」。用 Oculus Debug Tool（Quest）或 Metal Performance HUD（Vision Pro）做帧预算监控。",
    tags: ["XR", "帧预算", "Motion Sickness"],
  },
  {
    id: "prof-platform-9",
    chapter: "prof-platform-specific-profiling",
    level: 3,
    question: "你要为一个多平台 Unity 项目建立统一的 Profiling 流程——Console/PC/Mobile/XR/Web 五个平台各走不同的工具链。画一个决策表或流程图描述每个平台从「发现性能问题」到「定位根因」的标准路径。",
    answer:
      "PC：Unity Profiler（定位 CPU/GPU 模块整体状况）→ RenderDoc/NSight（逐 Draw GPU 深度）→ Profile Analyzer（多轮回归对比）。Console：DevKit Profiler 采集 → PC 端 SDK 工具分析 → 同平台专用 GPU 工具（PIX for Xbox / Razor for PS5）。Mobile：Perfdog 或 Xcode Instruments（系统级温度/功耗/频率）→ Unity Profiler Remote（引擎内 CPU/GPU 模块）→ RenderDoc (Android Vulkan) / Xcode GPU Frame Capture (iOS Metal) → Perfdog 长时回归测试。XR：Oculus Debug Tool / Metal Performance HUD（帧预算、GPU 时间线、温度）→ Unity Profiler 远程 CPU 分析 → RenderDoc。Web：Chrome DevTools Performance（帧时间线和脚本耗时定位）→ Memory（堆快照对比找泄漏）→ Rendering 面板（看 layer compositing）。共享组件：所有平台的 .data 都喂给 Profile Analyzer 做 CI 回归（当前平台测当前平台基准）。",
    tags: ["流程", "多平台", "工具链"],
  },
  {
    id: "prof-platform-10",
    chapter: "prof-platform-specific-profiling",
    level: 3,
    question: "iOS 上用 Development Build 连 Profiler，发现每次 Profiler 连接后帧率明显下降——这是 Profiler 自身开销吗？怎么最小化这个开销？",
    answer:
      "是 Profiler 连接和数据传输的开销——Profiler 在 Development Build 中持续把性能采样数据通过 USB 或 WiFi 发给 Editor，这个序列化和传输过程本身吃 CPU 和带宽。尤其 WiFi 连接时开销更大（TCP 包频繁 ACK）。最小化方法：①只在需要抓取特定场景时开启 Profiler 连接——连接之前先让游戏跑起来进入目标场景再连；②只录需要的时间段（点 Record 按钮限定范围而非持续连接）；③用 Better Stream 模式把数据写进设备本地磁盘、结束后再导入 Editor 分析，完全不占用实时连接开销；④在 Profiler 窗口关闭不需要的模块（如 Audio、UI）减少传输数据量。",
    tags: ["Profiler 开销", "iOS"],
  },
  {
    id: "prof-platform-11",
    chapter: "prof-platform-specific-profiling",
    level: 2,
    question: "Console（游戏主机）平台的 Profiling 和 PC/Mobile 最大的不同是什么？",
    answer:
      "①封闭生态——每个主机有专用的 SDK Profiling 工具（Xbox:PIX、PS5:Razor CPU/GPU Profiler、Switch:NVIDIA NSight），不像 PC 用通用工具。②开发机授权——没有 DevKit 根本连不上 Profiler，不像手机插根线就行。③功能限制——主机平台的 Profiler 工具能看到的信息受平台政策限制，有些底层 GPU 计数器不可见。④目标设备完全固定——性能上限是绝对的（不像 PC 玩家可以换显卡），优化到帧预算不是「最好能」而是「必须能」（否则提交认证不通过）。⑤认证（Certification）要求——每一帧必须在预算内完成并稳定，甚至帧率波动范围也有上限。",
    tags: ["Console", "认证"],
  },
  {
    id: "prof-platform-12",
    chapter: "prof-platform-specific-profiling",
    level: 4,
    question: "你在做一个 PC+Mobile+Console 同步上线的 Unity 项目。PC 版优化独立、Mobile 版受限于 CPU/GPU 算力和功耗、Console 版要在认证前达标。请给出三条不同平台的优化优先级清单和各自要避免的陷阱。",
    answer:
      "PC：优先级①GPU bound 是第一位——Resolution/Shadow/SSAO 这些后处理最吃帧时间；②CPU 脚本热点；③内存不是主要约束（8GB+）。陷阱：在 PC 上优化完了觉得 GPU 时间余量大，一键切 Mobile 发现崩溃——PC 的泛化优化不能直接套用移动端。Mobile：优先级①内存（超标则 kill）—先查纹理/网格/音频有无 Native 泄漏；②GPU Fill Rate + 功耗—降 Render Scale、减半透明重叠；③温控降频—Adaptive Performance 提前感知。陷阱：Connect Profiler 时看数字好——但去掉 Profiler 后温度一高就降频露出；只用 Unity Profiler 看 Native 内存但忽略了 PSS（系统物理内存压力）。Console：优先级①GOLD 帧预算（每帧必须完成，认证强制要求）—锁定场景和画质、用 DevKit Profiler 逐帧确认无超时；②加载时间达标（认证也检查，甚至场景切换也要能在规定秒内返回）；③网络/存储的专项测试。陷阱：PC 上「勉强贴线 30FPS」在 Console 上是「认证失败」——必须留有安全余量。",
    tags: ["多平台", "优化", "认证"],
  },
];
