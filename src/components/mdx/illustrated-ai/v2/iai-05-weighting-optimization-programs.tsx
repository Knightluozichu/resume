"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = {
  unitId: "iai-05",
  title: "第5章 权重和优化程序",
  question:
    "怎样在同一目标下比较显式图搜索、群体进化与梯度学习的状态和停止条件？",
  concepts: [
    "第5章 权重和优化程序",
    "01 图论",
    "02 图谱搜索和最优化",
    "03 遗传算法",
    "04 神经网络",
  ],
  nodes: [
    {
      name: "候选编码",
      state: "第5章 权重和优化程序：版本化观测或输入",
      rule: "验证来源、身份和边界，并保持“状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定”",
      transition: "可信输入状态",
      evidence:
        "数据卡、身份与时间；出现“不同算法使用不同预算或目标，却依据一次最好结果宣布胜者”时暂停",
    },
    {
      name: "邻接/变异",
      state: "第5章 权重和优化程序：上游输入与已有事实",
      rule: "构造“第5章 权重和优化程序”的知识、表示或系统状态，并保持“状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定”",
      transition: "可查询中间状态",
      evidence:
        "规则、图、模型或参数；出现“不同算法使用不同预算或目标，却依据一次最好结果宣布胜者”时暂停",
    },
    {
      name: "目标评估",
      state: "第5章 权重和优化程序：当前状态与候选变换",
      rule: "执行推理、学习、搜索或协调，并保持“状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定”",
      transition: "候选结论或动作",
      evidence:
        "轨迹、概率、梯度或消息；出现“不同算法使用不同预算或目标，却依据一次最好结果宣布胜者”时暂停",
    },
    {
      name: "选择/更新",
      state: "第5章 权重和优化程序：已验证结论/动作",
      rule: "按权限和容量提交服务或执行，并保持“状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定”",
      transition: "可追踪外部结果",
      evidence:
        "输出、授权与副作用；出现“不同算法使用不同预算或目标，却依据一次最好结果宣布胜者”时暂停",
    },
    {
      name: "停止与最优证据",
      state: "第5章 权重和优化程序：结果、日志和反馈",
      rule: "监测偏离并恢复已知状态，并保持“状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定”",
      transition: "验收或拒绝",
      evidence:
        "指标、反例、检查点和回滚；出现“不同算法使用不同预算或目标，却依据一次最好结果宣布胜者”时暂停",
    },
  ],
  cases: [
    {
      name: "正常案例",
      observation:
        "在路径与参数混合优化任务上对照图搜索、遗传算法和小型神经网络。 使用冻结版本、输入、初态和种子。",
      expectedAction:
        "沿“候选编码 → 邻接/变异 → 目标评估 → 选择/更新 → 停止与最优证据”完成可解释动作。",
      boundary:
        "必须满足“状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定”。",
    },
    {
      name: "边界反例",
      observation:
        "在路径与参数混合优化任务上对照图搜索、遗传算法和小型神经网络。 其余不变，只注入“不同算法使用不同预算或目标，却依据一次最好结果宣布胜者”。",
      expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
      boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
    },
  ],
  normalTrace: [
    "为“第5章 权重和优化程序”冻结系统版本、输入、身份、初态、权限、容量与随机种子",
    "执行候选编码、邻接/变异，保存观测、知识或模型状态",
    "推进目标评估、选择/更新，记录推理、学习、通信和动作",
    "在停止与最优证据交付状态图、候选编码、邻接表、启发式、群体、选择/交叉/变异、梯度、预算、种子和最优性边界。",
  ],
  failureTrace: [
    "“第5章 权重和优化程序”复用相同系统、输入、身份、初态、权限、容量和种子",
    "只注入单一故障：不同算法使用不同预算或目标，却依据一次最好结果宣布胜者",
    "沿“候选编码 → 邻接/变异 → 目标评估 → 选择/更新 → 停止与最优证据”定位第一处状态、证据或信任偏离",
    "撤销故障并重放；仅当“状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定”恢复才接受修正",
  ],
  invariant: "状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定",
  fault: "不同算法使用不同预算或目标，却依据一次最好结果宣布胜者",
  artifact:
    "状态图、候选编码、邻接表、启发式、群体、选择/交叉/变异、梯度、预算、种子和最优性边界。",
  gates: [
    {
      label: "输入与身份",
      detail: "“第5章 权重和优化程序”的来源、实体、单位、时间和边界可追溯。",
    },
    {
      label: "状态与模型",
      detail:
        "“第5章 权重和优化程序”的知识、规则、参数、版本和中间状态可复核。",
    },
    {
      label: "权限与副作用",
      detail:
        "“第5章 权重和优化程序”的通信、动作、资源和外部副作用有权限与容量界限。",
    },
    {
      label: "复现与时间",
      detail:
        "“第5章 权重和优化程序”归档环境、种子、失败、恢复和2016/当前标签。",
    },
  ],
} as const satisfies AiSystemEvidenceModel;

export function Iai05WeightingOptimizationProgramsKnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function Iai05WeightingOptimizationProgramsExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function Iai05WeightingOptimizationProgramsSystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
}
