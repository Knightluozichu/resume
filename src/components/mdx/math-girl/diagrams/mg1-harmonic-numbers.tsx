"use client";

import { MathGirlOfficialLab } from "./official-lab";

const infinityCases = [
  {
    label: "部分和",
    fields: [
      ["对象", "Hn=sum(k=1..n)1/k"],
      ["性质", "每个固定n只含有限项，值确定"],
      ["变量", "k受求和号约束，n保留为自由参数"],
    ],
  },
  {
    label: "无穷级数",
    fields: [
      ["对象", "sum(k>=1)1/k"],
      ["定义", "研究部分和Hn在n趋于无穷时的极限"],
      ["边界", "无穷不是可代入上限的普通数字"],
    ],
  },
  {
    label: "发散量词",
    fields: [
      ["命题", "对每个M>0，都存在N"],
      ["后续", "当n>=N时Hn>M"],
      ["顺序", "N可以依赖M，但不能先固定一个N应付所有M"],
    ],
  },
  {
    label: "反例",
    fields: [
      ["数列", "a(k)=2^(-k)>0"],
      ["部分和", "始终小于1"],
      ["结论", "每项为正只保证递增，不保证无界"],
    ],
    alert: "部分和递增与趋向正无穷是不同命题；正项级数还可能递增并收敛到有限上界。",
  },
] as const;

const divergenceCases = [
  {
    label: "分组",
    fields: [
      ["块", "按1, 2, 4, 8,...个连续项分组"],
      ["下界", "第m块每项至少1/2^(m+1)"],
      ["块和", "2^m项合计至少1/2"],
    ],
  },
  {
    label: "越过阈值",
    fields: [
      ["估计", "H(2^r)>=1+r/2"],
      ["给定M", "取r>2(M-1)"],
      ["证据", "构造出N=2^r使之后部分和超过M"],
    ],
  },
  {
    label: "增长界",
    fields: [
      ["积分比较", "log(n+1)<=Hn<=1+log n"],
      ["含义", "Hn无界，但增长只有对数量级"],
      ["检查", "发散可以极慢，有限样本会产生错觉"],
    ],
  },
  {
    label: "zeta边界",
    fields: [
      ["函数", "zeta(s)=sum n^(-s)"],
      ["s>1", "级数收敛"],
      ["s=1", "退化为调和级数并发散"],
    ],
    alert: "“趋于0”只是级数收敛的必要条件。1/n趋于0，但衰减不够快，分块后每一层仍贡献固定下界。",
  },
] as const;

const bridgeCases = [
  {
    label: "连续对数",
    fields: [
      ["函数", "f(x)=log x"],
      ["变化", "Df(x)=1/x"],
      ["逆运算", "积分1/x得到log x加常数"],
    ],
  },
  {
    label: "离散调和",
    fields: [
      ["函数", "H0=0，Hn=sum(k=1..n)1/k"],
      ["变化", "H(n+1)-Hn=1/(n+1)"],
      ["逆运算", "求和倒数得到调和数"],
    ],
  },
  {
    label: "欧拉乘积",
    fields: [
      ["假设", "只有有限个质数p1...pm"],
      ["有限值", "product(1-1/pj)^(-1)"],
      ["展开", "唯一分解让每个1/n恰好出现一次"],
    ],
  },
  {
    label: "矛盾",
    fields: [
      ["左侧", "有限个收敛等比级数的乘积为有限值"],
      ["右侧", "展开等于发散的调和级数"],
      ["结论", "有限质数假设错误，质数有无限多个"],
    ],
    alert: "欧拉乘积的展开依赖质因数分解唯一性；若分母重复或遗漏，便不能与调和级数逐项对应。",
  },
] as const;

export function Mg1PartialSumQuantifierLab() {
  return <MathGirlOfficialLab cases={infinityCases} caption="无穷级数由有限部分和的极限定义，发散命题由量词顺序精确控制。" tone="cyan" />;
}

export function Mg1HarmonicDivergenceLab() {
  return <MathGirlOfficialLab cases={divergenceCases} caption="二进制分组给出可构造的发散证据，积分比较揭示缓慢的对数增长。" tone="amber" />;
}

export function Mg1HarmonicPrimeBridgeLab() {
  return <MathGirlOfficialLab cases={bridgeCases} caption="调和数连接离散对数、zeta边界与欧拉乘积，并把发散转化为质数无限性的矛盾证据。" tone="violet" />;
}
