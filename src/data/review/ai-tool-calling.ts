/** 复习题库 · 工具调用 Tool Calling（ai-tool-calling）。AI Agent 开发实战·原创改编核心机制篇第 2 章。 */

import type { ReviewQuestion } from "./types";

export const aiToolCallingQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ai-tool-calling-1",
    chapter: "ai-tool-calling",
    level: 1,
    question: "工具定义（JSON Schema）里有哪四个关键字段？各管什么？",
    answer:
      "四个字段：**`name`**（这工具叫啥，LLM 产出 tool_call 时填它，程序也靠它找函数）、**`description`**（什么时候该用它——模型判断何时调的唯一依据）、**`parameters`**（要传哪些参数、各是什么类型）、**`required`**（哪些参数必填）。这份 schema 就是给 LLM 的「工具说明书」。",
    tags: ["schema", "工具定义", "定义"],
  },
  {
    id: "ai-tool-calling-2",
    chapter: "ai-tool-calling",
    level: 1,
    question: "什么是结构化 tool_call？它里面装着什么？",
    answer:
      "结构化 tool_call 是 LLM 读懂工具 schema 后产出的**结构化调用**——不是自然语言，而是「要调的函数名（`name`）+ 一段 JSON 字符串形式的参数（`arguments`）」，还带一个 `id`（这次调用的唯一编号）。它只表示模型「**想**调这个工具、传这些参数」，工具本身**还没被执行**。",
    tags: ["tool_call", "定义"],
  },
  {
    id: "ai-tool-calling-3",
    chapter: "ai-tool-calling",
    level: 1,
    question:
      "工具定义 schema 里的 `description` 字段为什么最关键？写不好会怎样？",
    answer:
      "因为 `description` 是模型判断「**要不要调、什么时候调**」的**唯一依据**——它不是给人看的注释，而是模型读的「触发说明」。写清场景（「用户问天气/带伞时调用」），模型该调时才会调；写得含糊或不写，模型就会**漏调或错调**（该调不调、或调错工具/传错参数）。",
    tags: ["description", "schema", "定义"],
  },
  {
    id: "ai-tool-calling-4",
    chapter: "ai-tool-calling",
    level: 1,
    question:
      "结果回填用的「tool 消息」长什么样？它的 `role`、`content`、`tool_call_id` 各是什么？",
    answer:
      "tool 消息是把工具执行结果递回给模型的那条对话消息：**`role` 是 `tool`**（不是 user/assistant）、**`content`** 是工具返回值（成功填结果、失败填错误）、**`tool_call_id`** 对应是哪一次调用（和 tool_call 的 `id` 一致）。模型读到它就「看见」了这次调用的结果。",
    tags: ["回填", "tool消息", "定义"],
  },
  {
    id: "ai-tool-calling-5",
    chapter: "ai-tool-calling",
    level: 1,
    question:
      "「解析与执行」这一步，程序具体做了哪两件事？是模型做的还是你的代码做的？",
    answer:
      "**你的代码**做两件事：① **解析**——把 `tool_call` 里 `arguments` 那段 JSON 字符串用 `json.loads` 变成参数字典；② **执行**——按 `name` 字符串从「名字→函数」表里找到真实函数，`func(**args)` 真把它跑一遍拿返回值。这两步都是你的代码做的，**不是模型做的**。",
    tags: ["解析", "执行", "定义"],
  },
  {
    id: "ai-tool-calling-6",
    chapter: "ai-tool-calling",
    level: 1,
    question:
      "本章承接上一章 ReAct：ReAct 的 Action / Observation，对应到本章的什么？",
    answer:
      '对应工具调用的工程实现。ReAct 里 LLM 写出的 **Action**（如 `weather("上海")`）就是本章的**结构化 tool_call**（产出调用）；ReAct 里系统填回的 **Observation** 就是本章的**结果回填（tool 消息）**。本章把上一章「调工具、把结果填回」这件事，落到了真实的 schema + 解析 + 执行 + 回填代码上。',
    tags: ["ReAct", "承接", "理解"],
  },
  // ── L2 理解：分辨 / 解释为什么 ──
  {
    id: "ai-tool-calling-7",
    chapter: "ai-tool-calling",
    level: 2,
    question:
      "模型回了一个 tool_call，是不是说明它已经把工具执行完、结果算出来了？",
    answer:
      "**不是。** 模型产出 tool_call 只是「**写出要调啥、传啥**」——相当于写下一条「拨号指令」，电话还没拨。tool_call 里只有「要调的函数名 + 参数」，**没有任何执行结果**。真去执行（拨电话、拿回话）是**你的代码**的事：解析 arguments、按 name 找函数、`func(**args)` 跑一遍。这是本章最重要的红线：LLM 只产出调用，执行始终是你的代码。",
    tags: ["tool_call", "执行", "红线", "理解"],
  },
  {
    id: "ai-tool-calling-8",
    chapter: "ai-tool-calling",
    level: 2,
    question:
      "一整轮工具调用按顺序有哪几个阶段？哪些是「LLM 侧」、哪些是「程序侧」？",
    answer:
      "六个阶段：① 定义 schema（**程序侧**）→ ② LLM 产出 tool_call（**LLM 侧**）→ ③ 解析+按名找函数（**程序侧**）→ ④ 真去执行（**程序侧**）→ ⑤ 结果回填（**程序侧**）→ ⑥ LLM 续答/或再调（**LLM 侧**）。一眼记住：LLM 只负责②产出调用、⑥续答；①③④⑤的定义、解析、执行、回填全是你的程序在做。",
    tags: ["数据流", "六阶段", "理解"],
  },
  {
    id: "ai-tool-calling-9",
    chapter: "ai-tool-calling",
    level: 2,
    question:
      "工具执行出错（参数非法、网络超时）时，为什么不能把异常吞掉、什么都不回填？",
    answer:
      "因为模型靠回填的 tool 消息才能「看见」这次调用发生了什么。如果失败时什么都不回填，模型这一轮**既没拿到结果、也没拿到错误**——处在「产出了 tool_call 却没有对应 tool 结果」的悬空状态，它不知道成功还是失败，会**原地卡死**、傻等一个永远不来的结果。正确做法：用 try/except 兜住，把**错误信息也回填**成一条 tool 消息，模型看到错误才能自纠（改参重试或降级）。",
    tags: ["错误处理", "回填", "为什么"],
  },
  {
    id: "ai-tool-calling-10",
    chapter: "ai-tool-calling",
    level: 2,
    question:
      "schema 里的 `name` 字符串和真实 Python 函数之间是怎么对上的？是自动的吗？",
    answer:
      '**不是自动的。** schema 的 `name` 只是个字符串，和真实函数之间没有内建关联——是你手动维护一张「名字 → 函数」的表/字典（如 `TOOLS = {"get_weather": get_weather}`）把它们对起来。解析 tool_call 时，按 `name` 从这张表里取出函数再执行。所以 `name` 要唯一、稳定；改了 schema 的 `name`，就得同步改这张表，否则按名找不到函数。',
    tags: ["name", "dispatch", "理解"],
  },
  {
    id: "ai-tool-calling-11",
    chapter: "ai-tool-calling",
    level: 2,
    question:
      "调模型时 `tools` 参数是干嘛的？拿回来的 `tool_calls` 为什么是个列表？",
    answer:
      "`tools` 参数是把工具的 schema 列表一起发给模型，模型才知道**有哪些工具可用**、各怎么用——没传 tools，模型不会产出 tool_call。拿回的 `message.tool_calls` 是**列表**，因为模型一次可能想调**好几个**工具（比如同时查天气和查航班）。所以要遍历这个列表，对每个 tool_call 都解析、执行、并回填一条对应的 tool 消息。",
    tags: ["tools参数", "tool_calls", "理解"],
  },
  {
    id: "ai-tool-calling-12",
    chapter: "ai-tool-calling",
    level: 2,
    question: "为什么 `arguments` 拿到手不能直接用，要先 `json.loads`？",
    answer:
      "因为 `tool_call.function.arguments` 是**一段 JSON 字符串**（文本），不是 Python 字典——直接 `func(arguments)` 会把整个字符串当一个参数传错。必须先 `json.loads(arguments)` 把它解析成参数字典，再 `func(**args)` 展开成关键字参数传进去。而且模型偶尔可能产出**非法 JSON**，所以 `json.loads` 本身也该 `try/except` 兜底。",
    tags: ["arguments", "json.loads", "理解"],
  },
  {
    id: "ai-tool-calling-13",
    chapter: "ai-tool-calling",
    level: 2,
    question: "什么叫工具调用的「多轮」？什么时候会发生？",
    answer:
      "多轮指：你回填工具结果后再调一次模型，模型这一轮回复里**又**带了 tool_calls（它想再调一个工具）——于是你又要解析、执行、回填，再调模型……如此往复，直到模型不再要调工具、给出纯文本答案为止。常见于「需要连续调好几个工具才能办成」的任务。代码上把「解析-执行-回填-再调」包进一个 `while` 循环，直到没有 tool_calls 就退出。",
    tags: ["多轮", "while循环", "理解"],
  },
  // ── L3 应用：判断 / 套用到场景 / 写代码 ──
  {
    id: "ai-tool-calling-14",
    chapter: "ai-tool-calling",
    level: 3,
    question:
      '下面这段回填代码有什么问题？`messages.append({"role": "tool", "content": result})` —— 它漏了什么？会导致什么后果？',
    answer:
      '漏了 **`tool_call_id`**。回填的 tool 消息必须带上对应的 `tool_call_id`（= 那个 tool_call 的 `id`），模型才能把「这条结果」和「哪一次调用」对应起来。漏了它，尤其当一次产出多个 tool_call 时，模型分不清哪个结果对应哪个调用，会困惑甚至报错。修法：`{"role": "tool", "tool_call_id": call.id, "content": result}`，并且为**每一个** tool_call 都回填一条。',
    tags: ["tool_call_id", "回填", "调试", "应用"],
  },
  {
    id: "ai-tool-calling-15",
    chapter: "ai-tool-calling",
    level: 3,
    question:
      "你要给 Agent 加一个「查股价」工具 `get_stock_price(symbol)`。请说出 schema 的 `name`、`description`、`parameters`、`required` 各该怎么写，以及 TOOLS 表怎么对应。",
    answer:
      '**`name`**: `"get_stock_price"`（和真实函数名能对上）。**`description`**: 写清触发场景，如「查询某股票的当前价格。用户问到股价/某公司股票多少钱时调用」。**`parameters`**: `type: object`，`properties` 里 `symbol` 是 `{type: string, description: "股票代码，如 AAPL"}`。**`required`**: `["symbol"]`。**TOOLS 表**: `{"get_stock_price": get_stock_price}`，让 schema 的 name 字符串能按名找到真实函数。',
    tags: ["独立实现", "schema", "应用"],
  },
  {
    id: "ai-tool-calling-16",
    chapter: "ai-tool-calling",
    level: 3,
    question:
      "用户问「苹果现在股价多少」，模型产出了 tool_call(get_stock_price, arguments 是 symbol=AAPL)。请按顺序说清接下来你的代码要做的每一步，直到模型给出最终答案。",
    answer:
      "① 把模型这条带 tool_calls 的回复 append 进 messages；② 遍历 tool_calls，对这个调用：`json.loads` 解析出 `{symbol: 'AAPL'}`；③ 按 name `get_stock_price` 从 TOOLS 表取出函数，`func(symbol='AAPL')` 真去执行拿到结果（如 `$195.3`）；④ 把结果作为 `{role: tool, tool_call_id: call.id, content: '$195.3'}` append 回 messages；⑤ 再调一次 `create(messages=messages)`，模型读到结果给出最终答案「苹果（AAPL）现在 $195.3」。（出错则在③用 try/except，把错误也回填。）",
    tags: ["完整一轮", "流程", "应用"],
  },
  {
    id: "ai-tool-calling-17",
    chapter: "ai-tool-calling",
    level: 3,
    question:
      "一个 Agent 调天气工具时，模型传了 `arguments` 是 city 为空字符串，导致工具抛异常。你的代码 `try/except` 兜住了、打了日志，但没回填任何消息。模型卡住不动了。问题在哪？怎么修？",
    answer:
      '问题：**捕获了异常却没回填**——模型这一轮拿不到结果也拿不到错误，处在「产出了 tool_call 但没有对应 tool 结果」的悬空态，只能干等，于是卡死。修法：在 `except` 分支里把**错误信息**也回填成一条 tool 消息（带 tool_call_id），如 `content = f"调用 get_weather 出错：city 不能为空"`。模型下一轮看到这条错误，就能自纠——改参数（补上城市）重试，或换路降级。成功填结果、失败填错误，**两种都必须回填**。',
    tags: ["错误处理", "调试", "应用"],
  },
  // ── L4 综合：贯通多个概念 ──
  {
    id: "ai-tool-calling-18",
    chapter: "ai-tool-calling",
    level: 4,
    question:
      "把本章串起来：从一个需要查天气的问题出发，完整讲清一轮工具调用怎么走、每个阶段谁干的、关键红线是什么、出错怎么办，并说清它和上一章 ReAct 的关系。",
    answer:
      "以「上海今天要不要带伞」为例走一轮：① **定义 schema**（程序侧）——给模型一份 weather 工具说明书，写清 name=get_weather、description「问天气/带伞时调用」、parameters 含 city、required=[city]；② 调模型并传 `tools`，模型产出 **结构化 tool_call**（LLM 侧）——函数名 get_weather、arguments 是 city=上海，注意它只是「想调」、**还没执行**；③ **解析+按名找函数**（程序侧）——`json.loads` 解析 arguments，按 name 从 TOOLS 表取出真实函数；④ **真去执行**（程序侧）——`func(city='上海')` 跑一遍拿到「小雨 18℃」；⑤ **结果回填**（程序侧）——作为 `{role:tool, tool_call_id, content}` 消息 append 回对话；⑥ 再调模型，它**续答**（LLM 侧）给最终答案「记得带伞」，若又带 tool_calls 就再转一轮（**多轮**）。关键**红线**：LLM 只产出调用，执行始终是你的代码（②是 LLM 写的指令，③④才是真执行）。**出错**时（参数非法/超时）用 try/except 兜住、把**错误也回填**，让模型自纠重试或降级——绝不能吞掉异常，否则模型卡死。和 **ReAct** 的关系：ReAct 的 Action 就是本章的 tool_call、ReAct 的 Observation 就是本章的结果回填——本章是把上一章「调工具、把结果填回」落到 schema+解析+执行+回填的工程实现。",
    tags: ["综合", "完整一轮", "ReAct", "承接"],
  },
];
