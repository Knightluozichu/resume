"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-5.5",
  title: "5.5 · Data Compression",
  focus: "以可逆性为主线比较二进制 I/O、游程编码、Huffman 与 LZW 的模型和码流",
  formula:
    "Huffman 平均码长满足 H ≤ L < H+1；压缩是否有效还取决于模型和元数据成本",
  invariant:
    "decode(encode(bytes)) 必须逐字节等于原输入，码流边界和 EOF 约定必须唯一",
  fault:
    "Huffman 单字符输入没有生成可消费码字，或 LZW 编解码器的字典新增时点不同步",
  evidence:
    "输入哈希、频数/Trie、码表、bit offset、LZW 字典、压缩字节数与 round-trip",
  concepts: [
    "data compression",
    "数据压缩",
    "binary input and output",
    "二进制输入输出",
    "run-length encoding",
    "游程编码",
    "Huffman compression",
    "霍夫曼压缩",
    "LZW compression",
    "LZW压缩",
    "compression limits and error detection",
    "压缩极限与错误检测",
  ],
  trace: [
    "读取二进制输入",
    "建立频率或字典模型",
    "发射码字",
    "按同一模型解码",
    "逐字节核对",
  ],
  scenarios: [
    {
      label: "偏斜频率",
      input: "AAAAABBC 的字符频数",
      expected: "Huffman 给高频 A 较短码，并保留无前缀歧义",
    },
    {
      label: "字典同步",
      input: "对 ABABABA 逐步执行 LZW 编码和解码",
      expected: "两端在相同边界新增短语，特殊前向引用仍可恢复",
    },
  ],
} satisfies Algs4SectionModel;

export function DataCompressionModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function DataCompressionTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function DataCompressionCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
