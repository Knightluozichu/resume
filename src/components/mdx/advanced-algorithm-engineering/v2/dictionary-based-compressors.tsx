"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "13 Dictionary-Based Compressors",
  focus: "比较 LZ77、LZ78 与 LZW 的窗口、短语字典和解码同步",
  formula: "LZ77 token = (distance, length, next-symbol)",
  invariant: "token 流在声明的窗口与字典规则下唯一恢复原始字节序列",
  fault: "复制重叠 match 时先缓存源片段，错误地禁止新输出继续成为复制源",
  evidence: "输入 hash、窗口、匹配、token、字典新增、输出位置与 round-trip",
  stages: ["LZ77", "LZ78", "LZW", "On the Optimality of Compressors∞"],
} satisfies AlgorithmEngineeringModel;

export function DictionaryBasedCompressorsCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function DictionaryBasedCompressorsTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function DictionaryBasedCompressorsEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
