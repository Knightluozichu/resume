"use client";

import { RlEvidenceLab, type RlEvidenceModel } from "./rl-evidence-lab";

const model = {
  unitId: "dlr-app-b",
  title: "附录B n步TD法",
  question:
    "怎样在回合末端正确截短n步窗口，并区分已观测奖励与最后一个自举价值？",
  concepts: ["附录B n-step TD方法"],
  stages: [
    {
      name: "选择窗口",
      input:
        "附录B n步TD法在“选择窗口”读取环境版本、状态/动作空间、奖励、终止语义、初始分布、策略与随机种子。",
      transition:
        "附录B n步TD法在“选择窗口”阶段冻结本页问题所需的任务快照，不运行训练或评估。",
      output: "附录B n步TD法在“选择窗口”阶段产出可哈希的环境与策略前置状态。",
      evidence:
        "附录B n步TD法在“选择窗口”阶段保存环境配置、空间定义、种子、参数版本与允许读取的信息。",
    },
    {
      name: "收集奖励",
      input:
        "附录B n步TD法在“收集奖励”读取冻结的任务快照、当前状态、合法动作与策略概率。",
      transition:
        "附录B n步TD法在“收集奖励”阶段只执行一次已声明的动作选择或环境转移。",
      output:
        "附录B n步TD法在“收集奖励”阶段产出状态、动作、奖励、下一状态和终止标记。",
      evidence:
        "附录B n步TD法在“收集奖励”阶段保存转移五元组、动作来源、策略版本和随机数位置。",
    },
    {
      name: "处理终止",
      input:
        "附录B n步TD法在“处理终止”读取冻结的转移、旧价值或旧策略参数以及算法专属快照。",
      transition:
        "附录B n步TD法在“处理终止”阶段计算回报、贝尔曼备份、TD目标、优势或训练标签。",
      output: "附录B n步TD法在“处理终止”阶段产出不写参数的目标值与中间分量。",
      evidence:
        "附录B n步TD法在“处理终止”阶段保存奖励范围、折扣次幂、自举值、终止掩码和手算对照。",
    },
    {
      name: "加入自举",
      input:
        "附录B n步TD法在“加入自举”读取目标值、旧参数、学习率、优化器状态与合法更新集合。",
      transition:
        "附录B n步TD法在“加入自举”阶段只写本页算法允许改变的价值、策略或网络参数。",
      output:
        "附录B n步TD法在“加入自举”阶段产出新价值或新参数以及首个真实状态差异。",
      evidence:
        "附录B n步TD法在“加入自举”阶段保存更新前后快照、TD误差或梯度、写集合与数值容差。",
    },
    {
      name: "更新价值",
      input:
        "附录B n步TD法在“更新价值”读取冻结后的策略/价值、独立初始状态、评估种子与预算。",
      transition:
        "附录B n步TD法在“更新价值”阶段关闭探索和学习后重放，并与基线及单故障运行比较。",
      output:
        "附录B n步TD法在“更新价值”阶段产出不可写入参数的评估轨迹、指标分布与反例。",
      evidence:
        "附录B n步TD法在“更新价值”阶段保存评估前后哈希、逐种子结果、失败轨迹和历史边界。",
    },
  ],
  cases: [
    {
      name: "参考基线",
      setup:
        "附录B n步TD法使用冻结环境、固定策略版本、固定预算和种子，不启用故障。",
      prediction:
        "附录B n步TD法应沿“选择窗口 → 收集奖励 → 处理终止 → 加入自举 → 更新价值”得到可重放的转移、目标、更新与评估轨迹。",
      boundary:
        "附录B n步TD法的参考运行只证明声明环境与预算内的机制，不外推到未测任务。",
    },
    {
      name: "单一故障",
      setup:
        "附录B n步TD法复用参考快照，只启用“回合已经终止仍从窗口末端状态继续自举”。",
      prediction:
        "附录B n步TD法应在最终奖励变化前定位首个转移、目标、参数或评估哈希分岔。",
      boundary:
        "附录B n步TD法若同时更换环境、种子或预算，就不能把差异归因于该故障。",
    },
    {
      name: "边界探针",
      setup:
        "附录B n步TD法保持算法不变，只选择一个原版范围外或支持条件失效的输入。",
      prediction:
        "附录B n步TD法应拒绝强结论并指出缺失的状态、概率、支持集或历史标签。",
      boundary:
        "附录B n步TD法的边界探针用于收窄结论，不能伪装成原版正文或官方实验。",
    },
  ],
  referenceTrace: [
    "为“附录B n步TD法”锁定环境、空间定义、奖励/终止语义、初值、策略版本、预算和随机种子。",
    "在“附录B n步TD法”记录转移五元组，并手算本页算法使用的收益、目标或优势。",
    "沿“选择窗口 → 收集奖励 → 处理终止 → 加入自举 → 更新价值”保存更新前后价值、参数、缓存与随机数位置。",
    "冻结“附录B n步TD法”的探索和学习，归档附录B n步TD法的环境快照、转移五元组、收益/目标手算、更新前后状态、随机性记录、失败复现与冻结评估报告。",
  ],
  faultTrace: [
    "“附录B n步TD法”复用完全相同的环境、初值、策略版本、预算与随机序列。",
    "“附录B n步TD法”只改变一个条件：回合已经终止仍从窗口末端状态继续自举。",
    "沿“选择窗口 → 收集奖励 → 处理终止 → 加入自举 → 更新价值”定位最早的转移、目标、更新或评估分岔。",
    "撤销故障后重放“附录B n步TD法”；只有“时间索引、窗口长度、奖励范围、终止位置、自举状态与折扣次幂一致”恢复才接受修正。",
  ],
  invariant:
    "时间索引、窗口长度、奖励范围、终止位置、自举状态与折扣次幂一致；附录B n步TD法的结论不得越过原版目录、实验数据和评估边界",
  fault:
    "回合已经终止仍从窗口末端状态继续自举；在附录B n步TD法验收中只注入这一处",
  artifact:
    "附录B n步TD法的环境快照、转移五元组、收益/目标手算、更新前后状态、随机性记录、失败复现与冻结评估报告",
  gates: [
    {
      label: "环境、空间与终止语义",
      detail:
        "“附录B n步TD法”的环境版本、观测/状态、合法动作、奖励、终止与截断语义可追溯。",
    },
    {
      label: "策略、价值与参数快照",
      detail:
        "“附录B n步TD法”的行为/目标策略身份、价值或网络参数、优化器与同步点已经冻结。",
    },
    {
      label: "随机性、数据与训练预算",
      detail:
        "“附录B n步TD法”的初始分布、转移/回放数据、种子、随机数位置、步数与更新预算可重放。",
    },
    {
      label: "独立评估与历史边界",
      detail:
        "“附录B n步TD法”关闭探索和学习，归档逐种子结果、失败轨迹、参数哈希与2022/当前标签。",
    },
  ],
} as const satisfies RlEvidenceModel;

export function DlrAppendixBNStepTdTransitionLedgerLab() {
  return <RlEvidenceLab model={model} view="transition-ledger" />;
}

export function DlrAppendixBNStepTdReturnUpdateTraceLab() {
  return <RlEvidenceLab model={model} view="return-update-trace" />;
}

export function DlrAppendixBNStepTdEvaluationGateLab() {
  return <RlEvidenceLab model={model} view="evaluation-gate" />;
}
