"use client";

import { RlEvidenceLab, type RlEvidenceModel } from "./rl-evidence-lab";

const model = {
  unitId: "dlr-app-c",
  title: "附录C Double DQN的理解",
  question:
    "怎样用同一批带噪估计证明过大估计来自选择偏差，并核对两套网络的职责？",
  concepts: [
    "附录C Double DQN的理解",
    "C.1 什么是过大估计",
    "C.2 过大估计的解决方法",
  ],
  stages: [
    {
      name: "生成噪声估计",
      input:
        "附录C Double DQN的理解在“生成噪声估计”读取环境版本、状态/动作空间、奖励、终止语义、初始分布、策略与随机种子。",
      transition:
        "附录C Double DQN的理解在“生成噪声估计”阶段冻结本页问题所需的任务快照，不运行训练或评估。",
      output:
        "附录C Double DQN的理解在“生成噪声估计”阶段产出可哈希的环境与策略前置状态。",
      evidence:
        "附录C Double DQN的理解在“生成噪声估计”阶段保存环境配置、空间定义、种子、参数版本与允许读取的信息。",
    },
    {
      name: "在线选择",
      input:
        "附录C Double DQN的理解在“在线选择”读取冻结的任务快照、当前状态、合法动作与策略概率。",
      transition:
        "附录C Double DQN的理解在“在线选择”阶段只执行一次已声明的动作选择或环境转移。",
      output:
        "附录C Double DQN的理解在“在线选择”阶段产出状态、动作、奖励、下一状态和终止标记。",
      evidence:
        "附录C Double DQN的理解在“在线选择”阶段保存转移五元组、动作来源、策略版本和随机数位置。",
    },
    {
      name: "目标评价",
      input:
        "附录C Double DQN的理解在“目标评价”读取冻结的转移、旧价值或旧策略参数以及算法专属快照。",
      transition:
        "附录C Double DQN的理解在“目标评价”阶段计算回报、贝尔曼备份、TD目标、优势或训练标签。",
      output:
        "附录C Double DQN的理解在“目标评价”阶段产出不写参数的目标值与中间分量。",
      evidence:
        "附录C Double DQN的理解在“目标评价”阶段保存奖励范围、折扣次幂、自举值、终止掩码和手算对照。",
    },
    {
      name: "构造目标",
      input:
        "附录C Double DQN的理解在“构造目标”读取目标值、旧参数、学习率、优化器状态与合法更新集合。",
      transition:
        "附录C Double DQN的理解在“构造目标”阶段只写本页算法允许改变的价值、策略或网络参数。",
      output:
        "附录C Double DQN的理解在“构造目标”阶段产出新价值或新参数以及首个真实状态差异。",
      evidence:
        "附录C Double DQN的理解在“构造目标”阶段保存更新前后快照、TD误差或梯度、写集合与数值容差。",
    },
    {
      name: "比较偏差",
      input:
        "附录C Double DQN的理解在“比较偏差”读取冻结后的策略/价值、独立初始状态、评估种子与预算。",
      transition:
        "附录C Double DQN的理解在“比较偏差”阶段关闭探索和学习后重放，并与基线及单故障运行比较。",
      output:
        "附录C Double DQN的理解在“比较偏差”阶段产出不可写入参数的评估轨迹、指标分布与反例。",
      evidence:
        "附录C Double DQN的理解在“比较偏差”阶段保存评估前后哈希、逐种子结果、失败轨迹和历史边界。",
    },
  ],
  cases: [
    {
      name: "参考基线",
      setup:
        "附录C Double DQN的理解使用冻结环境、固定策略版本、固定预算和种子，不启用故障。",
      prediction:
        "附录C Double DQN的理解应沿“生成噪声估计 → 在线选择 → 目标评价 → 构造目标 → 比较偏差”得到可重放的转移、目标、更新与评估轨迹。",
      boundary:
        "附录C Double DQN的理解的参考运行只证明声明环境与预算内的机制，不外推到未测任务。",
    },
    {
      name: "单一故障",
      setup:
        "附录C Double DQN的理解复用参考快照，只启用“用目标网络同时选择和评价动作，退化回普通DQN目标”。",
      prediction:
        "附录C Double DQN的理解应在最终奖励变化前定位首个转移、目标、参数或评估哈希分岔。",
      boundary:
        "附录C Double DQN的理解若同时更换环境、种子或预算，就不能把差异归因于该故障。",
    },
    {
      name: "边界探针",
      setup:
        "附录C Double DQN的理解保持算法不变，只选择一个原版范围外或支持条件失效的输入。",
      prediction:
        "附录C Double DQN的理解应拒绝强结论并指出缺失的状态、概率、支持集或历史标签。",
      boundary:
        "附录C Double DQN的理解的边界探针用于收窄结论，不能伪装成原版正文或官方实验。",
    },
  ],
  referenceTrace: [
    "为“附录C Double DQN的理解”锁定环境、空间定义、奖励/终止语义、初值、策略版本、预算和随机种子。",
    "在“附录C Double DQN的理解”记录转移五元组，并手算本页算法使用的收益、目标或优势。",
    "沿“生成噪声估计 → 在线选择 → 目标评价 → 构造目标 → 比较偏差”保存更新前后价值、参数、缓存与随机数位置。",
    "冻结“附录C Double DQN的理解”的探索和学习，归档附录C Double DQN的理解的环境快照、转移五元组、收益/目标手算、更新前后状态、随机性记录、失败复现与冻结评估报告。",
  ],
  faultTrace: [
    "“附录C Double DQN的理解”复用完全相同的环境、初值、策略版本、预算与随机序列。",
    "“附录C Double DQN的理解”只改变一个条件：用目标网络同时选择和评价动作，退化回普通DQN目标。",
    "沿“生成噪声估计 → 在线选择 → 目标评价 → 构造目标 → 比较偏差”定位最早的转移、目标、更新或评估分岔。",
    "撤销故障后重放“附录C Double DQN的理解”；只有“噪声样本、在线网络选动作、目标网络评动作、参数快照与终止掩码一致”恢复才接受修正。",
  ],
  invariant:
    "噪声样本、在线网络选动作、目标网络评动作、参数快照与终止掩码一致；附录C Double DQN的理解的结论不得越过原版目录、实验数据和评估边界",
  fault:
    "用目标网络同时选择和评价动作，退化回普通DQN目标；在附录C Double DQN的理解验收中只注入这一处",
  artifact:
    "附录C Double DQN的理解的环境快照、转移五元组、收益/目标手算、更新前后状态、随机性记录、失败复现与冻结评估报告",
  gates: [
    {
      label: "环境、空间与终止语义",
      detail:
        "“附录C Double DQN的理解”的环境版本、观测/状态、合法动作、奖励、终止与截断语义可追溯。",
    },
    {
      label: "策略、价值与参数快照",
      detail:
        "“附录C Double DQN的理解”的行为/目标策略身份、价值或网络参数、优化器与同步点已经冻结。",
    },
    {
      label: "随机性、数据与训练预算",
      detail:
        "“附录C Double DQN的理解”的初始分布、转移/回放数据、种子、随机数位置、步数与更新预算可重放。",
    },
    {
      label: "独立评估与历史边界",
      detail:
        "“附录C Double DQN的理解”关闭探索和学习，归档逐种子结果、失败轨迹、参数哈希与2022/当前标签。",
    },
  ],
} as const satisfies RlEvidenceModel;

export function DlrAppendixCDoubleDqnTransitionLedgerLab() {
  return <RlEvidenceLab model={model} view="transition-ledger" />;
}

export function DlrAppendixCDoubleDqnReturnUpdateTraceLab() {
  return <RlEvidenceLab model={model} view="return-update-trace" />;
}

export function DlrAppendixCDoubleDqnEvaluationGateLab() {
  return <RlEvidenceLab model={model} view="evaluation-gate" />;
}
