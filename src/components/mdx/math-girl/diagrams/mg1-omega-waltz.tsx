"use client";

import { MathGirlOfficialLab } from "./official-lab";

const rotationCases = [
  {
    label: "乘1",
    fields: [
      ["模长", "保持为原来的1倍"],
      ["辐角", "增加0°"],
      ["几何", "点保持原位"],
    ],
  },
  {
    label: "乘i",
    fields: [
      ["模长", "保持为原来的1倍"],
      ["辐角", "增加90°"],
      ["几何", "逆时针四分之一圈"],
    ],
  },
  {
    label: "乘-1",
    fields: [
      ["模长", "保持为原来的1倍"],
      ["辐角", "增加180°"],
      ["几何", "绕原点转到对径点"],
    ],
  },
  {
    label: "乘ω",
    fields: [
      ["模长", "保持为原来的1倍"],
      ["辐角", "增加120°"],
      ["几何", "在三个单位根之间跳转"],
    ],
    alert: "复数乘法把代数运算变成“模长相乘、辐角相加”；单位复数只旋转，不缩放。",
  },
] as const;

const omegaCases = [
  {
    label: "ω⁰",
    fields: [
      ["值", "1"],
      ["位置", "单位圆0°"],
      ["关系", "三次单位根之一"],
    ],
  },
  {
    label: "ω¹",
    fields: [
      ["值", "-1/2 + (√3/2)i"],
      ["位置", "单位圆120°"],
      ["关系", "满足ω²+ω+1=0"],
    ],
  },
  {
    label: "ω²",
    fields: [
      ["值", "-1/2 - (√3/2)i"],
      ["位置", "单位圆240°"],
      ["关系", "ω的共轭与逆元"],
    ],
  },
  {
    label: "ω³",
    fields: [
      ["值", "1"],
      ["位置", "回到单位圆0°"],
      ["关系", "幂按模3循环"],
    ],
    alert: "1、ω、ω²构成正三角形，向量和为0；代数上对应1+ω+ω²=0。",
  },
] as const;

const proofCases = [
  {
    label: "因式分解",
    fields: [
      ["起点", "x³-1=(x-1)(x²+x+1)"],
      ["推出", "非实根满足ω²+ω+1=0"],
      ["验收", "再乘(x-1)展开回原式"],
    ],
  },
  {
    label: "极形式",
    fields: [
      ["起点", "z³=1要求模长1、辐角为2πk/3"],
      ["推出", "得到1、e^(2πi/3)、e^(4πi/3)"],
      ["验收", "各自立方的辐角为2π整数倍"],
    ],
  },
  {
    label: "几何",
    fields: [
      ["起点", "单位圆上相隔120°的三个点"],
      ["推出", "旋转对称且质心在原点"],
      ["验收", "三向量和为0"],
    ],
  },
  {
    label: "共轭",
    fields: [
      ["起点", "实系数多项式的非实根成共轭对"],
      ["推出", "ω̄=ω²，且ωω̄=1"],
      ["验收", "实部相同、虚部相反、模长均为1"],
    ],
    alert: "四种证据必须落到同一组三次单位根；若符号、角度或共轭不一致，说明某一步定义或计算有错。",
  },
] as const;

export function Mg1ComplexRotationLab() {
  return <MathGirlOfficialLab cases={rotationCases} caption="单位复数乘法对应不同角度的旋转。" tone="cyan" />;
}

export function Mg1OmegaCycleLab() {
  return <MathGirlOfficialLab cases={omegaCases} caption="ω的幂在1、ω、ω²之间按三步循环。" tone="violet" />;
}

export function Mg1OmegaProofLab() {
  return <MathGirlOfficialLab cases={proofCases} caption="因式分解、极形式、几何与共轭互相校验单位根。" tone="emerald" />;
}
