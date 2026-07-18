"use client";

import { DsvOfficialLab } from "./official-lab";

const storageCases = [
  { label: "定长顺序", fields: [["表示", "固定数组 + length"], ["优势", "局部性好、按位访问Theta(1)"], ["边界", "容量不足必须拒绝或截断并显式报告"]] },
  { label: "堆分配顺序", fields: [["表示", "pointer + length + capacity/owner"], ["优势", "长度可变、仍连续"], ["边界", "扩容、指针失效、分配失败"]] },
  { label: "块链串", fields: [["表示", "每结点存一块字符与next"], ["优势", "可拼接/流式增长，避免单块大分配"], ["边界", "随机索引慢、跨块匹配复杂"]] },
  { label: "串视图", fields: [["表示", "borrowed pointer + length"], ["优势", "切片不复制，可含NUL"], ["边界", "生命周期不超过owner，非自动NUL结尾"]], alert: "长度是串语义的一部分。只用strlen会截断含NUL数据，也无法表示未以NUL结尾的切片。" },
] as const;

const naiveCases = [
  { label: "首次对齐", fields: [["文本", "ABABAC"], ["模式", "ABAC"], ["结果", "前三字符匹配，末字符失配"]] },
  { label: "整体右移", fields: [["动作", "模式起点从0移动到1"], ["浪费", "已知AB前缀信息被全部丢弃"], ["比较", "从pattern[0]重新开始"]] },
  { label: "下一对齐", fields: [["动作", "继续尝试起点2"], ["结果", "ABAC完整匹配"], ["成本", "最坏可达Theta((n-m+1)m)"]] },
  { label: "边界", fields: [["空模式", "按契约匹配位置0"], ["模式更长", "立即not found"], ["证据", "与标准库/reference逐case比较"]], alert: "朴素算法正确但会重复比较；KMP优化的是失配后的模式移动，不跳过任何合法起点。" },
] as const;

const kmpCases = [
  { label: "Prefix", fields: [["pattern", "ABABAC"], ["状态", "已匹配ABABA"], ["最长真前后缀", "ABA，长度3"]] },
  { label: "Failure", fields: [["失配", "pattern[5]与text字符不同"], ["复用", "j从5回到prefix[4]=3"], ["不变", "text索引不回退"]] },
  { label: "next数组", fields: [["含义", "每个前缀失配后可保留的最长边界"], ["构建", "较短边界链逐级回退"], ["成本", "构建Theta(m)，搜索Theta(n)"]] },
  { label: "nextval", fields: [["问题", "回退后字符与失配字符相同会立刻再失配"], ["改进", "继续沿failure跳到不同字符/更短边界"], ["要求", "先固定-1/0与0/1-based约定"]], alert: "next、LPS和prefix-function可表达同一failure信息，但下标与表项语义不同；代码、图和测试必须使用同一约定。" },
] as const;

export function DsvStringStorageLab() {
  return <DsvOfficialLab cases={storageCases} caption="定长、动态、块链与借用视图在局部性、增长和owner上不同。" tone="cyan" />;
}

export function DsvNaiveMatchLab() {
  return <DsvOfficialLab cases={naiveCases} caption="朴素匹配失配后整体右移并从模式开头重新比较。" tone="rose" />;
}

export function DsvKmpFailureLab() {
  return <DsvOfficialLab cases={kmpCases} caption="KMP用前缀/后缀边界构建failure table，使文本索引不回退。" tone="emerald" />;
}
