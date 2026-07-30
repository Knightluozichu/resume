"use client";

import {
  StatisticalMethodEvidenceLab,
  type StatisticalMethodEvidenceModel,
} from "./statistical-method-evidence-lab";

const model = {
  unitId: "slm-03",
  title: "第3章 k近邻法",
  question: "怎样让距离、k值、投票与kd树剪枝在同一查询点上给出可核对结果？",
  concepts: [
    "第3章 k近邻法",
    "3.1 k近邻算法",
    "3.2 k近邻模型",
    "3.2.1 模型",
    "3.2.2 距离度量",
    "3.2.3 k值的选择",
    "3.2.4 分类决策规则",
    "3.3 k近邻法的实现：kd树",
    "3.3.1 构造 kd树",
    "3.3.2 搜索 kd树",
  ],
  stages: [
    {
      name: "尺度与距离",
      known: "第3章 k近邻法：声明对象、符号与适用域，冻结数据、形状和版本",
      transform:
        "只读取本步允许的已知量，并持续满足“尺度、距离度量、k、并列规则、训练索引和树构造顺序固定”",
      result: "尺度与距离产生形式化问题状态",
      check:
        "形式化问题状态、索引和数值断言；出现“在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居”时停止",
    },
    {
      name: "邻域候选",
      known: "第3章 k近邻法：构造模型、结构或分布，冻结数据、形状和版本",
      transform:
        "保存假设、维度与归一条件，并持续满足“尺度、距离度量、k、并列规则、训练索引和树构造顺序固定”",
      result: "邻域候选产生可计算模型状态",
      check:
        "可计算模型状态、索引和数值断言；出现“在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居”时停止",
    },
    {
      name: "k值与投票",
      known: "第3章 k近邻法：建立策略、目标或推断量，冻结数据、形状和版本",
      transform:
        "记录目标、约束和选择理由，并持续满足“尺度、距离度量、k、并列规则、训练索引和树构造顺序固定”",
      result: "k值与投票产生候选优化状态",
      check:
        "候选优化状态、索引和数值断言；出现“在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居”时停止",
    },
    {
      name: "kd树回溯",
      known: "第3章 k近邻法：执行更新、分解或采样，冻结数据、形状和版本",
      transform:
        "保存初值、顺序、随机性与残差，并持续满足“尺度、距离度量、k、并列规则、训练索引和树构造顺序固定”",
      result: "kd树回溯产生可重放数值轨迹",
      check:
        "可重放数值轨迹、索引和数值断言；出现“在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居”时停止",
    },
    {
      name: "预测复核",
      known: "第3章 k近邻法：检查定义、数值与统计结论，冻结数据、形状和版本",
      transform:
        "保留反例、诊断和适用边界，并持续满足“尺度、距离度量、k、并列规则、训练索引和树构造顺序固定”",
      result: "预测复核产生独立方法证据包",
      check:
        "独立方法证据包、索引和数值断言；出现“在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居”时停止",
    },
  ],
  cases: [
    {
      name: "参考推演",
      problem:
        "对一个二维查询点比较穷举近邻与kd树回溯，记录访问节点。 固定符号、数据、初值、顺序、容差和种子。",
      prediction:
        "沿“尺度与距离 → 邻域候选 → k值与投票 → kd树回溯 → 预测复核”得到可复核结果。",
      boundary:
        "全过程必须满足“尺度、距离度量、k、并列规则、训练索引和树构造顺序固定”。",
    },
    {
      name: "边界反例",
      problem:
        "对一个二维查询点比较穷举近邻与kd树回溯，记录访问节点。 其余不变，只注入“在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居”。",
      prediction: "定位第一处定义、形状、目标或数值状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第3章 k近邻法”冻结符号、数据、形状、初值、顺序、容差和随机种子",
    "执行尺度与距离、邻域候选，保存定义、假设与模型状态",
    "推进k值与投票、kd树回溯，记录目标、更新和数值残差",
    "在预测复核交付缩放统计、距离表、邻居ID、k与并列规则、kd树、回溯路径、剪枝界和预测。",
  ],
  faultTrace: [
    "“第3章 k近邻法”复用相同符号、数据、形状、初值、顺序、容差和种子",
    "只改变一个条件：在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居",
    "沿“尺度与距离 → 邻域候选 → k值与投票 → kd树回溯 → 预测复核”寻找最早的定义或数值分叉",
    "撤销故障重放；只有“尺度、距离度量、k、并列规则、训练索引和树构造顺序固定”恢复才接受修正",
  ],
  invariant: "尺度、距离度量、k、并列规则、训练索引和树构造顺序固定",
  fault: "在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居",
  artifact:
    "缩放统计、距离表、邻居ID、k与并列规则、kd树、回溯路径、剪枝界和预测。",
  gates: [
    {
      label: "定义与形状",
      detail: "“第3章 k近邻法”的对象、符号、维度、定义域和归一约定可追溯。",
    },
    {
      label: "模型与目标",
      detail: "“第3章 k近邻法”的假设、分布、损失/似然、约束和选择理由已冻结。",
    },
    {
      label: "算法与数值",
      detail: "“第3章 k近邻法”的初值、顺序、随机性、更新、容差和残差可重放。",
    },
    {
      label: "诊断与边界",
      detail:
        "“第3章 k近邻法”归档反例、收敛/稳定性、独立评估、适用域和时间标签。",
    },
  ],
} as const satisfies StatisticalMethodEvidenceModel;

export function Slm03KnnDerivationPathLab() {
  return <StatisticalMethodEvidenceLab model={model} view="derivation-path" />;
}

export function Slm03KnnNumericalTraceLab() {
  return <StatisticalMethodEvidenceLab model={model} view="numerical-trace" />;
}

export function Slm03KnnClaimGateLab() {
  return <StatisticalMethodEvidenceLab model={model} view="claim-gate" />;
}
