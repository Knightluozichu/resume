/** 复习题库 · 功耗优化（prof-power-optimization）。Unity 官方 Profiling 指南 Ch6 改编。 */

import type { ReviewQuestion } from "./types";

export const profPowerOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "prof-power-1",
    chapter: "prof-power-optimization",
    level: 1,
    question: "在 Unity 里设置目标帧率的 C# API 是什么？30FPS 和 60FPS 各对应什么参数值？",
    answer:
      "`Application.targetFrameRate`。设为 30 = 目标 30FPS（适合省电/回合制）；设为 60 = 目标 60FPS（适合动作/音游）；设为 -1 = 走平台默认最高刷新率（移动端通常是 30 或 60，PC 可能 120+）。",
    tags: ["targetFrameRate", "帧率"],
  },
  {
    id: "prof-power-2",
    chapter: "prof-power-optimization",
    level: 1,
    question: "从 30FPS 提升到 60FPS，理论功耗大约增加多少？为什么不是精确的两倍？",
    answer:
      "理论翻倍（像素处理量×2），但实际功耗往往增加 2–4 倍。因为 CPU/GPU 为赶上更紧的帧预算必须跑更高频率，而频率和功耗的关系是非线性的（近似 f³）——频率提 30% 功耗可能翻倍。加上内存带宽、总线等固定开销不随帧率线性变化。",
    tags: ["帧率", "功耗", "频率"],
  },
  {
    id: "prof-power-3",
    chapter: "prof-power-optimization",
    level: 1,
    question: "VSync（垂直同步）是什么？开 VSync 和关 VSync 各有什么后果？",
    answer:
      "VSync = 垂直同步信号，由显示器发出的刷新周期（60Hz 显示器约每 16.67ms 发一次）。开 VSync：GPU 必须等下一帧 VSync 信号才能把渲染结果交换到屏幕——画面完整无撕裂，但帧率被锁在刷新率整数分频。关 VSync：GPU 画完立刻换上去——帧率不受限，但屏幕可能在显示上一帧到一半时被新帧覆盖，产生画面中间的水平撕裂线（Screen Tearing）。",
    tags: ["VSync", "Screen Tearing"],
  },
  {
    id: "prof-power-4",
    chapter: "prof-power-optimization",
    level: 1,
    question: "移动端降低分辨率（Render Scale）对性能和功耗有什么影响？Unity 里在哪设？",
    answer:
      "降低 Render Scale（如 1.0→0.8）即降低渲染分辨率——GPU 处理的像素数按边长平方下降（0.8²=0.64，即只处理原 64% 像素），帧时间大幅下降，GPU 频率被允许降低，整体功耗随之降。在 Unity 中通过 `Screen.SetResolution(w, h, fullscreen)` 或 URP/质量设置里的 `Render Scale` 滑块调节。",
    tags: ["Render Scale", "分辨率"],
  },
  {
    id: "prof-power-5",
    chapter: "prof-power-optimization",
    level: 2,
    question: "什么是动态帧率（Adaptive Performance）？它和固定帧率有什么区别？",
    answer:
      "动态帧率 = 根据当前场景负载和设备温度自动切换帧率目标（如战斗切 60FPS、探索切 30FPS、菜单切更低）。固定帧率 = 全程顶着同一个目标不调整。动态帧率的优势是把高帧率只在玩家能感知到流畅的地方用（动作场景），其他时间用低帧率省电降温——一趟地铁 30 分钟的游戏，动态帧率可以比固定 60FPS 多撑 30%–50% 电量。Unity 的 Adaptive Performance 包（Samsung GameSDK / Android 原生）提供了对应的 API。",
    tags: ["动态帧率", "Adaptive Performance"],
  },
  {
    id: "prof-power-6",
    chapter: "prof-power-optimization",
    level: 2,
    question: "手机玩游戏发热掉帧——描述温控降频（Thermal Throttling）的机制和应对策略。",
    answer:
      "机制：SoC 温度超过阈值后，系统固件强制降低 CPU/GPU 频率以保护硬件——此时即使你的渲染逻辑毫秒内完成，硬件跑得慢导致每帧时间拉长、帧率强制下降。应对策略：①检测——用 Adaptive Performance API 读温度状态和性能等级（Performance Level）；②响应——温度过热告警触发时，主动降 Render Scale、降 LOD 等级、关后处理特效、切低帧率模式，减少发热量以后频率自然回升；③预判——在能预知场景将高负载（即将进战斗）前提前降低所有非必要开销。",
    tags: ["Thermal Throttling", "温控降频"],
  },
  {
    id: "prof-power-7",
    chapter: "prof-power-optimization",
    level: 2,
    question: "QualitySettings 在移动端的分级策略是什么？通常分几档？每档该调什么？",
    answer:
      "典型分 3–4 档：Low / Medium / High / Ultra。Low：关闭阴影、关闭后处理、LOD 偏粗、纹理 Mipmap 偏粗、Blit 精简；以帧率/温控优先。Medium：开启低影、可选 Bloom、纹理最大 512–1024、LOD 中等。High：全效果、纹理全部 2048、SSAO 开启。Ultra：终级画质（旗舰机专供）。每档用 `QualitySettings.SetQualityLevel(index)` 切换，各档配置在 Project Settings → Quality 里预设。核心原则：不要到设备发热了才去降——应该根据设备性能等级预设好起始档位。",
    tags: ["QualitySettings", "分级"],
  },
  {
    id: "prof-power-8",
    chapter: "prof-power-optimization",
    level: 2,
    question: "`Application.targetFrameRate = 30` 和 VSync Count = 2（Every Second V Blank）有什么区别？都能达到 30FPS 吗？",
    answer:
      "都能在 60Hz 显示器上达到约 30FPS，但机制不同。`targetFrameRate = 30` 是软目标——引擎尽量让你跑不满 30 但 GPU 仍可能偶尔超过被 VSync 抓住产生抖动。`VSync Count = 2`（QualitySettings.vSyncCount = 2）是硬同步——GPU 固定每两个 VSync 才交换一次缓冲区，帧节奏绝对均匀。推荐用 vSyncCount 控制 30FPS 场景（节奏稳定 → 输入延迟可预测），用 targetFrameRate 控制不限帧场景。",
    tags: ["VSync Count", "帧节奏"],
  },
  {
    id: "prof-power-9",
    chapter: "prof-power-optimization",
    level: 3,
    question: "你的游戏在 iPhone 13 上跑 60FPS 没问题，但在 iPhone 8 上 5 分钟后就掉到 25FPS。列出诊断和修复步骤。",
    answer:
      "诊断：①先在 iPhone 8 上插 Xcode 看 CPU/GPU 占用和功耗报告（Xcode → Debug Navigator → Energy Impact）。②用 Unity Profiler Remote 连接真机看 CPU Usage 和 Rendering 模块里哪一块最热。③检查温控——如果 5 分钟后掉帧、温度升高、频率下降，典型 Thermal Throttling。修复：①加入 Adaptive Performance 包，检测过热时主动降画质（Render Scale 0.7、LOD 降级、关阴影/后处理）。②检查是不是在 Loading 阶段就吃了大量内存/CPU（异步加载未做好）。③看 GPU 的 Fill Rate 是否超标——iPhone 8 屏幕像素少但 GPU 性能更弱，降低 Render Scale 是最快见效的方法。",
    tags: ["Thermal Throttling", "移动端", "排查"],
  },
  {
    id: "prof-power-10",
    chapter: "prof-power-optimization",
    level: 3,
    question: "用 `Application.targetFrameRate = 60` 在 120Hz 屏幕上实际跑多少帧？怎么让它真正只跑 60？",
    answer:
      "`targetFrameRate = 60` 是「目标」，但在 120Hz 屏幕上 VSync Count 默认是 0 或 1（每帧交一帧），Android/iOS 设备可能忽略该值直接用最高刷新率——实际跑接近 120FPS，功耗远超预期。要让 120Hz 屏真正只跑 60：①设 `Application.targetFrameRate = 60`；②显式设 `QualitySettings.vSyncCount = 0`（不跟显示器节拍），但这只能让引擎不主动交给 VSync，系统仍可能推最高帧率。最终需用 `Screen.currentResolution.refreshRate` 读实际刷新率并配合 `Application.targetFrameRate = refreshRate/2`（Android）或用 Xcode 限制 iOS 最大帧率（更底层）。最可靠：在 Android 用 `Screen.SetResolution(w, h, fullscreen, 60)` 的第五个参数在 Unity 2022+ 中限制刷新率。",
    tags: ["targetFrameRate", "高刷新率", "120Hz"],
  },
  {
    id: "prof-power-11",
    chapter: "prof-power-optimization",
    level: 2,
    question: "QualitySettings 里 `vSyncCount` 和 `Application.targetFrameRate` 同时设置会发生什么？谁优先？",
    answer:
      "两者冲突。`vSyncCount` 是平台级 VSync 循环（硬同步），`targetFrameRate` 是引擎级帧率目标。同时设置时，VSync Count > 0 会覆盖 targetFrameRate——因为 VSync 硬同步决定了帧交换时刻，引擎的 targetFrameRate 在 VSync 被激活时被忽略。如果需要手动控制帧率（如动态帧率在多设备上），需要 `QualitySettings.vSyncCount = 0` 先关闭 VSync，再用 `Application.targetFrameRate` 设目标值。但关 VSync 意味着引入了画面撕裂的可能——通常这是移动端省电策略下可接受的取舍。",
    tags: ["vSyncCount", "targetFrameRate"],
  },
  {
    id: "prof-power-12",
    chapter: "prof-power-optimization",
    level: 3,
    question: "你设计了 4 档画质设置（Low/Med/High/Ultra），但测试发现 Low 档的 GPU 时间还是降不下去——怎么回事？",
    answer:
      "可能原因：①Low 档只调了 Texture Quality 和 Shadow Quality，没降 Render Scale——Fill Rate 还是满的（这是移动端最常忽略的）。②LOD 没被正确触发——画质档位切换了但 LOD Bias 没联动改。③Draw Call 没降——Quality 设置不改复杂度（物体数/材质数），只改渲染特性——物体太多了再低的画质也跑不动。④UI 层占了大头——Canvas 重绘和画质档位完全无关。⑤VSync 或 targetFrameRate 没同步改——Low 档仍顶着 VSync=1（60FPS 硬限），GPU 虽然跑得轻但也得等下一个 VSync。",
    tags: ["QualitySettings", "排查"],
  },
];
