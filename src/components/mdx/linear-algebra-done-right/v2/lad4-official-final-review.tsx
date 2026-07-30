"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "final-review",
  title: "第四版总复习：从假设到结构",
  question: "怎样判断自己真正掌握了第四版，而不是只会在熟悉矩阵上套公式？",
  theorem:
    "可靠复习必须能从假设重建结论、删去一条假设构造反例，并说明坐标表示改变后哪些结构量保持不变。",
  assumptions: [
    "每道题先声明 R/C、定义域、陪域和维数",
    "涉及伴随、正交或 SVD 时声明内积",
    "涉及特征值存在性与 Jordan 形时声明复数域",
    "计算答案必须同时保留反例与坐标无关解释",
  ],
  concepts: [
    "基长度唯一性",
    "线性映射基本定理",
    "复特征值存在性",
    "上三角化",
    "Cauchy-Schwarz",
    "Gram-Schmidt",
    "谱定理",
    "奇异值分解",
    "广义特征空间分解",
    "最高次交替形式空间一维",
  ],
  normalExample:
    "固定 T(x,y,z)=(x+y,y+z)，先做核像与换基，再添加标准内积做伪逆/SVD，最后以双线性形式检查行列式。",
  boundaryExample:
    "只在单位矩阵、零算子和互异特征值样例上复习，会避开秩亏、重复特征值、非正规与实/复域差异。",
  invariant:
    "核像维数、最小多项式、奇异值、迹与行列式等结构量在合法换基下保持一致。",
  proofArtifact:
    "九章检查表、十个核心结果的依赖图、正常样例、单假设反例与重放记录。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "每道题先声明 R/C、定义域、陪域和维数",
      reason:
        "先冻结“第四版总复习：从假设到结构”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "假设账本与证明骨架按定义进入推导",
      reason:
        "只使用“第四版总复习：从假设到结构”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "固定 T(x,y,z)=(x+y,y+z)，先做核像与换基，再添加标准内积做伪逆/SVD，最后以双线性形式检查行列式。",
      reason:
        "非平凡对象让“可靠复习必须能从假设重建结论、删去一条假设构造反例，并说明坐标表示改变后哪些结构量保持不变。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim:
        "核像维数、最小多项式、奇异值、迹与行列式等结构量在合法换基下保持一致。",
      reason: "每一步都核对“第四版总复习：从假设到结构”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "可靠复习必须能从假设重建结论、删去一条假设构造反例，并说明坐标表示改变后哪些结构量保持不变。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“只在单位矩阵、零算子和互异特征值样例上复习，会避开秩亏、重复特征值、非正规与实/复域差异。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4OfficialFinalReviewAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4OfficialFinalReviewProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4OfficialFinalReviewCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
