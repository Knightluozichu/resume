"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-app-b",
  title: "附录B 概率分布",
  question: "怎样用支持集、归一、矩和采样检查统一核对正文使用的概率分布？",
  concepts: ["Appendix B Probability Distributions"],
  stages: [
    {
      name: "声明参数化",
      prior: "附录B 概率分布：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定”",
      posterior: "声明参数化产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“混用不同软件的参数化，或在定义域外仍计算有限密度”时停止",
    },
    {
      name: "核对支持集",
      prior: "附录B 概率分布：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定”",
      posterior: "核对支持集产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“混用不同软件的参数化，或在定义域外仍计算有限密度”时停止",
    },
    {
      name: "验证归一",
      prior:
        "附录B 概率分布：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定”",
      posterior: "验证归一产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“混用不同软件的参数化，或在定义域外仍计算有限密度”时停止",
    },
    {
      name: "计算矩",
      prior: "附录B 概率分布：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定”",
      posterior: "计算矩产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“混用不同软件的参数化，或在定义域外仍计算有限密度”时停止",
    },
    {
      name: "采样复核",
      prior:
        "附录B 概率分布：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定”",
      posterior: "采样复核产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“混用不同软件的参数化，或在定义域外仍计算有限密度”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "为正文常用离散与连续分布建立参数化对照和数值检查。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“声明参数化 → 核对支持集 → 验证归一 → 计算矩 → 采样复核”得到可复核概率结论。",
      boundary:
        "全过程必须满足“分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定”。",
    },
    {
      name: "边界反例",
      observation:
        "为正文常用离散与连续分布建立参数化对照和数值检查。 其余条件不变，只注入“混用不同软件的参数化，或在定义域外仍计算有限密度”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“附录B 概率分布”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行声明参数化、核对支持集，保存支持集、假设、分布或图结构",
    "推进验证归一、计算矩，记录推断目标、更新、残差与预测不确定性",
    "在采样复核交付分布名称、参数化、支持集、密度/质量、归一积分、矩、边界值、采样直方图和软件版本。",
  ],
  faultTrace: [
    "“附录B 概率分布”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：混用不同软件的参数化，或在定义域外仍计算有限密度",
    "沿“声明参数化 → 核对支持集 → 验证归一 → 计算矩 → 采样复核”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定”恢复才接受修正",
  ],
  invariant: "分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定",
  fault: "混用不同软件的参数化，或在定义域外仍计算有限密度",
  artifact:
    "分布名称、参数化、支持集、密度/质量、归一积分、矩、边界值、采样直方图和软件版本。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“附录B 概率分布”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“附录B 概率分布”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“附录B 概率分布”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“附录B 概率分布”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function PrlAppendixBProbabilityDistributionsProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function PrlAppendixBProbabilityDistributionsInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function PrlAppendixBProbabilityDistributionsPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
