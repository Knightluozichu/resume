/** 复习题库 · ReAct 循环（agt-react-loop）。《从零构建 AI Agent》篇3·2·让智能体行动，C 实战型，覆盖 Thought / Action / Observation / Final Answer / Agent.run 主循环。 */

import type { ReviewQuestion } from "./types";

export const agtReactLoopQuestions: ReviewQuestion[] = [
  {
    id: "agt-rl-1",
    chapter: "agt-react-loop",
    level: 1,
    question: "ReAct 循环里的 ReAct 是哪两个词的组合？核心思想是什么？",
    answer:
      "ReAct 是 Reasoning + Acting 的组合。核心思想是让模型每轮先写出当前思考（Thought），再提出一次行动请求（Action），拿到工具结果（Observation）后继续下一轮，直到输出 Final Answer 停止。",
    tags: ["ReAct", "定义"],
  },
  {
    id: "agt-rl-2",
    chapter: "agt-react-loop",
    level: 1,
    question: "Thought 在 ReAct trace 里承担什么职责？",
    answer:
      "Thought 是模型本轮的中间思考，用来说明它接下来要查什么、为什么要调某个工具，或为什么已经可以回答。它不执行外部动作，但能帮助下一步决策和排错。",
    tags: ["Thought", "trace"],
  },
  {
    id: "agt-rl-3",
    chapter: "agt-react-loop",
    level: 1,
    question: "Action 是什么？它和工具真正执行之间还差哪一步？",
    answer:
      "Action 是模型写出的工具请求，通常包含工具名和参数。它只是结构化请求，还需要外部运行时解析请求、查 registry、校验参数并调用真实工具函数，工具才真正执行。",
    tags: ["Action", "运行时"],
  },
  {
    id: "agt-rl-4",
    chapter: "agt-react-loop",
    level: 1,
    question: "Observation 是谁写进 messages 的？为什么它重要？",
    answer:
      "Observation 应由运行时把工具返回值写进 messages，而不是模型凭空生成。它重要是因为下一轮 Thought 要基于这份真实回执继续判断；没有 Observation，模型只能猜下一步。",
    tags: ["Observation", "messages"],
  },
  {
    id: "agt-rl-5",
    chapter: "agt-react-loop",
    level: 1,
    question: "Final Answer 在 Agent.run 里代表什么？",
    answer:
      "Final Answer 是模型给用户的最终回答，也是主循环的停止信号。Agent.run 看到它后应该返回答案，不再继续解析 Action 或执行工具。",
    tags: ["Final Answer", "停止条件"],
  },
  {
    id: "agt-rl-6",
    chapter: "agt-react-loop",
    level: 1,
    question: "Agent.run 主循环每轮大致做哪几件事？",
    answer:
      "每轮调用 llm(messages) 得到回复；如果回复是 Final Answer 就返回；否则解析 Action 得到工具名和参数；从 registry 找工具并执行；把工具结果作为 Observation 追加回 messages；进入下一轮。",
    tags: ["Agent.run", "主循环"],
  },
  {
    id: "agt-rl-7",
    chapter: "agt-react-loop",
    level: 2,
    question: "为什么多步任务不能只靠一次函数调用解决？",
    answer:
      "因为工具结果会改变下一步。比如查到会议室有空才应该预订，查到没空就要换时间或问用户。一次函数调用只能完成一个动作；ReAct 循环让模型在每次 Observation 后重新判断下一步。",
    tags: ["多步任务", "循环"],
  },
  {
    id: "agt-rl-8",
    chapter: "agt-react-loop",
    level: 2,
    question: "ReAct 循环和上一章的函数调用是什么关系？",
    answer:
      "函数调用解决一次 Action 怎么结构化、怎么由运行时执行；ReAct 循环解决什么时候发起 Action、执行后如何把 Observation 带回下一轮，以及何时用 Final Answer 停止。Action 通常就是一次函数调用请求。",
    tags: ["函数调用", "ReAct"],
  },
  {
    id: "agt-rl-9",
    chapter: "agt-react-loop",
    level: 2,
    question: "为什么 Agent.run 需要 max_steps 这类上限？",
    answer:
      "模型可能迟迟不输出 Final Answer，或在错误工具请求里反复空转。max_steps 是硬刹车：当循环超过上限仍未完成时抛错或转人工，避免无限调用工具、浪费 token 或造成副作用。",
    tags: ["max_steps", "安全"],
  },
  {
    id: "agt-rl-10",
    chapter: "agt-react-loop",
    level: 2,
    question: "为什么工具报错时，可以把错误也作为 Observation 回灌？",
    answer:
      "因为错误也是外部事实。把「工具不存在」或「参数错误」作为 Observation 回灌，模型下一轮有机会修正工具名、补参数或向用户说明失败；直接崩掉则失去自我修复机会。",
    tags: ["错误处理", "Observation"],
  },
  {
    id: "agt-rl-11",
    chapter: "agt-react-loop",
    level: 2,
    question: "为什么不能把 Observation 交给模型自己编？",
    answer:
      "Observation 是工具执行后的真实回执，代表外部世界的结果。如果让模型自己编，它就会把猜测当事实，整个 Agent 会失去行动闭环，后续 Thought 和 Final Answer 都可能建立在幻觉上。",
    tags: ["边界", "幻觉"],
  },
  {
    id: "agt-rl-12",
    chapter: "agt-react-loop",
    level: 3,
    question:
      "用户说「帮我订明天 10 点 A 会议室」。请写出合理的前两轮 ReAct trace。",
    answer:
      '示例：第一轮 `Thought: 我需要先查 A 室明天 10 点是否空闲。`，`Action: calendar_search({"room":"A","date":"明天","time":"10:00"})`；运行时回灌 `Observation: A 室明天 10:00-11:00 可用。` 第二轮 `Thought: 时间可用，现在应该预订。`，`Action: calendar_book({"room":"A","date":"明天","time":"10:00"})`。',
    tags: ["trace", "应用"],
  },
  {
    id: "agt-rl-13",
    chapter: "agt-react-loop",
    level: 3,
    question:
      "Agent 第二轮没有看到上一轮工具结果，继续乱猜。最可能是哪层 bug？怎么查？",
    answer:
      "最可能是运行时没有把工具返回值作为 Observation 追加到 messages，或 role/content 格式与提示不一致。先打印传给 llm 的最后几条 messages，看有没有 role 为 tool 或包含 `Observation:` 的消息，再确认内容是否是工具真实返回值。",
    tags: ["排错", "messages", "Observation"],
  },
  {
    id: "agt-rl-14",
    chapter: "agt-react-loop",
    level: 3,
    question:
      "模型输出 `Action: calendr_search({})`，registry 里没有这个工具。Agent.run 应该怎么处理更稳？",
    answer:
      "不要直接执行或崩掉。运行时应检查工具名是否在 registry；不存在时生成类似 `Observation: 工具不存在 calendr_search` 的回执并进入下一轮，让模型有机会改成正确工具名；同时受 max_steps 保护，避免无限修正。",
    tags: ["registry", "错误处理"],
  },
  {
    id: "agt-rl-15",
    chapter: "agt-react-loop",
    level: 3,
    question:
      "parse_action 只支持 `Action: name({...})`。如果模型多输出了一句自然语言，会有什么风险？怎么降低？",
    answer:
      "风险是解析器找不到 Action 行或截取到错误内容，导致程序崩掉或误调工具。可以在系统提示里严格规定输出格式；解析时只查以 `Action:` 开头的行；更稳的做法是复用结构化输出，让模型返回 JSON 格式的 `{thought, action}`。",
    tags: ["解析", "结构化输出"],
  },
  {
    id: "agt-rl-16",
    chapter: "agt-react-loop",
    level: 3,
    question: "给 Agent.run 加 trace 记录时，至少应该记录哪三类信息？",
    answer:
      "至少记录每轮模型原始 reply、解析出的工具名和参数、工具返回的 Observation。最好还记录 step 序号、错误信息和是否命中 Final Answer，这样排查选错工具、参数错、没停机时都有证据。",
    tags: ["trace", "可观测性"],
  },
  {
    id: "agt-rl-17",
    chapter: "agt-react-loop",
    level: 4,
    question:
      "把「用户任务 → Thought → Action → registry → Observation → Final Answer」串成完整 Agent.run 流程。",
    answer:
      "用户任务先和系统提示一起组成 messages；模型基于 messages 输出 Thought 和 Action；运行时解析 Action，从 registry 找到真实工具并执行；工具结果被包装成 Observation 追加回 messages；模型读到 Observation 后继续下一轮 Thought/Action；当模型判断任务完成，输出 Final Answer，Agent.run 返回答案并停止。核心边界是：模型提出请求，运行时执行和回灌。",
    tags: ["综合流程", "Agent.run"],
  },
  {
    id: "agt-rl-18",
    chapter: "agt-react-loop",
    level: 4,
    question:
      "有人说「ReAct 就是在 prompt 里让模型把思考过程全暴露出来」。这句话哪里不准确？更准确的说法是什么？",
    answer:
      "这句话把 ReAct 简化成展示思考文本，容易忽略行动闭环。更准确地说：ReAct 是一种运行时循环协议，让模型在每轮基于当前上下文决定下一次 Action，并把外部工具返回的 Observation 回灌给下一轮；是否展示完整 Thought 可以按产品和安全要求裁剪，但循环本身的关键是 Thought/Action/Observation/Final Answer 的状态推进。",
    tags: ["反思", "ReAct", "边界"],
  },
];
