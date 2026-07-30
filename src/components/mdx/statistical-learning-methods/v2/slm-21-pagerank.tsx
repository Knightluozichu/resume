"use client";

import {
  StatisticalMethodEvidenceLab,
  type StatisticalMethodEvidenceModel,
} from "./statistical-method-evidence-lab";

const model = {
  unitId: "slm-21",
  title: "第21章 PageRank算法",
  question:
    "怎样从有向图构造随机矩阵，并处理悬挂节点与不可约性以得到稳定排名？",
  concepts: [
    "第21章 PageRank算法",
    "21.1 PageRank的定义",
    "21.1.1 基本想法",
    "21.1.2 有向图和随机游走模型",
    "21.1.3 PageRank的基本定义",
    "21.1.4 PageRank的一般定义",
    "21.2 PageRank的计算",
    "21.2.1 迭代算法",
    "21.2.2 幂法",
    "21.2.3 代数算法",
  ],
  stages: [
    {
      name: "图与边方向",
      known:
        "第21章 PageRank算法：声明对象、符号与适用域，冻结数据、形状和版本",
      transform:
        "只读取本步允许的已知量，并持续满足“节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定”",
      result: "图与边方向产生形式化问题状态",
      check:
        "形式化问题状态、索引和数值断言；出现“列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名”时停止",
    },
    {
      name: "转移矩阵",
      known: "第21章 PageRank算法：构造模型、结构或分布，冻结数据、形状和版本",
      transform:
        "保存假设、维度与归一条件，并持续满足“节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定”",
      result: "转移矩阵产生可计算模型状态",
      check:
        "可计算模型状态、索引和数值断言；出现“列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名”时停止",
    },
    {
      name: "悬挂与阻尼",
      known:
        "第21章 PageRank算法：建立策略、目标或推断量，冻结数据、形状和版本",
      transform:
        "记录目标、约束和选择理由，并持续满足“节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定”",
      result: "悬挂与阻尼产生候选优化状态",
      check:
        "候选优化状态、索引和数值断言；出现“列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名”时停止",
    },
    {
      name: "幂法迭代",
      known: "第21章 PageRank算法：执行更新、分解或采样，冻结数据、形状和版本",
      transform:
        "保存初值、顺序、随机性与残差，并持续满足“节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定”",
      result: "幂法迭代产生可重放数值轨迹",
      check:
        "可重放数值轨迹、索引和数值断言；出现“列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名”时停止",
    },
    {
      name: "概率与排名验收",
      known:
        "第21章 PageRank算法：检查定义、数值与统计结论，冻结数据、形状和版本",
      transform:
        "保留反例、诊断和适用边界，并持续满足“节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定”",
      result: "概率与排名验收产生独立方法证据包",
      check:
        "独立方法证据包、索引和数值断言；出现“列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名”时停止",
    },
  ],
  cases: [
    {
      name: "参考推演",
      problem:
        "对一个含悬挂节点的小图手算基本PageRank与带阻尼幂迭代。 固定符号、数据、初值、顺序、容差和种子。",
      prediction:
        "沿“图与边方向 → 转移矩阵 → 悬挂与阻尼 → 幂法迭代 → 概率与排名验收”得到可复核结果。",
      boundary:
        "全过程必须满足“节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定”。",
    },
    {
      name: "边界反例",
      problem:
        "对一个含悬挂节点的小图手算基本PageRank与带阻尼幂迭代。 其余不变，只注入“列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名”。",
      prediction: "定位第一处定义、形状、目标或数值状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第21章 PageRank算法”冻结符号、数据、形状、初值、顺序、容差和随机种子",
    "执行图与边方向、转移矩阵，保存定义、假设与模型状态",
    "推进悬挂与阻尼、幂法迭代，记录目标、更新和数值残差",
    "在概率与排名验收交付节点/边表、随机矩阵、列/行约定、悬挂修复、阻尼、迭代向量、概率和、残差与排名。",
  ],
  faultTrace: [
    "“第21章 PageRank算法”复用相同符号、数据、形状、初值、顺序、容差和种子",
    "只改变一个条件：列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名",
    "沿“图与边方向 → 转移矩阵 → 悬挂与阻尼 → 幂法迭代 → 概率与排名验收”寻找最早的定义或数值分叉",
    "撤销故障重放；只有“节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定”恢复才接受修正",
  ],
  invariant: "节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定",
  fault: "列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名",
  artifact:
    "节点/边表、随机矩阵、列/行约定、悬挂修复、阻尼、迭代向量、概率和、残差与排名。",
  gates: [
    {
      label: "定义与形状",
      detail:
        "“第21章 PageRank算法”的对象、符号、维度、定义域和归一约定可追溯。",
    },
    {
      label: "模型与目标",
      detail:
        "“第21章 PageRank算法”的假设、分布、损失/似然、约束和选择理由已冻结。",
    },
    {
      label: "算法与数值",
      detail:
        "“第21章 PageRank算法”的初值、顺序、随机性、更新、容差和残差可重放。",
    },
    {
      label: "诊断与边界",
      detail:
        "“第21章 PageRank算法”归档反例、收敛/稳定性、独立评估、适用域和时间标签。",
    },
  ],
} as const satisfies StatisticalMethodEvidenceModel;

export function Slm21PagerankDerivationPathLab() {
  return <StatisticalMethodEvidenceLab model={model} view="derivation-path" />;
}

export function Slm21PagerankNumericalTraceLab() {
  return <StatisticalMethodEvidenceLab model={model} view="numerical-trace" />;
}

export function Slm21PagerankClaimGateLab() {
  return <StatisticalMethodEvidenceLab model={model} view="claim-gate" />;
}
