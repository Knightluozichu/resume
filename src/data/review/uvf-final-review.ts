import type { ReviewQuestion } from "./types";

export const uvfFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "uvf-final-review-1",
    chapter: "uvf-final-review",
    level: 1,
    question: "Unity 游戏特效制作的四大技术支柱是什么？它们各自负责什么层面？",
    answer: "四大支柱：1）粒子系统——负责特效的素材层，模拟火焰、烟雾、爆炸等离散元素；2）Shader 特效——负责质感层，实现溶解、扭曲、发光等表面视觉效果；3）驱动系统（动画/物理）——负责节奏层，控制特效的触发时机、位置和动态变化；4）综合应用（UI/战斗）——负责表现层，将前三个组合为完整的玩家体验。四层递进：粒子给素材→Shader给质感→驱动给节奏→综合给体验。",
    tags: ["四大支柱", "技术分层", "全书总结"],
  },
  {
    id: "uvf-final-review-2",
    chapter: "uvf-final-review",
    level: 2,
    question: "在特效制作中，「视觉优先」原则如何落实到技术选型？举例说明效果与性能的权衡。",
    answer: "视觉优先意味着先确定想要的视觉效果，再选技术实现，而非反过来。例如要做「火焰」，先决定视觉效果（颜色渐变、大小变化、飘动感），再选实现（ParticleSystem+Additive材质+Color over Lifetime 曲线+噪声扰动）。性能权衡举例：1）Bloom 效果好但耗 GPU 带宽——移动端降低采样分辨率或关闭；2）GPU 粒子（VFX Graph）能处理百万粒子但移动端兼容性差——用 CPU 粒子降数量替代；3）布料模拟真实但 CPU 开销大——用预烘焙动画替代。原则：PC/主机追求效果，移动端保证帧率，效果不够用「视觉欺骗」补偿（如用贴图动画替代实时模拟）。",
    tags: ["视觉优先", "技术选型", "性能权衡"],
  },
  {
    id: "uvf-final-review-3",
    chapter: "uvf-final-review",
    level: 3,
    question: "一个完整的游戏特效系统需要哪些工程化基础设施？对象池在其中起什么作用？",
    answer: "1）特效管理器（VfxManager）：统一管理特效的播放、停止、查询；2）对象池（ObjectPool）：预创建特效实例，复用而非 Instantiate/Destroy，消除 GC 卡顿——这是最关键的基础设施；3）特效配置表：用 ScriptableObject 定义特效参数（类型、时长、音效关联），数据驱动；4）事件系统：特效与游戏逻辑解耦，通过事件触发（如 OnHit 事件触发命中特效）；5）LOD 系统：远距离降低粒子数量或关闭后处理；6）特效分层：不同渲染层级（角色特效/UI特效/环境特效）分别管理。对象池作用：战斗中每秒可能触发几十个特效，每次 Instantiate 产生 GC，对象池让特效实例复用，GC 压力归零，帧率稳定。",
    tags: ["工程化", "对象池", "VfxManager", "基础设施"],
  },
  {
    id: "uvf-final-review-4",
    chapter: "uvf-final-review",
    level: 4,
    question: "如果让你为一个新项目搭建特效系统，你会如何规划技术路线和开发流程？",
    answer: "1）前期规划：确定目标平台（PC/移动端）决定技术上限，确定美术风格（写实/卡通）决定 Shader 方向；2）基础搭建：a）VfxManager+对象池框架——所有特效走池化；b）特效命名规范和目录结构——按类型分类（Combat/Environment/UI/Cutscene）；c）ScriptableObject 配置表——数据与逻辑分离；3）核心特效制作：a）粒子系统——建立通用粒子预制体库（火/冰/雷/爆炸/烟雾）；b）Shader——实现项目风格的溶解/发光/扭曲模板；c）后处理——配置全局 Volume 统一视觉风格；4）驱动层：a）AnimationEvent 框架——动画驱动特效的标准流程；b）物理碰撞特效——碰撞回调自动生成；5）战斗综合：a）打击感系统——顿帧+震屏+音效统一管理；b）连击系统——倍率曲线驱动；6）优化：a）Profiler 验证每个特效的 CPU/GPU 开销；b）移动端建立特效预算表（每个场景最大粒子数）；c）LOD 分级。关键原则：先搭框架再填内容，先保证性能再追求效果，所有特效走数据驱动。",
    tags: ["技术路线", "开发流程", "项目规划", "全书综合"],
  },
];
