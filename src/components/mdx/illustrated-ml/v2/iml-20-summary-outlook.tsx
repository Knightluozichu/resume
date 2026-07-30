"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-20",
  title: "第20章 总结与展望",
  question:
    "怎样从任务假设和证据选择方法，并把无法满足的前提登记成下一步研究问题？",
  concepts: ["第VI部分 结语", "第20章 总结与展望"],
  stages: [
    {
      name: "任务复述",
      input: "第20章 总结与展望：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“任务、数据分布、模型假设、目标、验证与失败边界完整回收”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提”就保留失败运行",
    },
    {
      name: "假设清单",
      input: "第20章 总结与展望：上一步输入与候选函数族",
      transform:
        "执行“第20章 总结与展望”的表示或模型变换，并守住“任务、数据分布、模型假设、目标、验证与失败边界完整回收”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提”就保留失败运行",
    },
    {
      name: "候选方法",
      input: "第20章 总结与展望：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“任务、数据分布、模型假设、目标、验证与失败边界完整回收”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提”就保留失败运行",
    },
    {
      name: "证据比较",
      input: "第20章 总结与展望：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“任务、数据分布、模型假设、目标、验证与失败边界完整回收”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提”就保留失败运行",
    },
    {
      name: "结论与开放问题",
      input: "第20章 总结与展望：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“任务、数据分布、模型假设、目标、验证与失败边界完整回收”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "给定一个含少量标签、异常和分布漂移的新问题，逐层排除不满足前提的方法。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“任务复述 → 假设清单 → 候选方法 → 证据比较 → 结论与开放问题”形成预注册输出。",
      target: "满足“任务、数据分布、模型假设、目标、验证与失败边界完整回收”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "给定一个含少量标签、异常和分布漂移的新问题，逐层排除不满足前提的方法。 其余条件不变，只注入“用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第20章 总结与展望”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行任务复述、假设清单，保存输入、表示与模型状态",
    "推进候选方法、证据比较，记录目标、约束、参数和选择轨迹",
    "在结论与开放问题交付88层级检查、任务与分布、候选假设、基线、风险与约束、验证结果、失败方法、时间标签和开放问题。",
  ],
  failureTrace: [
    "“第20章 总结与展望”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提",
    "沿“任务复述 → 假设清单 → 候选方法 → 证据比较 → 结论与开放问题”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“任务、数据分布、模型假设、目标、验证与失败边界完整回收”恢复才接受修正",
  ],
  invariant: "任务、数据分布、模型假设、目标、验证与失败边界完整回收",
  fault: "用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提",
  artifact:
    "88层级检查、任务与分布、候选假设、基线、风险与约束、验证结果、失败方法、时间标签和开放问题。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第20章 总结与展望”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第20章 总结与展望”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第20章 总结与展望”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第20章 总结与展望”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml20SummaryOutlookModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml20SummaryOutlookFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml20SummaryOutlookValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
