/** 复习题库 · 移动端性能优化（mxrw-mobile-optimization）。Unity Mobile/XR/Web 优化 Ch2 改编。 */

import type { ReviewQuestion } from "./types";

export const mxrwMobileOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "mxrw-mobile-1",
    chapter: "mxrw-mobile-optimization",
    level: 1,
    question: "Tile-based GPU 和桌面 GPU 的核心架构差异是什么？",
    answer:
      "桌面 GPU 是 Immediate Mode——一帧画面从头到尾整体处理；移动 GPU 是 Tile-based——把屏幕切成小块（Tile，通常 16×16 或 32×32 像素），每块在 GPU 内部超快 SRAM 中完成渲染后一次性写回主显存。核心开销差异：Render Target Load/Store（载入/写出）在桌面端可忽略、在移动端是真开销。",
    tags: ["Tile-based GPU", "架构"],
  },
  {
    id: "mxrw-mobile-2",
    chapter: "mxrw-mobile-optimization",
    level: 1,
    question: "ASTC 和 ETC2 的各自适用平台是什么？",
    answer:
      "ASTC：iOS（A8+）和 Android（Mali/Adreno 5xx+）双端支持，是现代移动项目的首选。ETC2：几乎所有 Android 设备支持但不支持 iOS，是兼容降级方案（老设备 fallback）。PC/主机用 DXT/BC 系列，WebGL 用 DXT5/BC7。",
    tags: ["ASTC", "ETC2", "纹理压缩"],
  },
  {
    id: "mxrw-mobile-3",
    chapter: "mxrw-mobile-optimization",
    level: 1,
    question: "移动端设置 targetFrameRate 时，为什么要关掉 vSync？",
    answer:
      "移动端：`QualitySettings.vSyncCount > 0` 时 `targetFrameRate` 被忽略——手机强制按屏幕刷新率的整数倍分频跑。60Hz 屏 vSync=1 就是 60 FPS，GPU 画不完下一帧就跳到 30。关 vSync（设为 0）后 targetFrameRate 才真正生效。桌面端相反：vSync 应开启以防画面撕裂。",
    tags: ["targetFrameRate", "vSync", "帧率"],
  },
  {
    id: "mxrw-mobile-4",
    chapter: "mxrw-mobile-optimization",
    level: 2,
    question: "移动端 MSAA 2x 的代价为什么比桌面端小？",
    answer:
      "移动 Tile GPU 对 MSAA 有硬件加速——多重采样在 Tile Memory（超快片上 SRAM）内完成，resolve 才写回 DRAM。桌面 GPU 每个采样点都直接操作显存。因此移动端 2x MSAA 的性价比远高于桌面端，通常在可接受范围内。",
    tags: ["MSAA", "Tile-based GPU"],
  },
  {
    id: "mxrw-mobile-5",
    chapter: "mxrw-mobile-optimization",
    level: 2,
    question: "一张 2048×2048 RGBA 纹理未压缩时占多少内存？ASTC 6×6 压缩后占多少？",
    answer:
      "未压缩 RGBA32：2048×2048×4 字节 = 16MB。ASTC 6×6 压缩后：约 1.4MB（2048×2048×1 bpp / 8 / 1024 / 1024）。差异约 11 倍。这是纹理压缩对移动端内存和带宽的最直观杠杆。",
    tags: ["纹理压缩", "ASTC", "内存"],
  },
  {
    id: "mxrw-mobile-6",
    chapter: "mxrw-mobile-optimization",
    level: 2,
    question: "QualitySettings 画质分级系统中，URP Asset 的角色是什么？",
    answer:
      "每档画质（Low/Medium/High）各绑定一个独立的 URP Asset 文件。切换画质档位时自动切换 URP Asset，从而改变 Render Scale、MSAA Level、Shadow Distance、HDR 等关键参数。这实现了同一项目在不同设备上的差异化体验——高端机跑高画质、低端机跑流畅。",
    tags: ["QualitySettings", "URP Asset", "画质分级"],
  },
  {
    id: "mxrw-mobile-7",
    chapter: "mxrw-mobile-optimization",
    level: 2,
    question: "移动端纹理选择 DXT5（BC3）格式，打到 Android 真机上会怎样？为什么？",
    answer:
      "纹理变成紫色/黑色或显示异常。DXT/BC 系列是 PC/主机专属格式，移动 GPU 不支持。Unity 在运行时发现不支持的格式会解压成 RGBA32——不仅格式不对，还消耗 CPU 解压时间和 4 倍显存。Android/iOS 应使用 ASTC 或 ETC2。",
    tags: ["纹理压缩", "DXT5", "格式兼容"],
  },
  {
    id: "mxrw-mobile-8",
    chapter: "mxrw-mobile-optimization",
    level: 3,
    question: "在 PC Editor 上优化完帧率稳 120 FPS，打到手机上变 8 FPS。列出至少三个可能原因。",
    answer:
      "① PC GPU 是 Immediate Mode、手机是 Tile-based——PC 上 'GPU 不忙' 的操作（如频繁切换 Render Target、全屏后处理 Blit）在手机上触发大量 Tile Load/Store，带宽直接爆。② 纹理未按移动平台压缩格式设置（PC 用了 DXT/BC，手机解压成了 RGBA32——4 倍内存+带宽）。③ Editor 走桌面 GPU 驱动路径，GPU 架构完全不同——优化策略不通用。排查顺序：先用 Render Doc/Xcode GPU Capture 在真机上抓一帧看 Load/Store 动作。",
    tags: ["跨平台", "Tile-based GPU", "排查"],
  },
  {
    id: "mxrw-mobile-9",
    chapter: "mxrw-mobile-optimization",
    level: 3,
    question: "项目在小米 12 上跑 60 FPS 很稳，到小米 8 上只有 20 FPS。GPU 端 Render Target Load/Store 占了 40% 帧时。如何排查和修复？",
    answer:
      "可能原因：①URP Asset 里开了 `Depth Texture` 和 `Opaque Texture`——每帧额外一次全屏 RT Load/Store。修法：关掉不必要的 Pass。②滥用全屏后处理或 GrabPass——每个全屏 Pass 都是一次 RT Load+Store。修法：合并后处理到 URP Renderer Feature。③Render Scale 对所有设备一样——低端机应自动降到 0.6–0.7。修法：按 QualitySettings 分级设不同 Render Scale。排查顺序：逐项关掉 → 每次看 GPU Load/Store 占比 → 锁定最大凶手。",
    tags: ["Load/Store", "Tile-based GPU", "排查"],
  },
  {
    id: "mxrw-mobile-10",
    chapter: "mxrw-mobile-optimization",
    level: 3,
    question: "移动端弱网/离线场景下的资源加载策略应包含哪些要点？",
    answer:
      "① 首包资源打进 APK/IPA（StreamingAssets），保证离线基础可玩性。② Addressables 远程 catalog 设置本地 fallback——超时自动切本地资源。③ `UnityWebRequest` 的 timeout 设合理值（≤5s），超时不卡死。④ 下载进度条+预计剩余时间（Web 端尤其重要）。⑤ 大资源下载加 Wi-Fi-only 选项——4G/5G 不限流量但用户不一定愿意烧。核心原则：首次可玩不需要网络，远程资源只做增量。",
    tags: ["弱网", "资源加载", "移动端"],
  },
  {
    id: "mxrw-mobile-11",
    chapter: "mxrw-mobile-optimization",
    level: 2,
    question: "移动端应用在什么情况下应考虑降帧来省电？怎么实现？",
    answer:
      "电池低于 20% 时自动降帧：`SystemInfo.batteryLevel` 读取电量 → 低于 0.2 时 `Application.targetFrameRate = 30`。原因：用户宁要手机不烫、电量不掉，也不要 60 FPS。发热触发 CPU/GPU 降频后，强制 60 FPS 可能比稳定 30 FPS 体验更差。配合 Adaptive Performance 包可获得更智能的动态调节。",
    tags: ["电池", "targetFrameRate", "帧率"],
  },
];
