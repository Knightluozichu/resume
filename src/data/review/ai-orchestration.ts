/** 复习题库 · 编排·通信·终止（ai-orchestration）。AI Agent 开发实战·原创改编多智能体篇第 2 章（篇 4 收官）。 */

import type { ReviewQuestion } from "./types";

export const aiOrchestrationQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ai-orch-1",
    chapter: "ai-orchestration",
    level: 1,
    question:
      "Agent 之间通信靠「消息」。一条消息至少由哪三样组成？一句话说清。",
    answer:
      "一条消息是结构化的一条，至少包含三样：**谁发的**（发送者 / from）、**发给谁**（接收者 / to）、**内容是什么**（content）。标清楚这三样，对方才知道这条消息是谁递来的、是给谁的、说的什么。Agent 之间所有「传话」（分派、汇报、流水线传递）本质都是收发这样的消息。",
    tags: ["消息", "通信", "定义"],
  },
  {
    id: "ai-orch-2",
    chapter: "ai-orchestration",
    level: 1,
    question:
      "什么是共享状态 / 黑板（blackboard）？它和点对点传消息有什么不同？",
    answer:
      "共享黑板是给系统里**所有 Agent 一块共享的状态板**，谁都能写、谁都能读。各 Agent 不必两两点对点传消息，而是都冲着同一块板——研究员把资料写上去，写手一读黑板就拿到、再写上初稿，审查一读看到全部。不同点：消息传递是各发各的、点对点；共享黑板是大家**围着同一块板**读写同一份逐步完善的产物。",
    tags: ["共享状态", "黑板", "定义"],
  },
  {
    id: "ai-orch-3",
    chapter: "ai-orchestration",
    level: 1,
    question: "什么是编排（orchestration）？承担编排的那一环叫什么？",
    answer:
      "编排是多智能体系统里负责**调度**的那一环——决定谁先谁后、这一轮该轮到哪个 Agent、整个流程转几轮。承担它的叫**编排器（orchestrator）**，通常就是一个循环：每轮选出下一个该干活的 Agent、让它跑、用产出更新共享状态，再进入下一轮，直到满足终止条件。编排决定了这支小队按什么节奏推进。",
    tags: ["编排", "orchestrator", "定义"],
  },
  {
    id: "ai-orch-4",
    chapter: "ai-orchestration",
    level: 1,
    question: "什么是终止条件？常见的三种终止条件分别是什么？",
    answer:
      "终止条件是编排循环必须设的「收工的闸」——满足某个条件就强制停下，别让 Agent 无限转。常见三种：① **达成目标**（如审稿 Agent 放行了）；② **到最大轮数**（max_rounds，转够 N 轮就兜底收工）；③ **连续几轮没进展**（卡住就停）。其中 max_rounds 这个兜底几乎必备，是无论如何都能停下来的保险丝。",
    tags: ["终止条件", "定义"],
  },
  {
    id: "ai-orch-5",
    chapter: "ai-orchestration",
    level: 1,
    question: "为什么说多个 Agent「不会自己有序起来」，必须有编排器？",
    answer:
      "因为多个 Agent 各自独立，你不告诉它们顺序，可能一起抢着说话、或都在等别人先动，谁也不知道这一轮该轮到谁。必须有个**编排器**来调度：定下谁先谁后、这轮轮到谁、转几轮。它把一盘散沙变成有节奏推进的流程。supervisor 的主管、pipeline 的固定工序顺序，本质都是一种编排。",
    tags: ["编排", "动机", "定义"],
  },
  {
    id: "ai-orch-6",
    chapter: "ai-orchestration",
    level: 1,
    question: "把消息写成一句光秃秃的字符串，会丢掉什么关键信息？",
    answer:
      "会丢掉**结构**——尤其是发送者（from）和接收者（to）。没有 from / to，接收方就不知道这条消息是谁发的、是不是给自己的，多个 Agent 一多就对不上号：把别人的活当自己的干，或者漏处理。所以消息一律要结构化，至少带发送者、接收者、内容三样。",
    tags: ["消息", "结构化", "定义"],
  },
  // ── L2 理解：分辨 / 解释为什么 ──
  {
    id: "ai-orch-7",
    chapter: "ai-orchestration",
    level: 2,
    question:
      "承接上一章的拓扑，supervisor 和 pipeline 里的「传话」分别对应什么消息流？",
    answer:
      "都是在收发消息。**supervisor**：主管把子任务作为消息**分派**给 worker（主管 → 研究员：「去查资料」），worker 干完把结果作为消息**汇报**回主管（研究员 → 主管：「查到 3 篇评测」）——一来一回。**pipeline**：上一道工序把产出作为消息**传给**下一道（研究员 → 写手：「这是资料」），单向依次往后流。可见拓扑差异落到通信上，就是消息流向的差异。",
    tags: ["消息", "拓扑", "承接", "理解"],
  },
  {
    id: "ai-orch-8",
    chapter: "ai-orchestration",
    level: 2,
    question:
      "什么样的协作场景更适合用共享黑板，而不是纯点对点传消息？为什么？",
    answer:
      "多个 Agent **围着同一份逐步完善的产物**协作的场景（一起写报告、一起调方案）更适合共享黑板。因为纯点对点传消息时，人一多消息就满天飞——每个人都要分别发给其他人，谁该把什么发给谁容易乱、容易漏。共享黑板让后来的 Agent **一读黑板就拿到前面所有人的产出**，不必逐一接收，协作的「同一份产物」始终在一处累积，不容易对不上。",
    tags: ["共享黑板", "适用场景", "理解"],
  },
  {
    id: "ai-orch-9",
    chapter: "ai-orchestration",
    level: 2,
    question:
      "在一个「写手 + 审稿」互相改稿的编排循环里，只设「达成目标」一道终止闸够不够？为什么？",
    answer:
      "不够。只设「达成目标」（审稿放行才停），万一审稿 Agent 永远挑得出毛病、永不放行，循环就**永远跑下去**——这正是死循环。必须再加一道**最大轮数（max_rounds）兜底闸**：哪怕双方永远谈不拢，转满 N 轮也强制收工。这个兜底是无论如何都能停下来的保险丝，几乎必加。",
    tags: ["终止条件", "max_rounds", "理解"],
  },
  {
    id: "ai-orch-10",
    chapter: "ai-orchestration",
    level: 2,
    question: "为什么「编排器串行调度」能顺手解决共享状态的写入冲突问题？",
    answer:
      "因为编排器**一轮只让一个 Agent 动**（轮流取一个来跑），任一时刻只有一个 Agent 在读写共享黑板，两个写操作不会同时打架，自然就没有覆盖、读到半成品状态这类冲突（race condition）。也就是说，编排（谁先谁后、一轮一个）提供了安全读写共享状态的**秩序**——这正是通信 / 共享状态 / 编排三者要配合着用的原因。",
    tags: ["编排", "共享状态", "冲突", "理解"],
  },
  {
    id: "ai-orch-11",
    chapter: "ai-orchestration",
    level: 2,
    question:
      "不设终止条件，让两个 Agent 互相审稿会发生什么？为什么这是多 Agent 最危险的坑？",
    answer:
      "会**无限踢皮球**：写手出稿 → 审查挑错 → 写手再改 → 审查再挑……只要审查永远能挑出毛病，这俩就停不下来，轮次一路涨、token 一路烧，活还没出。说它最危险，是因为它不像「干不好」那样有产出可改，而是**默默地把钱烧光、永不收尾**，且很隐蔽（每一轮看起来都在「正常工作」）。所以编排循环必须设终止条件这道安全阀。",
    tags: ["终止条件", "死循环", "理解"],
  },
  {
    id: "ai-orch-12",
    chapter: "ai-orchestration",
    level: 2,
    question: "本章和上一章《多智能体协作模式》是什么承接关系？",
    answer:
      "上一章讲**拓扑**——怎么把多个 Agent 编成队（supervisor / swarm / pipeline），把特工小队的队形组好了。本章讲队员之间**怎么真正配合起来**：怎么传话（通信 / 消息）、怎么共用一块板（共享状态 / 黑板）、由谁定节奏（编排 / 轮次），以及什么时候收工（终止条件）。一句话：上一章组好小队，本章让小队真正传话、按节奏推进、按时收工，别没完没了。",
    tags: ["承接", "理解"],
  },
  // ── L3 应用：判断 / 套用到场景 / 写代码 ──
  {
    id: "ai-orch-13",
    chapter: "ai-orchestration",
    level: 3,
    question:
      "（写代码）写一个带双终止闸的编排循环 run(bb, agents, max_rounds)：轮流取 agents 里的 Agent 跑、更新 bb，在 bb['done'] 为 True 或转满 max_rounds 时停。",
    answer:
      '```python\ndef run(bb, agents, max_rounds=8):\n    for r in range(max_rounds):              # 闸一：到最大轮数兜底\n        name, fn = agents[r % len(agents)]   # 选下一个该轮到的 Agent\n        fn(bb)                               # 跑它、更新共享状态 bb\n        if bb.get("done"):                   # 闸二：达成目标就收工\n            return f"达成目标，第 {r + 1} 轮收工"\n    return f"到 max_rounds={max_rounds}，强制收工"\n```\n要点：`for r in range(max_rounds)` 既是编排循环又是最大轮数兜底；`agents[r % len(agents)]` 实现轮次控制（一轮一个轮流来）；`if bb.get("done")` 是达成目标闸。**两道闸缺一不可**——只留 done 会死循环，只留 max_rounds 会达标后空转。',
    tags: ["代码", "编排循环", "终止条件", "应用"],
  },
  {
    id: "ai-orch-14",
    chapter: "ai-orchestration",
    level: 3,
    question:
      "（调试死循环）你的多 Agent 系统跑起来停不下来、token 一直涨。先怀疑哪里、怎么定位、怎么修？",
    answer:
      "先怀疑**编排循环缺了终止条件**（最常见是没设 max_rounds 兜底，只靠「达成目标」而目标永远没达成）。定位：看编排循环是不是 `while not done:` 之类没有轮数上限的写法，以及「达成目标」的条件是否可能永远为假（如审查永不放行）。修法：加一道**最大轮数闸** `for r in range(max_rounds)` / `if r >= max_rounds: break`，让它无论如何都能停；必要时再加「连续几轮没进展就停」。这是无论如何都会触发的保险丝。",
    tags: ["调试", "死循环", "终止条件", "应用"],
  },
  {
    id: "ai-orch-15",
    chapter: "ai-orchestration",
    level: 3,
    question:
      "（改代码）§6c 的编排循环里去掉 `for r in range(max_rounds)` 改成 `while not bb['approved']:`，且审稿 Agent 永不放行，会怎样？怎么救？",
    answer:
      "会**死循环**：`bb['approved']` 永远是 False，`while` 永远不退出，写手审查无限踢皮球、token 烧光。救法：给 while 加一道轮数兜底——`r = 0; while not bb['approved'] and r < max_rounds: ...; r += 1`，或干脆用 `for r in range(max_rounds)` 把上限写死。补上这道**无论如何都会触发的最大轮数闸**，哪怕审稿永不放行，转满 max_rounds 也会强制收工。",
    tags: ["代码", "改代码", "死循环", "应用"],
  },
  {
    id: "ai-orch-16",
    chapter: "ai-orchestration",
    level: 3,
    question:
      "（场景）三个 Agent 要一起打磨同一份方案，且需要后来者随时看到前面所有人的修改。用点对点传消息还是共享黑板？怎么避免它们改乱？",
    answer:
      "用**共享黑板**：三个 Agent 围着同一份方案读写，后来的 Agent 一读黑板就看到前面所有人的修改，不必逐一接收——正是「围着同一份逐步完善的产物协作」的场景，点对点传消息会让通知满天飞、容易漏。避免改乱：靠**编排器串行调度**，一轮只让一个 Agent 写黑板（轮流来），任一时刻只有一个在写，就不会互相覆盖、冲突。",
    tags: ["共享黑板", "选型", "冲突", "应用"],
  },
  {
    id: "ai-orch-17",
    chapter: "ai-orchestration",
    level: 3,
    question:
      "（写代码）定义一个最小的 Message 类（带 from / to / content），并造一条「主管派研究员去查资料」的消息。再说说接收方怎么用 from / to。",
    answer:
      '```python\nclass Message:\n    def __init__(self, sender, receiver, content):\n        self.sender = sender      # from\n        self.receiver = receiver  # to\n        self.content = content    # content\n\nmsg = Message("supervisor", "researcher", "去查这款相机的评测和参数")\n```\n接收方的用法：按 `receiver`（to）**过滤**出该自己处理的消息（`if msg.receiver == 我的名字`），按 `sender`（from）知道是谁发来的、该回给谁。结构化的 from / to 就是让多个 Agent 在消息满天飞时仍能各收各的、不串号。',
    tags: ["代码", "消息", "结构化", "应用"],
  },
  // ── L4 综合：贯通多个概念 ──
  {
    id: "ai-orch-18",
    chapter: "ai-orchestration",
    level: 4,
    question:
      "把本章串起来：以「写手 + 审稿两个 Agent 协作改稿」为例，讲清它们怎么传消息、怎么共用黑板、由谁编排轮次、靠什么终止条件防死循环，并说说三者是怎么配合的。",
    answer:
      "走一遍。**怎么传消息**：写手和审稿之间一来一回收发结构化消息——写手 → 审稿（content：初稿 v1），审稿 → 写手（content：意见1）；每条消息标清 from / to / content，对方才知道是谁的、给谁的、说啥。**怎么共用黑板**：与其各传各的，不如放一块共享黑板 `bb = {draft, notes, approved}`——写手读黑板已有意见、改稿写回 `bb['draft']`，审查读黑板拿到稿子、追加意见到 `bb['notes']`，黑板逐步累积成完整产物，后来者一读就拿到全部。**由谁编排轮次**：一个编排循环当指挥——`for r in range(max_rounds): name = turn_order[r % len]; AGENTS[name](bb)`，轮流让写手、审查各动一轮（一轮一个，串行调度顺手避免了两个 Agent 同时写黑板的冲突）。**靠什么终止防死循环**：设**双终止闸**——`if bb['approved']: break`（审查放行就正常收工）+ `for r in range(max_rounds)`（转满 N 轮兜底强制收工）；缺了 max_rounds 那道闸，万一审查永不放行就会无限踢皮球、烧光 token。**三者怎么配合**：消息 / 黑板提供**协作的介质**（怎么交换信息），编排器提供**推进的秩序**（谁先谁后、一轮一个），终止条件提供**收工的安全阀**（什么时候必须停）——介质 + 秩序 + 安全阀凑齐，多 Agent 才能真正传话、按节奏推进、按时收工，而不是凑一堆没完没了地踢皮球。",
    tags: ["综合", "消息", "共享黑板", "编排", "终止条件"],
  },
];
