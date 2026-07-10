import type { ReviewQuestion } from "./types";

export const ugcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ugc-final-review-1",
    chapter: "ugc-final-review",
    level: 1,
    question: `全书介绍了哪 8 种游戏类型？各自的核心技术是什么？`,
    answer: `2D 平台（Tilemap+Rigidbody2D）、3D 动作（Animator 状态机+连招）、RPG（ScriptableObject+背包）、FPS（Raycast+AI）、策略（网格+A*寻路）、益智（状态机+规则引擎）、赛车（WheelCollider+赛道）、打磨发布（Profiler+UX 反馈）。`,
    tags: ["全书复习", "技术选型"],
  },
  {
    id: "ugc-final-review-2",
    chapter: "ugc-final-review",
    level: 2,
    question: `从想法到发布的完整游戏开发流程是什么？`,
    answer: `1）定类型：确定核心玩法和游戏类型；2）定技术：根据类型选技术栈；3）做原型：1 周内实现核心玩法循环验证好玩；4）做内容：加关卡/敌人/装备/音效；5）打磨：性能优化+UX 反馈（占 50% 时间）；6）发布：IL2CPP 构建+真机测试+提交商店。`,
    tags: ["开发流程", "综合"],
  },
  {
    id: "ugc-final-review-3",
    chapter: "ugc-final-review",
    level: 3,
    question: `全书 8 种游戏类型的技术选型有什么规律？`,
    answer: `规律是核心玩法决定技术方案。2D 平台需精确物理→Tilemap+Rigidbody2D+Coyote Time；3D 动作需流畅连招→Animator+取消窗口+Cinemachine；RPG 需数据驱动→ScriptableObject+背包+对话；FPS 需即时射击→Raycast+CharacterController+AI；策略需网格寻路→Grid+A*+框选；益智需规则流程→状态机+协程+连锁；赛车需车辆物理→WheelCollider+赛道+Waypoint。`,
    tags: ["技术选型", "规律"],
  },
  {
    id: "ugc-final-review-4",
    chapter: "ugc-final-review",
    level: 4,
    question: `一个新手要做游戏，从全书学到的完整建议是什么？`,
    answer: `1）先定类型——从简单的 2D 平台或益智入手，技术简单周期短；2）定技术——研究同类成功游戏的技术方案选对栈，不要发明轮子；3）做原型——1 周实现核心玩法循环找朋友试玩，不好玩换方向；4）做内容——核心玩法跑通后再加关卡/敌人/装备；5）打磨——Profiler 定位三大瓶颈+UX 三层反馈，占 50% 时间；6）发布——IL2CPP+ASTC+Stripping+真机测试。核心：先定类型再定技术，先做原型再做内容。`,
    tags: ["学习建议", "综合", "全书"],
  },
];
