/** 复习题库 · Function Calling 原理（agent-function-calling）。《AI 智能体应用开发》第 8 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentFunctionCallingQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-fc-1",
    chapter: "agent-function-calling",
    level: 1,
    question: "「Function Calling」指的是什么能力？",
    answer:
      "Function Calling 是让模型在回答里「提议调用某个外部工具/函数」的能力：你把工具的定义喂给模型，它能据此判断该不该调、调哪个、传什么参数，并以结构化形式把这个调用意图给出来。注意它产出的是意图，真正执行函数的是你的程序。",
    tags: ["function-calling", "基础"],
  },
  {
    id: "agent-fc-2",
    chapter: "agent-function-calling",
    level: 1,
    question: "工具是怎么进入模型「视野」的？",
    answer:
      "把每个工具的 schema——名字、参数、一句 description——序列化成文本，注入到这一轮发给模型的上下文里。模型不是「内置」了这些工具，而是像看菜单一样在上下文里「看见」有哪些工具可用。这一步叫工具 schema 注入。",
    tags: ["工具 schema 注入", "基础"],
  },
  {
    id: "agent-fc-3",
    chapter: "agent-function-calling",
    level: 1,
    question: "什么是「工具选择（tool selection）」？",
    answer:
      "工具选择是模型在「读懂用户意图」之后，从注入上下文的那份工具菜单里挑出最该调用的那个（或判定都不合适、不调）的过程。它靠的是拿用户意图去逐个比对各工具的 description。",
    tags: ["工具选择", "tool-selection", "基础"],
  },
  {
    id: "agent-fc-4",
    chapter: "agent-function-calling",
    level: 1,
    question: "工具定义里的 description 是给谁看的、起什么作用？",
    answer:
      "description 是给模型看的：它是模型判断「这个工具是干嘛的、该不该用」的主要依据。模型挑工具时拿用户意图去对每个工具的 description，描述写得越清楚、越贴近真实用途，模型挑得越准。",
    tags: ["description", "工具选择"],
  },
  {
    id: "agent-fc-5",
    chapter: "agent-function-calling",
    level: 1,
    question: "什么是「并行工具调用」？",
    answer:
      "并行工具调用指模型在一轮里一次性提议多个彼此独立、互不依赖的调用（比如同时查订单又查天气），它们可以同时发出、一起拿回结果，省时间。",
    tags: ["并行工具调用", "parallel-tool-calls", "基础"],
  },
  {
    id: "agent-fc-6",
    chapter: "agent-function-calling",
    level: 1,
    question: "什么是「串行工具调用」？",
    answer:
      "串行工具调用指后一个调用要用到前一个调用的结果，只能排队：先调 A 拿到结果，再把结果当输入去调 B。调用之间存在数据依赖时只能串行。",
    tags: ["串行工具调用", "sequential-tool-calls", "基础"],
  },
  {
    id: "agent-fc-7",
    chapter: "agent-function-calling",
    level: 1,
    question: "「模型只提议、不执行」是什么意思？",
    answer:
      "模型做 Function Calling 时，只产出「想调哪个函数、传什么参数」的调用意图，它本身从不真正运行那个函数。真正去执行函数、拿到结果的，永远是你的应用程序代码。",
    tags: ["只提议不执行", "基础"],
  },

  // —— Level 2 · 理解（为什么/区分）——
  {
    id: "agent-fc-8",
    chapter: "agent-function-calling",
    level: 2,
    question:
      "为什么说「工具不是装进模型里的」？这对写工具有什么提示？",
    answer:
      "因为模型看到工具的唯一途径是上下文里那份被序列化注入的 schema 文本——它并没有「内置」你的函数，只是读到了对工具的文字描述。提示：模型对工具的全部认知就来自 name + 参数 + description 这几行字，所以这几行必须写清楚、写准确，模型才可能用对。",
    tags: ["工具 schema 注入", "理解"],
  },
  {
    id: "agent-fc-9",
    chapter: "agent-function-calling",
    level: 2,
    question:
      "模型挑工具靠的是名字还是 description？两者各起什么作用？",
    answer:
      "主要靠 description。name 像菜单上的菜名，给模型一个对号的标签；而 description 那句话才说清「这个工具到底干嘛、什么时候该用」，是模型拿用户意图去比对、判断匹配度的关键依据。光有好名字、描述含糊，模型仍可能挑错。",
    tags: ["description", "工具选择", "理解"],
  },
  {
    id: "agent-fc-10",
    chapter: "agent-function-calling",
    level: 2,
    question:
      "决定两个调用能并行还是只能串行的，是什么？",
    answer:
      "是调用之间有没有「数据依赖」。彼此独立、谁也不需要谁的结果 → 可以并行，一次性发出省时间；后一个的参数要用到前一个的输出 → 只能串行，先拿到前者结果再调后者。",
    tags: ["并行工具调用", "串行工具调用", "理解"],
  },
  {
    id: "agent-fc-11",
    chapter: "agent-function-calling",
    level: 2,
    question:
      "用户问了一个跟所有工具都不沾边的问题，模型会怎么做？",
    answer:
      "模型逐个比对后发现没有工具的 description 贴合这个意图，就不调用任何工具，直接用文字回答。「有工具」不等于「必然要调工具」——不匹配时直接答是正常且应当被代码兜住的分支。",
    tags: ["工具选择", "不调工具", "理解"],
  },
  {
    id: "agent-fc-12",
    chapter: "agent-function-calling",
    level: 2,
    question:
      "本章讲的 Function Calling 原理，和上一章「工具调用协议」讲的是不是同一件事？",
    answer:
      "不是同一层。上一章讲的是「线路协议」——assistant 用 tool_calls 表意图、app 执行后用 role:tool + tool_call_id 回填、再请求才得终答，关注消息怎么来回走。本章讲的是「模型侧」——工具 schema 怎么进入模型视野、模型怎么拿意图比对 description 挑中一个、并行还是串行。一个讲消息格式，一个讲决策机制。",
    tags: ["与工具调用协议的区别", "理解"],
  },
  {
    id: "agent-fc-13",
    chapter: "agent-function-calling",
    level: 2,
    question: "「模型像看菜单一样看工具」这个类比想强调什么？",
    answer:
      "强调两点：一是模型看到的工具就是一份列表（菜单），每项配一句「干嘛的」（description）；二是它照活儿在菜单里挑趁手的，挑得准不准，全看那句描述写得清不清。菜单项含糊或重叠，模型就容易点错菜。",
    tags: ["工具菜单", "类比", "理解"],
  },
  {
    id: "agent-fc-14",
    chapter: "agent-function-calling",
    level: 2,
    question:
      "为什么强调「模型只提议、不执行」很重要，而不是抠字眼？",
    answer:
      "因为它划清了职责边界：模型给的是「想调 check_order(order_id=…)」这样的意图，真正去跑函数、访问数据库或网络、拿回结果的是你的代码。理解这点你才知道——参数校验、权限、错误处理、超时这些都得在你的执行层做，模型不会替你把关。",
    tags: ["只提议不执行", "职责边界", "理解"],
  },

  // —— Level 3 · 应用（给场景判断/操作）——
  {
    id: "agent-fc-15",
    chapter: "agent-function-calling",
    level: 3,
    question:
      "用户说「帮我查下北京今天天气，再看看我那笔订单 A123 到哪了」。模型应该并行还是串行调用？为什么？",
    answer:
      "应该并行。查天气（get_weather）和查订单（check_order）是两件互不依赖的事——查天气不需要订单结果，查订单也不需要天气结果。模型可以一轮里同时提议这两个调用，一起拿回结果，比排队串行更省时间。",
    tags: ["并行工具调用", "场景判断", "应用"],
  },
  {
    id: "agent-fc-16",
    chapter: "agent-function-calling",
    level: 3,
    question:
      "用户说「我刚下的单还能退吗」，菜单里有 check_order（查订单状态）、search_docs（搜帮助文档/政策）、get_weather（查天气）。模型会调哪个（或不调）？为什么？",
    answer:
      "最可能调 check_order——它的 description「查订单状态：到货/退货」最贴「我的单能不能退」这个意图。get_weather 显然不沾边会被压低，search_docs（查政策）相关但更偏「政策条文」而非「我这单的具体状态」。模型挑工具靠的就是拿意图逐个比对 description、选最贴的那个。",
    tags: ["工具选择", "场景判断", "应用"],
  },
  {
    id: "agent-fc-17",
    chapter: "agent-function-calling",
    level: 3,
    question:
      "你发现模型老是该调 check_order 时却挑了 search_docs。先怀疑哪里、怎么改？",
    answer:
      "先怀疑两个工具的 description 写得太像、边界不清，模型分不开。改法：把各自的 description 改得职责互斥、给出明确触发场景——比如 check_order 写「查某一笔具体订单的实时状态（到货/退货资格）」、search_docs 写「搜通用帮助/政策条文，不针对具体订单」。描述清晰了，匹配才不乱。",
    tags: ["description", "工具选择", "调优", "应用"],
  },
  {
    id: "agent-fc-18",
    chapter: "agent-function-calling",
    level: 3,
    question:
      "用户说「先查下退货政策，再按政策看我这单 A123 还在不在可退期内」。这能并行吗？",
    answer:
      "不能并行，只能串行。第二步「看这单在不在可退期内」要用到第一步查到的政策（比如几天内可退）才能判断——后者吃前者的输出，存在数据依赖，必须先 search_docs 拿到政策、再 check_order 据此判断，排成一条链。",
    tags: ["串行工具调用", "数据依赖", "场景判断", "应用"],
  },
  {
    id: "agent-fc-19",
    chapter: "agent-function-calling",
    level: 3,
    question:
      "你给 agent 配了 40 个工具，结果它经常挑错或漏挑。从「模型怎么挑工具」的角度，问题出在哪、怎么缓解？",
    answer:
      "工具太多 = 菜单太长，模型要在一大堆 description 里比对，容易挑花眼、挑错或漏掉。缓解：精简工具数量、按场景只注入当下相关的子集；合并职责重叠的工具；把每个工具的 description 写得更可区分。本质是减少模型在「比对 description」这一步的干扰项。",
    tags: ["工具过多", "工具选择", "调优", "应用"],
  },
  {
    id: "agent-fc-20",
    chapter: "agent-function-calling",
    level: 3,
    question:
      "你只看 description 不够放心，担心模型挑错或参数填歪。代码层面应该怎么兜底？",
    answer:
      "因为模型只提议、不执行，所以执行层必须自己把关：拿到调用意图后，先校验它挑的工具名是否在白名单、参数是否合法（类型/必填/取值范围），再去真执行；执行失败要捕获错误并能反馈回模型重试。别把「模型提议了」当成「一定对」。",
    tags: ["只提议不执行", "参数校验", "兜底", "应用"],
  },

  // —— Level 4 · 综合（辨析/设计）——
  {
    id: "agent-fc-21",
    chapter: "agent-function-calling",
    level: 4,
    question:
      "有人说「模型挑不挑工具是个玄学，碰运气」。结合本章原理反驳他。",
    answer:
      "不是玄学，是有机制的：模型把上下文里注入的工具 schema 当菜单，读懂用户意图后拿意图逐个比对每个工具的 description，选匹配度最高的（都不匹配就不调）。所以挑得准不准，很大程度由你能控制的东西决定——description 写得清不清、工具数量是否精简、职责是否互斥。把这几样做好，挑选行为就稳定可预期，而不是碰运气。",
    tags: ["工具选择", "辨析", "综合"],
  },
  {
    id: "agent-fc-22",
    chapter: "agent-function-calling",
    level: 4,
    question:
      "两个工具的 description 写得几乎一样（都像「查订单相关信息」），模型会怎样？这暴露了什么设计问题？",
    answer:
      "模型比对时两者匹配度难分高下，会随机挑、来回挑或挑错——因为它区分工具的唯一抓手（description）失效了。这暴露的是工具设计问题：职责重叠、边界不清。应该要么合并成一个工具，要么把两者的 description 改成明确互斥、各自写清独有的触发场景，让模型有据可分。",
    tags: ["description", "描述重叠", "设计", "综合"],
  },
  {
    id: "agent-fc-23",
    chapter: "agent-function-calling",
    level: 4,
    question:
      "请把「一次 Function Calling 从请求到产出调用意图」的模型侧全过程串成一条链。",
    answer:
      "①请求带着用户意图 + 注入的工具菜单（N 个工具）进入模型视野 → ②模型读懂用户到底想要什么 → ③拿这份意图逐个比对每个工具的 description，估匹配度 → ④挑中最贴的那个工具（若都不贴 → 不调、直接用文字答）→ ⑤产出结构化的调用意图（调哪个函数、传什么参数）。全程模型只「提议」，执行交给 app。",
    tags: ["决策全过程", "综合"],
  },
  {
    id: "agent-fc-24",
    chapter: "agent-function-calling",
    level: 4,
    question:
      "你要给一个旅行助手设计工具集，使模型既能挑得准、又能在合适时并行。从本章原理出发，给三条设计准则。",
    answer:
      "①每个工具写一句清晰、可区分、含触发场景的 description，避免职责重叠（保证模型挑得准）；②工具数量精简、必要时按场景只注入相关子集，减少比对时的干扰项；③把彼此独立的能力拆成独立工具（如查机票、查天气、查酒店各一个），让模型能在一轮里并行提议互不依赖的调用，而把有数据依赖的步骤留给串行。再加一条兜底：执行层校验工具名与参数，因为模型只提议不执行。",
    tags: ["工具集设计", "并行工具调用", "description", "综合"],
  },
];
