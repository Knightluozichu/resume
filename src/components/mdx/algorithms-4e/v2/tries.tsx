"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-5.2",
  title: "5.2 · Tries",
  focus: "用 R 向单词查找树和三向单词查找树支持字符串符号表、前缀与通配查询",
  formula:
    "查找长度为 W 的键访问 O(W) 个字符位置；空间由节点数与分支表示共同决定",
  invariant:
    "从根沿键字符可到达且终点携带值才算命中；内部节点也可以同时代表完整键",
  fault:
    "删除前缀键时把仍有孩子的节点一并剪掉，或用 null 值混淆键缺失与显式空值",
  evidence:
    "键字符、节点链接、value 标记、prefix frontier、通配分支、节点数与 Map 预言机",
  concepts: [
    "tries",
    "单词查找树",
    "string symbol tables",
    "字符串符号表",
    "R-way tries",
    "R向单词查找树",
    "ternary search tries",
    "三向单词查找树",
    "prefix and wildcard operations",
    "前缀与通配操作",
  ],
  trace: [
    "读取下一个字符",
    "选择 R 向或三向分支",
    "创建或复用节点",
    "标记键值终点",
    "执行前缀/通配核对",
  ],
  scenarios: [
    {
      label: "前缀键",
      input: "同时插入 she 与 shells，再删除 she",
      expected: "只清除 she 的值，保留通向 shells 的后继节点",
    },
    {
      label: "最长前缀",
      input: "键 she、shell、shore；查询 shellsort",
      expected: "沿字符前进并记住最近有值节点，返回 shell",
    },
  ],
} satisfies Algs4SectionModel;

export function TriesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function TriesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function TriesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
