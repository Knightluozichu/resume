"use client";

import {
  LearningSystemEvidenceLab,
  type LearningSystemEvidenceModel,
} from "./learning-system-evidence-lab";

const model = {
  unitId: "idl-06",
  title: "第6章 提高泛化能力的方法",
  question:
    "怎样只在训练路径施加随机正则化，并用冻结的验证集判断泛化而非训练误差？",
  concepts: [
    "第6章 提高泛化能力的方法",
    "6.1 训练样本",
    "6.2 预处理",
    "6.3 激活函数",
    "6.4 Dropout",
    "6.5 DropConnect",
    "6.6 小结",
  ],
  stages: [
    {
      name: "数据划分",
      input: "第6章 提高泛化能力的方法：冻结的样本、任务或上游张量",
      operation:
        "登记形状、版本和边界，并守住“训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定”",
      output: "可追踪输入",
      evidence:
        "数据卡、哈希与形状；出现“在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果”时保留失败记录",
    },
    {
      name: "预处理",
      input: "第6章 提高泛化能力的方法：上一阶段输出",
      operation:
        "执行“第6章 提高泛化能力的方法”的核心变换，并守住“训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定”",
      output: "中间表示或状态",
      evidence:
        "中间张量与参数；出现“在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果”时保留失败记录",
    },
    {
      name: "激活",
      input: "第6章 提高泛化能力的方法：表示、标签或采样状态",
      operation:
        "计算本阶段目标或条件量，并守住“训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定”",
      output: "标量目标或概率",
      evidence:
        "公式、数值与对照；出现“在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果”时保留失败记录",
    },
    {
      name: "随机正则",
      input: "第6章 提高泛化能力的方法：目标、参数和随机状态",
      operation:
        "只改变声明的学习变量，并守住“训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定”",
      output: "更新后参数或样本",
      evidence:
        "梯度、种子与差分；出现“在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果”时保留失败记录",
    },
    {
      name: "验证评估",
      input: "第6章 提高泛化能力的方法：冻结模型与留出数据",
      operation:
        "按预注册协议评估并归档，并守住“训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定”",
      output: "结论、拒绝或迁移决定",
      evidence:
        "指标、反例与环境锁；出现“在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果”时保留失败记录",
    },
  ],
  scenarios: [
    {
      name: "冻结基线",
      condition:
        "在固定数据划分上比较无正则、Dropout和DropConnect，记录训练差距、验证误差与推理重复性。 固定数据、代码、依赖、初值与随机种子。",
      expectation:
        "沿“数据划分 → 预处理 → 激活 → 随机正则 → 验证评估”得到满足“训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定”的完整证据。",
    },
    {
      name: "边界反例",
      condition:
        "在固定数据划分上比较无正则、Dropout和DropConnect，记录训练差距、验证误差与推理重复性。 其余条件不变，只注入“在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果”。",
      expectation:
        "最早偏离应出现在对应阶段；若只能从最终指标猜测，证据链不通过。",
    },
  ],
  normalTrace: [
    "为“第6章 提高泛化能力的方法”冻结任务、数据切分、代码、环境、参数初值与随机种子",
    "依次执行数据划分、预处理，保存输入和中间状态",
    "继续执行激活、随机正则，记录目标、梯度、采样或更新",
    "在验证评估阶段交付样本清单、切分哈希、预处理统计、激活分布、随机种子、掩码、训练/推理模式、学习曲线与测试报告。",
  ],
  failureTrace: [
    "“第6章 提高泛化能力的方法”复用同一任务、数据、代码、环境、参数初值与随机种子",
    "只注入单一故障：在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果",
    "沿“数据划分 → 预处理 → 激活 → 随机正则 → 验证评估”定位第一处数值、状态或边界偏离",
    "撤销故障并重放；仅当“训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定”恢复才接受修正",
  ],
  invariant:
    "训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定",
  fault:
    "在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果",
  artifact:
    "样本清单、切分哈希、预处理统计、激活分布、随机种子、掩码、训练/推理模式、学习曲线与测试报告。",
  gates: [
    {
      label: "数据切分",
      detail:
        "“第6章 提高泛化能力的方法”的训练、验证、测试边界和预处理统计可追溯。",
    },
    {
      label: "目标与梯度",
      detail:
        "“第6章 提高泛化能力的方法”的前向值、目标、梯度或采样更新经过数值核对。",
    },
    {
      label: "基线与消融",
      detail:
        "“第6章 提高泛化能力的方法”保留简单基线，只改变一个变量并保存失败样本。",
    },
    {
      label: "复现与历史",
      detail:
        "“第6章 提高泛化能力的方法”归档环境、种子和工件，并分开2016语境与当前迁移。",
    },
  ],
} as const satisfies LearningSystemEvidenceModel;

export function Idl06ImprovingGeneralizationSignalPathLab() {
  return <LearningSystemEvidenceLab model={model} view="signal-path" />;
}

export function Idl06ImprovingGeneralizationTrainingTraceLab() {
  return <LearningSystemEvidenceLab model={model} view="training-trace" />;
}

export function Idl06ImprovingGeneralizationExperimentGateLab() {
  return <LearningSystemEvidenceLab model={model} view="experiment-gate" />;
}
