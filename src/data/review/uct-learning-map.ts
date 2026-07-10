import type { ReviewQuestion } from "./types";

export const uctLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uct-learning-map-1",
    chapter: "uct-learning-map",
    level: 1,
    question: `Unity 核心技术全书的四个阶段是什么？`,
    answer: `基础（场景管理+资源管线）、核心（渲染管线+物理引擎+音频系统）、进阶（导航+内存管理）、收尾（构建部署+综合复习）。四阶段递进：先搭场景，再跑系统，后做优化，最后发布。`,
    tags: ["全书脉络", "学习路径"],
  },
  {
    id: "uct-learning-map-2",
    chapter: "uct-learning-map",
    level: 2,
    question: `Unity 各子系统之间如何协作？举例说明。`,
    answer: `子系统通过共享数据协作。如射击：物理引擎 Raycast 检测命中→音频系统播放枪声→渲染管线播放特效。敌人AI：NavMeshAgent 寻路→物理碰撞检测→对象池管理生命周期。子系统不是孤立的，一个操作通常跨 2-3 个子系统。`,
    tags: ["子系统协作", "架构"],
  },
  {
    id: "uct-learning-map-3",
    chapter: "uct-learning-map",
    level: 3,
    question: `为什么说 GC 和 DrawCall 是 Unity 两大性能杀手？`,
    answer: `GC（垃圾回收）暂停主线程扫描托管堆，每次几十毫秒造成帧率暴跌。DrawCall 过多导致 CPU 提交渲染命令开销大，GPU 等待。两者是最常见瓶颈：GC 来自每帧 new 对象，DrawCall 来自未批处理的材质。解决分别靠对象池和 SRP Batcher/GPU Instancing。`,
    tags: ["性能瓶颈", "GC", "DrawCall"],
  },
  {
    id: "uct-learning-map-4",
    chapter: "uct-learning-map",
    level: 4,
    question: `一个 Unity 项目从零到发布，完整的技术路径是什么？`,
    answer: `1）场景架构设计（多场景 Additive）；2）资源管理（Addressables+ASTC）；3）渲染配置（URP+批处理）；4）物理交互（FixedUpdate+Raycast）；5）音频管理（AudioMixer+对象池）；6）导航AI（NavMesh）；7）内存优化（对象池+零GC）；8）构建配置（IL2CPP+Stripping）；9）真机测试+CI/CD。九步缺一不可。`,
    tags: ["技术路径", "综合", "全书"],
  },
];
