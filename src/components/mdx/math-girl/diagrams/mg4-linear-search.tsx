"use client";

import { MathGirlOfficialLab } from "./official-lab";

const traceCases = [
  {
    label: "输入与输出",
    fields: [
      ["输入", "数列A、大小n、目标v"],
      ["找到", "输出“能找到”"],
      ["未找到", "输出“无法找到”"],
    ],
  },
  {
    label: "检查第1项",
    fields: [
      ["当前位置", "k=1"],
      ["比较", "A[1]=31 ≠ 26"],
      ["下一步", "k←2"],
    ],
  },
  {
    label: "检查第2、3项",
    fields: [
      ["k=2", "41 ≠ 26"],
      ["k=3", "59 ≠ 26"],
      ["状态", "继续循环"],
    ],
  },
  {
    label: "检查第4项",
    fields: [
      ["当前位置", "k=4"],
      ["比较", "A[4]=26"],
      ["结果", "第18步返回“能找到”"],
    ],
    alert: "逐行调试不是凭眼睛跳到26，而是把自己当成计算机，严格沿L1至L10改变程序位置和变量状态。",
  },
] as const;

const countCases = [
  {
    label: "找到v",
    fields: [
      ["首次位置", "M"],
      ["while检查", "M次"],
      ["总步数", "4M+2"],
    ],
  },
  {
    label: "例：M=4",
    fields: [
      ["公式", "4M+2"],
      ["代入", "4×4+2"],
      ["验算", "18步"],
    ],
  },
  {
    label: "找不到v",
    fields: [
      ["有效元素", "n个"],
      ["while检查", "n+1次"],
      ["总步数", "4n+5"],
    ],
  },
  {
    label: "循环出口",
    fields: [
      ["最后一次检查", "k=n+1"],
      ["条件", "k≤n为假"],
      ["教训", "退出测试也要计数"],
    ],
    alert: "循环体运行n次，不等于while条件只判断n次。循环终止前还要用第n+1次判断确认条件为假。",
  },
] as const;

const indicatorCases = [
  {
    label: "定义S",
    fields: [
      ["找到v", "S=1"],
      ["找不到v", "S=0"],
      ["类型", "成功事件的指示器"],
    ],
  },
  {
    label: "定义M",
    fields: [
      ["S=1", "v首次出现的位置"],
      ["S=0", "令M=n"],
      ["注意", "重复v取最小位置"],
    ],
  },
  {
    label: "统一行计数",
    fields: [
      ["while检查", "M+1-S"],
      ["自增次数", "M-S"],
      ["失败返回", "1-S"],
    ],
  },
  {
    label: "统一总式",
    fields: [
      ["逐行求和", "4M-3S+5"],
      ["S=1", "还原4M+2"],
      ["S=0, M=n", "还原4n+5"],
    ],
    alert: "S不是为了遮住分情况，而是把两个互斥命题编码成1和0。代回两种取值必须精确还原原来的公式。",
  },
] as const;

const sentinelCases = [
  {
    label: "安放哨兵",
    fields: [
      ["新增位置", "A[n+1]"],
      ["写入", "A[n+1]←v"],
      ["保证", "搜索一定会停在某个v"],
    ],
  },
  {
    label: "删除边界测试",
    fields: [
      ["普通循环", "同时检查k≤n与A[k]"],
      ["哨兵循环", "只检查A[k]≠v"],
      ["退出后", "再判断k≤n"],
    ],
  },
  {
    label: "精确比较",
    fields: [
      ["普通版", "4M-3S+5"],
      ["哨兵版", "3M-3S+7"],
      ["普通减哨兵", "M-2"],
    ],
  },
  {
    label: "大规模结论",
    fields: [
      ["更快条件", "M>2"],
      ["主项比", "3M/4M=3/4"],
      ["渐近阶", "两者仍为O(n)"],
    ],
    alert: "哨兵减少约25%的主项操作，但没有改变线性增长阶。精确计数与渐近分析回答的是不同尺度的问题。",
  },
] as const;

export function Mg4LinearTraceLab() {
  return (
    <MathGirlOfficialLab
      cases={traceCases}
      caption="对A={31,41,59,26,53}逐行执行普通顺序查找：前三次比较失败，第4次命中，并在第18步结束。"
      tone="cyan"
    />
  );
}

export function Mg4OperationCountLab() {
  return (
    <MathGirlOfficialLab
      cases={countCases}
      caption="找到时用首次位置M计数，找不到时用规模n计数；循环退出所需的最后一次失败判断也属于运行步数。"
      tone="amber"
    />
  );
}

export function Mg4IndicatorLab() {
  return (
    <MathGirlOfficialLab
      cases={indicatorCases}
      caption="成功指示器S把“找到”和“找不到”压进同一张逐行计数表，统一得到4M-3S+5。"
      tone="violet"
    />
  );
}

export function Mg4SentinelCompareLab() {
  return (
    <MathGirlOfficialLab
      cases={sentinelCases}
      caption="把目标值放到A[n+1]充当哨兵，循环内不再反复检查边界；精确步数下降，但渐近阶仍是O(n)。"
      tone="emerald"
    />
  );
}
