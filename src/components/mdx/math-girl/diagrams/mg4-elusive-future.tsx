"use client";

import { MathGirlOfficialLab } from "./official-lab";

const orderCases = [
  {
    label: "精确步数",
    fields: [
      ["普通顺序查找", "Tᴸ(n)=4n+5"],
      ["哨兵顺序查找", "Tˢ(n)=3n+7"],
      ["差值", "Tᴸ(n)-Tˢ(n)=n-2"],
      ["结论", "n大于2时哨兵更快"],
    ],
  },
  {
    label: "大O定义",
    fields: [
      ["目标", "T(n)=O(f(n))"],
      ["存在常数", "N与C大于0"],
      ["最终约束", "n≥N时|T(n)|≤Cf(n)"],
      ["读法", "T至多为f(n)阶"],
    ],
  },
  {
    label: "上界分类",
    fields: [
      ["成立", "4n+5=O(n)"],
      ["也成立", "n+1000=O(n)"],
      ["不成立", "n²=O(n)"],
      ["信息损失", "4n+5=O(n¹⁰⁰⁰)正确但很松"],
    ],
  },
  {
    label: "O Ω Θ",
    fields: [
      ["O", "至多，上界"],
      ["Ω", "至少，下界"],
      ["Θ", "恰好，上下界同阶"],
      ["层级", "1 < log n < n < n log n < n² < 2ⁿ"],
    ],
    alert: "大O不是“恰好等于”。哨兵版确实少了约四分之一步数，但两种顺序查找仍同属O(n)，没有改变增长阶。",
  },
] as const;

const binaryCases = [
  {
    label: "输入约定",
    fields: [
      ["数列", "A[1]≤...≤A[n]"],
      ["前提", "已经升序排列"],
      ["目标", "判断v是否存在"],
      ["代价", "每次比较保留一半范围"],
    ],
  },
  {
    label: "77的轨迹",
    fields: [
      ["数组", "26,31,41,53,77,89,93,97"],
      ["第1次", "k=4，比53，小于77"],
      ["第2次", "k=6，比89，大于77"],
      ["第3次", "k=5，找到77"],
    ],
  },
  {
    label: "运行计数",
    fields: [
      ["循环比较", "M(n)"],
      ["总运行步数", "7M+2S+6"],
      ["指示器S", "找到为1，否则为0"],
      ["支配项", "M(n)"],
    ],
  },
  {
    label: "对数上界",
    fields: [
      ["实验规律", "2^(M(n)-1)≤n"],
      ["取对数", "M(n)≤1+log₂n"],
      ["结论", "M(n)=O(log n)"],
      ["意义", "多一次比较可处理约双倍数据"],
    ],
    alert: "二分查找快的交换条件是“输入有序”。若只有一次查询，排序成本可能不划算；多次查询时预排序才容易摊薄。",
  },
] as const;

const bubbleCases = [
  {
    label: "冒泡流程",
    fields: [
      ["基本操作", "比较A[k]与A[k+1]"],
      ["逆序", "交换相邻元素"],
      ["一趟结果", "当前最大值浮到右端"],
      ["范围", "m每趟减1"],
    ],
  },
  {
    label: "测试用例",
    fields: [
      ["输入", "53,89,41,31,26"],
      ["第1趟终点", "89到达最右"],
      ["后续", "53、41、31依次就位"],
      ["输出", "26,31,41,53,89"],
    ],
  },
  {
    label: "次数求和",
    fields: [
      ["内层检查", "n+(n-1)+...+2"],
      ["主导数量", "约n²/2"],
      ["最大运行步数", "3n²+2n"],
      ["渐近结论", "O(n²)"],
    ],
  },
  {
    label: "O的集合",
    fields: [
      ["T(n)=O(f(n))", "T属于由f常数倍最终控制的函数集合"],
      ["等号", "不能交换左右"],
      ["包含层级", "O(1)⊂O(log n)⊂O(n)⊂O(n²)"],
      ["用途", "传达输入很大时的渐近状态"],
    ],
    alert: "O(f(n))表示函数集合，所以T(n)=O(f(n))更像成员关系；不能由两个函数都属于O(n)推出它们彼此相等。",
  },
] as const;

const comparisonCases = [
  {
    label: "动态转静态",
    fields: [
      ["动态对象", "算法随比较结果改变路线"],
      ["静态对象", "把所有路线展开成比较树"],
      ["内部结点", "一次元素比较"],
      ["叶子", "一种最终排列"],
    ],
  },
  {
    label: "三元素树",
    fields: [
      ["输入排列", "3!=6种"],
      ["每次比较", "至多分成两支"],
      ["叶子要求", "至少覆盖6种排列"],
      ["高度", "最坏路线的比较次数"],
    ],
  },
  {
    label: "一般下界",
    fields: [
      ["高度h的叶子", "至多2^h"],
      ["排序所需叶子", "至少n!"],
      ["必要条件", "2^h≥n!"],
      ["取对数", "h≥log₂(n!)"],
    ],
  },
  {
    label: "n log n",
    fields: [
      ["阶乘下界", "后半段至少(n/2)^(n/2)"],
      ["对数下界", "log(n!)=Ω(n log n)"],
      ["比较排序", "最坏比较次数Ω(n log n)"],
      ["二分查找", "上下界合并为Θ(log n)"],
    ],
    alert: "比较树证明不依赖某个具体排序程序，因此限制的是所有比较排序。要突破n log n，必须利用“比较”之外的额外信息。",
  },
] as const;

export function Mg4OrderNotationLab() {
  return (
    <MathGirlOfficialLab
      cases={orderCases}
      caption="精确步数能比较常数差异，大O则按最终增长率分类；O、Ω、Θ分别表达上界、下界与紧确阶。"
      tone="cyan"
    />
  );
}

export function Mg4BinarySearchAnalysisLab() {
  return (
    <MathGirlOfficialLab
      cases={binaryCases}
      caption="有序性让二分查找每次排除一半范围，逐行计数最终归结为M(n)≤1+log₂n。"
      tone="amber"
    />
  );
}

export function Mg4BubbleSortAnalysisLab() {
  return (
    <MathGirlOfficialLab
      cases={bubbleCases}
      caption="冒泡排序的内层次数形成三角和，最大运行步数为二次阶；把大O看成函数集合可解释其层级和非对称等号。"
      tone="violet"
    />
  );
}

export function Mg4ComparisonTreeLab() {
  return (
    <MathGirlOfficialLab
      cases={comparisonCases}
      caption="比较树把动态分支静态化，由叶子数2^h至少覆盖n!种排列，得到所有比较排序的Ω(n log n)下界。"
      tone="emerald"
    />
  );
}
