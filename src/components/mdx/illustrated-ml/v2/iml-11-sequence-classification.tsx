"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-11",
  title: "第11章 序列数据的分类",
  question:
    "怎样把局部特征、转移分数、全局归一化和动态规划连接成可复核标签序列？",
  concepts: [
    "第11章 序列数据的分类",
    "11.1 序列数据的模型化",
    "11.2 条件随机场模型的学习",
    "11.3 利用条件随机场模型预测标签序列",
  ],
  stages: [
    {
      name: "输入序列",
      input: "第11章 序列数据的分类：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“序列边界、特征模板、标签集、归一化、训练目标与解码规则固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“逐位置取最高分替代全局解码，产生不允许的标签转移”就保留失败运行",
    },
    {
      name: "状态与转移特征",
      input: "第11章 序列数据的分类：上一步输入与候选函数族",
      transform:
        "执行“第11章 序列数据的分类”的表示或模型变换，并守住“序列边界、特征模板、标签集、归一化、训练目标与解码规则固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“逐位置取最高分替代全局解码，产生不允许的标签转移”就保留失败运行",
    },
    {
      name: "全局条件概率",
      input: "第11章 序列数据的分类：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“序列边界、特征模板、标签集、归一化、训练目标与解码规则固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“逐位置取最高分替代全局解码，产生不允许的标签转移”就保留失败运行",
    },
    {
      name: "参数学习",
      input: "第11章 序列数据的分类：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“序列边界、特征模板、标签集、归一化、训练目标与解码规则固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“逐位置取最高分替代全局解码，产生不允许的标签转移”就保留失败运行",
    },
    {
      name: "序列解码",
      input: "第11章 序列数据的分类：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“序列边界、特征模板、标签集、归一化、训练目标与解码规则固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“逐位置取最高分替代全局解码，产生不允许的标签转移”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对短句序列建立线性链CRF，比较局部贪心和Viterbi全局标签路径。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“输入序列 → 状态与转移特征 → 全局条件概率 → 参数学习 → 序列解码”形成预注册输出。",
      target:
        "满足“序列边界、特征模板、标签集、归一化、训练目标与解码规则固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对短句序列建立线性链CRF，比较局部贪心和Viterbi全局标签路径。 其余条件不变，只注入“逐位置取最高分替代全局解码，产生不允许的标签转移”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第11章 序列数据的分类”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行输入序列、状态与转移特征，保存输入、表示与模型状态",
    "推进全局条件概率、参数学习，记录目标、约束、参数和选择轨迹",
    "在序列解码交付序列切分、特征模板、状态/转移分数、分区函数、梯度、参数、解码表、合法路径和序列级指标。",
  ],
  failureTrace: [
    "“第11章 序列数据的分类”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：逐位置取最高分替代全局解码，产生不允许的标签转移",
    "沿“输入序列 → 状态与转移特征 → 全局条件概率 → 参数学习 → 序列解码”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“序列边界、特征模板、标签集、归一化、训练目标与解码规则固定”恢复才接受修正",
  ],
  invariant: "序列边界、特征模板、标签集、归一化、训练目标与解码规则固定",
  fault: "逐位置取最高分替代全局解码，产生不允许的标签转移",
  artifact:
    "序列切分、特征模板、状态/转移分数、分区函数、梯度、参数、解码表、合法路径和序列级指标。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第11章 序列数据的分类”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail:
        "“第11章 序列数据的分类”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail:
        "“第11章 序列数据的分类”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第11章 序列数据的分类”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml11SequenceClassificationModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml11SequenceClassificationFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml11SequenceClassificationValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
