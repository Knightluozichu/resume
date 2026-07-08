import type { ReviewQuestion } from "./types";

/** Animator 控制器 复习题 */
export const uanAnimatorControllerQuestions: ReviewQuestion[] = [
  {
    id: "uan-animator-controller-1",
    chapter: "uan-animator-controller",
    level: 1,
    question: "Animator 控制器的三个核心概念是什么？",
    answer: "State（状态）：每个状态绑定一个 AnimationClip，表示角色当前播放的动画。Transition（转换）：定义状态间的切换条件和规则（如 Speed>0 从 Idle 转到 Run）。Parameter（参数）：驱动转换的变量——Float（连续值如速度）、Bool（布尔如是否着地）、Trigger（一次性触发如跳跃）。代码通过修改参数驱动状态切换。",
    tags: ["Animator", "核心概念"],
  },
  {
    id: "uan-animator-controller-2",
    chapter: "uan-animator-controller",
    level: 2,
    question: "Float、Bool、Trigger 三种参数分别适合什么场景？",
    answer: "Float：连续值参数，适合范围数据——Speed（0~1 驱动走/跑混合）、Horizontal/Vertical（方向）。Bool：布尔参数，适合状态标记——IsGrounded（着地/空中）、IsDead（存活/死亡）。Trigger：一次性触发参数，适合即时动作——Jump/Attack/Hit（用一次自动重置）。选择：连续数据用 Float，持续状态用 Bool，一次性动作用 Trigger。",
    tags: ["参数", "Float", "Trigger"],
  },
  {
    id: "uan-animator-controller-3",
    chapter: "uan-animator-controller",
    level: 3,
    question: "Transition 的 Has Exit Time 和 Transition Duration 分别控制什么？",
    answer: "Has Exit Time：是否等当前动画播放到指定时间点才切换。true=等动画播完（Exit Time 设 0.8 表示播放到 80% 时切换），false=条件满足立即切换。Transition Duration：转换时长（秒），控制两个动画的混合过渡时间。如 0.2 秒转换让 Idle 平滑过渡到 Run 而非突变。选择：攻击/受击等需要即时响应的用 Has Exit Time=false，自然过渡（走→跑）用 Duration 0.2~0.3s。",
    tags: ["Transition", "HasExitTime", "Duration"],
  },
  {
    id: "uan-animator-controller-4",
    chapter: "uan-animator-controller",
    level: 4,
    question: "如何实现上半身攻击动画和下半身移动动画同时播放？",
    answer: "用 Animator Layer + AvatarMask：1)创建两个 Layer——Base Layer（全身，播放移动动画）和 Upper Body Layer（上半身，播放攻击动画）；2)创建 AvatarMask——Upper Body Mask 只勾选上半身骨骼（脊椎/手臂/头部），下半身骨骼不选；3)Upper Body Layer 设置 Weight=1、Mask=Upper Body Mask、Blending=Override；4)Base Layer 播放 Idle/Run（下半身驱动），Upper Body Layer 播放 Attack（上半身覆盖）；5)代码中 animator.SetTrigger("Attack") 触发上层攻击动画，下层移动动画不受影响。效果：角色边跑边攻击。",
    tags: ["Layer", "AvatarMask", "综合"],
  },
];
