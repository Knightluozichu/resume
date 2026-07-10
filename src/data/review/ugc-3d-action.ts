import type { ReviewQuestion } from "./types";

export const ugc3dActionQuestions: ReviewQuestion[] = [
  {
    id: "ugc-3d-action-1",
    chapter: "ugc-3d-action",
    level: 1,
    question: `Unity 的 Animator Controller 是什么？在动作游戏中起什么作用？`,
    answer: `Animator Controller 是可视化动画状态机，用状态和切换条件控制动画播放。在动作游戏中是核心系统：Idle/Run/Attack 状态切换、连招 comboCount 参数控制、动画事件触发命中判定。动作游戏的手感主要由动画状态机决定。`,
    tags: ["Animator", "动画状态机"],
  },
  {
    id: "ugc-3d-action-2",
    chapter: "ugc-3d-action",
    level: 2,
    question: `连招系统的取消窗口是什么？怎么实现？`,
    answer: `取消窗口是攻击动画中可输入指令取消当前动画接下一段的时间段。实现：1）动画中段加动画事件 OnComboWindowOpen/Close；2）窗口内按攻击键 comboCount+1 播下一段；3）窗口外按无效，动画播完归零。取消窗口让连招连贯无间断。`,
    tags: ["连招", "取消窗口", "动画事件"],
  },
  {
    id: "ugc-3d-action-3",
    chapter: "ugc-3d-action",
    level: 3,
    question: `Cinemachine 怎么实现动作游戏的摄像机控制？`,
    answer: `1）Virtual Camera Body 设 Framing Transposer 跟随角色，Damping 0.5-1.0 平滑跟随；2）Aim 设 LookAt 锁定角色或 Boss；3）受击用 Cinemachine Impulse Source 震屏；4）Boss 战切换到锁定摄像机；5）多摄像机间用 Priority 切换。Cinemachine 比手写摄像机跟随更专业。`,
    tags: ["Cinemachine", "摄像机"],
  },
  {
    id: "ugc-3d-action-4",
    chapter: "ugc-3d-action",
    level: 4,
    question: `设计一个完整的 3D 动作游戏战斗系统，包括连招、命中判定、摄像机。`,
    answer: `架构：1）Animator Controller：Idle/Run/Attack1-3/Hurt/Roll 状态，comboCount 参数控制连招切换；2）连招系统：动画事件标记取消窗口，窗口内 comboCount+1 接下一段，超时归零；3）命中判定：动画事件 OnHitFrame 用 OverlapSphere 检测前方敌人，SendMessage TakeDamage；4）Cinemachine：Virtual Camera 跟随+Damping 平滑，Boss 战 LookAt 锁定，受击 Impulse 震屏；5）受击系统：受击动画+硬直+击退。核心：动画状态机驱动一切，代码辅助。`,
    tags: ["战斗系统", "综合"],
  },
];
