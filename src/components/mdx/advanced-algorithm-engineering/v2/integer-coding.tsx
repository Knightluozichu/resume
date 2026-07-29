"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "11 Integer Coding",
  focus: "按整数分布、单调性与查询需求选择自定界和块级编码",
  formula: "Elias-Fano ≤ n ceil(log2(U/n)) + 2n bits",
  invariant: "编码可唯一解码，整数域与零值约定明确，round-trip 保持完整序列",
  fault: "把只支持正整数的码直接用于零或在差分时溢出，破坏码流边界",
  evidence: "输入域、参数、逐项码字、位偏移、总位数、解码序列与边界样例",
  stages: [
    "Elias Codes: γ and δ",
    "Rice Code",
    "PForDelta Code",
    "Variable-Byte Code and (s, c)-Dense Codes",
    "Interpolative Code",
    "Elias–Fano Code",
  ],
} satisfies AlgorithmEngineeringModel;

export function IntegerCodingCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function IntegerCodingTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function IntegerCodingEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
