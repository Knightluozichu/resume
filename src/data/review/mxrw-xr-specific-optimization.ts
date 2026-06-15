/** 复习题库 · XR 专项优化（mxrw-xr-specific-optimization）。Unity Mobile/XR/Web 优化 Ch3 改编。 */

import type { ReviewQuestion } from "./types";

export const mxrwXrSpecificOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "mxrw-xr-1",
    chapter: "mxrw-xr-specific-optimization",
    level: 1,
    question: "Motion-to-Photon 延迟包含哪四个阶段？",
    answer:
      "① 传感器采样（IMU 读取头显运动 ~1–3ms）→ ② CPU 游戏逻辑（Update/物理/AI/输入 ~需控制在 9ms 内@90FPS）→ ③ GPU 渲染双眼（~8ms 内@90FPS）→ ④ 合成+显示（畸变校正/ATW/屏幕刷新 ~2–4ms）。总延迟 ≤20ms 为可接受、≤15ms 为舒适。",
    tags: ["Motion-to-Photon", "延迟链"],
  },
  {
    id: "mxrw-xr-2",
    chapter: "mxrw-xr-specific-optimization",
    level: 1,
    question: "PC VR、Standalone VR、高端 VR 设备的目标帧率各是多少？对应的帧预算呢？",
    answer:
      "PC VR（如 Valve Index）：90 FPS → 约 11.1ms/帧。Standalone VR（Quest/Pico）：72–90 FPS → 约 13.9–11.1ms/帧。高端设备（Quest 3/Pro、Apple Vision Pro）：最高 120 FPS → 约 8.3ms/帧。实际渲染预算还要减 2–3ms 给合成+姿态预测。",
    tags: ["帧预算", "FPS", "XR"],
  },
  {
    id: "mxrw-xr-3",
    chapter: "mxrw-xr-specific-optimization",
    level: 1,
    question: "Single Pass Instanced 和 Multi-Pass Stereo 的性能差异在哪里？",
    answer:
      "Multi-Pass：对场景遍历两遍（左眼一遍、右眼一遍），Batches 和 SetPass 接近翻倍，CPU Draw Call 2×。Single Pass Instanced：GPU 用硬件 Instancing 一次 Draw Call 同时输出到双眼 Texture Array，CPU Draw 从 2× 降到 1×，是现代 XR 的标准配置。",
    tags: ["Single Pass Instanced", "Multi-Pass"],
  },
  {
    id: "mxrw-xr-4",
    chapter: "mxrw-xr-specific-optimization",
    level: 1,
    question: "Foveated Rendering 利用了什么生理原理来节省 GPU？",
    answer:
      "人眼只有黄斑中心凹（fovea）几度的视野范围是真正「高清」的——往外的周边视野感光细胞密度急剧下降，天生就模糊。FFR 对注视中心以全分辨率渲染，对周边区域逐步降低着色密度或分辨率——GPU 在周边画得再精细你也看不清。",
    tags: ["Foveated Rendering", "FFR"],
  },
  {
    id: "mxrw-xr-5",
    chapter: "mxrw-xr-specific-optimization",
    level: 2,
    question: "Dynamic Foveated Rendering 和 Fixed Foveated Rendering 的区别？",
    answer:
      "Fixed FFR：注视区固定在屏幕中央，不跟随眼球移动——转头看边缘时注视区还在中间，边缘可能模糊。Dynamic FFR：眼动追踪硬件实时检测眼球注视方向、注视区跟随眼球移动——用户看哪里哪里高清，效果远优于 Fixed。需要硬件支持（如 Quest Pro、Apple Vision Pro 的眼动追踪）。",
    tags: ["Foveated Rendering", "Dynamic FFR"],
  },
  {
    id: "mxrw-xr-6",
    chapter: "mxrw-xr-specific-optimization",
    level: 2,
    question: "URP 中 Single Pass Instanced 开启后，自定义 Post 效果只有左眼生效、右眼全黑。原因和修法？",
    answer:
      "XR 立体模式下 Color Buffer 是 Texture2DArray（不是普通 Texture2D），自定义 Post Shader 只采样了 array[0]（左眼）。修法：自定义 Post Shader 加 `UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX` 宏处理双眼索引；优先使用 URP 内置 XR 兼容 Post 避免一次性全屏自定义 Pass。用 Frame Debugger 分别检查 Left Eye 和 Right Eye。",
    tags: ["Single Pass Instanced", "Post-processing", "XR"],
  },
  {
    id: "mxrw-xr-7",
    chapter: "mxrw-xr-specific-optimization",
    level: 2,
    question: "XR Input 管线的 CPU 开销主要由哪些环节造成？如何优化？",
    answer:
      "每帧 Poll HMD/控制器/手部追踪姿态（`InputDevices.GetDeviceAtXRNode()`）、XR Interaction Toolkit 的射线与 UI 命中检测（Physics Raycast）、手部骨骼更新。优化：①在 Awake() 中缓存 Device/Action 引用——不在 Update() 中反复 GetDevice；②减少 XRRayInteractor 检测层级和频率；③不需要每帧读的输入（如 Hand Bone）降低 Poll 到每 2–3 帧。",
    tags: ["XR Input", "CPU", "优化"],
  },
  {
    id: "mxrw-xr-8",
    chapter: "mxrw-xr-specific-optimization",
    level: 3,
    question: "VR 项目帧率在 85–91 FPS 之间剧烈波动，为什么比稳定 72 FPS 更糟糕？",
    answer:
      "稳定 72 FPS = 每帧渲染时间稳定控制在 ~13.9ms 内。85–91 FPS 在 90 阈值上下波动 = 有些帧超时（错过 11.1ms 提交截止）→ 合成管线重显上一帧 → 视觉跳跃。按 Motion-to-Photon 模型：不稳定的帧刷新 = 不稳定的光子到达时间 = 大脑检测到「看和动不同步」= 晕。结论：宁稳 72 也不错 85–91。",
    tags: ["Motion-to-Photon", "帧率", "晕动症"],
  },
  {
    id: "mxrw-xr-9",
    chapter: "mxrw-xr-specific-optimization",
    level: 3,
    question: "Standalone VR GPU bound（帧渲染需 16ms，目标 11.1ms@90FPS）。列出优化优先级。",
    answer:
      "① 开 Single Pass Instanced（如果还没开）→ CPU+GPU 双降 ~30–40%。② Foveated Rendering = Medium → 降 GPU Fill ~20–30%（周边视野人眼天然看不清）。③ Render Scale 降到 0.85 → 观察帧时变化。④ MSAA 4x→2x。⑤ Shadow Distance 和 Cascade Count 降低。⑥ 如果还不行才动资产：减顶点/纹理分辨率/合并网格。顺序逻辑：先改设置不伤资产 → 再动阴影 → 最后动资产。",
    tags: ["优化优先级", "GPU bound", "Standalone VR"],
  },
  {
    id: "mxrw-xr-10",
    chapter: "mxrw-xr-specific-optimization",
    level: 2,
    question: "Editor Game 视图里 XR 项目流畅稳定，一到头显就掉帧+头晕。为什么？",
    answer:
      "Editor 没走真实 XR 合成分离——显示的帧时是合成前的；真实设备还有合成+姿态预测+ATW 等步骤吃预算。此外 Editor 不会触发设备热降频。必须在目标头显上实测：用 OVR Metrics Tool（Quest）或 Xcode GPU Capture（Vision Pro）看真实帧分解。",
    tags: ["Profiler", "Editor", "真机测试"],
  },
  {
    id: "mxrw-xr-11",
    chapter: "mxrw-xr-specific-optimization",
    level: 2,
    question: "ASW（Application SpaceWarp）是什么？在优化策略中应如何定位它？",
    answer:
      "ASW 是 Meta Quest 平台的合成插值技术：当应用无法维持目标帧率时，从 45FPS 渲染 + ASW 合成插值补到 90FPS。ASW 是安全网、不是正常状态——它缓解掉帧的晕眩感但会引入插值伪影。应配合真正的性能优化使用，不替代优化。OVR Metrics Tool 中查看 ASW 触发次数是判断优化效果的辅助指标。",
    tags: ["ASW", "Quest", "合成"],
  },
];
