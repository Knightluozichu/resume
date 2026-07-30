"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-13",
  title: "第13章 序列数据 Sequential Data",
  question:
    "怎样让概率计算、参数学习、路径解码与滤波共享一致的时间索引和状态语义？",
  concepts: [
    "13 Sequential Data",
    "13.1 Markov Models",
    "13.2 Hidden Markov Models",
    "13.2.1 Maximum likelihood for the HMM",
    "13.2.2 The forward-backward algorithm",
    "13.2.3 The sum-product algorithm for the HMM",
    "13.2.4 Scaling factors",
    "13.2.5 The Viterbi algorithm",
    "13.2.6 Extensions of the hidden Markov model",
    "13.3 Linear Dynamical Systems",
    "13.3.1 Inference in LDS",
    "13.3.2 Learning in LDS",
    "13.3.3 Extensions of LDS",
    "13.3.4 Particle filters",
  ],
  stages: [
    {
      name: "定义状态空间",
      prior:
        "第13章 序列数据 Sequential Data：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定”",
      posterior: "定义状态空间产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“训练与解码使用不同索引，或数值下溢被误解为零概率”时停止",
    },
    {
      name: "前向过滤",
      prior:
        "第13章 序列数据 Sequential Data：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定”",
      posterior: "前向过滤产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“训练与解码使用不同索引，或数值下溢被误解为零概率”时停止",
    },
    {
      name: "后向平滑",
      prior:
        "第13章 序列数据 Sequential Data：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定”",
      posterior: "后向平滑产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“训练与解码使用不同索引，或数值下溢被误解为零概率”时停止",
    },
    {
      name: "学习或解码",
      prior:
        "第13章 序列数据 Sequential Data：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定”",
      posterior: "学习或解码产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“训练与解码使用不同索引，或数值下溢被误解为零概率”时停止",
    },
    {
      name: "检查序列证据",
      prior:
        "第13章 序列数据 Sequential Data：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定”",
      posterior: "检查序列证据产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“训练与解码使用不同索引，或数值下溢被误解为零概率”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对短离散序列和连续轨迹分别运行HMM、LDS与粒子滤波。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“定义状态空间 → 前向过滤 → 后向平滑 → 学习或解码 → 检查序列证据”得到可复核概率结论。",
      boundary:
        "全过程必须满足“状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对短离散序列和连续轨迹分别运行HMM、LDS与粒子滤波。 其余条件不变，只注入“训练与解码使用不同索引，或数值下溢被误解为零概率”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第13章 序列数据 Sequential Data”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行定义状态空间、前向过滤，保存支持集、假设、分布或图结构",
    "推进后向平滑、学习或解码，记录推断目标、更新、残差与预测不确定性",
    "在检查序列证据交付状态/观测、初始/转移/发射、缩放alpha/beta、期望计数、Viterbi回溯、Kalman状态、粒子权重和退化诊断。",
  ],
  faultTrace: [
    "“第13章 序列数据 Sequential Data”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：训练与解码使用不同索引，或数值下溢被误解为零概率",
    "沿“定义状态空间 → 前向过滤 → 后向平滑 → 学习或解码 → 检查序列证据”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定”恢复才接受修正",
  ],
  invariant:
    "状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定",
  fault: "训练与解码使用不同索引，或数值下溢被误解为零概率",
  artifact:
    "状态/观测、初始/转移/发射、缩放alpha/beta、期望计数、Viterbi回溯、Kalman状态、粒子权重和退化诊断。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第13章 序列数据 Sequential Data”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第13章 序列数据 Sequential Data”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第13章 序列数据 Sequential Data”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第13章 序列数据 Sequential Data”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl13SequentialDataProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl13SequentialDataInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl13SequentialDataPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
