"use client";

import { MathGirlOfficialLab } from "./official-lab";

const exponentCases = [
  {
    label: "自然数指数",
    fields: [
      ["旧直觉", "a^n是n个a相乘"],
      ["适用", "n=1,2,3,..."],
      ["边界", "无法解释0、负数、分数、复数"],
    ],
  },
  {
    label: "指数运算法则",
    fields: [
      ["核心", "a^s a^t=a^(s+t)"],
      ["零次方", "a^0=1"],
      ["负一次方", "a^(-1)=1/a"],
    ],
  },
  {
    label: "二分之一次方",
    fields: [
      ["关系", "(a^(1/2))^2=a"],
      ["实数选择", "a>0时取正平方根"],
      ["提醒", "方程x^2=a本身可能有两个根"],
    ],
  },
  {
    label: "相容性",
    fields: [
      ["目标", "不同推导不能给出冲突值"],
      ["术语", "well-defined"],
      ["方法", "用一致法则扩张旧定义"],
    ],
    alert: "“相乘次数”只是自然数指数的直觉，不是复指数的定义。扩张范围时必须改用相容的数学公式。",
  },
] as const;

const seriesCases = [
  {
    label: "微分方程",
    fields: [
      ["函数", "f(x)=e^x"],
      ["条件", "f'(x)=f(x)"],
      ["初值", "f(0)=1"],
    ],
  },
  {
    label: "幂级数",
    fields: [
      ["假设", "f(x)=Σ a_n x^n"],
      ["逐项微分", "f'(x)=Σ (n+1)a_(n+1)x^n"],
      ["比较系数", "(n+1)a_(n+1)=a_n"],
    ],
  },
  {
    label: "多米诺递推",
    fields: [
      ["起点", "a_0=1"],
      ["递推", "a_n=a_(n-1)/n"],
      ["结果", "a_n=1/n!"],
    ],
  },
  {
    label: "泰勒展开",
    fields: [
      ["公式", "e^x=Σ x^n/n!"],
      ["作用", "把函数编码成系数序列"],
      ["严谨条件", "收敛与逐项微分需证明"],
    ],
    alert: "写出幂级数不是自动证明。严格论证还要说明级数收敛、可逐项微分，并唯一满足微分方程与初值。",
  },
] as const;

const eulerCases = [
  {
    label: "大胆代入",
    fields: [
      ["定义", "e^z=Σ z^n/n!"],
      ["代入", "z=iθ"],
      ["循环", "1,i,-1,-i"],
    ],
  },
  {
    label: "偶奇分流",
    fields: [
      ["偶次项", "1-θ^2/2!+θ^4/4!-..."],
      ["奇次项", "i(θ-θ^3/3!+θ^5/5!-...)"],
      ["识别", "cosθ 与 i sinθ"],
    ],
  },
  {
    label: "欧拉公式",
    fields: [
      ["公式", "e^(iθ)=cosθ+i sinθ"],
      ["几何", "单位圆上幅角θ的点"],
      ["周期", "增加2π回到同一点"],
    ],
  },
  {
    label: "欧拉恒等式",
    fields: [
      ["代入", "θ=π"],
      ["数值", "cosπ=-1, sinπ=0"],
      ["结论", "e^(iπ)+1=0"],
    ],
    alert: "欧拉恒等式是欧拉公式在θ=π时的特例；“美”来自定义、级数、三角函数与单位圆在同一式子中相容。",
  },
] as const;

export function Mg2ExponentExtensionLab() {
  return <MathGirlOfficialLab cases={exponentCases} caption="让指数运算法则接替“相乘次数”，相容地扩张到零、负数与分数。" tone="amber" />;
}

export function Mg2ExponentialSeriesLab() {
  return <MathGirlOfficialLab cases={seriesCases} caption="微分方程和初值逐项锁定幂级数系数，像多米诺骨牌一样得到1/n!。" tone="cyan" />;
}

export function Mg2EulerBridgeLab() {
  return <MathGirlOfficialLab cases={eulerCases} caption="复指数级数按偶次与奇次分流，分别认出余弦和正弦，再落到单位圆。" tone="emerald" />;
}
