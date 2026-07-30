"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-05",
  title: "第5章 串",
  question:
    "KMP怎样复用已匹配前后缀，使文本指针不回退且仍返回与朴素匹配相同的位置？",
  concepts: [
    "第5章 串",
    "5.1 开场白",
    "5.2 串的定义",
    "5.3 串的比较",
    "5.4 串的抽象数据类型",
    "5.5 串的存储结构",
    "5.5.1 串的顺序存储结构",
    "5.5.2 串的链式存储结构",
    "5.6 朴素的模式匹配算法",
    "5.7 KMP模式匹配算法",
    "5.7.1 KMP模式匹配算法的原理",
    "5.7.2 next数组值的推导",
    "5.7.3 KMP模式匹配算法的实现",
    "5.7.4 KMP模式匹配算法的改进",
    "5.7.5 nextval数组值的推导",
    "5.8 总结回顾",
    "5.9 结尾语",
  ],
  invariant: "matched始终是已读文本后缀与模式前缀的最长匹配长度",
  fault: "prefix或next数组的索引约定改变后，搜索循环仍沿用旧回退位置",
  artifact: "文本与模式、prefix推导、朴素与KMP比较轨迹、首个匹配和偏移反例",
  experiment: "kmp",
  operations: [
    {
      label: "构造前缀状态",
      precondition: "模式非空且索引约定冻结",
      action: "逐字符计算最长真前后缀",
      invariant: "prefix[i]不超过i",
    },
    {
      label: "比较当前字符",
      precondition: "matched是合法模式下标",
      action: "比较text[i]与pattern[matched]",
      invariant: "已读文本以前无需回退",
    },
    {
      label: "失配回退",
      precondition: "matched大于0",
      action: "令matched回到较短边界",
      invariant: "保留仍可能匹配的最长前缀",
    },
    {
      label: "提交匹配",
      precondition: "matched等于模式长度",
      action: "返回当前文本位置减模式长度加一",
      invariant: "返回位置逐字符等于模式",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail: "第5章 串分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail: "第5章 串记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第5章 串每次操作先验证输入，再提交状态，并核对“matched始终是已读文本后缀与模式前缀的最长匹配长度”。",
    },
    {
      label: "真实计数门",
      detail:
        "第5章 串从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第5章 串只注入“prefix或next数组的索引约定改变后，搜索循环仍沿用旧回退位置”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第5章 串交付文本与模式、prefix推导、朴素与KMP比较轨迹、首个匹配和偏移反例，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function StringsRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function StringsOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function StringsTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
