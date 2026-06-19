/** 复习题库 · 生产化收官：简单、透明与 ACI 上线检查清单（agent-production-readiness-checklist）。《AI 智能体应用开发》第 19 章，改编自 Anthropic《Building Effective Agents》Summary。 */

import type { ReviewQuestion } from "./types";

export const agentProductionReadinessChecklistQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-prc-1",
    chapter: "agent-production-readiness-checklist",
    level: 1,
    question: "Anthropic 在 Summary 里给出的 agent 三条生产原则是什么？",
    answer:
      "三条原则可以概括为：保持设计简单；显式展示 agent 的 planning steps，让系统透明；认真打磨 Agent-Computer Interface（ACI），也就是工具定义、参数、返回、错误和测试。生产化不是追求最复杂，而是做对当前需求的最小可靠系统。",
    tags: ["生产原则", "基础"],
  },
  {
    id: "agent-prc-2",
    chapter: "agent-production-readiness-checklist",
    level: 1,
    question: "什么是简单性原则？",
    answer:
      "简单性原则是先用最简单、最可测、最容易回退的方案解决问题；只有证据证明简单方案不够时，才增加 workflow 或 autonomous agent 的复杂度。它强调“刚好够用”，不是为了像 agent 而做 agent。",
    tags: ["简单优先", "基础"],
  },
  {
    id: "agent-prc-3",
    chapter: "agent-production-readiness-checklist",
    level: 1,
    question: "什么是复杂度升级门槛（Complexity gate）？",
    answer:
      "复杂度升级门槛是在升级到更复杂 workflow 或 agent 前必须通过的一组证据条件：简单基线是否真的失败、失败类型是否清楚、新方案是否改善指标、成本和延迟是否可接受、风险是否可回退。",
    tags: ["复杂度", "基础"],
  },
  {
    id: "agent-prc-4",
    chapter: "agent-production-readiness-checklist",
    level: 1,
    question: "透明 planning 和透明 review 分别看什么？",
    answer:
      "透明 planning 看 agent 执行前或每轮执行时的目标、计划、下一步、可用工具、风险和停止条件；透明 review 看计划、工具日志、工具结果、证据、eval、检查点和最终决策。前者让人知道它准备怎么做，后者让人能审查它为什么这么做。",
    tags: ["透明度", "基础"],
  },
  {
    id: "agent-prc-5",
    chapter: "agent-production-readiness-checklist",
    level: 1,
    question: "什么是 ACI（Agent-Computer Interface）？",
    answer:
      "ACI 是 agent 操作计算机系统时看到和使用的界面，包括工具名称、描述、参数 schema、返回语义、错误、权限和文档。它相当于给 agent 用的操作台，设计得越清楚，agent 越少猜。",
    tags: ["ACI", "工具", "基础"],
  },
  {
    id: "agent-prc-6",
    chapter: "agent-production-readiness-checklist",
    level: 1,
    question: "上线检查清单至少要覆盖哪些大类？",
    answer:
      "至少覆盖：选型与简单基线、eval 和业务指标、透明日志与计划、ACI 和工具契约、权限与高风险动作、灰度或 sandbox、停机条件、回滚路径、人工接管和审计。",
    tags: ["检查清单", "基础"],
  },
  {
    id: "agent-prc-7",
    chapter: "agent-production-readiness-checklist",
    level: 1,
    question: "停机条件、回滚路径、人工接管分别解决什么问题？",
    answer:
      "停机条件解决“什么时候不能继续自动转”；回滚路径解决“新版本或新复杂度出问题怎么退回安全版本”；人工接管解决“机器不该继续时谁接手，并带走哪些上下文”。三者都是生产安全出口。",
    tags: ["停机", "回滚", "人工接管"],
  },

  // —— Level 2 · 理解辨析 ——
  {
    id: "agent-prc-8",
    chapter: "agent-production-readiness-checklist",
    level: 2,
    question: "为什么“demo 能跑通”不等于“agent 可以上线”？",
    answer:
      "demo 跑通只证明某条理想路径可行，不证明真实用户、真实权限、工具失败、重复尝试、高风险动作和异常状态都可控。上线还需要基线对照、eval、透明日志、ACI 测试、权限控制、停机、回滚和人工接管。",
    tags: ["上线", "理解"],
  },
  {
    id: "agent-prc-9",
    chapter: "agent-production-readiness-checklist",
    level: 2,
    question: "为什么复杂度升级必须先有简单基线？",
    answer:
      "没有简单基线，就不知道复杂 agent 到底解决了什么问题，也无法判断质量提升是否抵得过成本、延迟和风险。基线让团队能比较：单次调用、固定 workflow、路由、评估-优化和 agent loop 哪一层刚好够用。",
    tags: ["基线", "复杂度", "理解"],
  },
  {
    id: "agent-prc-10",
    chapter: "agent-production-readiness-checklist",
    level: 2,
    question: "workflow vs agent 的判断如何影响生产化上线？",
    answer:
      "如果任务路径可以预写，生产上更应该选择固定 workflow 或透明组合，因为它便宜、可预测、好测试、好回退。只有任务开放、步数不定、下一步必须依赖运行时反馈时，才考虑 agent，并且仍要加检查点和停机条件。",
    tags: ["workflow-vs-agent", "理解"],
  },
  {
    id: "agent-prc-11",
    chapter: "agent-production-readiness-checklist",
    level: 2,
    question: "透明 planning 为什么不是“让模型多输出一点解释”这么简单？",
    answer:
      "透明 planning 要成为可审查的控制面：目标、计划、工具选择理由、风险、停止条件和需要人工确认的点都要结构化记录。它不是事后美化解释，而是执行前和执行中用于暂停、审查、复现和纠偏的证据。",
    tags: ["planning", "透明度", "理解"],
  },
  {
    id: "agent-prc-12",
    chapter: "agent-production-readiness-checklist",
    level: 2,
    question: "为什么 ACI 是 tool prompt engineering 的生产化延伸？",
    answer:
      "tool prompt engineering 关注模型是否选对工具、填对参数、读懂结果；ACI 把这个范围扩大到生产操作台：工具边界、权限、错误恢复、前置条件、审计、测试和高风险动作确认。它们本质都是让 agent 面对计算机时少猜、可恢复、可审查。",
    tags: ["ACI", "工具提示工程", "理解"],
  },
  {
    id: "agent-prc-13",
    chapter: "agent-production-readiness-checklist",
    level: 2,
    question: "为什么 autonomous agent 必须设置最大步数或预算？",
    answer:
      "因为 agent 的下一步由模型根据反馈动态决定，如果没有最大步数、预算或重复失败停机条件，它可能在错误路径上反复尝试，带来成本失控、延迟变长和错误累积。最大步数是把自主性关进安全边界的基础闸门。",
    tags: ["autonomous-agent", "停机条件", "理解"],
  },

  // —— Level 3 · 应用判断 ——
  {
    id: "agent-prc-14",
    chapter: "agent-production-readiness-checklist",
    level: 3,
    question:
      "一个客服机器人只需要回答“退货政策是什么”。它应该通过复杂度门槛升级成 autonomous agent 吗？为什么？",
    answer:
      "通常不应该。这个任务路径稳定，只需要检索政策并解释，单次调用或固定 workflow 就够。升级成 autonomous agent 会增加成本、延迟和不可预测，却没有明显收益；除非它还需要查订单、执行动作、读取结果并处理异常。",
    tags: ["选型", "客服", "应用"],
  },
  {
    id: "agent-prc-15",
    chapter: "agent-production-readiness-checklist",
    level: 3,
    question:
      "一个编码 agent 准备从内测扩大到 20% 流量。上线前你会看哪些 eval 或指标？",
    answer:
      "至少看：任务通过率、测试通过率、回归率、人工 review 打回率、平均步数、平均耗时、工具失败率、成本、越权尝试次数、回滚次数和用户满意度。还要按任务类型拆失败原因，确认扩流不是只靠少数简单样本撑起来。",
    tags: ["eval", "编码", "应用"],
  },
  {
    id: "agent-prc-16",
    chapter: "agent-production-readiness-checklist",
    level: 3,
    question:
      "你看到配置 `traffic:1.0`、`maxSteps:Infinity`、`requireHumanApproval:false`、`rollback:null`。请指出至少四个生产风险。",
    answer:
      "风险包括：全量流量没有灰度；无限步数可能死循环和成本失控；高风险动作不需要人工确认；没有回滚路径；如果日志也不完整，事故后无法复现；如果工具全开，还可能越权执行写入动作。上线前应改为小流量、步数上限、检查点、可回退版本和完整日志。",
    tags: ["配置审查", "风险", "应用"],
  },
  {
    id: "agent-prc-17",
    chapter: "agent-production-readiness-checklist",
    level: 3,
    question:
      "把黑盒 `runAgent({ goal, tools: allTools, autonomy:'full' })` 改造成可审查流程，至少要拆出哪些步骤？",
    answer:
      "至少拆出：`createPlan` 生成计划；记录 plan；按权限运行 allowlisted tool；记录 tool input/output；遇到高风险或低信心时 `pauseForReview`；每轮检查 maxSteps、预算和重复失败；结束前跑 eval 或结果验证；失败时 rollback 或 handoff。重点是让每步都有证据，而不是只看最终答案。",
    tags: ["代码审查", "透明度", "应用"],
  },
  {
    id: "agent-prc-18",
    chapter: "agent-production-readiness-checklist",
    level: 3,
    question:
      "一个工具返回 `{ ok:false, error:'FAILED' }`，agent 反复重试。按 ACI 思路应该怎样改？",
    answer:
      "应把错误改成可恢复、可决策的结构，例如包含稳定 `code`、人话 `message`、`retryable`、`fix`、可替代工具和是否需要人工接管。比如缺订单号就提示先向用户确认订单号或调用搜索工具；外部系统故障则标记不可重试并触发停机或接管。",
    tags: ["ACI", "错误恢复", "应用"],
  },
  {
    id: "agent-prc-19",
    chapter: "agent-production-readiness-checklist",
    level: 3,
    question:
      "生产 agent 的工具日志最少应该记录哪些字段，才能支持透明 review？",
    answer:
      "至少记录 run id、step id、当前计划、工具名、工具输入、工具输出、错误码、模型选择理由、关联证据、耗时、成本、风险等级、是否触发检查点、最终决策和回滚/接管原因。这样事故后才能复现路径并定位问题来源。",
    tags: ["日志", "review", "应用"],
  },

  // —— Level 4 · 综合 ——
  {
    id: "agent-prc-20",
    chapter: "agent-production-readiness-checklist",
    level: 4,
    question:
      "请为一个客服 agent 写一份上线前检查清单，要求覆盖简单优先、复杂度门槛、透明度、ACI、eval、停机、回滚和人工接管。",
    answer:
      "检查清单可以是：1. 简单优先：确认 FAQ、固定 workflow、路由或 evaluator-optimizer 不能解决目标失败样本；2. 复杂度门槛：有基线、失败分类、质量收益、成本/延迟预算和小流量灰度；3. 透明度：记录 plan、toolCall、toolResult、eval、checkpoint、final decision；4. ACI：工具只读/写入边界清楚，schema 有前置条件，返回语义明确，错误可恢复，权限最小化；5. eval：覆盖普通查询、退款边界、缺参、低置信度、工具失败和恶意/越权输入；6. 停机：最大步数、预算、重复失败、低信心、外部系统异常会暂停；7. 回滚：能退回上一版 workflow 或旧模型；8. 人工接管：高风险动作、用户不满、政策冲突和低信心会带完整上下文转人工。",
    tags: ["综合", "检查清单", "生产化"],
  },
  {
    id: "agent-prc-21",
    chapter: "agent-production-readiness-checklist",
    level: 4,
    question:
      "一个团队说：“我们直接上全自主 agent，因为未来需求会变复杂。”请结合前面章节给出反驳和替代方案。",
    answer:
      "反驳：未来可能复杂，不代表当前要牺牲可测性、成本和可控性。Ch11 说明能用 workflow 就先用 workflow；Ch16 说明模式是积木，不是处方；Ch18 说明很多问题可以先通过工具契约修掉；本章则要求复杂度必须过门槛。\n\n替代方案：先做单次调用或透明 workflow 基线，跑 eval 找失败类型；对分类问题加路由，对质量问题加 evaluator-optimizer，对工具误用改 ACI；只有当任务确实开放、步数不定、需要根据工具结果动态行动时，才引入受限 agent loop。上线时小流量灰度，记录计划和工具日志，保留检查点、停机、回滚和人工接管。",
    tags: ["综合", "架构取舍", "简单优先"],
  },
  {
    id: "agent-prc-22",
    chapter: "agent-production-readiness-checklist",
    level: 4,
    question:
      "设计一个从 workflow 到 agent 的 gated rollout 方案：怎么分阶段、每阶段看什么指标、什么情况下回滚？",
    answer:
      "阶段 0：固定 workflow 基线，记录质量、成本、延迟、人工返工率和失败分类。阶段 1：只读 agent 或影子模式，只让它计划和建议，不执行写入动作，看计划命中率、工具选择准确率和日志完整性。阶段 2：5% 灰度，允许低风险动作，高风险全部检查点，看解决率、错误率、转人工率、工具失败率、成本和延迟。阶段 3：逐步扩流，但每次扩流都比较基线。\n\n回滚条件包括：质量低于基线、成本/延迟超预算、重复失败升高、误触发高风险动作、人工返工率变差、日志缺失无法审计、外部系统异常或用户投诉上升。回滚目标应是上一版 workflow 或旧模型，而不是临时停摆。",
    tags: ["综合", "灰度", "回滚"],
  },
];
