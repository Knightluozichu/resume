/** 复习题库 · 提示工程基础（agt-prompt-engineering）。《从零构建 AI Agent》篇2·1·驾驭大模型开篇。 */

import type { ReviewQuestion } from "./types";

export const agtPromptEngineeringQuestions: ReviewQuestion[] = [
  // ── L1 认记：定义 / 术语 ──
  {
    id: "agt-pe-1",
    chapter: "agt-prompt-engineering",
    level: 1,
    question: "一条提示里常用的三种消息角色是哪三种？",
    answer:
      "**system**（系统 / 岗位说明书，定身份与规矩）、**user**（用户 / 本次任务）、**assistant**（助手 / 模型自己的回话，也用来塞历史和 few-shot 范例）。",
    tags: ["消息角色", "system/user/assistant"],
  },
  {
    id: "agt-pe-2",
    chapter: "agt-prompt-engineering",
    level: 1,
    question: "用「失忆天才小屋」的隐喻，system 角色对应什么？",
    answer:
      "对应给失忆天才的「岗位说明书」——告诉他你是谁、守什么规矩、用什么口气。它该放在最前面、整轮都生效，因为天才转头就忘，每次都得重新交代。",
    tags: ["system", "岗位说明书", "隐喻"],
  },
  {
    id: "agt-pe-3",
    chapter: "agt-prompt-engineering",
    level: 1,
    question: "一条「够用的提示」由哪三块组成？",
    answer:
      "**角色**（用 system 定身份与规矩）+ **清晰指令**（说清这次具体要做什么）+ **输入**（用 user 给本次待处理内容）。三块齐了，模型才扮对角色、做对事、答在点上。",
    tags: ["提示组成", "角色指令输入"],
  },
  {
    id: "agt-pe-4",
    chapter: "agt-prompt-engineering",
    level: 1,
    question: "什么是 few-shot 示例？什么是 zero-shot？",
    answer:
      "**few-shot** 是在提示里塞进几组「输入→输出」范例，让模型照着范例的样子答（few = 少量）。**zero-shot** 是一个范例都不给、只靠指令直接让它答（zero = 零样例）。",
    tags: ["few-shot", "zero-shot"],
  },
  {
    id: "agt-pe-5",
    chapter: "agt-prompt-engineering",
    level: 1,
    question: "什么是提示模板（Prompt Template）？",
    answer:
      "把提示里固定不变的部分（角色、指令、few-shot 范例）写成骨架，只把会变的部分（如本次用户输入）留成「空格」，每次把变量填进去就生成一份完整提示，省得每次从头手写。",
    tags: ["提示模板"],
  },
  {
    id: "agt-pe-6",
    chapter: "agt-prompt-engineering",
    level: 1,
    question: "tinyagent 的 `Message` 这块积木有哪两个字段？各放什么？",
    answer:
      "`role`（这话是谁说的，取 `\"system\"` / `\"user\"` / `\"assistant\"` 之一）和 `content`（这张纸条上的内容）。`Message` 是 tinyagent 里表示「一张带角色的纸条」的最小积木。",
    tags: ["Message", "tinyagent", "role/content"],
  },
  {
    id: "agt-pe-7",
    chapter: "agt-prompt-engineering",
    level: 1,
    question: "tinyagent 里的 `messages` 是什么？",
    answer:
      "一份完整提示，就是把若干 `Message` 按顺序排成的一个**列表**，习惯上叫它 `messages`。它就是要塞给模型的那一摞带角色的纸条。",
    tags: ["messages", "tinyagent", "列表"],
  },

  // ── L2 理解：辨析 / 因果 ──
  {
    id: "agt-pe-8",
    chapter: "agt-prompt-engineering",
    level: 2,
    question: "为什么角色（身份与规矩）该放 system，而不是混进 user？",
    answer:
      "因为 system 是「整轮都生效的规矩」，user 是「这次的临时任务」。混在一张 user 纸条里，模型分不清哪句是要永远守的规矩、哪句是本次任务，扮角色就不稳。各归各位它才稳定。",
    tags: ["system", "user", "辨析"],
  },
  {
    id: "agt-pe-9",
    chapter: "agt-prompt-engineering",
    level: 2,
    question: "few-shot 范例在 `messages` 里是怎么表示的？为什么用 assistant 角色？",
    answer:
      "每组范例拆成两张纸条：示例输入放 **user**，对应的示范回答放 **assistant**。用 assistant 是因为它代表「模型该这么答」的样子——把示范答案标成 assistant，模型就知道这是要照着学的回话范本。",
    tags: ["few-shot", "assistant", "因果"],
  },
  {
    id: "agt-pe-10",
    chapter: "agt-prompt-engineering",
    level: 2,
    question: "为什么 few-shot 的几组范例必须自己规整、彼此一致？",
    answer:
      "因为模型是「照着范例学」的——范例本身格式、口气乱七八糟，它学到的就是「可以乱来」，输出反而更飘。范例就是你给模型立的标杆，标杆歪了输出必歪。",
    tags: ["few-shot", "一致性", "因果"],
  },
  {
    id: "agt-pe-11",
    chapter: "agt-prompt-engineering",
    level: 2,
    question: "为什么说 `messages` 是「有序」的？顺序错了会怎样？",
    answer:
      "system 必须最前（规矩先立）、本次 user 任务必须最后、中间才是 few-shot 范例。顺序一错，模型可能把本次任务当成范例、或把规矩当成任务，从而跑偏。所以 append 时要严格按顺序。",
    tags: ["messages", "顺序", "因果"],
  },
  {
    id: "agt-pe-12",
    chapter: "agt-prompt-engineering",
    level: 2,
    question: "提示模板（如 build_messages）把「固定部分」和「变化部分」分开，好处是什么？",
    answer:
      "固定的角色、指令、范例写死成骨架，只有本次 user 输入是变量。这样每来一个问题，只需填一个空格就生成完整提示，不用从头手写——省力、稳定、不容易把规矩或范例写漏写乱。",
    tags: ["提示模板", "复用", "理解"],
  },

  // ── L3 应用：把场景对应到角色 / 用代码组装 ──
  {
    id: "agt-pe-13",
    chapter: "agt-prompt-engineering",
    level: 3,
    question:
      "「你是只说中文的导游」「故宫几点开门？」「（范例答）故宫 8:30 开门。」——三句各用哪个角色？",
    answer:
      "「你是只说中文的导游」→ **system**（岗位说明书，定身份与规矩）；「故宫几点开门？」→ **user**（本次任务）；「故宫 8:30 开门。」作为 few-shot 示范回答 → **assistant**（给模型照着学的回话范本）。",
    tags: ["角色辨析", "应用"],
  },
  {
    id: "agt-pe-14",
    chapter: "agt-prompt-engineering",
    level: 3,
    question:
      "调用 `build_messages(system=..., examples=[(\"能退货吗？\",\"7天内可退\")], user=\"我的订单能退吗？\")`，组装出的 messages 有几条？角色依次是什么？",
    answer:
      "共 **4** 条。角色依次是 `system → user → assistant → user`：system 岗位说明书打头，中间一组 few-shot 范例拆成 user 问 + assistant 答，最后压上本次 user 任务。（公式：1 个 system + 2×范例组数 + 1 个本次 user。）",
    tags: ["build_messages", "组装结构", "应用"],
  },
  {
    id: "agt-pe-15",
    chapter: "agt-prompt-engineering",
    level: 3,
    question:
      "要让模型「把英文邮件翻成中文，只输出译文、不要解释」，用「角色+指令+few-shot+输入」该怎么组织提示？",
    answer:
      "system 放角色与规矩：「你是专业翻译，只输出译文、不要任何解释」；few-shot 给一组范例：user 放一句英文、assistant 放干干净净只有译文的中文；user 放要翻译的邮件正文。文字要求 + 范例双管齐下，模型才不会加多余解释。",
    tags: ["写提示", "few-shot", "应用"],
  },
  {
    id: "agt-pe-16",
    chapter: "agt-prompt-engineering",
    level: 3,
    question:
      "在 `build_messages` 里要新增一条「给开发者备注的额外规矩」，作为第二张 system 纸条放在第一张 system 之后、few-shot 之前，关键改动是什么？",
    answer:
      "在 `msgs = [Message(role=\"system\", content=system)]` 之后、for 循环之前，`msgs.append(Message(role=\"system\", content=developer_note))`。顺序变成「system → system → few-shot → 本次 user」，两张 system 都属于整轮生效的规矩、都在范例之前。",
    tags: ["改代码", "messages 顺序", "应用"],
  },

  // ── L4 综合：跨概念整合 / 反思 ──
  {
    id: "agt-pe-17",
    chapter: "agt-prompt-engineering",
    level: 4,
    question:
      "同事说「我把要求写成一长段塞进一张 user 纸条就行了，搞 system、few-shot 太麻烦」。结合本章反驳他。",
    answer:
      "一长段塞 user 有三处隐患：①没有 system，模型分不清哪句是「整轮要守的规矩」、哪句是「本次任务」，扮角色不稳；②光用文字描述格式/口气，常不如直接给几组规整的 few-shot 范例管用，输出更飘；③一切混在一张纸条里，难复用——换个输入就得整段重写。把角色放 system、范例用 few-shot、本次输入放 user，再用提示模板把固定部分写死，才能稳定、规整、可复用。",
    tags: ["提示组成", "反思", "综合"],
  },
  {
    id: "agt-pe-18",
    chapter: "agt-prompt-engineering",
    level: 4,
    question:
      "把本章的 `Message` / `messages` 和前一篇「智能体五大件」里的「提示」这一件对应起来：本章在整本书里处在什么位置？",
    answer:
      "本章是篇 2「驾驭大模型」的开篇，专门补五大件里的「提示」这一件——把「怎么跟失忆天才说话」从隐喻落成代码。`Message(role, content)` 是 tinyagent 表示「一张纸条」的最小积木，`messages` 列表是「一份完整提示」，`build_messages` 是最朴素的提示模板。这是全书贯穿主线代码的第一块砖；下一章接上真正的 `llm()`，把这摞 messages 塞进模型拿回话。",
    tags: ["全书地图", "五大件", "tinyagent", "综合"],
  },
];
