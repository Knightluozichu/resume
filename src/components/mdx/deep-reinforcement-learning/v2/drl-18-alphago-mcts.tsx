"use client";

import {
  RlSystemsEvidenceLab,
  type RlSystemsEvidenceModel,
} from "./rl-systems-evidence-lab";

const model = {
  unitId: "drl-18",
  title: "第18章 AlphaGo与蒙特卡洛树搜索",
  question: "搜索统计、策略先验、价值估计与自博弈数据怎样避免角色混淆？",
  concepts: [
    "第五部分 应用与展望",
    "第18章 AlphaGo与蒙特卡洛树搜索",
    "18.1 强化学习眼中的围棋",
    "18.2 蒙特卡洛树搜索",
    "18.2.1 MCTS的基本思想",
    "18.2.2 MCTS的四个步骤",
    "18.2.3 MCTS的决策",
    "18.3 训练策略网络和价值网络",
    "18.3.1 AlphaGo 2016版本的训练",
    "18.3.2 AlphaGo Zero版本的训练",
  ],
  invariant: "节点状态、先验、访问次数、价值视角、虚拟损失和搜索预算一致",
  fault: "切换根节点后沿用不兼容的访问统计并当作新局面证据",
  artifact: "搜索树快照、PUCT分量、回传符号与自博弈数据谱系",
  stages: [
    {
      name: "第18章 AlphaGo与蒙特卡洛树搜索 · 环境与角色",
      input: "在固定棋局与预算下逐步重放一棵搜索树",
      operation:
        "冻结树搜索统计、策略价值与自博弈所需的环境版本、观测/状态、动作、奖励和数据角色",
      output: "第18章 AlphaGo与蒙特卡洛树搜索的环境合同、策略快照与基线轨迹",
      check:
        "第18章 AlphaGo与蒙特卡洛树搜索的角色、时间索引、shape、终止和可见性没有错位",
    },
    {
      name: "第18章 AlphaGo与蒙特卡洛树搜索 · 回报与目标",
      input: "第18章 AlphaGo与蒙特卡洛树搜索的冻结轨迹和策略快照",
      operation:
        "按用选择、扩展、评估、回传四步连接MCTS与AlphaGo/AlphaGo Zero的策略价值学习构造回报、目标、估计量或搜索统计",
      output: "第18章 AlphaGo与蒙特卡洛树搜索的逐步回报、目标分量与中间状态",
      check:
        "第18章 AlphaGo与蒙特卡洛树搜索的目标可由同一轨迹、公式和随机状态复算",
    },
    {
      name: "第18章 AlphaGo与蒙特卡洛树搜索 · 更新与策略",
      input: "第18章 AlphaGo与蒙特卡洛树搜索的目标、中间状态和参数版本",
      operation: "执行一次受控更新并记录策略、价值、梯度或联合决策的变化",
      output: "第18章 AlphaGo与蒙特卡洛树搜索的更新前后差、首个分岔和恢复路径",
      check:
        "第18章 AlphaGo与蒙特卡洛树搜索没有把代理损失、单次回报或训练内统计当作最终结论",
    },
    {
      name: "第18章 AlphaGo与蒙特卡洛树搜索 · 独立评估",
      input:
        "第18章 AlphaGo与蒙特卡洛树搜索的冻结候选、环境种子、对手/行为策略快照与未见回合",
      operation: "重放基线、单故障、恢复和边界案例",
      output: "第18章 AlphaGo与蒙特卡洛树搜索的接受、回退或拒绝理由",
      check:
        "第18章 AlphaGo与蒙特卡洛树搜索满足“节点状态、先验、访问次数、价值视角、虚拟损失和搜索预算一致”",
    },
  ],
  cases: [
    {
      name: "第18章 AlphaGo与蒙特卡洛树搜索 · 基线",
      setup:
        "固定在固定棋局与预算下逐步重放一棵搜索树的环境、策略、种子、预算和对手快照",
      prediction:
        "第18章 AlphaGo与蒙特卡洛树搜索的参考轨迹应持续满足“节点状态、先验、访问次数、价值视角、虚拟损失和搜索预算一致”",
      boundary:
        "第18章 AlphaGo与蒙特卡洛树搜索只回答本页原版坐标和已运行实验合同内的问题",
    },
    {
      name: "第18章 AlphaGo与蒙特卡洛树搜索 · 单故障",
      setup:
        "保持其他条件不变，只注入“切换根节点后沿用不兼容的访问统计并当作新局面证据”",
      prediction:
        "第18章 AlphaGo与蒙特卡洛树搜索应出现可定位的首个状态分岔，而不是只在末端回报异常",
      boundary:
        "第18章 AlphaGo与蒙特卡洛树搜索的故障结论不能外推到未运行的环境、策略、对手或部署流量",
    },
    {
      name: "第18章 AlphaGo与蒙特卡洛树搜索 · 恢复",
      setup: "撤销故障并从同一快照重放在固定棋局与预算下逐步重放一棵搜索树",
      prediction:
        "第18章 AlphaGo与蒙特卡洛树搜索的轨迹、独立评估与交付证据应恢复基线",
      boundary:
        "第18章 AlphaGo与蒙特卡洛树搜索若不能复现恢复结果，就不能把异常归因给单一故障",
    },
  ],
  referenceTrace: [
    "第18章 AlphaGo与蒙特卡洛树搜索参考步骤1：冻结树搜索统计、策略价值与自博弈所需的环境版本、观测/状态、动作、奖励和数据角色；保存第18章 AlphaGo与蒙特卡洛树搜索的环境合同、策略快照与基线轨迹。",
    "第18章 AlphaGo与蒙特卡洛树搜索参考步骤2：按用选择、扩展、评估、回传四步连接MCTS与AlphaGo/AlphaGo Zero的策略价值学习构造回报、目标、估计量或搜索统计；保存第18章 AlphaGo与蒙特卡洛树搜索的逐步回报、目标分量与中间状态。",
    "第18章 AlphaGo与蒙特卡洛树搜索参考步骤3：执行一次受控更新并记录策略、价值、梯度或联合决策的变化；保存第18章 AlphaGo与蒙特卡洛树搜索的更新前后差、首个分岔和恢复路径。",
    "第18章 AlphaGo与蒙特卡洛树搜索参考步骤4：重放基线、单故障、恢复和边界案例；保存第18章 AlphaGo与蒙特卡洛树搜索的接受、回退或拒绝理由。",
  ],
  faultTrace: [
    "第18章 AlphaGo与蒙特卡洛树搜索故障步骤1：保持在固定棋局与预算下逐步重放一棵搜索树不变，检查第18章 AlphaGo与蒙特卡洛树搜索的环境合同、策略快照与基线轨迹如何受单一故障传播。",
    "第18章 AlphaGo与蒙特卡洛树搜索故障步骤2：只注入“切换根节点后沿用不兼容的访问统计并当作新局面证据”，记录首个偏离“第18章 AlphaGo与蒙特卡洛树搜索的目标可由同一轨迹、公式和随机状态复算”的状态。",
    "第18章 AlphaGo与蒙特卡洛树搜索故障步骤3：保持第18章 AlphaGo与蒙特卡洛树搜索的目标、中间状态和参数版本不变，检查第18章 AlphaGo与蒙特卡洛树搜索的更新前后差、首个分岔和恢复路径如何受单一故障传播。",
    "第18章 AlphaGo与蒙特卡洛树搜索故障步骤4：保持第18章 AlphaGo与蒙特卡洛树搜索的冻结候选、环境种子、对手/行为策略快照与未见回合不变，检查第18章 AlphaGo与蒙特卡洛树搜索的接受、回退或拒绝理由如何受单一故障传播。",
  ],
  gates: [
    {
      label: "原版结构与访问边界",
      detail:
        "第18章 AlphaGo与蒙特卡洛树搜索区分作者官方代码仓库、发行版目录、独立技术来源与本站重写；仓库没有可据以复用代码或正文的明确许可，所以不复制代码、图表或原文。",
    },
    {
      label: "环境、轨迹与数据合同",
      detail:
        "第18章 AlphaGo与蒙特卡洛树搜索的环境版本、观测/状态、动作、奖励、终止、策略快照、shape和随机性可从同一快照复算。",
    },
    {
      label: "回报、目标与更新合同",
      detail:
        "第18章 AlphaGo与蒙特卡洛树搜索的回报、目标分量、梯度/估计、更新前后参数、行为策略和对手版本已归档。",
    },
    {
      label: "独立评估与应用边界",
      detail:
        "第18章 AlphaGo与蒙特卡洛树搜索用未见种子、冻结策略/对手或独立诊断复核“节点状态、先验、访问次数、价值视角、虚拟损失和搜索预算一致”，并报告“切换根节点后沿用不兼容的访问统计并当作新局面证据”的恢复结果。",
    },
  ],
} as const satisfies RlSystemsEvidenceModel;

export function Drl18AlphagoMctsEnvironmentContractLab() {
  return <RlSystemsEvidenceLab model={model} view="environment-contract" />;
}

export function Drl18AlphagoMctsReturnUpdateTraceLab() {
  return <RlSystemsEvidenceLab model={model} view="return-update-trace" />;
}

export function Drl18AlphagoMctsEvaluationGateLab() {
  return <RlSystemsEvidenceLab model={model} view="evaluation-gate" />;
}
