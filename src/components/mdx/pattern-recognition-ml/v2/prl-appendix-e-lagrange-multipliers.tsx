"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-app-e",
  title: "附录E 拉格朗日乘子",
  question:
    "怎样从可行集、梯度与乘子得到驻点，并区分必要条件、数值解和最优性？",
  concepts: ["Appendix E Lagrange Multipliers"],
  stages: [
    {
      name: "声明目标约束",
      prior:
        "附录E 拉格朗日乘子：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定”",
      posterior: "声明目标约束产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解”时停止",
    },
    {
      name: "构造拉格朗日量",
      prior:
        "附录E 拉格朗日乘子：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定”",
      posterior: "构造拉格朗日量产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解”时停止",
    },
    {
      name: "求驻点",
      prior:
        "附录E 拉格朗日乘子：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定”",
      posterior: "求驻点产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解”时停止",
    },
    {
      name: "检查可行性",
      prior:
        "附录E 拉格朗日乘子：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定”",
      posterior: "检查可行性产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解”时停止",
    },
    {
      name: "判断最优性",
      prior:
        "附录E 拉格朗日乘子：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定”",
      posterior: "判断最优性产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对归一概率和单位范数约束分别建立拉格朗日系统。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“声明目标约束 → 构造拉格朗日量 → 求驻点 → 检查可行性 → 判断最优性”得到可复核概率结论。",
      boundary:
        "全过程必须满足“目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对归一概率和单位范数约束分别建立拉格朗日系统。 其余条件不变，只注入“只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“附录E 拉格朗日乘子”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行声明目标约束、构造拉格朗日量，保存支持集、假设、分布或图结构",
    "推进求驻点、检查可行性，记录推断目标、更新、残差与预测不确定性",
    "在判断最优性交付目标与约束、梯度、乘子、KKT/驻点方程、可行残差、二阶信息、候选比较和边界反例。",
  ],
  faultTrace: [
    "“附录E 拉格朗日乘子”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解",
    "沿“声明目标约束 → 构造拉格朗日量 → 求驻点 → 检查可行性 → 判断最优性”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定”恢复才接受修正",
  ],
  invariant: "目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定",
  fault: "只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解",
  artifact:
    "目标与约束、梯度、乘子、KKT/驻点方程、可行残差、二阶信息、候选比较和边界反例。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“附录E 拉格朗日乘子”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“附录E 拉格朗日乘子”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“附录E 拉格朗日乘子”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“附录E 拉格朗日乘子”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function PrlAppendixELagrangeMultipliersProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function PrlAppendixELagrangeMultipliersInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function PrlAppendixELagrangeMultipliersPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
