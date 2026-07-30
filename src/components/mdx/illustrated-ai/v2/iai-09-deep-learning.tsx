"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = {
  unitId: "iai-09",
  title: "第9章 深度学习",
  question: "怎样沿前向、目标、反向或采样追踪五类模型，并保留其结构差异？",
  concepts: [
    "第9章 深度学习",
    "01 多层神经网络",
    "02 受限玻尔兹曼机",
    "03 深度神经网络",
    "04 卷积神经网络",
    "05 循环神经网络",
  ],
  nodes: [
    {
      name: "输入张量/序列",
      state: "第9章 深度学习：版本化观测或输入",
      rule: "验证来源、身份和边界，并保持“数据、拓扑、参数、目标、随机性、训练步骤和验证集固定”",
      transition: "可信输入状态",
      evidence:
        "数据卡、身份与时间；出现“把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉”时暂停",
    },
    {
      name: "隐藏表示",
      state: "第9章 深度学习：上游输入与已有事实",
      rule: "构造“第9章 深度学习”的知识、表示或系统状态，并保持“数据、拓扑、参数、目标、随机性、训练步骤和验证集固定”",
      transition: "可查询中间状态",
      evidence:
        "规则、图、模型或参数；出现“把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉”时暂停",
    },
    {
      name: "目标/能量",
      state: "第9章 深度学习：当前状态与候选变换",
      rule: "执行推理、学习、搜索或协调，并保持“数据、拓扑、参数、目标、随机性、训练步骤和验证集固定”",
      transition: "候选结论或动作",
      evidence:
        "轨迹、概率、梯度或消息；出现“把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉”时暂停",
    },
    {
      name: "反向/采样更新",
      state: "第9章 深度学习：已验证结论/动作",
      rule: "按权限和容量提交服务或执行，并保持“数据、拓扑、参数、目标、随机性、训练步骤和验证集固定”",
      transition: "可追踪外部结果",
      evidence:
        "输出、授权与副作用；出现“把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉”时暂停",
    },
    {
      name: "验证与状态",
      state: "第9章 深度学习：结果、日志和反馈",
      rule: "监测偏离并恢复已知状态，并保持“数据、拓扑、参数、目标、随机性、训练步骤和验证集固定”",
      transition: "验收或拒绝",
      evidence:
        "指标、反例、检查点和回滚；出现“把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉”时暂停",
    },
  ],
  cases: [
    {
      name: "正常案例",
      observation:
        "对静态图像与短序列分别选择CNN/RNN，并单独演示MLP与RBM训练机制。 使用冻结版本、输入、初态和种子。",
      expectedAction:
        "沿“输入张量/序列 → 隐藏表示 → 目标/能量 → 反向/采样更新 → 验证与状态”完成可解释动作。",
      boundary:
        "必须满足“数据、拓扑、参数、目标、随机性、训练步骤和验证集固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对静态图像与短序列分别选择CNN/RNN，并单独演示MLP与RBM训练机制。 其余不变，只注入“把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉”。",
      expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
      boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
    },
  ],
  normalTrace: [
    "为“第9章 深度学习”冻结系统版本、输入、身份、初态、权限、容量与随机种子",
    "执行输入张量/序列、隐藏表示，保存观测、知识或模型状态",
    "推进目标/能量、反向/采样更新，记录推理、学习、通信和动作",
    "在验证与状态交付数据切分、拓扑、张量形状、能量/损失、时间状态、采样/梯度、参数、种子、训练曲线和验证失败。",
  ],
  failureTrace: [
    "“第9章 深度学习”复用相同系统、输入、身份、初态、权限、容量和种子",
    "只注入单一故障：把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉",
    "沿“输入张量/序列 → 隐藏表示 → 目标/能量 → 反向/采样更新 → 验证与状态”定位第一处状态、证据或信任偏离",
    "撤销故障并重放；仅当“数据、拓扑、参数、目标、随机性、训练步骤和验证集固定”恢复才接受修正",
  ],
  invariant: "数据、拓扑、参数、目标、随机性、训练步骤和验证集固定",
  fault: "把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉",
  artifact:
    "数据切分、拓扑、张量形状、能量/损失、时间状态、采样/梯度、参数、种子、训练曲线和验证失败。",
  gates: [
    {
      label: "输入与身份",
      detail: "“第9章 深度学习”的来源、实体、单位、时间和边界可追溯。",
    },
    {
      label: "状态与模型",
      detail: "“第9章 深度学习”的知识、规则、参数、版本和中间状态可复核。",
    },
    {
      label: "权限与副作用",
      detail:
        "“第9章 深度学习”的通信、动作、资源和外部副作用有权限与容量界限。",
    },
    {
      label: "复现与时间",
      detail: "“第9章 深度学习”归档环境、种子、失败、恢复和2016/当前标签。",
    },
  ],
} as const satisfies AiSystemEvidenceModel;

export function Iai09DeepLearningKnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function Iai09DeepLearningExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function Iai09DeepLearningSystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
}
