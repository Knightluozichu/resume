/** 复习题库 · XR 优化（ugo-xr-optimizations）。Unity Game Optimization Ch7 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoXrOptimizationsQuestions: ReviewQuestion[] = [
  {
    id: "ugo-xr-1",
    chapter: "ugo-xr-optimizations",
    level: 1,
    question: "PC VR 90 FPS 与 Standalone 72 FPS 各约对应多少毫秒帧预算？",
    answer:
      "90 FPS ≈ 11.1 ms/帧；72 FPS ≈ 13.9 ms/帧。XR 还需余量给合成、姿态预测与重投影，实际渲染预算更紧。",
    tags: ["XR 性能预算", "FPS"],
  },
  {
    id: "ugo-xr-2",
    chapter: "ugo-xr-optimizations",
    level: 1,
    question: "为何 XR 比同分辨率桌面更耗 GPU？",
    answer:
      "双眼需分别渲染或使用立体路径，像素量约 2× eye buffer；MSAA、Post 等全屏成本也按眼放大。未 Single Pass 时 Draw/SetPass 亦接近翻倍。",
    tags: ["双眼渲染", "GPU"],
  },
  {
    id: "ugo-xr-3",
    chapter: "ugo-xr-optimizations",
    level: 1,
    question: "Single Pass Instanced 的核心思路是什么？",
    answer:
      "一次 Draw Call 通过 GPU Instancing 与 unity_StereoEyeIndex/SV_InstanceID 同时为左右眼输出，避免 Multi-Pass 对场景遍历两遍，降 CPU 与驱动开销。",
    tags: ["Single Pass Instanced"],
  },
  {
    id: "ugo-xr-4",
    chapter: "ugo-xr-optimizations",
    level: 2,
    question: "URP 中如何启用 Single Pass Instanced？",
    answer:
      "Project Settings → XR Plug-in Management 启用目标 Loader；URP Renderer Data 中 Stereo Rendering Mode 选 Single Pass Instanced。自定义 Shader 需 XR 立体宏，Post/Fullscreen Pass 需验证双眼。",
    tags: ["URP XR", "Single Pass"],
  },
  {
    id: "ugo-xr-5",
    chapter: "ugo-xr-optimizations",
    level: 2,
    question: "Foveated Rendering（FFR）如何节省 GPU？代价是什么？",
    answer:
      "注视中心全分辨率，周边降低 shading/采样密度，降 Fragment Fill rate。代价是周边模糊或 shimmer（游泳感），等级过高快速转头时更明显；需与 Render Scale 实机权衡。",
    tags: ["Foveated Rendering", "FFR"],
  },
  {
    id: "ugo-xr-6",
    chapter: "ugo-xr-optimizations",
    level: 2,
    question: "Multi-Pass Stereo 为何在移动端很少使用？",
    answer:
      "每物体/Pass 提交两次，Batches 与 SetPass 接近翻倍，CPU 与移动 GPU 驱动开销大。现代 OpenXR/URP 默认 Single Pass Instanced 或 Multiview。",
    tags: ["Multi-Pass", "Mobile VR"],
  },
  {
    id: "ugo-xr-7",
    chapter: "ugo-xr-optimizations",
    level: 2,
    question: "XR 输入开销主要来自哪些环节？",
    answer:
      "XR Input Subsystem 每帧 Poll HMD/控制器/手部姿态；XR Interaction Toolkit 射线与 UI 命中、Hand 骨骼更新、Physics Raycast 等叠加 CPU。应合并更新、缓存 Device/Action、减少散落 Poll。",
    tags: ["XR 输入", "CPU"],
  },
  {
    id: "ugo-xr-8",
    chapter: "ugo-xr-optimizations",
    level: 3,
    question: "Standalone VR GPU bound 时的推荐优化顺序是什么？",
    answer:
      "① 确认目标 FPS 与 Single Pass 生效；② Render Scale + FFR 降 Fill；③ 降 MSAA、Post、Shadow Distance；④ 若仍 bound 查 Vertex/LOD。避免未定位阶段只调一项。CPU bound 则查 XR Input 与脚本。",
    tags: ["排查清单", "Standalone"],
  },
  {
    id: "ugo-xr-9",
    chapter: "ugo-xr-optimizations",
    level: 3,
    question: "Editor Game 视图 FPS 正常但头显仍晕，常见原因有哪些？",
    answer:
      "Editor 未走真实 XR 合成、Motion-to-Photon 与设备刷新；未测热节流降频；GPU/CPU 在设备上 bound 但 Editor 未反映。需 Build 到设备并用 Meta/Oculus Profiler 看 App GPU、Stale frames。",
    tags: ["Profiler", "晕动症"],
  },
  {
    id: "ugo-xr-10",
    chapter: "ugo-xr-optimizations",
    level: 3,
    question: "Single Pass 开启后 Post 只影响一只眼，可能原因与修法？",
    answer:
      "自定义 Fullscreen/Grab Pass 未处理立体双眼或未使用 XR 兼容 Blit。修法：改用 URP 内置 XR 兼容 Post；自定义 Pass 处理 Texture Array/unity_StereoEyeIndex，Frame Debugger 分别检查 Left/Right eye。",
    tags: ["Post-processing", "XR"],
  },
  {
    id: "ugo-xr-11",
    chapter: "ugo-xr-optimizations",
    level: 2,
    question: "URP Render Scale 与 FFR 有何区别？何时优先哪一项？",
    answer:
      "Render Scale 均匀缩放 eye buffer 分辨率，全屏降 Fill；FFR 仅降周边采样，中心清晰。Fragment/Post bound 时 Scale 常更直接；需在边缘质量可接受前提下先试 FFR Medium，再叠 Scale，逐项 Profiler A/B。",
    tags: ["Render Scale", "FFR"],
  },
];
