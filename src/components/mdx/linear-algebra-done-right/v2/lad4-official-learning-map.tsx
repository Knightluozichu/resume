"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "learning-map",
  title: "《Linear Algebra Done Right》第四版学习地图",
  question:
    "为什么这本书把行列式放到最后，却仍能先解释特征值、谱定理与算子结构？",
  theorem:
    "第四版路线先用向量空间、线性映射和多项式研究算子，再以谱与 SVD 恢复几何，最后把行列式放回多线性代数。",
  assumptions: [
    "版本边界固定为官方第四版 2026-07-13 修订 PDF",
    "标量域明确为 R 或 C，不把任意域结论混入",
    "有限维结论必须显式保留 finite-dimensional 假设",
    "出现正交、伴随或 SVD 时必须先给定内积",
  ],
  concepts: [
    "第1章 向量空间",
    "第2章 有限维向量空间",
    "第3章 线性映射",
    "第4章 多项式",
    "第5章 特征值与特征向量",
    "第6章 内积空间",
    "第7章 内积空间上的算子",
    "第8章 复向量空间上的算子",
    "第9章 多线性代数与行列式",
  ],
  normalExample:
    "固定一个三维复向量空间上的算子，沿核与值域、最小多项式、谱、SVD、迹与行列式逐章保存同一对象的结构。",
  boundaryExample:
    "若沿第三版旧目录复习，会漏掉第四版的交换算子、伪逆、QR/Cholesky、扩展 SVD 后果与整章多线性代数。",
  invariant: "每个结论都能追溯到域、维数、内积和算子类型四类前提。",
  proofArtifact:
    "9 章正式目录、十个核心结果、可跳读依赖与第四版新增内容的同一张路线表。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "版本边界固定为官方第四版 2026-07-13 修订 PDF",
      reason:
        "先冻结“《Linear Algebra Done Right》第四版学习地图”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "算子中心路线与最小多项式按定义进入推导",
      reason:
        "只使用“《Linear Algebra Done Right》第四版学习地图”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "固定一个三维复向量空间上的算子，沿核与值域、最小多项式、谱、SVD、迹与行列式逐章保存同一对象的结构。",
      reason:
        "非平凡对象让“第四版路线先用向量空间、线性映射和多项式研究算子，再以谱与 SVD 恢复几何，最后把行列式放回多线性代数。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "每个结论都能追溯到域、维数、内积和算子类型四类前提。",
      reason:
        "每一步都核对“《Linear Algebra Done Right》第四版学习地图”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "第四版路线先用向量空间、线性映射和多项式研究算子，再以谱与 SVD 恢复几何，最后把行列式放回多线性代数。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“若沿第三版旧目录复习，会漏掉第四版的交换算子、伪逆、QR/Cholesky、扩展 SVD 后果与整章多线性代数。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4OfficialLearningMapAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4OfficialLearningMapProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4OfficialLearningMapCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
