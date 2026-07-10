import type { ReviewQuestion } from "./types";

export const uhmAdvancedHmiQuestions: ReviewQuestion[] = [
  {
    id: "uhm-advanced-hmi-1",
    chapter: "uhm-advanced-hmi",
    level: 1,
    question: `3D 仪表盘与传统 2D 仪表盘的核心区别是什么？`,
    answer: `3D 仪表盘在 UI 中嵌入 3D 渲染场景，用实时 3D 模型替代 2D 图标展示车辆状态。用户可以看到 3D 车辆外观、车门开闭动画、车灯状态等，信息维度更丰富。传统 2D 仪表盘用平面图标和指针，信息量有限。实现方式是通过 RenderTexture 将 3D 摄像机画面渲染到 UI 纹理上。`,
    tags: ["3D仪表盘", "RenderTexture"],
  },
  {
    id: "uhm-advanced-hmi-2",
    chapter: "uhm-advanced-hmi",
    level: 2,
    question: `多屏联动如何保证各屏幕显示一致？`,
    answer: `所有屏幕共享同一数据源实例，数据变更时在同一帧内广播到所有屏幕的订阅者。不能用各屏幕独立请求数据（有时序差异），也不能用串行通知（后面的屏幕晚一帧更新）。正确做法是用事件广播机制，所有订阅者在同一帧的同一回调中收到更新，保证帧内一致性。`,
    tags: ["多屏联动", "帧内一致性", "事件广播"],
  },
  {
    id: "uhm-advanced-hmi-3",
    chapter: "uhm-advanced-hmi",
    level: 3,
    question: `3D 仪表盘嵌入 HMI 时有哪些性能限制？如何优化？`,
    answer: `3D 渲染占用 GPU 资源，嵌入式平台 GPU 性能有限。限制：模型面数控制在 5 万以内，纹理用 ASTC 压缩，3D 渲染区域限制在屏幕一部分不全屏。优化：用 LOD 按距离切换模型精度，远处用低面数模型；用 Occlusion Culling 剔除被遮挡物体；降低 3D 摄像机的 RenderTexture 分辨率（如 1024x768 而非全屏）。`,
    tags: ["3D优化", "LOD", "ASTC压缩"],
  },
  {
    id: "uhm-advanced-hmi-4",
    chapter: "uhm-advanced-hmi",
    level: 4,
    question: `多模态交互在 HMI 中的优势和挑战是什么？如何实现模态融合？`,
    answer: `优势：语音解放双手（驾驶时安全）、手势直观（快速操作）、眼动自然（看哪里选哪里）、触控精确（精细操作）。挑战：语音受噪音影响、手势需要学习、眼动精度有限、多模态可能冲突。模态融合方法：将所有模态的输入统一映射到逻辑动作层（Confirm/Cancel/Navigate），由系统根据场景选择最佳模态——驾驶中优先语音，停车时优先触控。冲突时用优先级仲裁（安全操作 > 便捷操作），并给用户明确反馈当前响应了哪个模态的输入。`,
    tags: ["多模态交互", "模态融合", "综合"],
  },
];
