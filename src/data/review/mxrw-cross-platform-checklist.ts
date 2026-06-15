/** 复习题库 · 跨平台性能检查清单（mxrw-cross-platform-checklist）。Unity Mobile/XR/Web 优化 Ch5 改编。 */

import type { ReviewQuestion } from "./types";

export const mxrwCrossPlatformChecklistQuestions: ReviewQuestion[] = [
  {
    id: "mxrw-cl-1",
    chapter: "mxrw-cross-platform-checklist",
    level: 1,
    question: "移动端/XR/Web 三平台的帧预算各是多少（含 CPU/GPU 分配建议）？",
    answer:
      "移动 60FPS = 总预算 16.6ms → CPU ≤14ms、GPU ≤12ms。XR 90FPS = 总预算 11.1ms → CPU ≤9ms、GPU ≤8ms。Web 60FPS = 总预算 16.6ms → CPU ≤13ms、GPU ≤10ms。CPU 和 GPU 各自拿总预算的一部分，剩下的留给合成/驱动/桥接开销。",
    tags: ["帧预算", "跨平台"],
  },
  {
    id: "mxrw-cl-2",
    chapter: "mxrw-cross-platform-checklist",
    level: 1,
    question: "移动端检查清单包含哪六个步骤？",
    answer:
      "① 纹理压缩检查（Memory Profiler 确认格式为 ASTC 非 RGBA32）。② Render Scale + MSAA（URP Asset 中参数核查）。③ Draw Call / SetPass（Profiler Rendering 模块看数量和合批情况）。④ CPU Update 耗时（展开 ScriptRunBehaviourUpdate 找 Top 3 Self Time 函数）。⑤ 热降频测试（关温控跑最耗场景 10 分钟看 FPS 趋势）。⑥ 弱网/离线测试（关网、基础功能可玩）。",
    tags: ["检查清单", "移动端"],
  },
  {
    id: "mxrw-cl-3",
    chapter: "mxrw-cross-platform-checklist",
    level: 1,
    question: "XR 检查清单包含哪六个步骤？",
    answer:
      "① Single Pass Instanced 确认（Frame Debugger 验证）。② Motion-to-Photon 延迟（OVR Metrics Tool 实测 ≤20ms）。③ Foveated Rendering 级别（头显实测选最优级）。④ XR Input 开销（Profiler CPU 搜 XRInput ≤1ms）。⑤ ASW/合成检查（OVR Metrics Tool 看触发次数）。⑥ 连续续航+热降频（头显实玩 20 分钟看 FPS 趋势）。",
    tags: ["检查清单", "XR"],
  },
  {
    id: "mxrw-cl-4",
    chapter: "mxrw-cross-platform-checklist",
    level: 1,
    question: "Web 检查清单包含哪六个步骤？",
    answer:
      "① 下载体积（Build Report 看 Wasm ≤15MB、Data ≤30MB）。② 首次加载时间（Fast 3G 节流下首帧 ≤10s）。③ Chrome DevTools Performance 录制（黄色 Wasm 块 Top 3 Self Time 函数）。④ AssetBundle 缓存（DevTools Network 看 304 状态码+CORS 头）。⑤ 多浏览器兼容（Chrome+Safari+Firefox+移动端各跑一遍）。⑥ 内存检查（Chrome Task Manager 看 ≤512MB、iOS Safari 看 Wasm 内存上限）。",
    tags: ["检查清单", "Web"],
  },
  {
    id: "mxrw-cl-5",
    chapter: "mxrw-cross-platform-checklist",
    level: 2,
    question: "为什么性能检查清单中必须包含热降频测试？不做会有什么后果？",
    answer:
      "移动设备和 Standalone VR 在长时间高负载下会触发温度保护（热降频）——CPU/GPU 频率下降导致帧率断崖式下跌。如果只测冷启动的前几分钟而不做连续负载测试，你看到的 FPS 数据是「假绿灯」——上线后用户玩 10 分钟开始卡顿、但开发者复现不了。修法：开发者选项中临时关温控做 A/B 对比，确认性能问题来自温控降频还是代码本身，然后用 Adaptive Performance 包做平滑降级。",
    tags: ["热降频", "测试"],
  },
  {
    id: "mxrw-cl-6",
    chapter: "mxrw-cross-platform-checklist",
    level: 2,
    question: "Web 端为什么要在 Fast 3G 节流模式下测试首次加载？",
    answer:
      "真实用户的网络环境千差万别——不是每个人都坐在 WiFi 前。Fast 3G 节流（Chrome DevTools Network Panel 中可选）模拟了移动网络下用户的典型体验。如果只在开发者本机的千兆局域网里测试，你会觉得「加载挺快的」——但用户的 4G 网络可能让你 30MB 的 Data 文件加载 15 秒。Fast 3G 节流测试暴露的是真实用户的第一体验。",
    tags: ["网络节流", "Web", "测试"],
  },
  {
    id: "mxrw-cl-7",
    chapter: "mxrw-cross-platform-checklist",
    level: 2,
    question: "移动端检查清单中「弱网/离线测试」的具体做法？",
    answer:
      "关 WiFi + 关蜂窝数据 → 重新打开 App → 检查：① 基础的登录/主菜单/核心玩法能否正常运行（不依赖网络资源）。② 需要网络的功能有没有本地 fallback（如 AssetBundle 超时自动切本地资源）。③ 下载失败的提示是否友好（不显示 404 裸错误、不卡死无限 Loading）。核心原则：首包资源打进安装包保证离线基础体验，远程资源只做增量。",
    tags: ["弱网测试", "离线", "移动端"],
  },
  {
    id: "mxrw-cl-8",
    chapter: "mxrw-cross-platform-checklist",
    level: 3,
    question: "你的项目需要同时出 Android + iOS + Quest + WebGL 四个 Build。为每个平台设计正确的纹理压缩格式映射。",
    answer:
      "Android：ASTC 6×6（通用）/ ASTC 4×4（法线）/ ASTC 8×8（大背景）。iOS：ASTC 6×6（同 Android，全系自 A8 起支持）。Quest（Android Standalone VR）：ASTC 6×6（Quest 运行 Android 系统+Qualcomm GPU=ASTC）。WebGL：DXT5/BC3（通用）/ BC7（高质量纹理）。关键：Android/iOS/Quest 走 ASTC 生态、WebGL 走 DXT/BC 生态——完全相反的两套格式，必须在 Texture Importer 中按平台 override。",
    tags: ["纹理压缩", "跨平台", "格式映射"],
  },
  {
    id: "mxrw-cl-9",
    chapter: "mxrw-cross-platform-checklist",
    level: 3,
    question: "你为团队建立 CI 性能门禁——从建立基线到 CI 自动验证的完整链路是什么？",
    answer:
      "① 选目标设备+固定画质档位，跑代表性强负载场景，录制 3 份 Profiler .data 作为初始基线（记录 FPS 均值、CPU/GPU ms、内存、Draw Call 峰值）。② 把基线 .data 导入 Profile Analyzer 记录关键指标。③ CI 在每次性能相关 PR 时自动在目标设备跑同样场景、录制 .data、用 Profile Analyzer CLI 比对基线。④ 关键指标恶化超过阈值（如 FPS 均值降超 5%）→ CI 标红阻止合入。⑤ 每周自动跑一遍全量场景生成趋势报告防止缓慢退化。",
    tags: ["CI", "性能门禁", "基线"],
  },
  {
    id: "mxrw-cl-10",
    chapter: "mxrw-cross-platform-checklist",
    level: 2,
    question: "跨平台检查清单中，为什么 Draw Call 上限在移动端是 500、XR 是 300、Web 是 300？",
    answer:
      "Draw Call 上限取决于各平台的 CPU 弱项：移动端 CPU 相对强于 XR 和 Web 的 Wasm 执行环境，所以移动端可承受更多 Draw Call。XR 帧预算只有 11.1ms——CPU 预算极紧，降低 Draw Call 同时减少 CPU 提交时间。Web 端 Wasm 执行比原生代码慢（Wasm→WebGL 桥接开销），Draw Call 产生的管线状态切换在 Wasm 中被放大，所以上限更严格。",
    tags: ["Draw Call", "跨平台", "帧预算"],
  },
  {
    id: "mxrw-cl-11",
    chapter: "mxrw-cross-platform-checklist",
    level: 3,
    question: "Web 端上线前发现首次加载需 25 秒（Fast 3G），而目标 ≤10 秒。从哪几方面入手砍加载时间？",
    answer:
      "① Build Report 看各资源体积分布 → 找最大体积贡献者先砍。② 纹理格式确认是 DXT5/BC7 而非 RGBA32（格式错误 = 多 4–10 倍体积）。③ 音频全批转为 Vorbis 压缩（Quality 50–70%）→ PCM 不压缩是体积黑洞。④ Managed Stripping Level 调到 High → 减少 Wasm 模块体积。⑤ 首场景资源打进主 build（非远程 AB）保证首帧不需要额外下载。⑥ 删除不用的 Shader Variant（Shader Stripping）。⑦ CDN 上 AssetBundle 走 gzip/brotli 压缩传输。按体积从大到小逐项砍。",
    tags: ["加载优化", "WebGL", "体积"],
  },
];
