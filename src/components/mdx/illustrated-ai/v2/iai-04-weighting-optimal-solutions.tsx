"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = {
  unitId: "iai-04",
  title: "第4章 权重和寻找最优解",
  question:
    "怎样从特征、权重和距离构造预测，并验证局部加权没有用测试标签调参？",
  concepts: [
    "第4章 权重和寻找最优解",
    "01 线性问题和非线性问题",
    "02 回归分析",
    "03 加权回归分析",
    "04 相似度的计算",
  ],
  nodes: [
    {
      name: "查询与样本",
      state: "第4章 权重和寻找最优解：版本化观测或输入",
      rule: "验证来源、身份和边界，并保持“特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定”",
      transition: "可信输入状态",
      evidence:
        "数据卡、身份与时间；出现“用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏”时暂停",
    },
    {
      name: "特征尺度",
      state: "第4章 权重和寻找最优解：上游输入与已有事实",
      rule: "构造“第4章 权重和寻找最优解”的知识、表示或系统状态，并保持“特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定”",
      transition: "可查询中间状态",
      evidence:
        "规则、图、模型或参数；出现“用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏”时暂停",
    },
    {
      name: "相似度/权重",
      state: "第4章 权重和寻找最优解：当前状态与候选变换",
      rule: "执行推理、学习、搜索或协调，并保持“特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定”",
      transition: "候选结论或动作",
      evidence:
        "轨迹、概率、梯度或消息；出现“用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏”时暂停",
    },
    {
      name: "局部拟合",
      state: "第4章 权重和寻找最优解：已验证结论/动作",
      rule: "按权限和容量提交服务或执行，并保持“特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定”",
      transition: "可追踪外部结果",
      evidence:
        "输出、授权与副作用；出现“用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏”时暂停",
    },
    {
      name: "预测与残差",
      state: "第4章 权重和寻找最优解：结果、日志和反馈",
      rule: "监测偏离并恢复已知状态，并保持“特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定”",
      transition: "验收或拒绝",
      evidence:
        "指标、反例、检查点和回滚；出现“用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏”时暂停",
    },
  ],
  cases: [
    {
      name: "正常案例",
      observation:
        "对非线性一维数据比较全局线性与局部加权回归，并检查边界查询点。 使用冻结版本、输入、初态和种子。",
      expectedAction:
        "沿“查询与样本 → 特征尺度 → 相似度/权重 → 局部拟合 → 预测与残差”完成可解释动作。",
      boundary:
        "必须满足“特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对非线性一维数据比较全局线性与局部加权回归，并检查边界查询点。 其余不变，只注入“用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏”。",
      expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
      boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
    },
  ],
  normalTrace: [
    "为“第4章 权重和寻找最优解”冻结系统版本、输入、身份、初态、权限、容量与随机种子",
    "执行查询与样本、特征尺度，保存观测、知识或模型状态",
    "推进相似度/权重、局部拟合，记录推理、学习、通信和动作",
    "在预测与残差交付数据切分、特征、尺度、距离、权重、带宽、设计矩阵、系数、预测、残差和边界样本。",
  ],
  failureTrace: [
    "“第4章 权重和寻找最优解”复用相同系统、输入、身份、初态、权限、容量和种子",
    "只注入单一故障：用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏",
    "沿“查询与样本 → 特征尺度 → 相似度/权重 → 局部拟合 → 预测与残差”定位第一处状态、证据或信任偏离",
    "撤销故障并重放；仅当“特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定”恢复才接受修正",
  ],
  invariant: "特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定",
  fault: "用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏",
  artifact:
    "数据切分、特征、尺度、距离、权重、带宽、设计矩阵、系数、预测、残差和边界样本。",
  gates: [
    {
      label: "输入与身份",
      detail: "“第4章 权重和寻找最优解”的来源、实体、单位、时间和边界可追溯。",
    },
    {
      label: "状态与模型",
      detail:
        "“第4章 权重和寻找最优解”的知识、规则、参数、版本和中间状态可复核。",
    },
    {
      label: "权限与副作用",
      detail:
        "“第4章 权重和寻找最优解”的通信、动作、资源和外部副作用有权限与容量界限。",
    },
    {
      label: "复现与时间",
      detail:
        "“第4章 权重和寻找最优解”归档环境、种子、失败、恢复和2016/当前标签。",
    },
  ],
} as const satisfies AiSystemEvidenceModel;

export function Iai04WeightingOptimalSolutionsKnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function Iai04WeightingOptimalSolutionsExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function Iai04WeightingOptimalSolutionsSystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
}
