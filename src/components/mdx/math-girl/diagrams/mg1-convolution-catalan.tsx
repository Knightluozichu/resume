"use client";

import { MathGirlOfficialLab } from "./official-lab";

const splitCases = [
  {
    label: "问题",
    fields: [
      ["对象", "n个加号连接n+1个操作数"],
      ["任务", "用括号规定二元运算顺序"],
      ["计数", "C0=1，C1=1，C2=2，C3=5"],
    ],
  },
  {
    label: "最后运算",
    fields: [
      ["切分", "最后一个加号把表达式分成左右两棵子树"],
      ["左侧", "k个加号，有Ck种括号化"],
      ["右侧", "n-1-k个加号，有C(n-1-k)种"],
    ],
  },
  {
    label: "乘后加",
    fields: [
      ["固定切分", "左右选择独立，方案数相乘"],
      ["遍历切分", "k=0到n-1的情况互斥，方案数相加"],
      ["递推", "Cn=sum Ck*C(n-1-k)"],
    ],
  },
  {
    label: "验收",
    fields: [
      ["完备", "每种完整括号化都有唯一最后运算"],
      ["互斥", "不同切分位置不可能表示同一棵树"],
      ["样本", "递推恢复1,1,2,5,14"],
    ],
    alert: "递推中的乘法来自左右独立选择，加法来自互斥切分；若不能说明这两点，公式只是猜测。",
  },
] as const;

const convolutionCases = [
  {
    label: "二项式",
    fields: [
      ["展开", "(x+y)^n=sum binom(n,k)x^(n-k)y^k"],
      ["系数", "从n个因子中选择k个贡献y"],
      ["平衡", "两个指数之和始终为n"],
    ],
  },
  {
    label: "数列卷积",
    fields: [
      ["定义", "(a*b)n=sum a(k)b(n-k)"],
      ["下标", "k与n-k此消彼长，总和固定为n"],
      ["结构", "先相乘后相加"],
    ],
  },
  {
    label: "函数乘法",
    fields: [
      ["函数", "A(x)=sum a(n)x^n，B(x)=sum b(n)x^n"],
      ["系数", "[x^n]A(x)B(x)=sum a(k)b(n-k)"],
      ["对应", "数列卷积等于生成函数乘法"],
    ],
  },
  {
    label: "卡塔兰",
    fields: [
      ["递推", "C(n+1)=sum Ck*C(n-k)"],
      ["函数", "C(x)^2的x^n系数正是右侧"],
      ["方程", "C(x)=1+xC(x)^2"],
    ],
    alert: "生成函数相乘时必须按总次数收集项；逐项相乘a(n)b(n)不是卷积，也不是乘积函数的系数。",
  },
] as const;

const solutionCases = [
  {
    label: "二次方程",
    fields: [
      ["方程", "xC^2-C+1=0"],
      ["两根", "C=(1±sqrt(1-4x))/(2x)"],
      ["约束", "生成函数定义要求C(0)=C0=1"],
    ],
  },
  {
    label: "分支选择",
    fields: [
      ["正号", "分子趋近2，除以2x后发散"],
      ["负号", "分子与x同阶，极限为1"],
      ["结果", "C=(1-sqrt(1-4x))/(2x)"],
    ],
  },
  {
    label: "格路径",
    fields: [
      ["全部路径", "binom(2n,n)"],
      ["坏路径", "首次越界后反射，对应binom(2n,n+1)"],
      ["合法路径", "两者相减"],
    ],
  },
  {
    label: "封闭式",
    fields: [
      ["结果", "Cn=binom(2n,n)/(n+1)"],
      ["递推回验", "代入卷积恢复后续项"],
      ["样本", "n=0..4得到1,1,2,5,14"],
    ],
    alert: "代数方程有两个分支，但只有满足常数项和形式幂级数定义的分支属于原计数问题。",
  },
] as const;

export function Mg1CatalanSplitLab() {
  return <MathGirlOfficialLab cases={splitCases} caption="按最后一次加法切分，独立选择相乘，互斥切分相加。" tone="emerald" />;
}

export function Mg1ConvolutionProductLab() {
  return <MathGirlOfficialLab cases={convolutionCases} caption="固定总下标的先乘后加，是数列卷积与生成函数乘法之间的桥。" tone="cyan" />;
}

export function Mg1CatalanSolutionLab() {
  return <MathGirlOfficialLab cases={solutionCases} caption="常数项选择代数分支，反射原理与生成函数共同给出卡塔兰封闭式。" tone="violet" />;
}
