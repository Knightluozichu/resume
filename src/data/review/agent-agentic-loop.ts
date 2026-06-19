/** 复习题库 · 智能体循环（agent-agentic-loop）。《AI 智能体应用开发》第 3 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentAgenticLoopQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-loop-1",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "为什么单次「增强调用」搞不定开放任务，需要循环？",
    answer:
      "因为开放任务的「步数不定」：一次调用只能想一步、做一件事、看一个结果，可很多任务（订票、查多源资料、出错重试）一步根本办不完。循环让智能体能反复转——一次不够就再转一圈，直到把活干完。",
    tags: ["为什么循环", "基础"],
  },
  {
    id: "agent-loop-2",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "ReAct 这个名字是哪两个词拼出来的？分别指什么？",
    answer:
      "ReAct = Reason（推理 / 思考）+ Act（行动）。它指智能体在循环里把「思考」和「行动」交替着来：想一步、做一步、看结果，再想下一步——推理和行动穿插进行，而不是只想不做或只做不想。",
    tags: ["ReAct", "基础"],
  },
  {
    id: "agent-loop-3",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "ReAct 一轮迭代由哪三段构成？顺序是什么？",
    answer:
      "三段，顺序固定：① Thought（思考）想下一步该干啥；② Action（行动）真去调一个工具；③ Observation（观察）看工具返回了什么。想 → 做 → 看，构成循环里的一圈。",
    tags: ["ReAct", "三段"],
  },
  {
    id: "agent-loop-4",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "ReAct 里的 Thought（思考）这一段在干什么？",
    answer:
      "Thought 是 LLM 看着当前上下文，盘算「下一步该干啥」——比如「我得先查有哪些车次」。它是行动之前的推理，决定接下来调哪个工具、传什么参数，或者判断「够了，可以收尾」。",
    tags: ["Thought", "ReAct"],
  },
  {
    id: "agent-loop-5",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "ReAct 里的 Action（行动）这一段在干什么？",
    answer:
      "Action 是按 Thought 选定的工具和参数，真去执行一次调用——比如 search_trains(明天, 上海) 或 book(G1)。它把「想」落地成一次真实动作，去拿外部世界的结果。",
    tags: ["Action", "ReAct"],
  },
  {
    id: "agent-loop-6",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "ReAct 里的 Observation（观察）这一段在干什么？",
    answer:
      "Observation 是看 Action 返回了什么——工具的结果，比如「G1 已售罄」「订票成功」。这个结果会被喂回上下文，成为下一轮 Thought 的依据，让循环转得「越来越懂」当前任务。",
    tags: ["Observation", "ReAct"],
  },
  {
    id: "agent-loop-7",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "「多轮迭代」是什么意思？",
    answer:
      "指一次工具调用不够时，智能体反复转圈：第 1 轮做完看结果，把结果喂回上下文，第 2 轮基于新结果再想再做……一轮接一轮，直到任务完成。每一轮都是一次完整的「想 → 做 → 看」。",
    tags: ["多轮迭代", "基础"],
  },
  {
    id: "agent-loop-8",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "智能体循环常见的三种终止条件是什么？",
    answer:
      "① LLM 自己判定任务完成，正常退出；② 转够预设的 max steps（最大步数），强制停下给兜底回答；③ 出错没法继续（工具报错等），兜底退出。前者是「正常出口」，后两者是人留的「硬闸」。",
    tags: ["终止条件", "基础"],
  },
  {
    id: "agent-loop-9",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "max steps（步数上限）是干什么用的？",
    answer:
      "它是循环转圈次数的硬性上限：转够这么多圈还没收尾，就强制停下、返回兜底回答。作用是防止 LLM 始终判断不出「完成」而无限转下去——这是防死循环、防烧钱的必备闸门。",
    tags: ["max steps", "终止条件"],
  },
  {
    id: "agent-loop-10",
    chapter: "agent-agentic-loop",
    level: 1,
    question: "什么是「失控循环（死循环）」？",
    answer:
      "指智能体停不下来、原地打转：要么始终判断不出任务完成而无限转，要么反复调同样的工具拿同样的结果却不收尾。表现就是不返回、白白烧 token 和钱。常因没设 max steps 或没把结果喂回上下文导致。",
    tags: ["死循环", "误区"],
  },

  // —— Level 2 · 理解与辨析 ——
  {
    id: "agent-loop-11",
    chapter: "agent-agentic-loop",
    level: 2,
    question:
      "本章「多轮迭代」和第 1 章的「单轮循环」、第 2 章的「一次增强调用」有什么区别？",
    answer:
      "第 1 章用单轮例子（查天气）引入循环概念；第 2 章讲一次调用里检索/记忆/工具三路「汇聚」让单次调用变强；本章讲的是循环转「多轮」——一次不够反复转，每轮结果喂回上下文，下一轮思考基于上一轮变化。前两者是「一圈 / 一次」，本章是「很多圈、且圈圈相关」。",
    tags: ["对比", "多轮"],
  },
  {
    id: "agent-loop-12",
    chapter: "agent-agentic-loop",
    level: 2,
    question: "为什么说「下一轮的思考基于上一轮的结果」是循环的精髓？",
    answer:
      "因为这正是「自主」的体现：智能体不是按死流程走，而是看了上一轮 observation 才决定下一轮干啥。订 G1 失败 → 才改订 G7。若每轮思考都不看上一轮结果，那它就只是机械重复，称不上随机应变的循环。",
    tags: ["上下文累积", "精髓"],
  },
  {
    id: "agent-loop-13",
    chapter: "agent-agentic-loop",
    level: 2,
    question: "循环里上下文为什么会「越滚越长」？这有什么好处和代价？",
    answer:
      "每轮的 observation（工具结果）都追加进上下文，所以转得越多，上下文越长。好处：智能体越来越「懂」当前任务，能基于全部历史决策。代价：上下文越长越贵、越慢，转太多圈还可能撑爆上下文窗口——这是后续上下文工程篇要治的问题。",
    tags: ["上下文累积", "代价"],
  },
  {
    id: "agent-loop-14",
    chapter: "agent-agentic-loop",
    level: 2,
    question:
      "在订票例子里，轮 2 思考「订 G1」、轮 3 思考「改订 G7」——为什么思考变了？",
    answer:
      "因为轮 2 的 observation 是「G1 已售罄」，这条结果喂回了上下文。轮 3 的 LLM 看到「G1 没票」，才改主意去订次便宜的 G7。思考的变化完全由上一轮的真实结果驱动——这就是循环让智能体「随机应变」的机制。",
    tags: ["上下文累积", "随机应变"],
  },
  {
    id: "agent-loop-15",
    chapter: "agent-agentic-loop",
    level: 2,
    question: "如果每轮不把 observation 喂回上下文，会发生什么？",
    answer:
      "智能体会「失忆」：下一轮看不到上一轮的结果，于是反复做同样的判断、调同样的工具、拿同样的结果，原地打转、永远不收尾。喂回 observation 是循环能「往前走」的前提，漏掉它循环就废了。",
    tags: ["上下文喂回", "误区"],
  },
  {
    id: "agent-loop-16",
    chapter: "agent-agentic-loop",
    level: 2,
    question:
      "「LLM 判定任务完成」和「达到 max steps」这两个出口有什么本质不同？",
    answer:
      "前者是 LLM 自己认为活干完了、主动收尾——是「正常退出」，结果通常是满意的；后者是人设的硬性上限被触发、强行叫停——是「保护性退出」，说明任务可能还没真正完成，只是不让它再转了。一个是「成功」，一个是「兜底」。",
    tags: ["终止条件", "辨析"],
  },
  {
    id: "agent-loop-17",
    chapter: "agent-agentic-loop",
    level: 2,
    question: "为什么循环的终止不能只靠「LLM 自己判断完成」？",
    answer:
      "因为 LLM 可能始终判断不出「完成」——比如任务本身没法完成、工具反复报错、或它陷入纠结。只靠它自判，遇到这些情况就会无限转。所以必须额外加 max steps 和出错兜底两道人留的硬闸，兜住最坏情况。",
    tags: ["终止条件", "为什么"],
  },
  {
    id: "agent-loop-18",
    chapter: "agent-agentic-loop",
    level: 2,
    question: "「能调一次工具的 LLM」和「会多轮迭代的智能体」差在哪？",
    answer:
      "差在「循环」。能调一次工具只是增强型 LLM（第 2 章），它搜一次、答一次，不会根据结果反复调整。会多轮迭代的智能体在循环里反复「想 → 做 → 看」，一次不行就基于结果再转——这份「反复迭代、随机应变」才是智能体的关键。",
    tags: ["对比", "智能体"],
  },

  // —— Level 3 · 应用 ——
  {
    id: "agent-loop-19",
    chapter: "agent-agentic-loop",
    level: 3,
    question:
      "用 for + max_steps 写一个带终止条件的循环骨架，说明每个出口对应代码哪一行。",
    answer:
      "骨架：\n`for step in range(max_steps):`\n`    thought = llm(ctx)`\n`    if thought.done: return thought.answer`  ← LLM 判完成，正常退出\n`    obs = act(thought.tool, thought.args)`\n`    ctx += obs`  ← 把 observation 喂回上下文\n`return fallback_answer`  ← for 转满 max_steps 还没收尾，强制停的兜底出口。（出错兜底可在 act 外包 try/except 再加一个出口。）",
    tags: ["代码", "终止条件"],
  },
  {
    id: "agent-loop-20",
    chapter: "agent-agentic-loop",
    level: 3,
    question: "把订票例子的循环按「想 / 做 / 看」拆成三轮，逐轮写出每段内容。",
    answer:
      "轮1：想「先查车次」→ 做 search_trains(明天,上海) → 看「G1/G7 都 ¥553，G1 最便宜」。轮2：想「订最便宜的 G1」→ 做 book(G1) → 看「G1 已售罄」。轮3：想「G1 没了，改订 G7」→ 做 book(G7) → 看「订票成功」→ LLM 判完成、退出。每轮的「想」都基于上一轮的「看」。",
    tags: ["应用", "多轮"],
  },
  {
    id: "agent-loop-21",
    chapter: "agent-agentic-loop",
    level: 3,
    question:
      "一个 agent 反复调同一个搜索工具、拿到几乎一样的结果却不收尾。可能哪出了问题？怎么排查？",
    answer:
      "两个高频原因：① observation 没真正喂回上下文，agent 失忆、每轮重复同一判断；② 没设 max steps，它陷在原地打转停不下来。排查：先看每轮上下文里有没有累积进上次的结果；再确认循环有没有步数上限和兜底出口。两道都补上，死循环就断了。",
    tags: ["应用", "排错"],
  },
  {
    id: "agent-loop-22",
    chapter: "agent-agentic-loop",
    level: 3,
    question:
      "给「订明天去上海最便宜的高铁票」这个任务，至少要几轮循环？为什么不是一轮？",
    answer:
      "至少 3 轮（按本章例子）：第 1 轮得先查车次（不查不知道有哪些、哪个便宜），第 2 轮才能去订最便宜的，订失败后第 3 轮还要改订次便宜的。一轮做不完，是因为「先查后订、失败再换」这种依赖前一步结果的步骤，必须靠循环逐轮推进。",
    tags: ["应用", "为什么循环"],
  },
  {
    id: "agent-loop-23",
    chapter: "agent-agentic-loop",
    level: 3,
    question:
      "要给一个客服 agent 防「无限转圈烧钱」，你会加哪两道保护？分别防什么？",
    answer:
      "① max steps（步数上限）：转够 N 圈强制停，防 LLM 始终判不出完成而无限转；② 出错兜底（try/except 等）：工具报错时退出循环、返回错误说明，防异常把循环卡死。两道闸一道防「停不下来」、一道防「卡在错误里」，配合 LLM 自判完成的正常出口，三个出口齐了才稳。",
    tags: ["应用", "终止条件"],
  },

  // —— Level 4 · 综合 ——
  {
    id: "agent-loop-24",
    chapter: "agent-agentic-loop",
    level: 4,
    question:
      "把第 1、2、3 章串起来：从「裸 LLM」到「会多轮迭代的智能体」，一共补齐了哪几样？",
    answer:
      "第 1 章：裸 LLM 只会预测下一个词，给它配上工具 / 记忆 / 指令 / 循环四件外挂才成智能体。第 2 章：把检索 / 工具 / 记忆三路增强汇聚进一次调用，让单次调用有据可依。第 3 章：让循环转「多轮」——ReAct 三段交替、observation 逐轮喂回、上下文累积、下一轮基于上一轮变化，再加 max steps / 出错兜底兜住终止。三章合起来，就是一个能自己反复想做看、随机应变、且停得下来的智能体。",
    tags: ["综合", "串联"],
  },
  {
    id: "agent-loop-25",
    chapter: "agent-agentic-loop",
    level: 4,
    question: "max steps 设得太小和太大各有什么坏处？怎么权衡？",
    answer:
      "太小：复杂任务还没转完就被强制叫停，本来能办成的事也办不成（误杀）。太大：失控时要烧很多圈才停，浪费 token 和时间、用户等很久。权衡：按任务复杂度估「正常需要几轮」，再留一点余量；复杂任务给大些、简单任务给小些，并配合「连续多轮无进展就提前停」等更细的策略，而不是一味调大调小。",
    tags: ["综合", "权衡"],
  },
  {
    id: "agent-loop-26",
    chapter: "agent-agentic-loop",
    level: 4,
    question:
      "有人说「循环让智能体很强，那就让它一直转、转到完美为止」。这个想法错在哪？",
    answer:
      "错在忽略了「转圈是有代价、且可能不收敛的」。每多转一圈都更贵更慢、上下文更长，而 LLM 未必能转到「完美」——可能始终判不出完成、原地打转。强大的循环必须配硬约束：max steps 限次数、出错兜底防卡死、并尽量让每轮真有进展。自主性要给，但「停得下来」这道闸不能省，否则强大就变成失控烧钱。",
    tags: ["综合", "失控"],
  },
];
