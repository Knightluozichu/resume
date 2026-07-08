import type { ReviewQuestion } from "./types";

/** IK 逆向运动学系统 复习题 */
export const uanIkSystemQuestions: ReviewQuestion[] = [
  {
    id: "uan-ik-system-1",
    chapter: "uan-ik-system",
    level: 1,
    question: "正向运动学（FK）和逆向运动学（IK）的区别是什么？",
    answer: "FK（正向运动学）：旋转父骨骼，子骨骼跟随——肩→肘→腕→手指逐级旋转。简单直观，是关键帧动画的默认方式，但无法直接控制末端（手指）位置。IK（逆向运动学）：设定末端目标位置，自动反推中间关节角度——目标位置→肘/肩角度。可以直接控制末端（脚/手）到达指定位置，但计算量大且可能多解。",
    tags: ["FK", "IK", "区别"],
  },
  {
    id: "uan-ik-system-2",
    chapter: "uan-ik-system",
    level: 2,
    question: "如何在 Unity 中使用 IK 让脚部贴合地面？",
    answer: "1)Animator 的 IK Pass 勾选（Layer 设置中）；2)实现 OnAnimatorIK(int layerIndex) 回调；3)射线检测脚下地面高度：Physics.Raycast(footPos + up, down, out hit)；4)设置 IK 权重和目标：animator.SetIKPositionWeight(AvatarIKGoal.LeftFoot, 1f); animator.SetIKPosition(AvatarIKGoal.LeftFoot, hit.point)；5)可选设置旋转贴合法线：SetIKRotation。每帧根据地面高度调整脚部位置，实现斜坡/台阶上的脚部贴合。",
    tags: ["IK", "脚部贴合", "OnAnimatorIK"],
  },
  {
    id: "uan-ik-system-3",
    chapter: "uan-ik-system",
    level: 3,
    question: "IK 的权重（Weight）有什么作用？如何实现平滑过渡？",
    answer: "Weight（0~1）控制 IK 影响程度——0=完全用动画数据（不 IK），1=完全用 IK 目标位置，0.5=各占一半。平滑过渡：用 Mathf.Lerp 或 Mathf.SmoothDamp 逐渐改变权重——如跳跃时脚部 IK 权重从 1 渐变到 0（离地时关闭脚部贴合），落地时从 0 渐变到 1（恢复贴合）。直接设 0/1 会导致脚部跳变，用权重过渡实现平滑。也可以用动画曲线控制权重随状态变化。",
    tags: ["权重", "平滑过渡", "IK"],
  },
  {
    id: "uan-ik-system-4",
    chapter: "uan-ik-system",
    level: 4,
    question: "设计一个角色在斜坡上行走的动画方案，要求脚部贴合斜坡，头部微微注视前方目标？",
    answer: "1)主体动画：Blend Tree 播放走/跑动画（FK 方式）；2)脚部 IK：每帧从两脚位置向下射线检测斜坡高度，SetIKPosition 设置脚到射线命中点，SetIKRotation 旋转脚贴合斜坡法线，Weight 用 SmoothDamp 从 0 渐变到 1（离地脚权重降低）；3)头部 IK：用 SetLookAtPosition 设置注视目标（前方 2 米地面以上 1.5 米处），SetLookAtWeight(0.5f) 控制头部旋转幅度（不完全转向，微微注视）；4)在 OnAnimatorIK 中按顺序设置——先脚部 IK 后头部 IK。效果：角色在斜坡上行走时脚贴合斜面不穿地，头部微微看向前方目标。关键：IK 是补充细节，不替代主体动画。",
    tags: ["斜坡", "脚部IK", "头部IK", "综合"],
  },
];
