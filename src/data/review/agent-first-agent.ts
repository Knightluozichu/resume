/** 复习题库 · 第一个最小 Agent（agent-first-agent）。《AI 智能体应用开发》第 4 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentFirstAgentQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-first-1",
    chapter: "agent-first-agent",
    level: 1,
    question: "一个能跑的「最小 Agent」由哪四块骨架拼成？",
    answer:
      "四块：① 系统提示（定身份、目标、规矩）；② 工具表（声明能调哪些工具）；③ LLM 调用（每圈让模型看上下文、决定下一步）；④ 带刹车的循环（for + max_steps，把前三块反复转起来直到收尾）。",
    tags: ["最小 Agent", "骨架"],
  },
  {
    id: "agent-first-2",
    chapter: "agent-first-agent",
    level: 1,
    question: "在最小 Agent 里，「系统提示」对应代码里的什么？",
    answer:
      "对应消息列表里 role 为 system 的那一条，放在对话最前面，比如「你是贴心的生活助手，必要时调用工具再回答」。它是第 1 章「指令」外挂在代码里的落点，定下 agent 的身份、目标和规矩。",
    tags: ["系统提示", "基础"],
  },
  {
    id: "agent-first-3",
    chapter: "agent-first-agent",
    level: 1,
    question: "一个工具的完整定义包含哪几部分？",
    answer:
      "四部分：① 名字 name（LLM 用它点名要调哪个）；② 描述 description（用人话讲清干啥、何时调）；③ 参数 parameters（声明传什么、什么类型）；④ 实现 function（真正干活的 Python 函数体）。前三部分是给 LLM 看的 schema，第四部分是给机器跑的实现。",
    tags: ["工具定义", "基础"],
  },
  {
    id: "agent-first-4",
    chapter: "agent-first-agent",
    level: 1,
    question: "什么是「工具 schema」？它是给谁看的？",
    answer:
      "工具 schema 是一份用结构化格式（通常 JSON）写的工具说明书，含名字、描述、参数三样。它是给 LLM 看的——LLM 不读函数体，全靠这份 schema 判断「有没有这个工具、什么时候该调、要传什么参数」。",
    tags: ["工具 schema", "基础"],
  },
  {
    id: "agent-first-5",
    chapter: "agent-first-agent",
    level: 1,
    question: "工具到底是谁执行的？LLM 还是我们的代码？",
    answer:
      "是我们的代码执行的。LLM 自己不执行任何工具——它只产出一个「调用意图」（要调哪个工具、传什么参数），真正去跑那个函数的，永远是我们代码里的 TOOLS[name](**args) 这一行。",
    tags: ["工具调用解析", "基础"],
  },
  {
    id: "agent-first-6",
    chapter: "agent-first-agent",
    level: 1,
    question: "什么是「工具调用解析」？",
    answer:
      "指从 LLM 的回复里读出「它想调哪个工具、传什么参数」，再用这些信息去真正执行对应函数的过程。比如解析出 name=get_weather、args={city:北京}，再调 TOOLS[name](**args)。",
    tags: ["工具调用解析", "基础"],
  },
  {
    id: "agent-first-7",
    chapter: "agent-first-agent",
    level: 1,
    question: "在最小 Agent 的循环里，「回填」指的是什么？",
    answer:
      "回填指把工具执行的结果作为一条新消息追加（append）回上下文（消息列表），让下一圈的 LLM 调用能看见它。漏了回填，agent 就「失忆」——下一圈看不到刚才的结果，会原地打转。",
    tags: ["回填", "基础"],
  },
  {
    id: "agent-first-8",
    chapter: "agent-first-agent",
    level: 1,
    question: "max_steps 在最小 Agent 里起什么作用？",
    answer:
      "它是主循环最多转几圈的硬性上限。转够这么多圈还没收尾就强制停、返回兜底回答。作用是防止 LLM 始终判不出「完成」而无限转圈、烧钱卡死——所以循环要用 for _ in range(max_steps) 而非 while True。",
    tags: ["max_steps", "基础"],
  },
  {
    id: "agent-first-9",
    chapter: "agent-first-agent",
    level: 1,
    question: "最小 Agent 的主循环每一圈大致做哪几件事？",
    answer:
      "每圈：① 调 LLM（思考）；② 看它有没有要求调工具——没有就说明它能直接答了，返回最终答案（正常出口）；③ 有就解析 + 执行每个工具调用；④ 把结果回填进上下文，进入下一圈。",
    tags: ["主循环", "基础"],
  },
  {
    id: "agent-first-10",
    chapter: "agent-first-agent",
    level: 1,
    question: "最小 Agent 主循环有哪两个出口？",
    answer:
      "① 正常出口：某圈 LLM 不再调工具、直接给文字答案（reply.tool_calls 为空），返回 reply.content；② 兜底出口：转满 max_steps 还没收尾，强制停、返回一句兜底回答。",
    tags: ["终止条件", "基础"],
  },

  // —— Level 2 · 理解与辨析 ——
  {
    id: "agent-first-11",
    chapter: "agent-first-agent",
    level: 2,
    question:
      "为什么说最小 Agent 把前三章的零件「拼」了起来？四块骨架各对应前面哪一章？",
    answer:
      "系统提示 = 第 1 章的「指令」外挂；工具表 / schema = 第 2 章的「工具」增强；LLM 调用 = 那颗不变的「大脑」；带刹车的循环 = 第 3 章的 for+max_steps 循环骨架。本章把这些概念零件落成几十行能跑的代码，拼成一台真能转的机器。",
    tags: ["串联", "骨架"],
  },
  {
    id: "agent-first-12",
    chapter: "agent-first-agent",
    level: 2,
    question: "工具的「函数实现」和「schema」为什么要分开写？",
    answer:
      "因为它俩是给不同对象看的：函数实现是给机器跑的真代码（LLM 看不到函数体）；schema 是给 LLM 看的说明书，让它知道有这工具、何时调、怎么传参。两者职责不同——一个负责「真去干活」，一个负责「让 LLM 会用」。",
    tags: ["工具定义", "辨析"],
  },
  {
    id: "agent-first-13",
    chapter: "agent-first-agent",
    level: 2,
    question: "工具 schema 的 description 写得含糊，会导致什么后果？为什么？",
    answer:
      "会导致 LLM 该调工具时不调、或调用时乱传参数。因为 LLM 完全靠 description 判断这工具干啥、什么场景用、参数什么意思——它看不到函数体。description 写得含糊，它就读不懂、用不对。所以要像对新同事交代一样写具体。",
    tags: ["工具 schema", "误区"],
  },
  {
    id: "agent-first-14",
    chapter: "agent-first-agent",
    level: 2,
    question: "为什么每圈都要先判断 if not reply.tool_calls，而不能假定它一定调工具？",
    answer:
      "因为 LLM 并不总是调工具——简单问题它会直接给文字答案。如果代码默认它一定先调工具、直接去读 reply.tool_calls，遇到它直接作答的情况就会拿不到答案或报错。所以要两条路径都兜住：没工具调用就返回 content，有才解析执行。",
    tags: ["主循环", "误区"],
  },
  {
    id: "agent-first-15",
    chapter: "agent-first-agent",
    level: 2,
    question: "如果忘了把工具结果回填进 msgs，agent 会出什么问题？",
    answer:
      "agent 会「失忆」原地打转：下一圈的 call_llm(msgs) 看不到上一圈查到的结果，于是又判断「还得查」、再调一次同样的工具，永远走不到收尾，白白转满 max_steps。回填是循环能往前走的前提。",
    tags: ["回填", "误区"],
  },
  {
    id: "agent-first-16",
    chapter: "agent-first-agent",
    level: 2,
    question:
      "本章的最小 Agent 和第 2 章的「一次增强调用」最关键的区别是什么？",
    answer:
      "区别在「循环」。第 2 章是把检索/工具/记忆汇聚进一两次调用、不反复迭代；本章的最小 Agent 外面套了一个带 max_steps 的 for 循环，能反复「调 LLM → 执行工具 → 回填」转多圈，自己根据结果决定何时收尾。前者是「一次（或固定两次）调用」，后者是「自主多圈循环」。",
    tags: ["对比", "循环"],
  },
  {
    id: "agent-first-17",
    chapter: "agent-first-agent",
    level: 2,
    question:
      "在「北京今天穿什么」这个例子里，agent 至少要转几圈？为什么不是一圈？",
    answer:
      "至少 2 圈。第 1 圈：LLM 思考「得先查天气」→ 调 get_weather(北京) → 回填「15°C·晴」。第 2 圈：LLM 看到回填的天气，才能基于它直接作答「偏凉，穿外套」、不再调工具、收尾。查天气和「拿着天气作答」是两圈干的，所以一圈不够。",
    tags: ["运行轨迹", "为什么循环"],
  },
  {
    id: "agent-first-18",
    chapter: "agent-first-agent",
    level: 2,
    question:
      "主 viz 里「左边代码块高亮、右边追加轨迹」想表达的核心是什么？",
    answer:
      "表达「代码」和「它跑起来的行为」一一对应：左边每执行一块代码（如 LLM 调用、工具执行、回填），右边就追加一条对应的运行轨迹（Thought / Action / Observation / 完成）。把这两边对上，最小 agent 就从黑盒变成你能逐行读懂的程序。",
    tags: ["运行轨迹", "代码视角"],
  },

  // —— Level 3 · 应用 ——
  {
    id: "agent-first-19",
    chapter: "agent-first-agent",
    level: 3,
    question:
      "要给最小 Agent 加一个新工具 get_time(city)，需要改动哪几处？主循环要改吗？",
    answer:
      "改三处：① 写出 get_time 函数；② 登记进工具表 TOOLS={...,\"get_time\":get_time}；③ 把它的 schema 追加进 TOOL_SCHEMAS。主循环（run_agent）和 run_tool_call 一行都不用改——它们都是按「表」通用处理的。这就是「定义清楚工具，循环自动会用」。",
    tags: ["应用", "加工具"],
  },
  {
    id: "agent-first-20",
    chapter: "agent-first-agent",
    level: 3,
    question:
      "run_tool_call 这个函数要做哪三步？请按顺序说出来。",
    answer:
      "① 解析「调哪个」：从 tool_call 读出 name；② 解析「传什么」：json.loads 出 arguments；③ 执行：TOOLS[name](**args) 真去跑那个函数。最后把结果包成一条 role=tool 的消息返回，准备回填。前两步是解析、第三步是执行——执行永远是我们的代码做的。",
    tags: ["应用", "工具调用解析"],
  },
  {
    id: "agent-first-21",
    chapter: "agent-first-agent",
    level: 3,
    question:
      "想让 agent 转满 max_steps 前的最后一圈「尽力作答」而非死板道歉，怎么改循环？",
    answer:
      "在最后一圈不再给它工具，逼它用已有上下文直接作答。做法：循环里用 is_last = step == max_steps-1 标记最后一圈，那一圈调 LLM 时不传 tools（如 call_llm(msgs, allow_tools=not is_last)）。没工具可调，模型必然产出文字答案，兜底回答就从「放弃」变成「尽力而为的真答案」。",
    tags: ["应用", "改循环"],
  },
  {
    id: "agent-first-22",
    chapter: "agent-first-agent",
    level: 3,
    question:
      "一个 agent 查到了天气，下一圈却又重复去查、转满步数才停。怎么排查根因？",
    answer:
      "最可能是「漏回填」：检查每圈执行完工具后有没有把结果 msgs.append 回上下文（包括把 reply 本身也 append 进去）。漏了，下一圈 call_llm(msgs) 看不到刚查的结果，就会重复同一步。补上回填即可。另一个相关坑是没设 max_steps 导致它根本停不下来，也一并确认。",
    tags: ["应用", "排错"],
  },
  {
    id: "agent-first-23",
    chapter: "agent-first-agent",
    level: 3,
    question:
      "为什么把 call_llm 换成另一个支持 function calling 的模型接口，agent 主逻辑几乎不用改？",
    answer:
      "因为最小 Agent 的主循环只依赖一个抽象：调 call_llm 拿到「reply（含可选的 tool_calls）」。只要新接口也按这个约定返回（产出工具调用意图 + 文字答案），run_agent / run_tool_call 里的解析、执行、回填、收尾逻辑全都通用。换模型只是换掉 call_llm 内部实现这一层。",
    tags: ["应用", "可移植"],
  },

  // —— Level 4 · 综合 ——
  {
    id: "agent-first-24",
    chapter: "agent-first-agent",
    level: 4,
    question:
      "把第一篇四章串起来：从「裸 LLM」到「能跑的最小 Agent」，一路补齐 / 拼起了什么？",
    answer:
      "第 1 章认清智能体 = LLM 大脑 + 指令/工具/记忆/循环四件外挂；第 2 章把检索/工具/记忆三路增强汇聚进一次调用，让单次调用有据可依；第 3 章让循环转多轮，ReAct 三段交替、结果逐轮喂回、加 max_steps 兜住终止；第 4 章把这些零件亲手拼成几十行能跑的代码——系统提示 + 工具表/schema + LLM 调用 + 带刹车的循环，前三章的概念全在这里落了地。",
    tags: ["综合", "串联"],
  },
  {
    id: "agent-first-25",
    chapter: "agent-first-agent",
    level: 4,
    question:
      "最小 Agent 同时漏掉「回填」和「max_steps」会怎样？这两个坑分别防的是什么？",
    answer:
      "会双重翻车：漏回填 → agent 失忆、每圈重复同一步原地打转；又漏 max_steps → 没有刹车，这种空转就会无限持续、永不返回、疯狂烧 token。回填防的是「往前走」（让下一圈看见结果），max_steps 防的是「停得下来」（兜住最坏情况）。两个坑常一起出现，必须都补——一个保证有进展，一个保证能终止。",
    tags: ["综合", "误区"],
  },
  {
    id: "agent-first-26",
    chapter: "agent-first-agent",
    level: 4,
    question:
      "有人说「agent 框架那么复杂，最小 Agent 这几十行肯定是玩具、没啥用」。怎么看？",
    answer:
      "这几十行不是玩具，而是一切复杂 agent 的内核：再大的框架，剥到底也是「系统提示 + 工具表 + 循环里调 LLM、解析执行工具、回填、判完成收尾」这套骨架。框架多出来的是工程化的壳——更稳的解析、并发工具、错误重试、记忆/检索、可观测性等。先把这个最小内核吃透，再看任何框架都能认出它的骨架，不会被复杂度吓住。",
    tags: ["综合", "认知"],
  },
];
