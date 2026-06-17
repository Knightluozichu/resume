/** 复习题库 · Mecanim 动画状态机（u5-mecanim）。《Unity 5 权威讲解》第9章改编。 */

import type { ReviewQuestion } from "./types";

export const u5MecanimQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-mc-1",
    chapter: "u5-mecanim",
    level: 1,
    question: "`Animator` 组件是干什么的？代码怎么拿到它、该注意什么？",
    answer:
      "`Animator` 是挂在角色 GameObject 上的**组件**，是「动作切换表」的**播放器**——持有一份 Animator Controller，每帧播当前状态的动画、按过渡条件切状态。代码用 `GetComponent<Animator>()` 拿到它；和拿任何组件一样，应在 `Awake` 里**拿一次、缓存进字段**，别每帧 `GetComponent`（开销浪费）。拿到后再调 `SetFloat` / `SetBool` / `SetTrigger` 驱动它。",
    tags: ["Animator", "GetComponent", "缓存", "定义"],
  },
  {
    id: "u5-mc-2",
    chapter: "u5-mecanim",
    level: 1,
    question: "`Animator Controller` 是什么？里面装着什么？",
    answer:
      "`Animator Controller` 是一份独立的**资产文件**（`.controller`），就是那张「**动作切换表**」。里面画着若干**状态**（每个状态播一个动画 clip，如 Idle / Walk / Run / Jump），状态之间用带**条件**的**过渡（Transition）**箭头连接（如「`Speed > 0.1` 就从 Idle 切到 Walk」）。一个 Animator 组件引用一份 Controller；它和代码**解耦**——换动画、改阈值都在编辑器改这份资产，不动脚本。",
    tags: ["Animator Controller", "状态机", "过渡", "定义"],
  },
  {
    id: "u5-mc-3",
    chapter: "u5-mecanim",
    level: 1,
    question:
      "Animator 的**参数（Parameter）**有哪几种类型？分别适合表达什么？",
    answer:
      "四种：**float**（如 `Speed`，连续值，适合速度这类量）、**int**、**bool**（如 `IsGrounded`，开关，设了值会一直保持）、**trigger**（如 `Jump`，拨一下就被过渡消费复位的**一次性**信号）。参数是代码和状态机之间唯一的「小黑板」——过渡条件读的就是它，代码用 `SetFloat` / `SetInteger` / `SetBool` / `SetTrigger` 按名字写值。",
    tags: ["参数", "float", "bool", "trigger", "定义"],
  },
  {
    id: "u5-mc-4",
    chapter: "u5-mecanim",
    level: 1,
    question: '`animator.SetTrigger("Jump")` 做了什么？trigger 怎么复位？',
    answer:
      '`SetTrigger` 操作 **trigger 类型参数**——trigger 像一个「**拨一下就弹回**」的开关。`SetTrigger("Jump")` 把 `Jump` 拨起；状态机一旦用它满足某条过渡（如「任意态 → Jump」），就会**自动把它消费、复位**（不像 bool 设 `true` 后会一直保持）。所以它专做「跳一下 / 攻击一次」这类一次性动作。若没有过渡用到它，它会卡在「已触发」，需要时用 `ResetTrigger` 手动清。',
    tags: ["SetTrigger", "trigger", "ResetTrigger", "定义"],
  },
  {
    id: "u5-mc-5",
    chapter: "u5-mecanim",
    level: 1,
    question: "`Blend Tree`（混合树）是干什么的？它和「状态间过渡」有何不同？",
    answer:
      "`Blend Tree` 是**一个状态内部**的玩法（不是状态之间的硬切）：按一个或多个参数，在多个动画 clip 之间算「**混合权重**」、平滑插值，让动画**无缝过渡**。**1D** 按一个参数（如 `Speed`）：`Speed=0` 全播 Idle、`Speed=0.5` 全播 Walk、中间按比例把 Idle 和 Walk 掺在一起；**2D** 按两个参数（如方向+速度）。它在编辑器里配、**不用写代码**——代码照旧只设 `Speed`。",
    tags: ["Blend Tree", "混合树", "1D", "定义"],
  },
  {
    id: "u5-mc-6",
    chapter: "u5-mecanim",
    level: 1,
    question:
      "用 `Animator.Play` 和 `Animator.CrossFade` 直接控制动画，二者有何区别？什么时候才该用？",
    answer:
      '`animator.Play("Jump")` 是**硬切**——立即跳到目标状态从头播，不走过渡；`animator.CrossFade("Run", 0.2f)` 是**带淡入的平滑切换**。它俩是「手动接管」的口子，用于过场、强制复位等特殊场景，**用得越少越好**——一旦到处用就丢掉了状态机「设参数自动切」的解耦优势，又回到手写切换逻辑的老路。绝大多数时候应该「设参数、让状态机切」。',
    tags: ["Animator.Play", "CrossFade", "硬切", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-mc-7",
    chapter: "u5-mecanim",
    level: 2,
    question:
      'Mecanim 的核心解耦是什么意思？当你调 `SetFloat("Speed", 6)` 时，到底是谁把动画切到了 Run？',
    answer:
      '核心解耦是：**代码只负责『设参数』，到底播哪个动画、怎么切，由状态机『按过渡条件自己决定』**。调 `SetFloat("Speed", 6)` 时，你只是往参数面板（小黑板）写了个值——**不是这行代码切的动画**。是**状态机**看到 `Speed=6` 满足了 Walk→Run 的过渡条件 `Speed > 4`，由它自己把当前态切到 Run。换动画、改阈值都在编辑器改，脚本不动。',
    tags: ["解耦", "SetFloat", "状态机", "辨析"],
  },
  {
    id: "u5-mc-8",
    chapter: "u5-mecanim",
    level: 2,
    question:
      "做「跳跃」该用 `SetTrigger` 还是 `SetBool`？做「是否着地」又该用哪个？为什么？",
    answer:
      '**跳跃用 `SetTrigger`**——它是**一次性**动作，trigger 拨一下、被过渡消费后**自动复位**，不会重复触发。若用 `SetBool("Jump", true)`，bool 设 `true` 后**不会自己变回去**，会导致跳跃**循环不停**。**「是否着地」用 `SetBool`**——这是个需要**持续保持**的状态，设 `true` 就一直是 `true` 直到再设 `false`，凡是读 `IsGrounded` 的过渡随时能读到最新真假。一句话：一次性信号用 trigger、持续开关用 bool。',
    tags: ["SetTrigger", "SetBool", "一次性", "持续状态", "辨析"],
  },
  {
    id: "u5-mc-9",
    chapter: "u5-mecanim",
    level: 2,
    question:
      "float / bool / trigger 三种参数在「设了值之后会不会保持」上有什么本质区别？",
    answer:
      "**float（`Speed`）/ int / bool（`IsGrounded`）：设了值会一直保持**，直到你下次再设别的值——它们表达的是一个「当前状态量」。**trigger（`Jump`）：拨起后只是个一次性信号**，被某条过渡消费后**自动复位**回未触发，不会停留。所以连续量 / 持续开关用 float / bool，一次性动作用 trigger——选错类型是动画切不对、或动作循环不停的常见原因。",
    tags: ["参数类型", "保持", "trigger", "辨析"],
  },
  {
    id: "u5-mc-10",
    chapter: "u5-mecanim",
    level: 2,
    question:
      "状态之间的「过渡（硬切）」和一个状态内部的「Blend Tree（混合）」分别适合什么场景？",
    answer:
      "**状态间过渡（硬切）**适合**异质**动作之间的切换——如 Idle 切到 Jump、Walk 切到攻击：两个动作差别大，切过去就行。**Blend Tree（一个状态内混合）**适合**同质**动作的**平滑过渡**——如「慢走 → 快走 → 小跑 → 全速跑」：直接硬切会很生硬，用 1D 混合树按 `Speed` 在 Idle / Walk / Run 几个 clip 间算混合权重、平滑插值，看起来浑然一体。一个管「换一种动作」，一个管「同一类动作的强度无缝渐变」。",
    tags: ["过渡", "Blend Tree", "硬切", "混合", "辨析"],
  },
  {
    id: "u5-mc-11",
    chapter: "u5-mecanim",
    level: 2,
    question:
      "1D 混合树里，`Speed = 0.3`（Idle 在 0、Walk 在 0.5、Run 在 1）时，角色播的是「纯走」吗？权重大致是多少？",
    answer:
      "**不是纯走**。`Speed=0.3` 落在 Idle(0) 与 Walk(0.5) 这一段之间，混合树按比例**把 Idle 和 Walk 掺在一起**：Walk 权重 ≈ 0.3/0.5 = 0.6、Idle ≈ 0.4，看着像「慢慢迈步」。Run 此时权重 0。这正是混合树的意义——不是到了某个阈值就硬切，而是按参数在相邻 clip 间**连续插值**出混合权重，让过渡无缝。",
    tags: ["Blend Tree", "混合权重", "插值", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-mc-12",
    chapter: "u5-mecanim",
    level: 3,
    question:
      "角色明明在跑，动画却一直停在 Idle，`SetFloat` 像没生效。最常见的原因和排查办法？",
    answer:
      '最常见是**参数名拼错或大小写不符**——代码写 `SetFloat("speed", v)` 但编辑器里参数叫 `Speed`。Unity 对此**静默失败**：不报错、设值落空，过渡条件永远读到默认值 `0`，于是死活不切。排查三步：①确认代码真的调了 `SetFloat` 且算出的 `speed` > 0（打印看一眼）；②**逐字符核对**字符串名与 Animator 参数列表（含大小写），推荐用 `Animator.StringToHash("Speed")` 缓存成 int；③查过渡条件阈值是否设得过大、Controller 是否真挂上了。',
    tags: ["SetFloat", "参数名", "静默失败", "排错"],
  },
  {
    id: "u5-mc-13",
    chapter: "u5-mecanim",
    level: 3,
    question:
      "按下移动键，角色要等当前动画**播完一整轮**才开始走，操作「不跟手」。问题出在哪？怎么修？",
    answer:
      "问题出在那条过渡在 Inspector 里勾了 **Has Exit Time**——意思是「必须等当前动画播到指定退出时间点才允许切」。这适合「攻击动作打完再切」，但**对要灵敏响应输入的过渡是灾难**。修法：选中这条过渡，**取消勾选 Has Exit Time**，让条件一满足就立刻切；同时把 Transition Duration 调小（甚至 0）减少过渡时长。移动 / 跳跃这类响应输入的过渡几乎都要关掉 Has Exit Time。",
    tags: ["Has Exit Time", "不跟手", "过渡", "排错"],
  },
  {
    id: "u5-mc-14",
    chapter: "u5-mecanim",
    level: 3,
    question:
      '调了 `SetTrigger("Jump")` 角色却不跳；或者下一次莫名其妙自己跳了一下。为什么？怎么修？',
    answer:
      '原因：①**没有任何过渡的条件用到这个 trigger**——拨起后没人消费它，既不触发本次、又卡着影响下次；②或这个 trigger 在切场景 / 被打断时**没被清掉**，残留到不该跳的时刻又恰好满足条件。修法：确认确有一条过渡的条件是「`Jump` 被触发」（且 `Jump` 参数类型是 Trigger）；在需要强制清除的时机用 `animator.ResetTrigger("Jump")` 手动复位。记住 trigger 的生命周期是「拨起 → 被某条过渡消费 → 自动复位」。',
    tags: ["SetTrigger", "ResetTrigger", "消费", "排错"],
  },
  {
    id: "u5-mc-15",
    chapter: "u5-mecanim",
    level: 3,
    question:
      "怎么写一个脚本，让角色**按移动速度**在 Idle / Walk / Run 间自动切、**按空格**跳跃？关键代码放哪？",
    answer:
      '`Awake` 缓存 Animator，`Update` 里读输入算速度写进 `Speed`、按空格拨 `Jump` trigger：\n```csharp\nAnimator anim;\nvoid Awake() { anim = GetComponent<Animator>(); }\nvoid Update()\n{\n    float speed = new Vector2(\n        Input.GetAxis("Horizontal"), Input.GetAxis("Vertical")).magnitude * 6f;\n    anim.SetFloat("Speed", speed);\n    if (Input.GetKeyDown(KeyCode.Space)) anim.SetTrigger("Jump");\n}\n```\n要点：脚本**只设参数**、不直接播动画；状态机那边要声明 `Speed`(float) 和 `Jump`(trigger) 两个参数，配好 Idle→Walk(`Speed>0.1`)、Walk→Run(`Speed>4`) 及任意态→Jump 的过渡，响应输入的过渡记得**关掉 Has Exit Time**。',
    tags: ["SetFloat", "SetTrigger", "Animator", "应用"],
  },
  {
    id: "u5-mc-16",
    chapter: "u5-mecanim",
    level: 3,
    question:
      '下面这段每帧 `GetComponent<Animator>()`、又用 `SetBool("Jump", true)` 做跳跃，有什么问题？怎么改？',
    answer:
      '两个问题：①**每帧 `GetComponent`** 浪费开销——应在 `Awake` 里拿一次、缓存进字段，`Update` 直接用；②**用 `SetBool` 做一次性跳跃**——bool 设 `true` 后**不会自己复位**，会导致跳跃**循环不停**。修法：把 `GetComponent<Animator>()` 移到 `Awake` 存进 `anim` 字段；跳跃改用 `anim.SetTrigger("Jump")`（并把 `Jump` 参数类型改成 Trigger）——trigger 拨一下、被过渡消费后自动复位，正好做一次性动作。',
    tags: ["缓存", "SetBool", "SetTrigger", "排错"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-mc-17",
    chapter: "u5-mecanim",
    level: 4,
    question:
      "做一个完整的「角色移动 + 跳跃 + 落地」动画系统：移动速度切 Idle/Walk/Run、按空格跳、用射线检测着地。各用什么参数 / 方法？为什么这样选？要避开哪些坑？",
    answer:
      '①**移动**：用 `SetFloat("Speed", speed)`——速度是连续量，写进 float 参数，状态机按 `Speed>0.1`/`Speed>4` 自己在 Idle/Walk/Run 间切；同质过渡更平滑可在一个状态内用 1D **Blend Tree** 按 `Speed` 混合 Idle/Walk/Run（编辑器配、不写代码）。②**跳跃**：用 `SetTrigger("Jump")`——一次性动作用 trigger，拨一下被过渡消费后自动复位，**别用 `SetBool` 否则循环不停**。③**着地**：用上一章的 `Physics.Raycast` 检测脚下，把结果用 `SetBool("IsGrounded", grounded)` 写进 bool 参数——「是否着地」是需要持续保持的开关，状态机用它控制「离地才允许进 Jump、落地从 Jump 回 Idle/Run」。\n贯穿原则：**脚本只设参数（float/bool/trigger），切动画的决定权全在状态机**。要避开的坑：参数名逐字符核对（含大小写，否则静默失败）、Animator 在 `Awake` 缓存别每帧 `GetComponent`、响应输入的过渡关掉 **Has Exit Time** 否则不跟手、trigger 确保有过渡消费否则卡住（必要时 `ResetTrigger`）。',
    tags: [
      "综合",
      "SetFloat",
      "SetTrigger",
      "SetBool",
      "Blend Tree",
      "Has Exit Time",
      "迁移",
    ],
  },
];
