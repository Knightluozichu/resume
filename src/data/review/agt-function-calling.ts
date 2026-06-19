/** 复习题库 · 函数调用原理（agt-function-calling）。《从零构建 AI Agent》篇3·1·让智能体行动，A 概念型，覆盖 tool schema / 选工具 / 运行时 / tinyagent 工具注册。 */

import type { ReviewQuestion } from "./types";

export const agtFunctionCallingQuestions: ReviewQuestion[] = [
  // ── L1 认记：定义 / 术语 ──
  {
    id: "agt-fc-1",
    chapter: "agt-function-calling",
    level: 1,
    question: "本章里「工具」指什么？模型会亲自执行工具吗？",
    answer:
      "工具是被 Agent 暴露给模型的一段外部能力，比如查天气、搜网页、算表达式。模型不会亲自执行工具，它只会输出「要调哪个工具、传哪些参数」的结构化请求；真正执行发生在外部运行时。",
    tags: ["工具", "定义"],
  },
  {
    id: "agt-fc-2",
    chapter: "agt-function-calling",
    level: 1,
    question: "什么是函数调用？它和普通 Python 函数调用最大的区别是什么？",
    answer:
      "函数调用是模型用结构化格式写出「要调哪个工具、传哪些参数」的请求，外部程序读取请求后才真正执行对应函数。和普通 Python 调用不同，模型输出的只是请求文本/结构化对象，不是直接跳进函数体执行。",
    tags: ["函数调用", "边界"],
  },
  {
    id: "agt-fc-3",
    chapter: "agt-function-calling",
    level: 1,
    question: "tool schema 通常包含哪三块？",
    answer:
      "通常包含 `name`、`description`、`parameters` 三块。`name` 是工具名，模型在调用请求里写它；`description` 说明工具适合做什么，是模型选工具的关键；`parameters` 是参数表，告诉模型要填哪些参数、类型和必填信息。",
    tags: ["tool schema", "name", "description", "parameters"],
  },
  {
    id: "agt-fc-4",
    chapter: "agt-function-calling",
    level: 1,
    question: "工具注册表（registry）的职责是什么？",
    answer:
      '工具注册表保存「工具名 → Tool 对象/真实函数」的映射。模型请求 `calculator` 这种名字后，运行时从 `registry["calculator"]` 找到对应函数并执行。它把模型写出的文本名字和可执行代码接起来。',
    tags: ["registry", "工具注册表"],
  },
  {
    id: "agt-fc-5",
    chapter: "agt-function-calling",
    level: 1,
    question: "运行时在函数调用一回合里负责哪几件事？",
    answer:
      "运行时负责读取模型的调用请求、确认工具存在、校验/守门参数、从注册表找到函数、真正执行工具、捕获结果或错误，并把工具结果作为新消息回灌给模型。它是执行者和守门员。",
    tags: ["运行时", "执行"],
  },
  {
    id: "agt-fc-6",
    chapter: "agt-function-calling",
    level: 1,
    question: "tinyagent 里的 `@tool` 装饰器主要做什么？",
    answer:
      "`@tool` 主要负责登记：把普通 Python 函数包装/记录成一个 `Tool`，写入 `registry`，同时保留函数本身可正常调用。它不是让模型直接执行函数，而是让运行时未来能按名字找到这段函数。",
    tags: ["@tool", "tinyagent"],
  },

  // ── L2 理解：因果 / 辨析 ──
  {
    id: "agt-fc-7",
    chapter: "agt-function-calling",
    level: 2,
    question: "为什么说函数调用接在「结构化输出」之后？",
    answer:
      "因为模型必须先把「调哪个工具、传什么参数」输出成程序能解析的结构化请求；运行时才能读取 `name` 和 `arguments` 去查注册表、执行函数。结构化输出解决「请求能被程序读懂」，函数调用再把读懂的请求变成真实动作。",
    tags: ["结构化输出", "函数调用", "因果"],
  },
  {
    id: "agt-fc-8",
    chapter: "agt-function-calling",
    level: 2,
    question: "为什么 description 往往比函数名更影响模型选工具？",
    answer:
      "模型是拿用户任务和工具说明做语义匹配。函数名可能很短、缩写、甚至命名不直观；`description` 才清楚说明「这个工具何时该用、能返回什么、边界在哪」。description 含糊，模型就容易把天气、搜索、计算这类工具混起来。",
    tags: ["description", "选工具"],
  },
  {
    id: "agt-fc-9",
    chapter: "agt-function-calling",
    level: 2,
    question: "为什么 `Tool.schema()` 不应该把 `func` 也发给模型？",
    answer:
      "schema 是给模型看的说明书，只需要 `name`、`description`、`parameters`。`func` 是运行时持有的真实可执行函数，模型无法也不该持有函数指针。把两者分开，才能保持「模型出请求，运行时执行」的安全边界。",
    tags: ["Tool", "schema", "安全边界"],
  },
  {
    id: "agt-fc-10",
    chapter: "agt-function-calling",
    level: 2,
    question:
      '模型请求 `get_weather(city="上海")` 和最终回答「上海今天 26 度」之间还差哪些步骤？',
    answer:
      "还差运行时执行链路：运行时读取请求，查 `registry` 找到 `get_weather`，校验参数 `city`，真正执行天气函数/API，拿到结果，再把结果作为 tool 消息回灌给模型。模型读到工具结果后，才组织成最终自然语言答案。",
    tags: ["一回合", "运行时", "回灌"],
  },
  {
    id: "agt-fc-11",
    chapter: "agt-function-calling",
    level: 2,
    question: "为什么不能把所有内部函数都注册成工具？",
    answer:
      "注册进工具表就等于允许模型提出调用请求。内部函数可能包含删文件、发邮件、改数据库等危险能力；如果全部暴露，运行时守门压力会很大。正确做法是白名单注册，只暴露必要工具，并在执行前做权限、参数、超时和结果截断。",
    tags: ["安全", "白名单", "registry"],
  },

  // ── L3 应用：排错 / 设计 / 代码理解 ──
  {
    id: "agt-fc-12",
    chapter: "agt-function-calling",
    level: 3,
    question:
      "用户问「北京今天热不热」，工具有 `get_weather`、`search_web`、`calculator`。模型应该选哪个？参数大概是什么？",
    answer:
      '应该选 `get_weather`，因为任务问的是某城市当前天气，最贴合「查询某城市当前天气」这类 description。参数大概是 `{"city": "北京"}`，调用请求可表示为 `get_weather(city="北京")`。不应选 `calculator`，因为这不是计算题；一般也不必先泛搜网页。',
    tags: ["选工具", "应用"],
  },
  {
    id: "agt-fc-13",
    chapter: "agt-function-calling",
    level: 3,
    question:
      "模型请求 `calculator(expression=\"3 ** 17\")`，运行时报 `KeyError: 'calculator'`。最可能是哪层出问题？怎么查？",
    answer:
      '最可能是注册表层出问题：`calculator` 没有登记，或登记名和 schema/call 里的名字不一致。先查 `registry.keys()` 是否包含 `"calculator"`，再检查 `@tool(name="calculator", ...)` 和发给模型的 `Tool.schema()` 是否来自同一个工具定义。名字必须完全一致。',
    tags: ["排错", "registry", "KeyError"],
  },
  {
    id: "agt-fc-14",
    chapter: "agt-function-calling",
    level: 3,
    question:
      "设计一个 `send_email` 工具的 schema：至少写出 name、description 和 3 个参数，并指出运行时最该守哪一关。",
    answer:
      '示例：`name="send_email"`；`description="在用户明确确认后发送邮件给指定收件人"`；参数有 `to: string`、`subject: string`、`body: string`、`confirm: boolean`。运行时最该守 `to` 和 `confirm`：检查收件人是否允许、是否真的经过用户确认，不能让模型自己决定直接发送。',
    tags: ["schema 设计", "安全"],
  },
  {
    id: "agt-fc-15",
    chapter: "agt-function-calling",
    level: 3,
    question:
      "写 tinyagent 的 `Tool` 类时，为什么既要保存 `parameters`，又要保存 `func`？二者分别给谁用？",
    answer:
      "`parameters` 是 schema 的一部分，给模型看，让模型知道要填什么参数、类型是什么；`func` 是真实 Python 函数，给运行时执行。模型侧需要说明书，运行时侧需要可执行代码；`Tool` 同时保存二者，但 `schema()` 发给模型时只暴露说明书。",
    tags: ["Tool", "parameters", "func"],
  },
  {
    id: "agt-fc-16",
    chapter: "agt-function-calling",
    level: 3,
    question:
      "一个 `search_web` 的 description 写成「搜索」。为什么容易出问题？请改写得更适合模型选工具。",
    answer:
      "「搜索」太泛，模型无法判断它和查天气、查数据库、查文档的边界。可以改成：「联网搜索实时信息、最新新闻、公开网页内容；当问题依赖最新外部信息且本地工具无法直接返回结构化结果时使用。」这样写清楚使用场景、返回来源和边界。",
    tags: ["description", "改写", "选工具"],
  },

  // ── L4 综合：跨概念整合 / 反思 ──
  {
    id: "agt-fc-17",
    chapter: "agt-function-calling",
    level: 4,
    question:
      "把「用户问题 → 模型 → tool schema → registry → 工具结果 → 最终回答」串成一回合函数调用流程。",
    answer:
      "用户问题先进入模型；模型同时看到工具清单（tool schema），根据 description 选择工具，并按 parameters 填出结构化调用请求；运行时读取请求，用 `name` 去 `registry` 找到真实函数，校验参数后执行；工具结果被作为 tool 消息回灌给模型；模型基于这个真实结果组织最终自然语言回答。核心边界是：模型负责选择和填请求，运行时负责执行和守门。",
    tags: ["一回合流程", "综合"],
  },
  {
    id: "agt-fc-18",
    chapter: "agt-function-calling",
    level: 4,
    question:
      "有人说「函数调用就是让模型有了执行代码的能力」。请评价这句话，并给出更准确的说法。",
    answer:
      "这句话容易误导。函数调用不是让模型自己执行代码，而是让模型能用结构化方式请求外部运行时执行某个白名单工具。更准确的说法是：函数调用给模型一套「提出行动请求」的接口；真正执行、权限控制、错误处理和结果回灌都由运行时负责。",
    tags: ["边界", "反思", "运行时"],
  },
];
