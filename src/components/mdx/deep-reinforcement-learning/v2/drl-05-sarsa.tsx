"use client";

import {
  RlSystemsEvidenceLab,
  type RlSystemsEvidenceModel,
} from "./rl-systems-evidence-lab";

const model = {
  unitId: "drl-05",
  title: "第5章 SARSA算法",
  question: "行为策略真实选择的下一动作怎样进入同策略SARSA目标？",
  concepts: [
    "第5章 SARSA算法",
    "5.1 表格形式的SARSA",
    "5.1.1 算法推导",
    "5.1.2 训练流程",
    "5.1.3 Q学习与SARSA的对比",
    "5.2 神经网络形式的SARSA",
    "5.2.1 价值网络",
    "5.2.2 算法推导",
    "5.2.3 训练流程",
    "5.3 多步TD目标",
    "5.3.1 算法推导",
    "5.3.2 多步TD目标的原理",
    "5.3.3 训练流程",
    "5.4 蒙特卡洛方法与自举",
    "5.4.1 蒙特卡洛方法",
    "5.4.2 自举",
    "5.4.3 蒙特卡洛方法和自举的对比",
  ],
  invariant: "同一轨迹、行为概率、步数、折扣与终止规则下只改变目标定义",
  fault: "用下一状态最大Q值替代行为策略实际选择的下一动作",
  artifact: "逐步目标、TD误差、Q表差异与n步截断记录",
  stages: [
    {
      name: "第5章 SARSA算法 · 环境与角色",
      input: "让SARSA与Q学习复用同一批轨迹和Q表",
      operation:
        "冻结同策略、自举与多步回报所需的环境版本、观测/状态、动作、奖励和数据角色",
      output: "第5章 SARSA算法的环境合同、策略快照与基线轨迹",
      check: "第5章 SARSA算法的角色、时间索引、shape、终止和可见性没有错位",
    },
    {
      name: "第5章 SARSA算法 · 回报与目标",
      input: "第5章 SARSA算法的冻结轨迹和策略快照",
      operation:
        "按比较SARSA、Q学习、多步TD、蒙特卡洛与自举的目标构造和策略角色构造回报、目标、估计量或搜索统计",
      output: "第5章 SARSA算法的逐步回报、目标分量与中间状态",
      check: "第5章 SARSA算法的目标可由同一轨迹、公式和随机状态复算",
    },
    {
      name: "第5章 SARSA算法 · 更新与策略",
      input: "第5章 SARSA算法的目标、中间状态和参数版本",
      operation: "执行一次受控更新并记录策略、价值、梯度或联合决策的变化",
      output: "第5章 SARSA算法的更新前后差、首个分岔和恢复路径",
      check: "第5章 SARSA算法没有把代理损失、单次回报或训练内统计当作最终结论",
    },
    {
      name: "第5章 SARSA算法 · 独立评估",
      input: "第5章 SARSA算法的冻结候选、环境种子、对手/行为策略快照与未见回合",
      operation: "重放基线、单故障、恢复和边界案例",
      output: "第5章 SARSA算法的接受、回退或拒绝理由",
      check:
        "第5章 SARSA算法满足“同一轨迹、行为概率、步数、折扣与终止规则下只改变目标定义”",
    },
  ],
  cases: [
    {
      name: "第5章 SARSA算法 · 基线",
      setup:
        "固定让SARSA与Q学习复用同一批轨迹和Q表的环境、策略、种子、预算和对手快照",
      prediction:
        "第5章 SARSA算法的参考轨迹应持续满足“同一轨迹、行为概率、步数、折扣与终止规则下只改变目标定义”",
      boundary: "第5章 SARSA算法只回答本页原版坐标和已运行实验合同内的问题",
    },
    {
      name: "第5章 SARSA算法 · 单故障",
      setup:
        "保持其他条件不变，只注入“用下一状态最大Q值替代行为策略实际选择的下一动作”",
      prediction:
        "第5章 SARSA算法应出现可定位的首个状态分岔，而不是只在末端回报异常",
      boundary:
        "第5章 SARSA算法的故障结论不能外推到未运行的环境、策略、对手或部署流量",
    },
    {
      name: "第5章 SARSA算法 · 恢复",
      setup: "撤销故障并从同一快照重放让SARSA与Q学习复用同一批轨迹和Q表",
      prediction: "第5章 SARSA算法的轨迹、独立评估与交付证据应恢复基线",
      boundary: "第5章 SARSA算法若不能复现恢复结果，就不能把异常归因给单一故障",
    },
  ],
  referenceTrace: [
    "第5章 SARSA算法参考步骤1：冻结同策略、自举与多步回报所需的环境版本、观测/状态、动作、奖励和数据角色；保存第5章 SARSA算法的环境合同、策略快照与基线轨迹。",
    "第5章 SARSA算法参考步骤2：按比较SARSA、Q学习、多步TD、蒙特卡洛与自举的目标构造和策略角色构造回报、目标、估计量或搜索统计；保存第5章 SARSA算法的逐步回报、目标分量与中间状态。",
    "第5章 SARSA算法参考步骤3：执行一次受控更新并记录策略、价值、梯度或联合决策的变化；保存第5章 SARSA算法的更新前后差、首个分岔和恢复路径。",
    "第5章 SARSA算法参考步骤4：重放基线、单故障、恢复和边界案例；保存第5章 SARSA算法的接受、回退或拒绝理由。",
  ],
  faultTrace: [
    "第5章 SARSA算法故障步骤1：保持让SARSA与Q学习复用同一批轨迹和Q表不变，检查第5章 SARSA算法的环境合同、策略快照与基线轨迹如何受单一故障传播。",
    "第5章 SARSA算法故障步骤2：只注入“用下一状态最大Q值替代行为策略实际选择的下一动作”，记录首个偏离“第5章 SARSA算法的目标可由同一轨迹、公式和随机状态复算”的状态。",
    "第5章 SARSA算法故障步骤3：保持第5章 SARSA算法的目标、中间状态和参数版本不变，检查第5章 SARSA算法的更新前后差、首个分岔和恢复路径如何受单一故障传播。",
    "第5章 SARSA算法故障步骤4：保持第5章 SARSA算法的冻结候选、环境种子、对手/行为策略快照与未见回合不变，检查第5章 SARSA算法的接受、回退或拒绝理由如何受单一故障传播。",
  ],
  gates: [
    {
      label: "原版结构与访问边界",
      detail:
        "第5章 SARSA算法区分作者官方代码仓库、发行版目录、独立技术来源与本站重写；仓库没有可据以复用代码或正文的明确许可，所以不复制代码、图表或原文。",
    },
    {
      label: "环境、轨迹与数据合同",
      detail:
        "第5章 SARSA算法的环境版本、观测/状态、动作、奖励、终止、策略快照、shape和随机性可从同一快照复算。",
    },
    {
      label: "回报、目标与更新合同",
      detail:
        "第5章 SARSA算法的回报、目标分量、梯度/估计、更新前后参数、行为策略和对手版本已归档。",
    },
    {
      label: "独立评估与应用边界",
      detail:
        "第5章 SARSA算法用未见种子、冻结策略/对手或独立诊断复核“同一轨迹、行为概率、步数、折扣与终止规则下只改变目标定义”，并报告“用下一状态最大Q值替代行为策略实际选择的下一动作”的恢复结果。",
    },
  ],
} as const satisfies RlSystemsEvidenceModel;

export function Drl05SarsaEnvironmentContractLab() {
  return <RlSystemsEvidenceLab model={model} view="environment-contract" />;
}

export function Drl05SarsaReturnUpdateTraceLab() {
  return <RlSystemsEvidenceLab model={model} view="return-update-trace" />;
}

export function Drl05SarsaEvaluationGateLab() {
  return <RlSystemsEvidenceLab model={model} view="evaluation-gate" />;
}
