import type { ReviewQuestion } from "./types";

export const uvfLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uvf-learning-map-1",
    chapter: "uvf-learning-map",
    level: 1,
    question: "Unity 3D 游戏特效制作典型实例全书的四大阶段是什么？",
    answer: "基础入门（学习地图+粒子基础）、核心技术（粒子进阶+Shader特效+后处理）、高级应用（动画特效+物理特效+UI特效+战斗特效）、综合复习。四阶段递进：先认识工具，再掌握核心，后综合应用，最后复习串联。",
    tags: ["全书脉络", "学习路径"],
  },
  {
    id: "uvf-learning-map-2",
    chapter: "uvf-learning-map",
    level: 2,
    question: "为什么说粒子系统是游戏特效的基础？它与其他特效技术的关系是什么？",
    answer: "粒子系统是特效的「素材来源」——火焰、烟雾、爆炸、火花都靠粒子模拟。没有粒子就没有视觉素材。Shader 给粒子质感（溶解、发光），后处理给画面氛围（Bloom、景深），动画/物理驱动粒子的触发时机和位置，UI和战斗特效是粒子的综合应用。粒子是地基，其余是上层建筑。",
    tags: ["粒子系统", "特效架构"],
  },
  {
    id: "uvf-learning-map-3",
    chapter: "uvf-learning-map",
    level: 3,
    question: "如果要为一个 ARPG 游戏设计完整的技能特效体系，需要用到全书哪些章节的知识？",
    answer: "1）粒子基础+进阶：制作火焰、冲击波、碎片等素材；2）Shader特效：溶解消散、边缘发光；3）后处理：Bloom增强光效、色彩校正统一风格；4）动画特效：AnimationEvent在攻击帧触发特效；5）物理特效：碰撞点生成命中粒子；6）UI特效：技能CD动画、伤害飘字；7）战斗特效：顿帧、震屏、连击递进。七章知识缺一不可。",
    tags: ["技能特效", "综合应用"],
  },
  {
    id: "uvf-learning-map-4",
    chapter: "uvf-learning-map",
    level: 4,
    question: "从特效制作的全流程来看，「视觉优先」原则在本书中如何体现？各技术层如何协作？",
    answer: "视觉优先意味着80%精力放在可见效果上：粒子+Shader+后处理决定画面，动画/物理/事件是驱动层，UI/战斗是表现层。协作链路：美术制作粒子素材→Shader赋予质感→后处理统一氛围→动画事件触发时机→物理碰撞定位生成点→UI展示反馈→战斗综合编排打击感。每一层为下一层服务，最终目标是让玩家感受到「爽快」的视觉反馈。",
    tags: ["视觉优先", "技术协作", "全书综合"],
  },
];
