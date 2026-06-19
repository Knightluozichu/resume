/** 复习题库 · 工具设计与安全执行（agt-tool-design）。《从零构建 AI Agent》篇3·3·让智能体行动，C 实战型，覆盖工具设计、参数校验、结构化返回、错误回灌、沙箱与权限边界。 */

import type { ReviewQuestion } from "./types";

export const agtToolDesignQuestions: ReviewQuestion[] = [
  {
    id: "agt-td-1",
    chapter: "agt-tool-design",
    level: 1,
    question: "好工具设计最少要把哪三类信息写清楚？",
    answer:
      "至少要写清工具名、description 和参数表。工具名让模型知道调用时写哪个名字；description 帮模型判断何时该用；参数表说明必须传什么、类型是什么、范围边界在哪里。",
    tags: ["工具设计", "schema"],
  },
  {
    id: "agt-td-2",
    chapter: "agt-tool-design",
    level: 1,
    question: "为什么 description 不能只写“执行任务”这类泛泛说明？",
    answer:
      "模型主要靠 description 把用户任务和工具能力做语义匹配。说明太泛会让模型选错工具，也看不出何时不该用。好的 description 应写出适用场景、能力边界和必要限制。",
    tags: ["description", "选工具"],
  },
  {
    id: "agt-td-3",
    chapter: "agt-tool-design",
    level: 1,
    question: "参数校验通常要检查哪些基础项？",
    answer:
      "通常要检查必填字段是否存在、类型是否正确、数值或字符串是否在允许范围内，以及枚举值是否属于白名单。校验失败时不应该执行真实工具。",
    tags: ["参数校验"],
  },
  {
    id: "agt-td-4",
    chapter: "agt-tool-design",
    level: 1,
    question: "Tool.invoke() 为什么要返回结构化结果，而不是随便返回字符串？",
    answer:
      "结构化结果能稳定表达成功或失败，例如 `{ok, value, error}`。这样 Agent.run 不用猜字符串含义，ReAct 下一轮也能读到明确的错误 code 和 message，便于修正。",
    tags: ["结构化返回", "Tool.invoke"],
  },
  {
    id: "agt-td-5",
    chapter: "agt-tool-design",
    level: 1,
    question: "沙箱与权限边界要解决什么问题？",
    answer:
      "它们限制工具能碰到的真实世界范围：哪些路径能读写、哪些网络域名能访问、是否允许发送邮件或执行命令、超时时间是多少。模型可以请求行动，但运行时必须守门。",
    tags: ["沙箱", "权限"],
  },
  {
    id: "agt-td-6",
    chapter: "agt-tool-design",
    level: 2,
    question: "为什么“工具粒度”太粗会增加风险？",
    answer:
      "粒度太粗的工具像 `do_anything(payload)`，模型要自己在一坨文本里表达意图，运行时也难以校验和限权。拆成更小、更明确的工具后，每个工具的参数、权限和错误都更容易控制。",
    tags: ["工具粒度", "安全"],
  },
  {
    id: "agt-td-7",
    chapter: "agt-tool-design",
    level: 2,
    question: "参数校验失败时，为什么要把错误回灌成 Observation？",
    answer:
      "校验失败也是外部事实。把错误作为 Observation 回灌，模型下一轮可以补缺失参数、缩小范围或向用户澄清；如果直接崩掉，ReAct 循环就失去自我修复机会。",
    tags: ["错误回灌", "Observation"],
  },
  {
    id: "agt-td-8",
    chapter: "agt-tool-design",
    level: 2,
    question: "为什么捕获异常不等于吞掉异常？",
    answer:
      "捕获异常的目标不是假装没事，而是把异常转换成可读、可追踪的结构化错误，例如 `TOOL_ERROR` 加 message。这样主循环不中断，同时日志和 Observation 都能保留失败原因。",
    tags: ["异常处理", "结构化错误"],
  },
  {
    id: "agt-td-9",
    chapter: "agt-tool-design",
    level: 2,
    question: "工具权限应该默认宽还是默认窄？为什么？",
    answer:
      "应该默认窄。模型输出不是可信代码，权限越宽，误调或提示注入造成的损害越大。默认只读、白名单路径、危险操作二次确认，是更稳的安全基线。",
    tags: ["权限边界", "最小权限"],
  },
  {
    id: "agt-td-10",
    chapter: "agt-tool-design",
    level: 2,
    question: "为什么不要把所有内部函数都注册成工具？",
    answer:
      "注册成工具就等于模型可以提出调用请求。内部函数可能没有面向模型设计的参数校验、权限边界和错误语义，全部暴露会扩大攻击面，也会让模型在过多相似工具里选错。",
    tags: ["工具注册表", "暴露面"],
  },
  {
    id: "agt-td-11",
    chapter: "agt-tool-design",
    level: 3,
    question: "设计一个 `read_note` 工具时，如何把路径参数设计得更安全？",
    answer:
      "参数可以用 `path: string`，但运行时必须限制它只能落在允许目录内，例如 `notes/`；拒绝 `..`、绝对路径和软链接越权；最好再加 `max_chars` 上限，避免把超长文件塞进上下文。",
    tags: ["参数设计", "路径安全"],
  },
  {
    id: "agt-td-12",
    chapter: "agt-tool-design",
    level: 3,
    question:
      '模型调用 `search_docs({query:"", limit:10000})`，Tool.invoke() 应该怎样处理？',
    answer:
      '应该在校验阶段拒绝：`query` 为空，`limit` 超过上限。返回类似 `{ok:false, error:{code:"VALIDATION_ERROR", message:"query 不能为空，limit 必须在 1..20"}}`，不要真正发起搜索。',
    tags: ["参数校验", "Tool.invoke"],
  },
  {
    id: "agt-td-13",
    chapter: "agt-tool-design",
    level: 3,
    question: "`send_email` 工具最少应该有哪些安全边界？",
    answer:
      "至少要校验收件人地址、主题和正文长度；限制允许的收件人域或联系人白名单；要求用户显式确认；记录审计日志；发送失败时返回结构化错误。模型不应凭自己判断直接发送。",
    tags: ["副作用工具", "权限"],
  },
  {
    id: "agt-td-14",
    chapter: "agt-tool-design",
    level: 3,
    question:
      "工具函数内部抛出 `TimeoutError`，更稳的 Observation 应该包含什么？",
    answer:
      '应该包含明确 code、可给模型读的 message 和必要的可重试提示，例如 `{ok:false, error:{code:"TIMEOUT", message:"搜索服务超时，请缩小查询或稍后重试"}}`。不要把完整堆栈直接塞给模型。',
    tags: ["超时", "错误回灌"],
  },
  {
    id: "agt-td-15",
    chapter: "agt-tool-design",
    level: 3,
    question:
      "如果模型总把 `search_web` 当成 `read_file` 用，优先检查哪两处设计？",
    answer:
      "先检查两个工具的 description 是否边界清楚，是否写了何时不用；再检查参数名是否诱导混淆。必要时把 `search_web` 写成“只联网搜索公开网页，不读取本地文件”，把 `read_file` 写明白名单路径和只读范围。",
    tags: ["工具选择", "description"],
  },
  {
    id: "agt-td-16",
    chapter: "agt-tool-design",
    level: 4,
    question:
      "请串起一次安全 Tool.invoke() 的完整流程，从模型 Action 到 ReAct 下一轮。",
    answer:
      "模型先输出 Action，运行时查 registry 找到工具；Tool.invoke() 校验参数，失败就返回结构化错误；校验通过后在沙箱和权限边界内 try 执行；异常被捕获并包装；成功或失败都变成 `{ok,value,error}`，再作为 Observation 追加进 messages，供下一轮 Thought 修正或继续。",
    tags: ["综合流程", "Tool.invoke"],
  },
  {
    id: "agt-td-17",
    chapter: "agt-tool-design",
    level: 4,
    question: "有人说“模型已经很聪明，工具参数不需要校验”。这句话哪里危险？",
    answer:
      "危险在于把模型输出当可信输入。模型可能漏参数、填错类型、被提示注入诱导、或误解范围。参数校验是运行时边界，不是智力测试；越聪明的模型越能提出复杂请求，更需要确定性的校验和权限控制。",
    tags: ["安全边界", "反思"],
  },
  {
    id: "agt-td-18",
    chapter: "agt-tool-design",
    level: 4,
    question: "如何评价一个工具是“太粗”还是“太细”？给出判断标准。",
    answer:
      "看它是否能被一句清晰 description 解释、参数是否能稳定校验、权限是否能单独收窄、错误是否有明确语义。如果一个工具需要塞很多互斥动作进 payload，就是太粗；如果多个工具总是必须连着调且权限和参数完全相同，可能太细。",
    tags: ["工具粒度", "设计判断"],
  },
];
