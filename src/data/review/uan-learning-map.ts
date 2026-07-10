import type { ReviewQuestion } from "./types";

/** Unity 游戏动画设计学习地图 复习题 */
export const uanLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uan-learning-map-1",
    chapter: "uan-learning-map",
    level: 1,
    question: `Unity 游戏动画设计全书分为哪四大板块？`,
    answer: `四大板块：动画基础（学习地图与动画原理与 AnimationClip）、Animator 核心（控制器、状态机、混合树）、进阶技术（IK 系统、Timeline、动画事件）、程序化与总结（程序化动画、综合实战、全书复习）。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "uan-learning-map-2",
    chapter: "uan-learning-map",
    level: 2,
    question: `Unity 动画系统的核心组件是什么？它们之间的关系？`,
    answer: `核心组件：AnimationClip（动画片段，存储关键帧数据）、Animator Controller（动画控制器，管理状态和转换）、Animator（组件，播放控制器并驱动骨架）。关系：AnimationClip 是数据，Animator Controller 是逻辑（状态机），Animator 是执行者（挂载到 GameObject 上驱动骨骼动画）。三者协作：Controller 决定播放哪个 Clip，Animator 执行播放。`,
    tags: ["动画系统", "核心组件"],
  },
  {
    id: "uan-learning-map-3",
    chapter: "uan-learning-map",
    level: 3,
    question: `关键帧动画和程序化动画有什么区别？分别适合什么场景？`,
    answer: `关键帧动画：美术预制作的关键帧数据，播放时插值——适合角色动作（走/跑/攻击/死亡），表现力强但不可动态调整。程序化动画：代码实时计算骨骼位置——适合需要动态响应的场景（脚部贴合地面/头部看向目标/布料飘动），灵活但计算量大。现代游戏通常组合使用：主体用关键帧，细节用程序化补充（如脚部 IK + 走路动画）。`,
    tags: ["关键帧", "程序化", "对比"],
  },
  {
    id: "uan-learning-map-4",
    chapter: "uan-learning-map",
    level: 4,
    question: `综合全书知识，规划一个 3D 动作游戏的动画系统架构？`,
    answer: `1)基础层：AnimationClip 存储角色动作（Idle/Walk/Run/Jump/Attack/Hurt/Death），由美术制作；2)控制层：Animator Controller 用状态机管理动作切换——移动用 Blend Tree（速度方向混合），攻击/跳跃用独立状态+转换条件，受伤/死亡用即时覆盖；3)进阶层：IK 系统做脚部贴合地面+手部抓取物体，Timeline 做过场动画，Animation Event 在动画关键帧触发音效/特效/伤害判定；4)程序化补充：布娃娃物理（死亡时切换到物理骨骼），头部看向目标（代码控制颈部骨骼），呼吸动画（代码驱动脊椎微动）。核心原则：关键帧为主、程序化为辅、IK 补细节。`,
    tags: ["架构设计", "综合"],
  },
];
