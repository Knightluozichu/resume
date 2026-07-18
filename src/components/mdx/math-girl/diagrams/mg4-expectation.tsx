"use client";

import { MathGirlOfficialLab } from "./official-lab";

const randomVariableCases = [
  {
    label: "函数定义",
    fields: [
      ["输入", "样本空间中的结果ω"],
      ["映射", "X: Ω→R"],
      ["输出", "由结果确定的实数X(ω)"],
      ["直觉", "给随机试验确定的量起名字"],
    ],
  },
  {
    label: "百倍游戏",
    fields: [
      ["骰子点数ω", "1，2，3，4，5，6"],
      ["奖金X(ω)", "100，200，300，400，500，600"],
      ["规则", "X(ω)=100ω"],
      ["每个奖金概率", "1/6"],
    ],
  },
  {
    label: "概率分布",
    fields: [
      ["关注对象", "奖金c而非骰子点数"],
      ["写法", "Pr(X=c)"],
      ["等价事件", "所有满足X(ω)=c的ω"],
      ["作用", "忘记骰子后仍可讨论奖金"],
    ],
  },
  {
    label: "期望面积",
    fields: [
      ["每条宽度", "概率1/6"],
      ["各条高度", "100至600日元"],
      ["面积总和", "Σc·Pr(X=c)"],
      ["公平参加费", "E[X]=350日元"],
    ],
    alert: "期望是按概率加权后的平均值，不是下一次必然得到的奖金；350日元是长期平均收益对应的公平参加费。",
  },
] as const;

const linearityCases = [
  {
    label: "加法性质",
    fields: [
      ["随机变量", "X与Y定义在同一样本空间"],
      ["和", "X+Y仍是随机变量"],
      ["线性法则", "E[X+Y]=E[X]+E[Y]"],
      ["独立要求", "不需要独立"],
    ],
  },
  {
    label: "常数倍",
    fields: [
      ["常数", "任意K"],
      ["缩放变量", "KX"],
      ["线性法则", "E[KX]=K·E[X]"],
      ["一般形式", "期望可穿过有限求和"],
    ],
  },
  {
    label: "两次骰子",
    fields: [
      ["第1次", "X₁，期望3.5"],
      ["第2次", "X₂，期望3.5"],
      ["点数和", "X=X₁+X₂"],
      ["结论", "E[X]=7"],
    ],
  },
  {
    label: "两条路线",
    fields: [
      ["直接路线", "先求2至12的三角分布"],
      ["线性路线", "3.5+3.5"],
      ["共同结果", "7"],
      ["教学口号", "示例是理解的试金石"],
    ],
    alert: "线性法则的价值不是把7算得更神秘，而是避开和变量的复杂分布；即使各变量相关，加法性质仍成立。",
  },
] as const;

const binomialCases = [
  {
    label: "二项分布",
    fields: [
      ["正面概率", "p"],
      ["反面概率", "q=1-p"],
      ["n次恰有k次正面", "C(n,k)p^kq^(n-k)"],
      ["归一化", "ΣPₙ(k)=(p+q)^n=1"],
    ],
  },
  {
    label: "三次展开",
    fields: [
      ["随机变量", "X=三次中正面个数"],
      ["直接期望", "Σk·P₃(k)"],
      ["消去高次项", "p²、p³系数相消"],
      ["结果", "E[X]=3p"],
    ],
  },
  {
    label: "指示器",
    fields: [
      ["第k次为正面", "Xₖ=1"],
      ["第k次为反面", "Xₖ=0"],
      ["单项期望", "E[Xₖ]=Pr(Xₖ=1)=p"],
      ["总正面数", "X=ΣXₖ"],
    ],
  },
  {
    label: "线性求解",
    fields: [
      ["拆分", "X=X₁+...+Xₙ"],
      ["取期望", "E[X]=ΣE[Xₖ]"],
      ["每项", "E[Xₖ]=p"],
      ["最终", "E[X]=np"],
    ],
    alert: "指示器把“计数”变成0与1的和；再让期望穿过求和，就不必展开完整二项分布。",
  },
] as const;

const collectorCases = [
  {
    label: "直接计数迷宫",
    fields: [
      ["目标", "直到六种点数全部出现"],
      ["总次数", "随机变量X，最小为6"],
      ["难点", "Pr(X=7)还要保证第7次才集齐"],
      ["结论", "直接枚举Pr(X=k)迅速失控"],
    ],
  },
  {
    label: "幸福的台阶",
    fields: [
      ["第j层", "已经收集j种点数"],
      ["新点数", "上一个台阶"],
      ["重复点数", "停在当前台阶"],
      ["阶段长度", "Xⱼ"],
    ],
  },
  {
    label: "变化的硬币",
    fields: [
      ["成功概率", "pⱼ=(6-j)/6"],
      ["失败概率", "qⱼ=j/6"],
      ["阶段分布", "Pr(Xⱼ=k)=qⱼ^(k-1)pⱼ"],
      ["阶段期望", "E[Xⱼ]=1/pⱼ=6/(6-j)"],
    ],
  },
  {
    label: "收集完成",
    fields: [
      ["总和", "X=X₀+X₁+...+X₅"],
      ["期望", "Σ6/(6-j)"],
      ["调和数", "6H₆"],
      ["数值", "14.7次"],
    ],
    alert: "最难等的是最后一种点数：最后一级成功概率只有1/6，单独贡献6次期望；六级相加得到6H₆。",
  },
] as const;

export function Mg4RandomVariableExpectationLab() {
  return (
    <MathGirlOfficialLab
      cases={randomVariableCases}
      caption="百倍游戏把骰子结果映射为奖金，再由奖金分布计算加权面积；350日元既是期望，也是长期意义下的公平参加费。"
      tone="cyan"
    />
  );
}

export function Mg4ExpectationLinearityLab() {
  return (
    <MathGirlOfficialLab
      cases={linearityCases}
      caption="两次骰子点数和既可先求2至12的完整分布，也可直接相加两个3.5；线性法则不要求独立。"
      tone="amber"
    />
  );
}

export function Mg4BinomialIndicatorLab() {
  return (
    <MathGirlOfficialLab
      cases={binomialCases}
      caption="二项分布能直接给出正面次数的分布，而指示器加线性法则把同一问题压缩成n个概率p之和。"
      tone="violet"
    />
  );
}

export function Mg4CouponCollectorLab() {
  return (
    <MathGirlOfficialLab
      cases={collectorCases}
      caption="幸福台阶把收集六种点数的总时间拆成六段几何等待时间，最终得到6H₆=14.7。"
      tone="emerald"
    />
  );
}
