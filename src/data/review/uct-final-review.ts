import type { ReviewQuestion } from "./types";

export const uctFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "uct-final-review-1",
    chapter: "uct-final-review",
    level: 1,
    question: "Unity 项目从零到发布的完整技术路径是什么？",
    answer: "场景架构到资源管理（Addressables+ASTC）到渲染配置（URP+批处理）到物理交互（FixedUpdate+Raycast）到音频管理（AudioMixer+对象池）到导航AI（NavMesh）到内存优化（对象池+零GC）到构建配置（IL2CPP+Stripping）到真机测试+CI/CD。",
    tags: ["技术路径", "全书复习"],
  },
  {
    id: "uct-final-review-2",
    chapter: "uct-final-review",
    level: 2,
    question: "上线前的性能检查表有哪些关键项？",
    answer: "GC Alloc=0（每帧零分配）、DrawCall<100（移动端）、纹理全部 ASTC 压缩、物理在 FixedUpdate、对象池覆盖高频创建对象、IL2CPP+Stripping。每项不达标都可能导致上线后被用户投诉卡顿。",
    tags: ["性能检查表", "优化"],
  },
  {
    id: "uct-final-review-3",
    chapter: "uct-final-review",
    level: 3,
    question: "项目后期帧率暴跌，系统性排查方案是什么？",
    answer: "用 Profiler CPU 模块定位瓶颈类型：1）如果是 GC 卡顿用对象池+消除每帧分配；2）如果是渲染开销用 Frame Debugger 分析 DrawCall，做批处理/GPU Instancing/SRP Batcher；3）如果是 Overdraw 减少透明体和后处理；4）如果是物理减少碰撞体、用 Layer 优化碰撞矩阵。逐项排除，先治 GC 再治 DrawCall。",
    tags: ["性能排查", "Profiler", "综合"],
  },
  {
    id: "uct-final-review-4",
    chapter: "uct-final-review",
    level: 4,
    question: "全书哪一章的知识在实际项目中影响最大？为什么？",
    answer: "内存管理影响最大。GC 卡顿是最常见性能杀手——即使场景管理、渲染、物理都好，每帧几十 KB GC Alloc 积累到阈值就卡顿。对象池和零 GC 分配是流畅和卡顿的分水岭。而且 GC 问题往往在项目后期才暴露，返工成本高。建议项目一开始就用对象池架构，而非后期补。",
    tags: ["内存管理", "综合", "全书"],
  },
];
