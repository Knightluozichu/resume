/** 复习题库 · 结构化输出与工具调用协议（agent-structured-output）。《AI 智能体应用开发》第 7 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentStructuredOutputQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-so-1",
    chapter: "agent-structured-output",
    level: 1,
    question: "「结构化输出」指的是什么？为什么 agent 需要它？",
    answer:
      "结构化输出指让模型吐出机器能直接解析的结果（通常是符合固定形状的 JSON），而不是一段自由文本。agent 的下游全是程序在消费输出，结构化结果能被 `json.loads` 直接解析、按字段名取值，比靠正则去抠自由文本可靠得多。",
    tags: ["结构化输出", "基础"],
  },
  {
    id: "agent-so-2",
    chapter: "agent-structured-output",
    level: 1,
    question: "什么是「JSON 模式（JSON mode）」？",
    answer:
      "JSON 模式是请求里的一个开关，要求模型这一次的输出必须是一段合法的 JSON（而不是普通文本）。它只保证「是合法 JSON」，不保证字段形状——要约束形状还得配 schema。",
    tags: ["JSON 模式", "json-mode"],
  },
  {
    id: "agent-so-3",
    chapter: "agent-structured-output",
    level: 1,
    question: "在结构化输出里，「schema」是干什么用的？",
    answer:
      "schema 是一份对输出形状的约定——规定有哪些字段、各字段的类型、哪些必填。给模型一份 schema，就把输出形状提前定死，模型被约束着吐出一个字段固定、类型明确的合法 JSON。",
    tags: ["schema", "基础"],
  },
  {
    id: "agent-so-4",
    chapter: "agent-structured-output",
    level: 1,
    question: "工具调用协议里，assistant 返回的 `tool_calls` 里装着什么？",
    answer:
      "装着模型想调用的工具的「调用意图」：要调哪个函数（name）和传什么参数（arguments，通常是一段 JSON 字符串）。它是结构化的，不是自由文本——这一步 assistant 的 `content`（给用户看的文字）往往是空的。",
    tags: ["tool_calls", "工具调用协议"],
  },
  {
    id: "agent-so-5",
    chapter: "agent-structured-output",
    level: 1,
    question: "回填工具结果时，那条消息的 `role` 是什么？还要带上什么字段？",
    answer:
      '`role` 是 `"tool"`。除了结果内容，还必须带上 `tool_call_id`——它对应 assistant 那次 `tool_calls` 里的 id，模型靠它把「这条结果」和「刚才哪次调用」对上。',
    tags: ["tool_call_id", "回填"],
  },
  {
    id: "agent-so-6",
    chapter: "agent-structured-output",
    level: 1,
    question: "「校验 + 重试」这个兜底机制，大致是怎么一套流程？",
    answer:
      "拿到模型输出后：先 `parse` 解析成对象，再按 schema 校验（字段 / 类型 / 必填）。通过就用；不合就把具体的错误信息塞回提示，让模型重出一次，直到合法或到达重试上限。",
    tags: ["校验重试", "基础"],
  },
  {
    id: "agent-so-7",
    chapter: "agent-structured-output",
    level: 1,
    question: "一次完整的工具调用「往返」，从发请求到拿到终答大致经过哪几步？",
    answer:
      '① 把 messages 连同 tools 定义发给模型 → ② assistant 返回 `tool_calls`（content 空）→ ③ app 解析参数、真去执行函数 → ④ 把结果作为 `role:"tool"` + `tool_call_id` 的消息回填进 messages → ⑤ 带着工具结果再请求一次 → ⑥ assistant 这次返回 `content` 终答。',
    tags: ["工具调用协议", "往返"],
  },

  // —— Level 2 · 理解（说清原理 / 区别）——
  {
    id: "agent-so-8",
    chapter: "agent-structured-output",
    level: 2,
    question:
      "为什么靠正则去抠自由文本里的字段「又脆又错」，结构化 JSON 就稳？",
    answer:
      "自由文本是给人读的，同一个意思模型每次措辞、句式、长短都可能不同，写死的正则只要遇到没料到的格式就抠错或抠空。结构化 JSON 字段名固定、类型明确，下游 `json.loads` 后按字段取值即可，不依赖具体措辞，所以稳。",
    tags: ["结构化输出", "自由文本"],
  },
  {
    id: "agent-so-9",
    chapter: "agent-structured-output",
    level: 2,
    question: "「JSON 模式」和「schema 约束」有什么区别？",
    answer:
      "JSON 模式只保证输出是合法 JSON（语法层面），不管里面是什么形状；schema 约束进一步规定字段、类型、必填项（结构层面）。前者管「是不是 JSON」，后者管「是不是我要的那个形状」——通常要两者配合才能拿到可直接消费的结果。",
    tags: ["JSON 模式", "schema"],
  },
  {
    id: "agent-so-10",
    chapter: "agent-structured-output",
    level: 2,
    question:
      "第 ② 步 assistant 返回 `tool_calls` 时，它的 `content` 通常是有内容还是空的？为什么？",
    answer:
      "通常是空的。这一步模型还没拿到工具结果，它要表达的是「我想调某个函数」这个意图（装在 `tool_calls` 里），而不是给用户的最终文字答案，所以 `content` 为空。要等工具结果回填、再请求一次，assistant 才会在 `content` 里给出终答。",
    tags: ["tool_calls", "content"],
  },
  {
    id: "agent-so-11",
    chapter: "agent-structured-output",
    level: 2,
    question:
      "为什么「模型自己从不执行工具」，执行这一步必须由我们的代码来做？",
    answer:
      "模型只能产出文本 / 结构化意图，它没有运行环境去真的查数据库、调 API、跑函数。`tool_calls` 只是「调用意图」；解析出 name / arguments、去工具表里找到函数、真正运行它，永远是我们自己的代码（app）完成的。",
    tags: ["工具调用协议", "执行"],
  },
  {
    id: "agent-so-12",
    chapter: "agent-structured-output",
    level: 2,
    question: "为什么回填工具结果时漏了 `tool_call_id` 会出问题？",
    answer:
      '一轮里 assistant 可能一次发起多个工具调用，每个调用有自己的 id。回填的 `role:"tool"` 消息靠 `tool_call_id` 和对应的那次调用配对；漏了它，模型 / 接口对不上「这条结果是回应哪次调用的」，协议错位，轻则报错、重则把结果安到错误的调用上。',
    tags: ["tool_call_id", "误区"],
  },
  {
    id: "agent-so-13",
    chapter: "agent-structured-output",
    level: 2,
    question: "为什么「模型说会返回合法 JSON」不能直接信，一定要校验？",
    answer:
      "即便开了 JSON 模式 / 给了 schema，模型仍可能偶发输出截断、字段缺失、类型不对、混入解释性文字。下游是程序，遇到不合法的结构会崩或拿到错值。所以拿到输出要先 parse、再按 schema 校验，把「偶发不合法」这个现实兜住。",
    tags: ["校验重试", "误区"],
  },
  {
    id: "agent-so-14",
    chapter: "agent-structured-output",
    level: 2,
    question:
      "重试时为什么要把「具体的错误信息」一并塞回提示，而不只是重发一遍？",
    answer:
      "原样重发，模型没有任何新信息，很可能再犯同样的错。把具体错误（如「缺少必填字段 reason」「days_left 应为整数」）反馈回去，等于告诉模型「上次哪里错了、怎么改」，它针对性修正的成功率高得多。",
    tags: ["校验重试", "理解"],
  },

  // —— Level 3 · 应用（会写 / 会改 / 会判断）——
  {
    id: "agent-so-15",
    chapter: "agent-structured-output",
    level: 3,
    question:
      "用 OpenAI 风格接口，怎么发起一个「要求按 schema 返回结构化结果」的请求？",
    answer:
      '两种常见做法。其一用 `response_format` 走 json_schema：\n`client.chat.completions.create(model=..., messages=msgs, response_format={"type": "json_schema", "json_schema": {"name": "verdict", "schema": SCHEMA}})`，模型输出会被约束成 `SCHEMA` 的形状。其二是把能力做成工具，用 `tools=[...]` 传 schema，让模型通过 `tool_calls` 带回结构化 arguments。',
    tags: ["schema", "代码"],
  },
  {
    id: "agent-so-16",
    chapter: "agent-structured-output",
    level: 3,
    question: "从 assistant 的回复里解析出工具调用的参数，应该怎么写？",
    answer:
      "参数 `tc.function.arguments` 是一段 JSON 字符串，要先 `json.loads` 成 dict：\n`name = tc.function.name`\n`args = json.loads(tc.function.arguments)`\n再用 `TOOLS[name](**args)` 调对应函数。注意 arguments 是字符串、不是已经解析好的对象，直接当 dict 用会报错。",
    tags: ["tool_calls", "代码"],
  },
  {
    id: "agent-so-17",
    chapter: "agent-structured-output",
    level: 3,
    question: "执行完工具后，回填的那条消息该怎么构造？",
    answer:
      '构造一条 `role:"tool"` 的消息，带上对应调用的 `tool_call_id` 和结果内容，再 append 回 messages：\n`msgs.append({"role": "tool", "tool_call_id": tc.id, "content": result})`\n（result 一般转成字符串）。注意还要先把 assistant 那条带 `tool_calls` 的回复也 append 进去，否则协议历史不完整。',
    tags: ["tool_call_id", "回填", "代码"],
  },
  {
    id: "agent-so-18",
    chapter: "agent-structured-output",
    level: 3,
    question:
      "写一个「带 schema 校验 + 一次重试」的解析逻辑，大致框架是怎样的？",
    answer:
      '先试着 parse + 校验，不过就带错误重试一次：\n```python\ndef parse_with_retry(messages):\n    raw = call_llm(messages)\n    try:\n        data = json.loads(raw)\n        validate(data, SCHEMA)   # 不合抛异常\n        return data\n    except (ValueError, SchemaError) as e:\n        messages.append({"role": "user",\n            "content": f"上次输出不合法：{e}，请严格按 schema 重出。"})\n        raw = call_llm(messages)\n        return validate(json.loads(raw), SCHEMA)  # 第二次再失败就抛给上层\n```\n要点：把错误 `e` 塞回提示再请求一次。',
    tags: ["校验重试", "代码"],
  },
  {
    id: "agent-so-19",
    chapter: "agent-structured-output",
    level: 3,
    question:
      "需要从一段用户评论里抽取「情感（正/负/中）」和「涉及的商品名」，你会怎么设计 schema？",
    answer:
      '设两个字段：`sentiment` 为 string、限定枚举 `["正面","负面","中性"]`、必填；`product` 为 string、可选（评论没提到就允许缺省或空）。把这份 schema 通过 json_schema / 工具传给模型约束输出，再对返回结果按 schema 校验 sentiment 是否落在枚举内。',
    tags: ["schema", "应用"],
  },
  {
    id: "agent-so-20",
    chapter: "agent-structured-output",
    level: 3,
    question:
      "代码默认 assistant「一定会先返回 tool_calls」，结果它有时直接给了文字答案就报错——怎么改？",
    answer:
      "每轮先判断有没有 `tool_calls`：没有就说明它直接作答了，返回 `reply.content`；有才去解析执行。简单问题模型会跳过工具直接答，两条路径都要兜住——这正是工具调用协议里「assistant 不总是调工具」的常态。",
    tags: ["工具调用协议", "应用"],
  },

  // —— Level 4 · 综合（取舍 / 设计判断）——
  {
    id: "agent-so-21",
    chapter: "agent-structured-output",
    level: 4,
    question:
      "「用 response_format=json_schema 直接约束输出」和「把能力做成 tool 让模型用 tool_calls 带回结构化参数」，分别适合什么场景？",
    answer:
      "前者适合「我只想要模型给我一份结构化结果」的场景——抽取、分类、给判定，模型不需要真去执行什么。后者适合「模型需要调用外部能力」的场景——查订单、调 API、跑函数：tool_calls 既约束了参数结构，又表达了「该执行这个动作」的意图，配合 role:tool 回填形成往返。一句话：只要结果用 response_format；要触发动作用 tools。",
    tags: ["schema", "取舍", "综合"],
  },
  {
    id: "agent-so-22",
    chapter: "agent-structured-output",
    level: 4,
    question: "「校验 + 重试」很有用，但无限重试有什么风险？设计时该怎么收口？",
    answer:
      "无限重试会在模型反复出不合法结果时空转，烧 token、卡住流程，体验和成本都崩。要设重试上限（如 1~2 次）；到顶仍不合法时给一个明确兜底：要么降级返回一个安全的默认结构、要么抛错让上层处理、要么转人工。这和 agent 主循环要有 max_steps 刹车是同一种思路——自主可以交给模型，但「最多试几次」的闸门必须自己留着。",
    tags: ["校验重试", "max_steps", "综合"],
  },
  {
    id: "agent-so-23",
    chapter: "agent-structured-output",
    level: 4,
    question:
      "一个 agent 在一轮里同时发起了 3 个工具调用，回填时最容易踩什么坑？怎么稳妥处理？",
    answer:
      '最容易踩的坑：① 把 3 个结果合成一条回填，或漏掉某次调用——应为每个 tool_call 各回填一条 `role:"tool"` 消息；② 三条消息的 `tool_call_id` 张冠李戴——必须各自对上发起它的那次调用 id。稳妥做法：遍历 `reply.tool_calls`，对每个 `tc` 执行后 append 一条带 `tc.id` 的 tool 消息，三条都回填齐了再发起下一次请求。',
    tags: ["tool_call_id", "工具调用协议", "综合"],
  },
  {
    id: "agent-so-24",
    chapter: "agent-structured-output",
    level: 4,
    question:
      "有人说「现在模型很强，直接让它输出 JSON 就行，不用 schema 也不用校验」，这话哪里不稳妥？",
    answer:
      "不稳妥。其一，不给 schema，模型对字段名 / 类型 / 必填的理解全靠猜，多次调用之间形状容易飘，下游对不齐。其二，再强的模型也会偶发截断、缺字段、类型错、混入解释文字——下游是程序，遇到一次不合法就崩。schema 把形状定死、校验 + 重试把偶发不合法兜住，二者都是「让结构化输出在生产里真正可靠」的必要保险，不能因为模型变强就省掉。",
    tags: ["schema", "校验重试", "综合"],
  },
];
