import type { ReviewQuestion } from "./types";

export const uvfAnimationVfxQuestions: ReviewQuestion[] = [
  {
    id: "uvf-animation-vfx-1",
    chapter: "uvf-animation-vfx",
    level: 1,
    question: "Unity 中 Animation Event（动画事件）的作用是什么？可以在动画的哪些时刻触发？",
    answer: "Animation Event 允许在 AnimationClip 的特定时间帧调用 C# 方法，实现动画与特效的精确同步。可触发的时刻包括：动画播放到指定帧时调用自定义方法，可传递参数（float/int/string/Object）。常见用途：攻击动画的挥砍帧触发刀光特效、跑步动画的脚着地帧触发灰尘粒子、跳跃动画的起跳帧播放音效。",
    tags: ["Animation Event", "动画事件", "同步"],
  },
  {
    id: "uvf-animation-vfx-2",
    chapter: "uvf-animation-vfx",
    level: 2,
    question: "AnimationCurve 如何用来驱动特效参数？相比固定值有什么优势？",
    answer: "AnimationCurve 是一条可编辑的关键帧曲线，通过 `curve.Evaluate(time)` 在任意时间点取样值。优势：1）精确控制——在时间轴上放置关键帧，调整切线控制缓动，比固定值或线性插值更灵活；2）可视化编辑——在 Inspector 中拖拽曲线，所见即所得；3）多参数同步——多条曲线可以分别驱动粒子发射率、光强、缩放等，保持节奏一致。例如攻击特效：曲线前段急速上升（蓄力），中段峰值（释放），后段缓慢下降（消散），用一条曲线就控制了整个特效的节奏感。",
    tags: ["AnimationCurve", "曲线驱动", "参数控制"],
  },
  {
    id: "uvf-animation-vfx-3",
    chapter: "uvf-animation-vfx",
    level: 3,
    question: "如何实现「攻击动画的第18帧精准触发刀光特效」？写出完整的实现思路和代码。",
    answer: "1）在 AnimationClip 的第18帧添加 AnimationEvent，函数名设为 OnSlash；2）脚本中实现该方法。代码：`public class AttackVfx : MonoBehaviour { public GameObject slashPrefab; void OnSlash() { var vfx = ObjectPool.Get(slashPrefab); vfx.transform.position = transform.position + transform.forward * 1f; vfx.transform.rotation = transform.rotation; var ps = vfx.GetComponent<ParticleSystem>(); ps.Play(); StartCoroutine(ReleaseAfter(vfx, ps.main.duration)); } }`。注意用对象池而非 Instantiate，避免 GC。AnimationEvent 的函数名必须与脚本方法名完全一致，且方法必须是 public 或有 [SerializeField]。",
    tags: ["代码实现", "动画事件", "刀光特效", "对象池"],
  },
  {
    id: "uvf-animation-vfx-4",
    chapter: "uvf-animation-vfx",
    level: 4,
    question: "设计一个连招系统，三段攻击的特效如何与动画配合？如何避免特效与动画脱节？",
    answer: "1）三段攻击动画各自独立，每段在命中帧添加 AnimationEvent（OnHit1/OnHit2/OnHit3）；2）特效分层：每段攻击有独立的刀光粒子+命中爆点粒子，通过事件参数区分；3）连击递进：第一段轻刀光，第二段中刀光+火花，第三段重刀光+冲击波+震屏。避免脱节的关键：a）所有特效用 AnimationEvent 触发而非 Update 轮询，保证帧精确同步；b）特效时长不超过动画窗口——如果动画有0.3s的恢复帧，特效必须在0.3s内完成或进入淡出；c）连击取消时立即停止当前特效 `ps.Stop(true, ParticleSystemStopBehavior.StopEmitting)`；d）用 Animator 的动画过渡时间控制连击窗口，过渡期间不触发新事件。",
    tags: ["连招系统", "动画同步", "战斗特效", "综合设计"],
  },
];
