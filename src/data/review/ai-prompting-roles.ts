/** 复习题库 · 提示工程与角色设定（ai-prompting-roles）。AI Agent 开发实战·原创改编第 3 章。 */

import type { ReviewQuestion } from "./types";

export const aiPromptingRolesQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ai-prompt-1",
    chapter: "ai-prompting-roles",
    level: 1,
    question: "什么是「角色设定（system prompt）」？它放在提示的哪一部分？",
    answer:
      '角色设定是在提示最前面给 LLM 设定的身份、职责和行为规则，相当于给它发一份「岗位说明书」。它不回答具体问题，只**定调**——后面不管问什么，模型都照这份说明书的身份和规矩来答。技术上放在 `role: "system"` 这条独立消息里，全程生效。',
    tags: ["角色设定", "system", "定义"],
  },
  {
    id: "ai-prompt-2",
    chapter: "ai-prompting-roles",
    level: 1,
    question: "「提示的三层结构」是哪三层？模型看到的是哪一段？",
    answer:
      "三层是：① 系统设定（角色）+ ② few-shot 示例 + ③ 用户消息。模型看到的是这三层拼起来的**整段** prompt，而不是你单独打的那句话。你能调的不只是「问什么」，还有「配什么角色、给什么范例」。",
    tags: ["三层结构", "prompt", "定义"],
  },
  {
    id: "ai-prompt-3",
    chapter: "ai-prompting-roles",
    level: 1,
    question: "什么是「few-shot 示例」？few 和 shot 各是什么意思？",
    answer:
      "few-shot 示例是在提示里塞进几个「输入 → 输出」的范例（few = 几个，shot = 一次示范），让模型照着范例的格式、字段和风格来答，不用你长篇大论解释要求。技术上是在 system 和真正的 user 之间，插入几对「示例 user → 示例 assistant」消息。",
    tags: ["few-shot", "定义"],
  },
  {
    id: "ai-prompt-4",
    chapter: "ai-prompting-roles",
    level: 1,
    question: "什么是「结构化输出」？最常用的格式是什么？",
    answer:
      "结构化输出是要求模型按固定的**机器格式**（最常见是 JSON）输出，而不是写自由文本散文，这样程序才能用 `json.loads` 之类的方法稳定地解析、提取出每个字段。JSON 是程序的母语，一行就拿到字典按 key 取值。",
    tags: ["结构化输出", "JSON", "定义"],
  },
  {
    id: "ai-prompt-5",
    chapter: "ai-prompting-roles",
    level: 1,
    question:
      "在 `messages` 列表里，few-shot 示例应该插在哪两条消息之间？以什么形式出现？",
    answer:
      "插在 `system` 消息之后、真正的 `user` 消息之前。形式是若干对「示例 user → 示例 assistant」消息，假装这段对话之前已经发生过，模型就会照着示例里 assistant 的格式来答。",
    tags: ["few-shot", "messages", "位置"],
  },
  {
    id: "ai-prompt-6",
    chapter: "ai-prompting-roles",
    level: 1,
    question:
      "拿到模型返回的 JSON 文本后，用什么把它变成程序能按 key 取值的 Python 对象？",
    answer:
      '用 `json.loads(文本)`，它把那段 JSON 文本解析成一个 Python **字典（dict）**，于是就能用 `data["city"]` 这样按 key 稳定取值。这就是结构化输出能被程序稳定使用的关键一步。',
    tags: ["json.loads", "解析", "JSON"],
  },
  // ── L2 理解：分辨 / 解释为什么 ──
  {
    id: "ai-prompt-7",
    chapter: "ai-prompting-roles",
    level: 2,
    question:
      "同样问「把这句口语订票需求整理出来」，只加「角色设定」一味配料，输出会变好在哪？还差什么才能被程序稳定解析？",
    answer:
      "只加角色设定，模型会从「热情跑题的话痨」变成「聚焦正事的办事员」——不再闲聊、扣住订票这件事。但它输出的还是**一段散文**，字段埋在句子里，程序提取很脆弱。要被程序稳定解析，还差「结构化输出」（要求只输出 JSON）和最好再加「few-shot」锚定字段名。",
    tags: ["角色设定", "三味配料", "分辨"],
  },
  {
    id: "ai-prompt-8",
    chapter: "ai-prompting-roles",
    level: 2,
    question:
      "「角色设定 / few-shot 示例 / 结构化输出」这三味配料，各自主要解决什么问题？",
    answer:
      "角色设定管「**别跑题**」——框定身份和规矩，让输出聚焦正事；few-shot 示例管「**字段对齐**」——用范例代替啰嗦描述，让输出照着范例的格式和字段；结构化输出管「**能被程序读**」——逼出 JSON，程序才能 `json.loads` 稳定解析。三味补的洞各不相同、缺一不可。",
    tags: ["三味配料", "作用", "理解"],
  },
  {
    id: "ai-prompt-9",
    chapter: "ai-prompting-roles",
    level: 2,
    question:
      "为什么说 few-shot 的范例「必须自身就是标准答案」？范例写错一个字段名会怎样？",
    answer:
      "因为模型是**照着范例模仿**的——范例里 assistant 写的 JSON 字段名、取值格式，就是模型会复制的模板。范例写错一个字段名（比如把 `city` 写成 `City`），模型就跟着把后续输出全写成错的字段名。所以每个范例都要当「正确答案」精挑，宁可少给几个高质量的。",
    tags: ["few-shot", "范例质量", "为什么"],
  },
  {
    id: "ai-prompt-10",
    chapter: "ai-prompting-roles",
    level: 2,
    question:
      "为什么自由文本（散文）输出对程序是「灾难」，而 JSON 是程序的「母语」？",
    answer:
      "散文里字段埋在句子中、措辞还可能和约定对不上（「坐高铁」≠ `高铁`、「六百块上下」不是数字），程序只能靠正则去**猜**，换个说法就崩，脆得没法用。JSON 则是固定机器格式，一行 `json.loads` 就拿到字典，按 key 取值，稳定可靠——所以要交给程序的输出必须结构化。",
    tags: ["结构化输出", "散文vsJSON", "为什么"],
  },
  {
    id: "ai-prompt-11",
    chapter: "ai-prompting-roles",
    level: 2,
    question: "角色设定是不是写得越长越详细越好？为什么？",
    answer:
      "不是。角色设定占的是宝贵的上下文窗口，堆几百字人设反而稀释关键约束（上一章「迷失在中间」），还更慢。正确做法是只写**真正影响行为**的几句——身份、核心规则、输出要求；人设细节、客套话一律删掉，短而准。",
    tags: ["角色设定", "误区", "简洁"],
  },
  {
    id: "ai-prompt-12",
    chapter: "ai-prompting-roles",
    level: 2,
    question:
      "在提示里用文字写「请输出 JSON」，就能保证模型每次都给合法 JSON 吗？为什么？",
    answer:
      '不能。光靠自然语言要求，模型仍可能夹带多余文字（比如「好的，这是 JSON：{...}」），那句寒暄会把 `json.loads` 干崩。这是把「自然语言要求」误当成了「格式保证」。要稳，得用 `response_format={"type": "json_object"}` 强制合法 JSON + few-shot 锚定字段 + 解析时 `try/except` 兜底。',
    tags: ["结构化输出", "误区", "response_format"],
  },
  {
    id: "ai-prompt-13",
    chapter: "ai-prompting-roles",
    level: 2,
    question:
      '`response_format={"type": "json_object"}` 和 few-shot 示例，各保证了 JSON 的哪一面？',
    answer:
      "`response_format` 保证输出是**合法 JSON**（能被 `json.loads` 解析），但**不保证**字段名和取值符合你的约定。few-shot 范例则**锚定字段名和格式**，让它是「对的」JSON。两者配合：`response_format` 管「是 JSON」，few-shot 管「是对的 JSON」，缺一不可。",
    tags: ["response_format", "few-shot", "配合"],
  },
  // ── L3 应用：判断 / 套用到场景 / 写提示 ──
  {
    id: "ai-prompt-14",
    chapter: "ai-prompting-roles",
    level: 3,
    question:
      "有人把「你是严谨的订票助理，只输出 JSON」直接写进了 `user` 那句话里，几轮对话后模型就不听了。问题出在哪？怎么改？",
    answer:
      '问题是把**行为约束写进了 user 而非 system**。`user` 消息是「这一轮的请求」，约束放这儿优先级低、易被后续 user 消息冲淡，所以多轮后就失效。改法：身份和规则一律放 `role: "system"`，全程生效；`user` 只放当前这一轮真正要办的事。',
    tags: ["system", "误区", "场景"],
  },
  {
    id: "ai-prompt-15",
    chapter: "ai-prompting-roles",
    level: 3,
    question:
      "要写一个把用户口语订票需求抽成 JSON 的完整提示，应该具备哪几个要素？请列出来。",
    answer:
      '至少四个要素：① 角色设定放 `system`（如「你是订票信息抽取器，只输出 JSON」）；② 至少一对 few-shot 示例（示例 user → 示例 assistant，范例本身就是标准答案，锚定 `city/date/type/budget` 等字段名）；③ 用 `response_format={"type": "json_object"}` 强制合法 JSON；④ 拿到回答后用 `json.loads` 解析成字典，并配 `try/except` 兜底。',
    tags: ["独立实现", "完整提示", "应用"],
  },
  {
    id: "ai-prompt-16",
    chapter: "ai-prompting-roles",
    level: 3,
    question:
      "一套订票抽取提示调好后要套给成千上万条不同的用户需求，怎么做才不必每次手拼字符串？",
    answer:
      "把它**冻成模板**：固定的「角色 + few-shot + 输出要求」写死，变化的用户需求用占位符（如 `USER_TEMPLATE.format(request=...)`）填进去，再封装成一个 `build_messages(request)` 函数。这样同一套角色和范例能复用给无数条需求——把「写好一个提示」变成「能复用的提示函数」。",
    tags: ["提示模板", "format", "复用"],
  },
  {
    id: "ai-prompt-17",
    chapter: "ai-prompting-roles",
    level: 3,
    question:
      "「我直接在 user 里写清楚『你是订票助理、请只输出 JSON、要有 city 和 date』，干嘛非要分 system 和 few-shot？」请反驳。",
    answer:
      '两个洞：① 约束写进 `user` 优先级低、多轮对话后易被冲淡，应放 `system` 全程生效。② 用文字描述格式远不如 few-shot 范例稳——「字段要有 city 和 date」是抽象描述，模型可能理解偏差（输出 `City`、漏字段、取值格式不对）；一对 `{"city": "上海", "date": "明天"}` 的范例直接甩模板给它，照葫芦画瓢更精确。所以分三层是分别解决「约束生效、字段对齐、格式合法」三个不同问题，不是形式主义。',
    tags: ["三层结构", "综合", "反驳"],
  },
  // ── L4 综合：贯通多个概念 ──
  {
    id: "ai-prompt-18",
    chapter: "ai-prompting-roles",
    level: 4,
    question:
      "把本章串起来：从「裸打一句话」到「程序能稳定接住的提示」，三味配料是怎么一步步把输出从『没法用』逼到『好用』的？最后还要做什么让它工程化可复用？",
    answer:
      "起点是裸打一句话，模型自由发挥、跑题闲聊、夹带寒暄，程序完全没法用。第一味加**角色设定**（放 `system`）——给小特发岗位说明书、定调，它不再跑题、聚焦正事，但输出还是散文、字段埋在句子里，程序提取脆弱。第二味加 **few-shot 示例**（塞在 system 与 user 之间的「示例 user→assistant」对）——用范例代替啰嗦描述，输出字段对齐到范例的格式与命名；范例本身必须是标准答案，否则模型跟着错。第三味加**结构化输出**——在 system 里要求只输出 JSON、再用 `response_format` 强制合法 JSON（管「是 JSON」）、由 few-shot 锚定字段（管「是对的 JSON」），拿到后 `json.loads` + `try/except` 解析成字典，程序按 key 稳定取值。三味补的洞各不相同：角色管别跑题、few-shot 管字段对齐、格式要求管能被程序读，缺一不可。最后把这套调好的提示**冻成模板**：固定部分写死、变化的用户需求用 `format` 占位符填进 `build_messages(request)` 函数，实现工程化复用——至此「写好一个提示」就变成了「一个能复用的提示函数」。",
    tags: ["综合", "三味配料", "模板化"],
  },
];
