"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = {
  unitId: "iai-06",
  title: "第6章 统计机器学习（概率分布和建模）",
  question: "怎样从联合分布与条件独立生成后验，并用诊断证明MCMC样本可用？",
  concepts: [
    "第6章 统计机器学习（概率分布和建模）",
    "01 统计模型和概率分布",
    "02 贝叶斯统计学和贝叶斯估计",
    "03 MCMC 方法",
    "04 HMM 和贝叶斯网络",
  ],
  nodes: [
    {
      name: "变量与图",
      state: "第6章 统计机器学习（概率分布和建模）：版本化观测或输入",
      rule: "验证来源、身份和边界，并保持“变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定”",
      transition: "可信输入状态",
      evidence:
        "数据卡、身份与时间；出现“单条短链未收敛便用样本均值宣称后验结论”时暂停",
    },
    {
      name: "先验/转移",
      state: "第6章 统计机器学习（概率分布和建模）：上游输入与已有事实",
      rule: "构造“第6章 统计机器学习（概率分布和建模）”的知识、表示或系统状态，并保持“变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定”",
      transition: "可查询中间状态",
      evidence:
        "规则、图、模型或参数；出现“单条短链未收敛便用样本均值宣称后验结论”时暂停",
    },
    {
      name: "观测似然",
      state: "第6章 统计机器学习（概率分布和建模）：当前状态与候选变换",
      rule: "执行推理、学习、搜索或协调，并保持“变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定”",
      transition: "候选结论或动作",
      evidence:
        "轨迹、概率、梯度或消息；出现“单条短链未收敛便用样本均值宣称后验结论”时暂停",
    },
    {
      name: "后验采样/推断",
      state: "第6章 统计机器学习（概率分布和建模）：已验证结论/动作",
      rule: "按权限和容量提交服务或执行，并保持“变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定”",
      transition: "可追踪外部结果",
      evidence:
        "输出、授权与副作用；出现“单条短链未收敛便用样本均值宣称后验结论”时暂停",
    },
    {
      name: "诊断与预测",
      state: "第6章 统计机器学习（概率分布和建模）：结果、日志和反馈",
      rule: "监测偏离并恢复已知状态，并保持“变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定”",
      transition: "验收或拒绝",
      evidence:
        "指标、反例、检查点和回滚；出现“单条短链未收敛便用样本均值宣称后验结论”时暂停",
    },
  ],
  cases: [
    {
      name: "正常案例",
      observation:
        "为隐状态序列构建HMM/贝叶斯网络，使用MCMC估计未知参数并比较多链。 使用冻结版本、输入、初态和种子。",
      expectedAction:
        "沿“变量与图 → 先验/转移 → 观测似然 → 后验采样/推断 → 诊断与预测”完成可解释动作。",
      boundary:
        "必须满足“变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定”。",
    },
    {
      name: "边界反例",
      observation:
        "为隐状态序列构建HMM/贝叶斯网络，使用MCMC估计未知参数并比较多链。 其余不变，只注入“单条短链未收敛便用样本均值宣称后验结论”。",
      expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
      boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
    },
  ],
  normalTrace: [
    "为“第6章 统计机器学习（概率分布和建模）”冻结系统版本、输入、身份、初态、权限、容量与随机种子",
    "执行变量与图、先验/转移，保存观测、知识或模型状态",
    "推进观测似然、后验采样/推断，记录推理、学习、通信和动作",
    "在诊断与预测交付变量表、图、先验、似然、转移/发射、链初值、种子、接受率、轨迹、诊断和后验预测。",
  ],
  failureTrace: [
    "“第6章 统计机器学习（概率分布和建模）”复用相同系统、输入、身份、初态、权限、容量和种子",
    "只注入单一故障：单条短链未收敛便用样本均值宣称后验结论",
    "沿“变量与图 → 先验/转移 → 观测似然 → 后验采样/推断 → 诊断与预测”定位第一处状态、证据或信任偏离",
    "撤销故障并重放；仅当“变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定”恢复才接受修正",
  ],
  invariant: "变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定",
  fault: "单条短链未收敛便用样本均值宣称后验结论",
  artifact:
    "变量表、图、先验、似然、转移/发射、链初值、种子、接受率、轨迹、诊断和后验预测。",
  gates: [
    {
      label: "输入与身份",
      detail:
        "“第6章 统计机器学习（概率分布和建模）”的来源、实体、单位、时间和边界可追溯。",
    },
    {
      label: "状态与模型",
      detail:
        "“第6章 统计机器学习（概率分布和建模）”的知识、规则、参数、版本和中间状态可复核。",
    },
    {
      label: "权限与副作用",
      detail:
        "“第6章 统计机器学习（概率分布和建模）”的通信、动作、资源和外部副作用有权限与容量界限。",
    },
    {
      label: "复现与时间",
      detail:
        "“第6章 统计机器学习（概率分布和建模）”归档环境、种子、失败、恢复和2016/当前标签。",
    },
  ],
} as const satisfies AiSystemEvidenceModel;

export function Iai06StatisticalMlProbabilityModelingKnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function Iai06StatisticalMlProbabilityModelingExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function Iai06StatisticalMlProbabilityModelingSystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
}
