"use client";

import { MathGirlOfficialLab } from "./official-lab";

const countingCases = [
  {
    label: "定义",
    fields: [
      ["对象", "把n写成正整数之和，忽略加数顺序"],
      ["记号", "P(n)或P_n表示分拆方式总数"],
      ["硬币模型", "每种正整数面值都可使用任意枚"],
    ],
  },
  {
    label: "零分拆",
    fields: [
      ["数值", "P_0=1"],
      ["对象", "空分拆，也就是一枚硬币都不选"],
      ["作用", "让递推和生成函数的常数项成立"],
    ],
  },
  {
    label: "小规模",
    fields: [
      ["序列", "1,1,2,3,5,7,..."],
      ["检查点", "P_4=5，P_5=7，P_9=30"],
      ["风险", "人工列举P_9时漏一项就会得到29"],
    ],
  },
  {
    label: "动态递推",
    fields: [
      ["状态", "q(n,k)：只用不超过k的部件分拆n"],
      ["递推", "q(n,k)=q(n,k-1)+q(n-k,k)"],
      ["验收", "不使用k或至少使用一个k，两类不重不漏"],
    ],
    alert: "分拆忽略顺序；把3+1和1+3当成两种，会把分拆误算成有序拆分。",
  },
] as const;

const productCases = [
  {
    label: "单种面值",
    fields: [
      ["k元硬币", "可选0,1,2,...枚"],
      ["贡献", "1+x^k+x^(2k)+..."],
      ["闭式", "1/(1-x^k)"],
    ],
  },
  {
    label: "有限模型",
    fields: [
      ["面值", "只允许1,2,3元"],
      ["每种一枚", "(1+x)(1+x^2)(1+x^3)"],
      ["x^3系数", "2，对应3与2+1"],
    ],
  },
  {
    label: "无限乘积",
    fields: [
      ["生成函数", "P(x)=product(k>=1)1/(1-x^k)"],
      ["一次选择", "从第k因子选择x^(k*m_k)"],
      ["系数", "x^n的系数统计sum k*m_k=n的解"],
    ],
  },
  {
    label: "有限截断",
    fields: [
      ["目标", "只求P_n"],
      ["可忽略", "所有k>n的因子只能贡献常数项1"],
      ["意义", "每个固定系数只依赖有限个因子"],
    ],
    alert: "无限项积不是把无穷多个数随意相乘；先固定目标系数，再说明只有有限因子会影响它。",
  },
] as const;

const boundCases = [
  {
    label: "斐波那契界",
    fields: [
      ["关键递推", "P_(k+2)<=P_(k+1)+P_k"],
      ["基础", "P_0<=F_1且P_1<=F_2"],
      ["结论", "P_n<=F_(n+1)，所以P_15<=987"],
    ],
  },
  {
    label: "系数界",
    fields: [
      ["条件", "0<x<1"],
      ["正项", "P_n*x^n<=P(x)"],
      ["候选", "P_n<=x^(-n) product(k=1..n)(1-x^k)^(-1)"],
    ],
  },
  {
    label: "东西两路",
    fields: [
      ["东边森林", "-sum log(1-x^k)<(pi^2/6)t"],
      ["西边山丘", "-n log x<n/t"],
      ["换元", "t=x/(1-x)>0"],
    ],
  },
  {
    label: "最优化",
    fields: [
      ["函数", "g(t)=n/t+(pi^2/6)t"],
      ["最优参数", "t=sqrt(6n)/pi"],
      ["上界", "P_n<exp(pi*sqrt(2n/3))"],
    ],
    alert: "每次放宽不等式都会牺牲精确性；上界只保证不会超过，不等于给出了P_n的精确值。",
  },
] as const;

export function Mg1PartitionCountingLab() {
  return <MathGirlOfficialLab cases={countingCases} caption="把分拆固定成无序对象，并用空分拆和动态递推建立不重不漏的计数基线。" tone="amber" />;
}

export function Mg1PartitionProductLab() {
  return <MathGirlOfficialLab cases={productCases} caption="每个面值因子记录该硬币的使用枚数，乘积的同次项合并后得到分拆数。" tone="cyan" />;
}

export function Mg1PartitionBoundLab() {
  return <MathGirlOfficialLab cases={boundCases} caption="先用单射得到斐波那契界，再把生成函数拆成两条可分别控制并最终优化的上界路线。" tone="emerald" />;
}
