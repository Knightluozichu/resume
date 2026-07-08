import type { ReviewQuestion } from "./types";

export const ugcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ugc-learning-map-1",
    chapter: "ugc-learning-map",
    level: 1,
    question: "全书介绍了哪 8 种游戏类型？",
    answer: "2D 平台跳跃、3D 动作、RPG、FPS、策略游戏、益智游戏、赛车游戏、游戏打磨发布。前 7 种是游戏类型案例，最后 1 种是打磨发布流程。",
    tags: ["全书脉络", "游戏类型"],
  },
  {
    id: "ugc-learning-map-2",
    chapter: "ugc-learning-map",
    level: 2,
    question: "为什么做游戏要先定类型再定技术？",
    answer: "不同类型技术栈差异巨大：2D 用 Tilemap+Rigidbody2D，3D 动作用 Animator 状态机，FPS 用 Raycast。先写代码再定类型大概率技术栈不匹配需推倒重来。定类型=定技术方向，是项目第一决策。",
    tags: ["技术选型", "游戏类型"],
  },
  {
    id: "ugc-learning-map-3",
    chapter: "ugc-learning-map",
    level: 3,
    question: "不同游戏类型的核心玩法和技术方案有什么对应关系？",
    answer: "2D 平台（跳跃+关卡）→ Tilemap+Rigidbody2D 精确物理；3D 动作（连招+战斗）→ Animator 状态机+摄像机控制；RPG（成长+装备）→ 数据驱动+ScriptableObject；FPS（射击+AI）→ Raycast+NavMeshAgent；策略（资源+指挥）→ 网格系统+A*寻路；益智（规则+消除）→ 状态机+规则引擎；赛车（速度+赛道）→ WheelCollider+赛道触发器。",
    tags: ["技术对应", "核心玩法"],
  },
  {
    id: "ugc-learning-map-4",
    chapter: "ugc-learning-map",
    level: 4,
    question: "一个新手团队想做游戏，如何从全书选择切入点？完整建议是什么？",
    answer: "1）从 2D 平台或益智游戏入手——技术简单、周期短、能快速出成果；2）先做原型验证核心玩法是否好玩；3）核心玩法跑通后再做内容（关卡、美术、音效）；4）用对象池+批处理优化性能；5）IL2CPP 构建到目标平台测试；6）打磨阶段占 50% 时间，不要急于发布。避免一上来就做 MMO 或开放世界，从小型项目起步。",
    tags: ["学习路径", "综合"],
  },
];
