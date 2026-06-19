/** 复习题库 · 结构化输出（agt-structured-output）。《从零构建 AI Agent》篇2·3·驾驭大模型，C 实战型，含改代码/排错题。 */

import type { ReviewQuestion } from "./types";

export const agtStructuredOutputQuestions: ReviewQuestion[] = [
  // ── L1 认记：定义 / 术语 ──
  {
    id: "agt-so-1",
    chapter: "agt-structured-output",
    level: 1,
    question: "什么是结构化输出？为什么 Agent 需要它？",
    answer:
      "**结构化输出**指让模型的回答是机器能稳定解析的固定形状（最常用 JSON），而不是一段人话散文。Agent 的回答几乎都要喂给下一段代码（取字段、做判断），散文里值的位置和写法每次都飘、程序接不稳；尤其工具调用靠模型吐出「调哪个工具、传什么参数」的结构化指令，所以它是 Agent 能「行动」的地基。",
    tags: ["结构化输出", "为什么"],
  },
  {
    id: "agt-so-2",
    chapter: "agt-structured-output",
    level: 1,
    question: "什么是 JSON 模式（让模型输出 JSON）？",
    answer:
      "在提示里明确要求模型「只输出 JSON、不要任何多余文字」，并给出字段示例；许多模型还提供专门的 JSON 模式开关强制输出合法 JSON。本质是把「写散文」的任务改成「照格式填空」。",
    tags: ["JSON 模式", "提示"],
  },
  {
    id: "agt-so-3",
    chapter: "agt-structured-output",
    level: 1,
    question: "schema（模式约束）规定了哪些东西？",
    answer:
      "规定输出该长什么形状：有哪些**字段**、每个字段是什么**类型**（字符串/整数/布尔…）、哪些**必填**。它像表格的表头，规定每一格要填什么、必不必填，代码据它逐条核对模型的输出。",
    tags: ["schema", "字段", "类型", "必填"],
  },
  {
    id: "agt-so-4",
    chapter: "agt-structured-output",
    level: 1,
    question: "tinyagent 里 extract_json 的职责是什么？",
    answer:
      "**解析容错**：从模型可能不干净的回话里把那段真正的 JSON 抠出来再解析——先剥掉 ```json 代码围栏、切掉前后寒暄废话，定位到第一段 `{...}` 再 `json.loads`。让代码不会因为模型多说一句话就崩。",
    tags: ["extract_json", "解析容错"],
  },
  {
    id: "agt-so-5",
    chapter: "agt-structured-output",
    level: 1,
    question: "llm_json 的签名 `llm_json(messages, schema, max_retries=2)` 各参数是干什么的？",
    answer:
      "`messages` 是组装好的对话（喂给底层 `llm()`）、`schema` 是校验输出形状的约定、`max_retries` 是回灌重试的上限。它把「调 llm → extract_json 剥壳 → validate 校验 → 不合规回灌重试」收成一个入口，返回校验过的结构化对象。",
    tags: ["llm_json", "签名"],
  },
  {
    id: "agt-so-6",
    chapter: "agt-structured-output",
    level: 1,
    question: "什么是回灌重试（feed-back retry）？",
    answer:
      "当剥壳或校验失败时不直接放弃，而是把「错在哪」连同上次回话一起塞回 messages，让模型自己改、重答一遍；重试到设定上限仍不合规才抛错。相当于给失忆天才一次「填错了退回重填」的机会。",
    tags: ["回灌重试", "容错"],
  },
  {
    id: "agt-so-7",
    chapter: "agt-structured-output",
    level: 1,
    question: "本章模型常见的四种「脏输出」是哪四种？",
    answer:
      "① 把 JSON 包进 ```json 代码围栏；② 前后夹一句废话（如「好的，结果如下」）；③ 漏掉某个必填字段；④ 某字段填错了类型（如该 int 填成 str）。前两种靠 extract_json 剥壳，后两种靠 validate 校验抓出。",
    tags: ["脏输出", "围栏", "废话", "缺字段", "类型错"],
  },

  // ── L2 理解：辨析 / 因果 ──
  {
    id: "agt-so-8",
    chapter: "agt-structured-output",
    level: 2,
    question: "为什么不能直接对模型回话 `json.loads`，要先 extract_json？",
    answer:
      "模型爱把 JSON 裹进 ```json 围栏，或前后多说一句「好的，结果如下」——这些都不是合法 JSON，直接 `json.loads` 会抛 `JSONDecodeError` 崩掉。`extract_json` 先剥围栏、切废话、定位 `{...}` 再解析，才不会因为模型多说一句话就崩。",
    tags: ["json.loads", "extract_json", "因果"],
  },
  {
    id: "agt-so-9",
    chapter: "agt-structured-output",
    level: 2,
    question: "`json.loads` 成功了，为什么还要再过一道 validate？",
    answer:
      "`json.loads` 只保证「是合法 JSON」，**不保证字段齐、类型对**——模型可能漏字段、把数字填成字符串。下游代码取缺失字段会 `KeyError`、拿字符串当数字比较会类型错。所以解析后必须按 schema 核对必填字段和类型，缺了/错了当场拦下。",
    tags: ["validate", "校验", "因果"],
  },
  {
    id: "agt-so-10",
    chapter: "agt-structured-output",
    level: 2,
    question: "validate 里为什么要单独挡一道「该 int 却给了 bool」？",
    answer:
      "因为在 Python 里 `bool` 是 `int` 的子类，`isinstance(True, int)` 为真——如果不单独挡，模型把该填整数的字段填成 `true`/`false` 会被当成合法 int 蒙混过关。所以对要求 int 的字段先用 `isinstance(x, bool)` 判一道，是 bool 就报类型错。",
    tags: ["validate", "bool", "isinstance", "类型"],
  },
  {
    id: "agt-so-11",
    chapter: "agt-structured-output",
    level: 2,
    question: "「带围栏」和「夹废话」两种脏输出，剥壳后的 JSON 一样吗？校验都能过吗？",
    answer:
      "一样、都能过。`extract_json` 会把 ```json 围栏剥掉、把前后废话切掉，两者剥完都是同一段干净 JSON；只要字段齐、类型对，校验就通过、不触发重试。真正卡在校验、触发重试的是「缺字段」和「类型错」。",
    tags: ["剥壳", "围栏", "废话", "辨析"],
  },
  {
    id: "agt-so-12",
    chapter: "agt-structured-output",
    level: 2,
    question: "llm_json 校验失败时，回灌进 messages 的具体是什么内容？为什么这样回灌有用？",
    answer:
      "回灌两条：一条 assistant 角色装上次模型的原始回话、一条 user 角色写明「输出不合规：{错在哪}。请只回严格 JSON，重来」。这样模型能看到自己上次答了什么、错在哪，照着改而不是盲目重答，重试命中率更高。",
    tags: ["回灌重试", "messages", "因果"],
  },

  // ── L3 应用：改代码 / 排错 / 选型 ──
  {
    id: "agt-so-13",
    chapter: "agt-structured-output",
    level: 3,
    question:
      "模型回话是 '好的：```json\\n{\"city\":\"上海\",\"temp\":26,\"rain\":true}\\n``` 满意吗？'，对 schema {city:str, temp:int, rain:bool}，extract_json + validate 会发生什么？",
    answer:
      "`extract_json` 先剥掉 ```json 围栏、切掉前后「好的：」「满意吗？」废话，抠出 `{\"city\":\"上海\",\"temp\":26,\"rain\":true}` 并 `json.loads`。`validate` 逐字段核对：city 是 str ✓、temp 是 int ✓、rain 是 bool ✓——**校验通过**，直接返回结构化对象，不触发重试。",
    tags: ["extract_json", "validate", "应用"],
  },
  {
    id: "agt-so-14",
    chapter: "agt-structured-output",
    level: 3,
    question:
      "把 `validate` 改成支持「可选字段」：schema 写成 {\"tip\": (str, False)}（元组第二项表必填与否），可选字段缺了不报错、出现了仍校验类型。怎么改？",
    answer:
      "把 schema 的值从「类型」改成「(类型, 必填)」元组，循环里解包并据 required 决定缺字段是否报错：\n`for name, (typ, required) in schema.items():` → 若 `name not in obj`：`required` 为真才 `raise`，否则 `continue`；字段**出现了**就照常校验 `isinstance(obj[name], typ)`。关键是「可选≠不校验」——缺了才放过，出现了仍要核对类型。",
    tags: ["validate", "可选字段", "改代码"],
  },
  {
    id: "agt-so-15",
    chapter: "agt-structured-output",
    level: 3,
    question:
      "模型总把 JSON 里的英文逗号写成中文逗号「，」，导致 json.loads 失败。怎么在 extract_json 里兜一层而不无脑全文替换？",
    answer:
      "在抠出 `{...}` 文本后**先按正常路径** `json.loads`，只有抛 `JSONDecodeError` 时**再**做一次清洗（`raw.replace(\"，\", \",\").replace(\"：\", \":\")`）重试，仍失败才抛错。别一上来就无脑替换——可能误伤字符串值里本该是中文标点的内容。",
    tags: ["extract_json", "容错兜底", "排错"],
  },
  {
    id: "agt-so-16",
    chapter: "agt-structured-output",
    level: 3,
    question:
      "校验失败时，有人选「直接 raise 报错」、有人选「max_retries 设成 999 无限重试」。这两种各有什么问题？该怎么折中？",
    answer:
      "一失败就 `raise` 太脆——模型偶尔填歪很正常，不该立刻放弃；`max_retries=999` 又可能在模型持续犯错时空转、烧 token、拖慢响应。折中是回灌重试 + **设小上限**（如 2~3 次）：给它几次改的机会，到顶仍不合规才抛错，兼顾健壮与可控。",
    tags: ["max_retries", "选型", "权衡"],
  },

  // ── L4 综合：跨概念整合 / 反思 ──
  {
    id: "agt-so-17",
    chapter: "agt-structured-output",
    level: 4,
    question:
      "把本章 llm_json 和前两章 build_messages / llm() 串起来：tinyagent 到这一章具备了什么能力？为什么说结构化输出是下一篇「工具调用」的地基？",
    answer:
      "前两章 `build_messages` 把提示组装成 `messages`、`llm()` 把纸条喂给模型拿回**文本**；本章 `llm_json` 在 `llm()` 之上加了「剥壳 + 校验 + 回灌重试」，把文本变成**校验过的结构化对象**。至此 tinyagent 能稳定拿到机器可用的结果。工具调用的本质是模型吐出「调哪个工具、传什么参数」的结构化指令——程序必须能稳稳解析这份指令才能去执行，正是 `llm_json` 这套能力的直接延续，所以结构化输出是「让智能体行动」的地基。",
    tags: ["tinyagent", "全书地图", "工具调用", "综合"],
  },
  {
    id: "agt-so-18",
    chapter: "agt-structured-output",
    level: 4,
    question:
      "有人主张「既然有回灌重试兜底，extract_json 就不必费劲剥围栏/废话，让校验失败重试一次就行」。评价这个想法。",
    answer:
      "不可取。重试要多调一次模型——慢、且烧 token，能在代码侧消化的小毛病（围栏、废话）不该浪费一整轮重试去解决。`extract_json` 的剥壳是**确定性的本地容错**，几乎零成本就能救回围栏/废话这类「内容其实对、只是包装脏」的回话；回灌重试应留给「内容真错了」（缺字段、类型错）这种本地救不回、必须让模型重答的情况。两者分工：能本地修就别上重试。",
    tags: ["extract_json", "回灌重试", "成本", "反思"],
  },
];
