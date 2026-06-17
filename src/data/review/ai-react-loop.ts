/** 复习题库 · ReAct：推理与行动循环（ai-react-loop）。AI Agent 开发实战·原创改编核心机制篇第 1 章。 */

import type { ReviewQuestion } from "./types";

export const aiReactLoopQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ai-react-1",
    chapter: "ai-react-loop",
    level: 1,
    question: "ReAct 这个名字是哪两个词拼起来的？它对应哪三步循环？",
    answer:
      "ReAct = **Re**asoning（推理）+ **Act**ing（行动）。它把「思考 Thought → 行动 Action → 观察 Observation」三步交织成一个循环：想一步、真去查一步、看到结果再接着想，直到把差事办成。",
    tags: ["ReAct", "定义"],
  },
  {
    id: "ai-react-2",
    chapter: "ai-react-loop",
    level: 1,
    question: "ReAct 一轮里的「Thought（推理轨迹）」是什么？",
    answer:
      "Thought 是 LLM 在这一轮里**显式写出来**的推理——「我现在该想什么、下一步该干什么」。它不直接给答案，而是把模型的判断过程从藏在脑子里变成白纸黑字看得见，方便跟踪它怎么想的，也方便它自己顺理成章地推下一步。由 LLM 自己生成。",
    tags: ["Thought", "定义"],
  },
  {
    id: "ai-react-3",
    chapter: "ai-react-loop",
    level: 1,
    question: "ReAct 一轮里的「Action（行动）」是什么？谁来执行它？",
    answer:
      'Action 是 LLM 决定要执行的那个动作，通常是「调哪个工具、传什么参数」（比如 `weather("上海")`）。Action 由 LLM 自己写出来，**系统**照着它真去执行那个工具。它是 ReAct 区别于「只会想」的纯 CoT 的关键——靠它去触碰外部世界。',
    tags: ["Action", "定义"],
  },
  {
    id: "ai-react-4",
    chapter: "ai-react-loop",
    level: 1,
    question: "ReAct 一轮里的「Observation（观察）」是什么？它从哪来？",
    answer:
      "Observation 是系统执行 Action（工具调用）之后，把工具**返回的真实结果**填回给 LLM、当作下一轮输入的那段内容（比如「小雨，降水 60%」）。关键：它是**系统填回的真实数据，不是 LLM 自己编的**——这正是 ReAct 能实证而非空想的来源。",
    tags: ["Observation", "定义"],
  },
  {
    id: "ai-react-5",
    chapter: "ai-react-loop",
    level: 1,
    question: "什么是纯 CoT（思维链）？它和 ReAct 最大的区别是什么？",
    answer:
      "纯 CoT（Chain-of-Thought）是让 LLM 把推理过程一步步写出来再给答案，**只靠「想」、不调用任何工具**。它全程闷在模型脑子里。和 ReAct 最大的区别：ReAct 在推理之外还会**真去调工具查**（有 Action 和 Observation），CoT 没有这一步，遇到不知道的实时 / 事实信息只能瞎猜。",
    tags: ["CoT", "定义", "区别"],
  },
  {
    id: "ai-react-6",
    chapter: "ai-react-loop",
    level: 1,
    question:
      "在 ReAct 一轮的三部分里，哪些是 LLM 自己写的，哪个是系统填回的？",
    answer:
      "**Thought 和 Action 是 LLM 自己写的**（它自己想、自己决定调什么工具）；**Observation 是系统填回的**（系统真去执行工具，把返回结果拼回来）。记住这条分界线，是看懂 ReAct 的关键。",
    tags: ["Thought", "Action", "Observation", "分界"],
  },
  // ── L2 理解：分辨 / 解释为什么 ──
  {
    id: "ai-react-7",
    chapter: "ai-react-loop",
    level: 2,
    question:
      "为什么说 ReAct 是第 1 章那条「感知→决策→行动→观察」Agent 循环的具体打法？",
    answer:
      "Agent 循环讲的是抽象的四环节（看清处境→想清下一步→调工具去做→看结果对不对）。ReAct 就是把这条循环落到「一段提示 + 一轮轮执行」上的具体形式：每一轮 LLM 显式写出 **Thought**（决策/想清下一步）、决定一个 **Action**（行动/调工具），系统执行后把 **Observation**（观察/结果）喂回去，再转下一轮。两者是「抽象循环」和「具体提示/执行模式」的关系。",
    tags: ["ReAct", "Agent循环", "理解"],
  },
  {
    id: "ai-react-8",
    chapter: "ai-react-loop",
    level: 2,
    question:
      "为什么 ReAct 要把推理（Thought）显式写出来，而不是让模型直接给答案？",
    answer:
      "好处有两个：① **过程看得见**——能跟着看模型怎么判断的，想错了能发现、能调试，而不是黑箱里一团乱麻；② **推下一步更顺**——模型把「我得先查天气」写下来后，下一步该出什么 Action 就顺理成章了。显式推理让多步任务更可控、更不容易跑偏。",
    tags: ["Thought", "为什么", "理解"],
  },
  {
    id: "ai-react-9",
    chapter: "ai-react-loop",
    level: 2,
    question:
      "为什么对「现在从北京去上海最快的高铁几点发车」这种问题，纯 CoT 靠不住而 ReAct 才行？",
    answer:
      "因为这是个需要**实时信息**的问题——今天的真实时刻表，模型脑子里没有。纯 CoT 全程只在脑子里推理、不查任何外部数据，它不知道真实班次，只能凭印象**编一个**（幻觉），看着笃定其实瞎猜。ReAct 则先想「我不知道，得查」，真去调时刻表工具拿到系统填回的真实数据，答案才有据可依。需要实时 / 事实信息的任务必须 ReAct。",
    tags: ["CoT", "ReAct", "实时信息", "为什么"],
  },
  {
    id: "ai-react-10",
    chapter: "ai-react-loop",
    level: 2,
    question:
      "ReAct 怎么补上了上一章讲的 LLM 两个软肋（会幻觉、不知实时信息）？",
    answer:
      "上一章说 LLM 是「概率续写而非查事实」（会幻觉）、又不知道实时信息。ReAct 的办法是：在推理之外加上 **Action + Observation**——让模型想到该查时**真去调工具查一遍**，把外部世界的真实数据（Observation）带回来当依据，而不是凭记忆脑补。于是「不知道的事实」就靠查证补上，幻觉也少了——ReAct 就是「让它去查而非空想」的机制。",
    tags: ["ReAct", "幻觉", "承接", "理解"],
  },
  {
    id: "ai-react-11",
    chapter: "ai-react-loop",
    level: 2,
    question:
      "有人说「Observation 也是模型自己写出来的一段文字」，这话错在哪？",
    answer:
      "错在把「系统填回的真实数据」当成了「LLM 生成的推理」。在 ReAct 里，LLM 每轮只写到 **Action** 就停；系统照着 Action **真去执行工具**，把返回结果作为 **Observation** 拼回对话，模型才续写下一轮。所以 Observation 来自外部世界、由系统填回，不是模型「想」出来的。把这条线搞混，ReAct 就和瞎猜没区别了。",
    tags: ["Observation", "误区", "理解"],
  },
  {
    id: "ai-react-12",
    chapter: "ai-react-loop",
    level: 2,
    question: "ReAct 是不是任何任务都该用？什么时候不必用？",
    answer:
      "不是。ReAct 每轮调工具都有延迟和成本。判断标准是看任务**需不需要外部信息**：简单问答、模型自己就知道的常识（比如「1 加 1 等于几」「解释一下什么是递归」），纯回答或 CoT 就够了，硬套 ReAct 反而又慢又费；只有需要实时 / 事实 / 算具体数的任务，才值得动用 ReAct 去查。",
    tags: ["ReAct", "误区", "适用场景"],
  },
  {
    id: "ai-react-13",
    chapter: "ai-react-loop",
    level: 2,
    question: "「让模型每轮多写几段 Thought，推理越多越靠谱」对吗？为什么？",
    answer:
      "不对。推理再多，也变不出模型本来不知道的事实——它不知道今天的时刻表，想十句还是不知道。ReAct 的价值在「想到该查时**真去出 Action 查**」，让 Observation 带回真数据，而不是在原地堆 Thought 空想。该出 Action 就出 Action，比多想十句强。",
    tags: ["Thought", "误区", "理解"],
  },
  // ── L3 应用：判断 / 套用到场景 / 写代码 ──
  {
    id: "ai-react-14",
    chapter: "ai-react-loop",
    level: 3,
    question:
      '给定一段 trace：(1)「光靠记忆不准，得查豆瓣」(2) `search_douban("夜航西飞")` (3)「评分 9.0，128301 人评价」(4)「评分挺高，可以回答了」。分别标出每行是 Thought/Action/Observation，并说哪些是 LLM 写的、哪个是系统填的。',
    answer:
      "(1) **Thought**（LLM 写的）——推理「光靠记忆不准，得去查」；(2) **Action**（LLM 写的）——决定调 `search_douban` 工具、传书名；(3) **Observation**（**系统填回的**）——系统真去执行工具，把返回的「评分 9.0」拼回来；(4) 又是 **Thought**（LLM 写的）——拿到真实评分后再推一步「够清楚了，可以回答」。一轮轮交织 Thought→Action→Observation→Thought，只有 (3) 来自系统。",
    tags: ["trace", "判断", "应用"],
  },
  {
    id: "ai-react-15",
    chapter: "ai-react-loop",
    level: 3,
    question:
      "下面这段 ReAct 循环骨架里，如果删掉 `obs = run_tool(step.action)` 这一行，程序会退化成什么？为什么？",
    answer:
      "会退化成一个**纯 CoT（思维链）**。删掉 `run_tool` 后，程序再也不能执行 Action、拿不回任何 Observation——也就是**断了和外部世界的联系**，只能在 `llm.think` 里一轮轮地「想」。失去「真去查、把真实数据带回来」这一步，就只剩推理、没了实证，和闷头空想的纯 CoT 没有本质区别，照样会对不知道的实时 / 事实信息瞎猜。让 ReAct 之所以是 ReAct 的，正是 `run_tool` + Observation 这条链路。",
    tags: ["代码", "CoT", "应用"],
  },
  {
    id: "ai-react-16",
    chapter: "ai-react-loop",
    level: 3,
    question:
      "现在有两个任务：A「把这段中文翻译成英文」、B「这家餐厅现在还有空位吗」。哪个该用 ReAct、哪个不必？为什么？",
    answer:
      "**B 该用 ReAct，A 不必。** A 翻译靠模型自身能力就能完成，不需要任何外部实时信息，纯回答（或 CoT）即可，套 ReAct 只会又慢又费。B「现在还有空位吗」需要**实时、外部**的订位状态，模型脑子里没有、凭空回答就是瞎猜——必须用 ReAct 去调订位/查询工具拿真实数据。判断标准：任务需不需要外部 / 实时信息。",
    tags: ["适用场景", "判断", "应用"],
  },
  {
    id: "ai-react-17",
    chapter: "ai-react-loop",
    level: 3,
    question:
      "一个 ReAct Agent 卡住了：它反复写「我应该查一下天气」「确实得查天气」「查天气很重要」，就是不出 Action 去查。问题在哪？怎么修？",
    answer:
      "问题是它在**原地堆 Thought 空想、迟迟不出 Action**——把「多想」当成了「靠谱」，可推理再多也变不出它不知道的天气。修法：让它**该出 Action 就真去出 Action**（调 weather 工具），把 Observation 带回真数据，再接着推理。ReAct 的价值在「想到该查时真去查」，不是无限堆 Thought。提示上可约束「想清楚后必须给出一个 Action 或 finish」。",
    tags: ["Thought", "误区", "调试", "应用"],
  },
  // ── L4 综合：贯通多个概念 ──
  {
    id: "ai-react-18",
    chapter: "ai-react-loop",
    level: 4,
    question:
      "把本章串起来：从一个需要实时信息的问题出发，完整说清 ReAct 一圈怎么转、每部分是谁产生的，以及它凭什么比纯 CoT 更靠谱、又不该被滥用。",
    answer:
      '以「看今天上海要不要带伞」为例走一圈：① **Thought**（LLM 写的）——「要答带不带伞，得先知道天气，我不知道，得去查」，把推理显式写出来；② **Action**（LLM 写的）——`weather("上海")`，决定调查天气的工具；③ **Observation**（**系统填回的**）——系统真去执行工具，把「小雨，降水 60%」拼回来，这是真实数据不是模型编的；④ 再 **Thought**——「会下雨，该提醒带伞」，拿真数据再推一步；⑤ **Answer**——给出查证过的答案。这就是「思考→行动→观察」交织成的循环，也是第 1 章 Agent 循环的具体打法。它比**纯 CoT** 靠谱，是因为 CoT 只闷头推理、遇到不知道的实时/事实信息只能瞎猜（幻觉），而 ReAct 多了 Action+Observation 这条「真去查、把真数据带回来」的实证链路——正好补上上一章讲的 LLM「会幻觉、不知实时信息」两个软肋。但它**不该滥用**：每轮调工具有延迟和成本，简单问答、模型自己就知道的常识用纯回答/CoT 即可，只有需要实时/事实/算数的任务才该动用 ReAct；也别在原地堆 Thought 空想，想到该查就真去出 Action。',
    tags: ["综合", "ReAct", "CoT", "承接"],
  },
];
