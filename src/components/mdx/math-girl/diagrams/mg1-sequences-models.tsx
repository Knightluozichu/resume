"use client";

import { MathGirlOfficialLab } from "./official-lab";

const continuationCases = [
  {
    label: "1,2,3,4",
    fields: [
      ["朴素续项", "5：采用a(n)=n"],
      ["另一续项", "29：采用a(n)=n+(n-1)(n-2)(n-3)(n-4)"],
      ["结论", "前四项相同，下一项不由有限数据唯一决定"],
    ],
  },
  {
    label: "1,1,1,1",
    fields: [
      ["朴素续项", "1：常数模型"],
      ["另一续项", "25：1+(n-1)(n-2)(n-3)(n-4)在n=5的值"],
      ["结论", "重复前缀也不能证明未来恒定"],
    ],
  },
  {
    label: "1,2,4,8",
    fields: [
      ["朴素续项", "16：采用2^(n-1)"],
      ["另一续项", "40：在指数模型上加入前四项均为0的多项式"],
      ["结论", "熟悉模式是候选解释，不是逻辑必然"],
    ],
  },
  {
    label: "σ(n)",
    fields: [
      ["前六项", "1,3,4,7,6,12"],
      ["生成规则", "第n项等于n的所有正因数之和"],
      ["结论", "看似不规则的表格可由简洁数学对象生成"],
    ],
    alert: "数列智力题必须同时给出模型选择标准。只问“下一项是什么”却不说明规则类别，通常没有唯一正确答案。",
  },
] as const;

const representationCases = [
  {
    label: "列表",
    fields: [
      ["形式", "直接列出a1,a2,..."],
      ["优势", "观察真实数据与局部模式"],
      ["限制", "有限列表不说明无限延拓"],
    ],
  },
  {
    label: "显式式",
    fields: [
      ["形式", "a(n)=f(n)"],
      ["优势", "可直接计算任意指定索引"],
      ["限制", "公式存在不等于解释自然或唯一"],
    ],
  },
  {
    label: "递推式",
    fields: [
      ["形式", "初值加a(n)=F(前项)"],
      ["优势", "呈现相邻状态如何产生"],
      ["限制", "缺初值或边界就没有完整定义"],
    ],
  },
  {
    label: "生成过程",
    fields: [
      ["形式", "枚举对象、计数或执行算法"],
      ["优势", "把数列连接到因数、路径或组合对象"],
      ["限制", "要证明过程终止、无遗漏且不重复"],
    ],
    alert: "同一数列可能有多种等价表示。学习重点是证明它们产生相同对象，并说明哪种表示更适合当前问题。",
  },
] as const;

const evidenceCases = [
  {
    label: "观察",
    fields: [
      ["动作", "记录给定项、索引起点和允许的数域"],
      ["证据", "数据表与每项来源可复查"],
      ["风险", "把视觉相似误当定义"],
    ],
  },
  {
    label: "猜想",
    fields: [
      ["动作", "提出至少两个可计算的候选模型"],
      ["证据", "每个模型复现全部已知项"],
      ["风险", "只保留第一个熟悉模式"],
    ],
  },
  {
    label: "区分实验",
    fields: [
      ["动作", "寻找候选模型首次给出不同预测的索引"],
      ["证据", "新观测能淘汰至少一个候选"],
      ["风险", "重复采集所有模型都同意的项"],
    ],
  },
  {
    label: "修订",
    fields: [
      ["动作", "根据反例修改规则、前提或模型族"],
      ["证据", "保留失败模型与淘汰理由"],
      ["风险", "事后改公式却声称原猜想正确"],
    ],
    alert: "一个模型只有在能够被未来数据证伪时才有预测意义；简洁性是选择偏好，不是正确性证明。",
  },
] as const;

export function Mg1SequenceContinuationLab() {
  return <MathGirlOfficialLab cases={continuationCases} caption="切换前缀，比较多个合法延拓在下一项的分歧。" tone="cyan" />;
}

export function Mg1SequenceRepresentationLab() {
  return <MathGirlOfficialLab cases={representationCases} caption="列表、显式式、递推式和生成过程是不同的数列模型。" tone="violet" />;
}

export function Mg1ModelEvidenceLab() {
  return <MathGirlOfficialLab cases={evidenceCases} caption="观察、猜想、区分实验与修订形成可证伪建模闭环。" tone="emerald" />;
}
