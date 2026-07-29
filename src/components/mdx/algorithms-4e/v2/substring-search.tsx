"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-5.3",
  title: "5.3 · Substring Search",
  focus:
    "比较暴力、KMP、Boyer-Moore 与 Rabin-Karp 如何复用失败信息减少文本回退",
  formula:
    "KMP 在 DFA/前缀函数预处理后搜索 Θ(N)；Rabin-Karp 以滚动散列常数时间更新窗口",
  invariant:
    "任一时刻 j 表示模式前 j 个字符已与当前文本后缀匹配；报告位置必须通过字符验证",
  fault:
    "KMP 失配后错误地把文本指针和模式指针都回退，或 Rabin-Karp 命中哈希后不验字符",
  evidence:
    "pattern/text、i/j、DFA 或前缀表、bad-character skip、窗口哈希、候选位置与朴素预言机",
  concepts: [
    "substring search",
    "子字符串查找",
    "brute-force substring search",
    "暴力子字符串查找",
    "Knuth-Morris-Pratt",
    "KMP算法",
    "Boyer-Moore",
    "Boyer-Moore算法",
    "Rabin-Karp",
    "Rabin-Karp算法",
  ],
  trace: [
    "预处理模式",
    "扫描文本字符",
    "命中或计算失配跳转",
    "验证候选窗口",
    "返回位置或 N",
  ],
  scenarios: [
    {
      label: "重叠模式",
      input: "在 ABABABAC 中查找 ABABAC",
      expected: "KMP 用已知前后缀继续，不重新比较已经确认的文本前缀",
    },
    {
      label: "散列碰撞",
      input: "构造与模式哈希相同但字符不同的窗口",
      expected: "Las Vegas 版本做逐字符校验后拒绝伪命中",
    },
  ],
} satisfies Algs4SectionModel;

export function SubstringSearchModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function SubstringSearchTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function SubstringSearchCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
