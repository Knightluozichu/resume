import type { ReviewQuestion } from "./types";

/** 动画状态机 复习题 */
export const uanStateMachineQuestions: ReviewQuestion[] = [
  {
    id: "uan-state-machine-1",
    chapter: "uan-state-machine",
    level: 1,
    question: `Any State 在状态机中的作用是什么？`,
    answer: `Any State 是特殊节点，可以从任何状态直接转到目标状态。适合需要从任意动画即时触发的动作——如受击（OnHit Trigger 从任何状态转到 Hurt）、死亡（OnDeath 从任何状态转到 Death）。不用 Any State 就需要从每个状态单独连线到 Hurt/Death，连线爆炸。Any State 简化了全局触发的连线。`,
    tags: ["AnyState", "状态机"],
  },
  {
    id: "uan-state-machine-2",
    chapter: "uan-state-machine",
    level: 2,
    question: `子状态机（Sub-State Machine）解决什么问题？`,
    answer: `子状态机将一组相关状态封装为一个节点，解决主状态机过于复杂的问题。如攻击系统有 Attack1→Attack2→Attack3 连击序列，放子状态机中管理。双击子状态机节点展开内部状态。子状态机有 Entry（进入）和 Exit（退出）节点，从主状态机的 Transition 进入子状态机的 Entry，子状态机的 Exit 转回主状态机。好处：主状态机简洁，复杂逻辑模块化。`,
    tags: ["子状态机", "模块化"],
  },
  {
    id: "uan-state-machine-3",
    chapter: "uan-state-machine",
    level: 3,
    question: `Transition 的 Interruption Source（中断源）是什么？有什么用？`,
    answer: `Interruption Source 控制一个转换是否可以被其他转换中断。默认情况下，一个转换开始后（在 Duration 期间）不能被其他转换打断——必须等转换完成。设置 Interruption Source 可以允许转换被中断——如攻击动画的转换期间可以被受击中断（不需要等攻击动画播完才转入受击）。场景：攻击连击中被打断——Attack1→Attack2 的转换期间，如果 OnHit Trigger 触发，允许中断转入 Hurt。用途：让动作响应更灵活，避免动作锁定。`,
    tags: ["Interruption", "转换", "中断"],
  },
  {
    id: "uan-state-machine-4",
    chapter: "uan-state-machine",
    level: 4,
    question: `设计一个角色连击系统：点击攻击键依次播放 Attack1→Attack2→Attack3，每次有0.3秒窗口期，超时回到Idle？`,
    answer: `1)创建子状态机 Attack，内含 Attack1/Attack2/Attack3 三个状态；2)Attack1→Attack2：条件 ComboCount==1 且 HasExitTime=true（Attack1 播完转Attack2），Duration=0.1s；3)Attack2→Attack3：条件 ComboCount==2，同理；4)每个 Attack 状态→Exit：条件 ComboTimeout（Bool），在代码中0.3秒内无后续输入时设为true；5)代码逻辑：点击攻击键时 ComboCount++，SetTrigger("Attack")，重置超时计时器；6)超时逻辑：协程 WaitForSeconds(0.3f) 后 SetBool("ComboTimeout", true) 并 ComboCount=0；7)从 Exit 回到主状态机的 Idle。关键：用 normalizedTime 检查攻击动画是否播完才允许连击，避免在动画前半段就转下一个。`,
    tags: ["连击系统", "子状态机", "综合"],
  },
];
