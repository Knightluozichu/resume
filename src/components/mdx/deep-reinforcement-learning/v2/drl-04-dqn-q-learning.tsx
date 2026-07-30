"use client";

import {
  RlSystemsEvidenceLab,
  type RlSystemsEvidenceModel,
} from "./rl-systems-evidence-lab";

const model = {
  unitId: "drl-04",
  title: "第4章 DQN与Q学习",
  question: "行为策略生成的转移怎样成为Q学习目标，而不泄漏当前目标值？",
  concepts: [
    "第二部分 价值学习",
    "第4章 DQN与Q学习",
    "4.1 DQN",
    "4.1.1 概念回顾",
    "4.1.2 DQN表达式",
    "4.1.3 DQN的梯度",
    "4.2 TD算法",
    "4.2.1 驾车时间预测示例",
    "4.2.2 TD算法的原理",
    "4.3 用TD训练DQN",
    "4.3.1 算法推导",
    "4.3.2 训练流程",
    "4.4 Q学习算法",
    "4.4.1 表格形式的Q学习",
    "4.4.2 算法推导",
    "4.4.3 训练流程",
    "4.5 同策略与异策略",
  ],
  invariant: "转移五元组、行为策略、目标网络快照、折扣与终止掩码被冻结",
  fault: "目标网络在计算TD目标前已被在线网络覆盖",
  artifact: "回放索引、TD目标、损失、梯度与目标同步日志",
  stages: [
    {
      name: "第4章 DQN与Q学习 · 环境与角色",
      input: "从固定回放批次执行一次DQN更新",
      operation:
        "冻结异策略TD目标与DQN更新所需的环境版本、观测/状态、动作、奖励和数据角色",
      output: "第4章 DQN与Q学习的环境合同、策略快照与基线轨迹",
      check: "第4章 DQN与Q学习的角色、时间索引、shape、终止和可见性没有错位",
    },
    {
      name: "第4章 DQN与Q学习 · 回报与目标",
      input: "第4章 DQN与Q学习的冻结轨迹和策略快照",
      operation:
        "按从TD误差、经验回放与目标网络推导DQN和异策略Q学习更新构造回报、目标、估计量或搜索统计",
      output: "第4章 DQN与Q学习的逐步回报、目标分量与中间状态",
      check: "第4章 DQN与Q学习的目标可由同一轨迹、公式和随机状态复算",
    },
    {
      name: "第4章 DQN与Q学习 · 更新与策略",
      input: "第4章 DQN与Q学习的目标、中间状态和参数版本",
      operation: "执行一次受控更新并记录策略、价值、梯度或联合决策的变化",
      output: "第4章 DQN与Q学习的更新前后差、首个分岔和恢复路径",
      check: "第4章 DQN与Q学习没有把代理损失、单次回报或训练内统计当作最终结论",
    },
    {
      name: "第4章 DQN与Q学习 · 独立评估",
      input:
        "第4章 DQN与Q学习的冻结候选、环境种子、对手/行为策略快照与未见回合",
      operation: "重放基线、单故障、恢复和边界案例",
      output: "第4章 DQN与Q学习的接受、回退或拒绝理由",
      check:
        "第4章 DQN与Q学习满足“转移五元组、行为策略、目标网络快照、折扣与终止掩码被冻结”",
    },
  ],
  cases: [
    {
      name: "第4章 DQN与Q学习 · 基线",
      setup:
        "固定从固定回放批次执行一次DQN更新的环境、策略、种子、预算和对手快照",
      prediction:
        "第4章 DQN与Q学习的参考轨迹应持续满足“转移五元组、行为策略、目标网络快照、折扣与终止掩码被冻结”",
      boundary: "第4章 DQN与Q学习只回答本页原版坐标和已运行实验合同内的问题",
    },
    {
      name: "第4章 DQN与Q学习 · 单故障",
      setup: "保持其他条件不变，只注入“目标网络在计算TD目标前已被在线网络覆盖”",
      prediction:
        "第4章 DQN与Q学习应出现可定位的首个状态分岔，而不是只在末端回报异常",
      boundary:
        "第4章 DQN与Q学习的故障结论不能外推到未运行的环境、策略、对手或部署流量",
    },
    {
      name: "第4章 DQN与Q学习 · 恢复",
      setup: "撤销故障并从同一快照重放从固定回放批次执行一次DQN更新",
      prediction: "第4章 DQN与Q学习的轨迹、独立评估与交付证据应恢复基线",
      boundary:
        "第4章 DQN与Q学习若不能复现恢复结果，就不能把异常归因给单一故障",
    },
  ],
  referenceTrace: [
    "第4章 DQN与Q学习参考步骤1：冻结异策略TD目标与DQN更新所需的环境版本、观测/状态、动作、奖励和数据角色；保存第4章 DQN与Q学习的环境合同、策略快照与基线轨迹。",
    "第4章 DQN与Q学习参考步骤2：按从TD误差、经验回放与目标网络推导DQN和异策略Q学习更新构造回报、目标、估计量或搜索统计；保存第4章 DQN与Q学习的逐步回报、目标分量与中间状态。",
    "第4章 DQN与Q学习参考步骤3：执行一次受控更新并记录策略、价值、梯度或联合决策的变化；保存第4章 DQN与Q学习的更新前后差、首个分岔和恢复路径。",
    "第4章 DQN与Q学习参考步骤4：重放基线、单故障、恢复和边界案例；保存第4章 DQN与Q学习的接受、回退或拒绝理由。",
  ],
  faultTrace: [
    "第4章 DQN与Q学习故障步骤1：保持从固定回放批次执行一次DQN更新不变，检查第4章 DQN与Q学习的环境合同、策略快照与基线轨迹如何受单一故障传播。",
    "第4章 DQN与Q学习故障步骤2：只注入“目标网络在计算TD目标前已被在线网络覆盖”，记录首个偏离“第4章 DQN与Q学习的目标可由同一轨迹、公式和随机状态复算”的状态。",
    "第4章 DQN与Q学习故障步骤3：保持第4章 DQN与Q学习的目标、中间状态和参数版本不变，检查第4章 DQN与Q学习的更新前后差、首个分岔和恢复路径如何受单一故障传播。",
    "第4章 DQN与Q学习故障步骤4：保持第4章 DQN与Q学习的冻结候选、环境种子、对手/行为策略快照与未见回合不变，检查第4章 DQN与Q学习的接受、回退或拒绝理由如何受单一故障传播。",
  ],
  gates: [
    {
      label: "原版结构与访问边界",
      detail:
        "第4章 DQN与Q学习区分作者官方代码仓库、发行版目录、独立技术来源与本站重写；仓库没有可据以复用代码或正文的明确许可，所以不复制代码、图表或原文。",
    },
    {
      label: "环境、轨迹与数据合同",
      detail:
        "第4章 DQN与Q学习的环境版本、观测/状态、动作、奖励、终止、策略快照、shape和随机性可从同一快照复算。",
    },
    {
      label: "回报、目标与更新合同",
      detail:
        "第4章 DQN与Q学习的回报、目标分量、梯度/估计、更新前后参数、行为策略和对手版本已归档。",
    },
    {
      label: "独立评估与应用边界",
      detail:
        "第4章 DQN与Q学习用未见种子、冻结策略/对手或独立诊断复核“转移五元组、行为策略、目标网络快照、折扣与终止掩码被冻结”，并报告“目标网络在计算TD目标前已被在线网络覆盖”的恢复结果。",
    },
  ],
} as const satisfies RlSystemsEvidenceModel;

export function Drl04DqnQLearningEnvironmentContractLab() {
  return <RlSystemsEvidenceLab model={model} view="environment-contract" />;
}

export function Drl04DqnQLearningReturnUpdateTraceLab() {
  return <RlSystemsEvidenceLab model={model} view="return-update-trace" />;
}

export function Drl04DqnQLearningEvaluationGateLab() {
  return <RlSystemsEvidenceLab model={model} view="evaluation-gate" />;
}
