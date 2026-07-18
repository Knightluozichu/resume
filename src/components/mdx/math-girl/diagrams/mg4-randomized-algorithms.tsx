"use client";

import { MathGirlOfficialLab } from "./official-lab";

const partitionCases = [
  {
    label: "输入与边界",
    fields: [
      ["输入", "数列A与闭区间[L,R]"],
      ["枢纽项", "先取A[L]"],
      ["p", "小于枢纽项区域的右边界"],
      ["k", "尚未确认区域的最前线"],
    ],
  },
  {
    label: "循环不变量",
    fields: [
      ["L+1至p", "都小于枢纽项"],
      ["p+1至k-1", "都大于等于枢纽项"],
      ["k至R", "尚未比较"],
      ["每轮", "比较A[k]后令k前进"],
    ],
  },
  {
    label: "两只翅膀",
    fields: [
      ["循环结束", "交换A[L]与A[p]"],
      ["左翼", "L至p-1，全都小于枢纽项"],
      ["中点", "p处为枢纽项的最终位置"],
      ["右翼", "p+1至R，全都大于等于枢纽项"],
    ],
  },
  {
    label: "递归结束",
    fields: [
      ["左递归", "QUICKSORT(A,L,p-1)"],
      ["右递归", "QUICKSORT(A,p+1,R)"],
      ["基本情况", "子数列大小为0或1"],
      ["分而治之", "划分、递归、合成"],
    ],
    alert:
      "枢纽项落到最左或最右时，一只翅膀会消失。这不是错误，却会让递归规模只缩小1，并造成平方阶最坏情况。",
  },
] as const;

const recurrenceCases = [
  {
    label: "单次代价",
    fields: [
      ["运行步数", "TQ(n)"],
      ["交换次数", "W≤n-1"],
      ["保守上界", "7n+2"],
      ["子问题", "大小j-1与n-j"],
    ],
  },
  {
    label: "最大情况",
    fields: [
      ["枢纽位置", "每次都在端点"],
      ["递推", "M(n)=7n+2+M(n-1)+M(0)"],
      ["展开", "线性项逐层累加"],
      ["结论", "M(n)=Θ(n²)"],
    ],
  },
  {
    label: "平均递推",
    fields: [
      ["假设", "n!种排列等概率"],
      ["枢纽秩", "j在1至n均匀"],
      ["递推", "A(n)=7n+2+(2/n)ΣA(i)"],
      ["基本值", "A(0)=A(1)=4"],
    ],
  },
  {
    label: "调和数",
    fields: [
      ["变形", "F(n)=A(n)/(n+1)"],
      ["精确式", "A(n)=14(n+1)Hn+19-58(n+1)/3"],
      ["Hn", "1+1/2+⋯+1/n"],
      ["结论", "A(n)=Θ(n log n)"],
    ],
    alert:
      "普通快排的“平均”依赖输入排列均匀这一前提。输入长期接近有序时，平均运行步数不能用这个分布假设替代真实工作负载。",
  },
] as const;

const indicatorCases = [
  {
    label: "比较何时发生",
    fields: [
      ["元素", "固定1≤j<k≤n"],
      ["区间", "{j,j+1,…,k}"],
      ["会比较", "j或k最先成为枢纽项"],
      ["不比较", "中间元素先成为枢纽项并把二者分开"],
    ],
  },
  {
    label: "指示器",
    fields: [
      ["Xj,k=1", "j与k被比较"],
      ["Xj,k=0", "j与k未比较"],
      ["至多一次", "比较不跨越左右翅膀"],
      ["总次数", "X=ΣXj,k"],
    ],
  },
  {
    label: "概率即期望",
    fields: [
      ["区间元素数", "k-j+1"],
      ["有利枢纽", "端点j或k，共2个"],
      ["概率", "P(Xj,k=1)=2/(k-j+1)"],
      ["线性法则", "E[X]=ΣE[Xj,k]"],
    ],
  },
  {
    label: "求和结果",
    fields: [
      ["双重和", "Σj<k 2/(k-j+1)"],
      ["调和形式", "2Σ(Hn-j+1-1)"],
      ["精确期望", "2(n+1)Hn-4n"],
      ["增长阶", "Θ(n log n)"],
    ],
    alert:
      "期望的线性法则不要求各个Xj,k独立。这里真正需要证明的是每一对元素的比较概率，而不是假设所有比较事件互不影响。",
  },
] as const;

const randomnessCases = [
  {
    label: "随机快排",
    fields: [
      ["目的", "回避固定枢纽的最坏输入"],
      ["随机量", "在[L,R]均匀选择枢纽"],
      ["正确性", "每次都输出正确排序"],
      ["代价", "任意输入上期望Θ(n log n)"],
    ],
  },
  {
    label: "随机抽样",
    fields: [
      ["目的", "用少量样本把握庞大整体"],
      ["类比", "把汤搅匀后尝一口"],
      ["前提", "抽样机制与目标总体匹配"],
      ["输出", "带不确定性的总体估计"],
    ],
  },
  {
    label: "概率质数测试",
    fields: [
      ["目的", "快速积累合数证据"],
      ["输出一", "一定是合数"],
      ["输出二", "可能为质数"],
      ["责任", "定量报告失败概率"],
    ],
  },
  {
    label: "两种分析",
    fields: [
      ["算法概率分析", "先假设输入的概率分布"],
      ["随机算法分析", "固定任意输入，概率来自算法内部"],
      ["报告原则", "说清随机性来自哪里"],
      ["沟通原则", "示例、前提、量化与可复查"],
    ],
    alert:
      "“输入平均”与“算法内部随机”给出的公式可能相同，含义却不同。随机快排的期望针对每个固定输入成立，不需要把真实输入假装成均匀分布。",
  },
] as const;

export function Mg4QuicksortPartitionLab() {
  return (
    <MathGirlOfficialLab
      cases={partitionCases}
      caption="p与k维持三个连续区域；循环结束后枢纽项落到最终位置，左右两只翅膀再递归排序。"
      tone="cyan"
    />
  );
}

export function Mg4QuicksortRecurrenceLab() {
  return (
    <MathGirlOfficialLab
      cases={recurrenceCases}
      caption="同一套快排从端点枢纽的平方阶最坏情况，走到均匀排列下由调和数控制的平均Θ(n log n)。"
      tone="amber"
    />
  );
}

export function Mg4IndicatorComparisonLab() {
  return (
    <MathGirlOfficialLab
      cases={indicatorCases}
      caption="元素j与k是否比较是0或1指示器；区间端点率先成为枢纽的概率，把总比较次数化成可求的调和双重和。"
      tone="violet"
    />
  );
}

export function Mg4RandomnessSourceLab() {
  return (
    <MathGirlOfficialLab
      cases={randomnessCases}
      caption="随机性可以用于抽样、回避最坏输入或积累证据；分析时必须区分输入分布与算法内部随机源。"
      tone="emerald"
    />
  );
}
