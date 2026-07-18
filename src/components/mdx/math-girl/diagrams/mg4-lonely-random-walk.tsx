"use client";

import { MathGirlOfficialLab } from "./official-lab";

const pianoCases = [
  {
    label: "题意",
    fields: [
      ["开始与结束", "do开始，fa结束，净上升3级"],
      ["长度", "12个音，因此走11步"],
      ["每一步", "只到相邻白键：上1级或下1级"],
      ["边界", "任何时刻都不能低于开始音do"],
    ],
  },
  {
    label: "步数守恒",
    fields: [
      ["设定", "上升u步，下降d步"],
      ["总步数", "u+d=11"],
      ["净位移", "u-d=3"],
      ["解", "u=7，d=4"],
    ],
  },
  {
    label: "毅力比拼",
    fields: [
      ["状态", "c(t,h)：t步后位于高度h的合法路径数"],
      ["递推", "c(t+1,h)=c(t,h-1)+c(t,h+1)"],
      ["边界", "h小于0时计数为0"],
      ["终点", "c(11,3)=165"],
    ],
  },
  {
    label: "镜像一击",
    fields: [
      ["所有路径", "C(11,7)=330"],
      ["越界坏路径", "首次越界后翻转，双射到C(11,3)"],
      ["合法路径", "330-165"],
      ["答案", "165种旋律"],
    ],
    alert:
      "只排列7个上箭头与4个下箭头会把跌到do以下的路径也算进去。反射原理不是近似扣除，而是给坏路径与镜像终点路径建立一一对应。",
  },
] as const;

const cayleyCases = [
  {
    label: "直接平方",
    fields: [
      ["矩阵", "A=[[a,b],[c,d]]"],
      ["左上", "a²+bc"],
      ["右上与左下", "ab+bd；ac+cd"],
      ["右下", "bc+d²"],
    ],
  },
  {
    label: "迹乘矩阵",
    fields: [
      ["迹", "tr(A)=a+d"],
      ["乘积", "(a+d)A"],
      ["非对角元素", "与A²对应位置完全相同"],
      ["相减", "两个非对角元素消失"],
    ],
  },
  {
    label: "行列式补偿",
    fields: [
      ["A²-tr(A)A", "(bc-ad)I"],
      ["行列式", "det(A)=ad-bc"],
      ["补回", "+det(A)I"],
      ["结果", "零矩阵O"],
    ],
  },
  {
    label: "凯莱-哈密顿",
    fields: [
      ["恒等式", "A²-tr(A)A+det(A)I=O"],
      ["意义", "矩阵满足自己的特征多项式"],
      ["二阶用途", "把高次幂降成A与I的组合"],
      ["后续连接", "特征方程拥有同样结构"],
    ],
    alert:
      "a+d并非无名的中间量，它是矩阵的迹；ad-bc是行列式。二者恰是二阶特征多项式的两个系数。",
  },
] as const;

const transitionCases = [
  {
    label: "状态模型",
    fields: [
      ["A国留在A", "1-p"],
      ["A国转到B", "p"],
      ["B国转到A", "q"],
      ["B国留在B", "1-q"],
    ],
  },
  {
    label: "一年递推",
    fields: [
      ["概率向量", "vₙ=[aₙ,bₙ]ᵀ"],
      ["A国概率", "aₙ₊₁=(1-p)aₙ+qbₙ"],
      ["B国概率", "bₙ₊₁=paₙ+(1-q)bₙ"],
      ["转移矩阵", "T=[[1-p,q],[p,1-q]]"],
    ],
  },
  {
    label: "两年意义",
    fields: [
      ["一年后", "vₙ₊₁=Tvₙ"],
      ["两年后", "vₙ₊₂=T²vₙ"],
      ["路径含义", "T²每项汇总两步中间状态"],
      ["不漏不重", "对所有A/B中间路径分类求和"],
    ],
  },
  {
    label: "n年目标",
    fields: [
      ["初始", "v₀=[1/2,1/2]ᵀ"],
      ["第n年", "vₙ=Tⁿv₀"],
      ["困难", "直接连乘不显露n的通式"],
      ["策略", "把T对角化后计算Tⁿ"],
    ],
    alert:
      "不能按“n次硬币中有m次正面”直接分类：同一次正面在A国表示留下，在B国也表示留下，但下一年的硬币参数又依赖当前国家。状态顺序决定路径概率。",
  },
] as const;

const diagonalCases = [
  {
    label: "两项准备",
    fields: [
      ["对角幂", "diag(α,β)ⁿ=diag(αⁿ,βⁿ)"],
      ["三明治", "(PDP⁻¹)ⁿ=PDⁿP⁻¹"],
      ["原因", "中间P⁻¹P不断消成I"],
      ["目标", "T=PDP⁻¹"],
    ],
  },
  {
    label: "特征值",
    fields: [
      ["特征方程", "det(T-xI)=0"],
      ["因式分解", "(x-1)(x-(1-p-q))=0"],
      ["第一特征值", "λ₁=1"],
      ["第二特征值", "λ₂=1-p-q"],
    ],
  },
  {
    label: "特征向量",
    fields: [
      ["λ₁的向量", "[q,p]ᵀ"],
      ["λ₂的向量", "[-1,1]ᵀ"],
      ["P", "[[q,-1],[p,1]]"],
      ["P⁻¹", "(1/(p+q))[[1,1],[-p,q]]"],
    ],
  },
  {
    label: "答案与极限",
    fields: [
      ["记号", "r=1-p-q"],
      ["A国概率", "aₙ=q/(p+q)+(p-q)rⁿ/(2(p+q))"],
      ["瞬态", "因为|r|<1，所以rⁿ趋于0"],
      ["长期比例", "A国q/(p+q)，B国p/(p+q)"],
    ],
    alert:
      "特征值1保存总概率；特征值1-p-q控制初始偏差衰减。对角化不是为了制造更多字母，而是把两个相互耦合的状态拆成两个独立变化模式。",
  },
] as const;

export function Mg4PianoPathLab() {
  return (
    <MathGirlOfficialLab
      cases={pianoCases}
      caption="12个音对应11步、净上升3级，因此必须上7步下4步；动态规划逐格累加，反射原理则从330条总路径中精确扣除165条越界路径。"
      tone="cyan"
    />
  );
}

export function Mg4CayleyHamiltonLab() {
  return (
    <MathGirlOfficialLab
      cases={cayleyCases}
      caption="A²与tr(A)A的非对角项相消，剩余恰由det(A)I补回，得到二阶凯莱-哈密顿恒等式。"
      tone="amber"
    />
  );
}

export function Mg4WanderTransitionLab() {
  return (
    <MathGirlOfficialLab
      cases={transitionCases}
      caption="转移矩阵的一列描述从一个国家出发的下一年分布；矩阵平方汇总两步路径，矩阵n次方汇总n年路径。"
      tone="violet"
    />
  );
}

export function Mg4DiagonalizationLab() {
  return (
    <MathGirlOfficialLab
      cases={diagonalCases}
      caption="对角化把转移矩阵分成守恒模式1与衰减模式1-p-q，从而同时给出精确第n年概率和长期稳定分布。"
      tone="emerald"
    />
  );
}
