"use client";

import { MathGirlOfficialLab } from "./official-lab";

const systemCases = [
  {
    label: "无解",
    fields: [
      ["第一条直线", "2x+4y=7"],
      ["第二条直线", "2x+4y=8"],
      ["消元结果", "0=1"],
      ["几何图像", "两条平行且不同的直线"],
    ],
  },
  {
    label: "无穷多解",
    fields: [
      ["第一条直线", "2x+4y=8"],
      ["第二条直线", "x+2y=4"],
      ["解的例子", "(0,2)、(2,1)、(4,0)"],
      ["几何图像", "两式表示同一条直线"],
    ],
  },
  {
    label: "唯一解",
    fields: [
      ["一般方程", "ax+by=s；cx+dy=t"],
      ["消元系数", "ad-bc"],
      ["判据", "ad-bc≠0"],
      ["几何图像", "两条直线恰交于一点"],
    ],
  },
  {
    label: "完整分类",
    fields: [
      ["单个方程", "可能是平面、空集、横线、竖线或斜线"],
      ["方程组", "两个解集的交集"],
      ["斜率差", "与ad-bc是否为0等价"],
      ["结论", "唯一解当且仅当ad-bc≠0"],
    ],
    alert:
      "由ad-bc≠0推得唯一解只证明了充分性。还要分类直线与退化方程，排除ad-bc=0时出现唯一交点的可能，才能得到“当且仅当”。",
  },
] as const;

const matrixCases = [
  {
    label: "行与列",
    fields: [
      ["2×2矩阵", "两行两列"],
      ["列向量", "2×1矩阵"],
      ["行向量", "1×2矩阵"],
      ["记忆", "横排行，竖排列"],
    ],
  },
  {
    label: "矩阵乘向量",
    fields: [
      ["输入", "A=[[a,b],[c,d]]，v=[x,y]ᵀ"],
      ["动作", "相乘、相乘、再相加"],
      ["第一分量", "ax+by"],
      ["第二分量", "cx+dy"],
    ],
  },
  {
    label: "矩阵乘矩阵",
    fields: [
      ["规则", "左矩阵的行点乘右矩阵的列"],
      ["内积", "a₁b₁+a₂b₂"],
      ["维数条件", "(m×n)(n×q)才可相乘"],
      ["顺序", "一般AB≠BA"],
    ],
  },
  {
    label: "逆矩阵",
    fields: [
      ["行列式", "det A=ad-bc"],
      ["存在条件", "det A≠0"],
      ["逆矩阵", "A⁻¹=(1/det A)[[d,-b],[-c,a]]"],
      ["解方程", "Ax=b ⇒ x=A⁻¹b"],
    ],
    alert:
      "“把A移到等号右边”只是记忆口令。合法操作是等式两边同时左乘A⁻¹；矩阵乘法不交换，左右次序不能随意改动。",
  },
] as const;

const fibonacciCases = [
  {
    label: "村木卡片",
    fields: [
      ["Q矩阵", "Q=[[1,1],[1,0]]"],
      ["问题", "求Q¹⁰"],
      ["理纱的计算机", "POWER(MATRIX(1,1,1,0),10)"],
      ["输出", "[[89,55],[55,34]]"],
    ],
  },
  {
    label: "手算显形",
    fields: [
      ["Q¹", "[[1,1],[1,0]]"],
      ["Q²", "[[2,1],[1,1]]"],
      ["Q³", "[[3,2],[2,1]]"],
      ["观察", "每个位置都在生成斐波那契数"],
    ],
  },
  {
    label: "一般公式",
    fields: [
      ["递推", "Fₙ₊₁=Fₙ+Fₙ₋₁"],
      ["矩阵恒等式", "Qⁿ=[[Fₙ₊₁,Fₙ],[Fₙ,Fₙ₋₁]]"],
      ["n=10", "F₁₁=89、F₁₀=55、F₉=34"],
      ["证明", "数学归纳法"],
    ],
  },
  {
    label: "工具与洞察",
    fields: [
      ["计算机", "迅速给出数值答案"],
      ["手算", "暴露递推模式"],
      ["头脑", "提出猜想并选择证明"],
      ["互补", "答案、发现与论证缺一不可"],
    ],
    alert:
      "计算机的89、55、55、34回答了“结果是什么”，却不会自动指出“为什么是斐波那契数”。少量手算不是低效重复，而是发现结构的实验。",
  },
] as const;

const transformCases = [
  {
    label: "平面变形",
    fields: [
      ["映射", "(x,y)↦(ax+by,cx+dy)"],
      ["列的意义", "第一列是e₁的像，第二列是e₂的像"],
      ["原点", "任何线性变换都固定原点"],
      ["限制", "不能只靠线性变换完成平移"],
    ],
  },
  {
    label: "可逆与塌缩",
    fields: [
      ["det A≠0", "平面一一对应地映到平面"],
      ["det A=0且A≠0", "整个平面压到过原点的直线"],
      ["A=0", "所有点压到原点"],
      ["共同判据", "可逆、唯一解与非零行列式相连"],
    ],
  },
  {
    label: "旋转矩阵",
    fields: [
      ["一般形式", "Rθ=[[cosθ,-sinθ],[sinθ,cosθ]]"],
      ["θ=π/2", "(x,y)↦(-y,x)"],
      ["几何意义", "绕原点逆时针旋转90°"],
      ["行列式", "cos²θ+sin²θ=1"],
    ],
  },
  {
    label: "欧米伽华尔兹",
    fields: [
      ["角度", "120°=2π/3"],
      ["复数", "ω=e^(2πi/3)"],
      ["三次旋转", "R₂π/₃³=I"],
      ["同一结构", "ω³=1"],
    ],
    alert:
      "矩阵不是数字表格的静态仓库。把它看成作用在整个平面上的函数，乘法就是连续施加变换，矩阵幂就是重复同一变换。",
  },
] as const;

export function Mg4SystemGeometryLab() {
  return (
    <MathGirlOfficialLab
      cases={systemCases}
      caption="方程的解是平面上的点集，方程组的解是两个点集的交集；ad-bc决定两条非退化直线能否唯一相交。"
      tone="cyan"
    />
  );
}

export function Mg4MatrixAlgebraLab() {
  return (
    <MathGirlOfficialLab
      cases={matrixCases}
      caption="矩阵乘法把“行与列的内积”固定为可复用操作；行列式非零时，逆矩阵把联立方程组直接还原为未知向量。"
      tone="amber"
    />
  );
}

export function Mg4FibonacciMatrixLab() {
  return (
    <MathGirlOfficialLab
      cases={fibonacciCases}
      caption="Q矩阵的乘法规则与斐波那契递推完全匹配，Q的幂因而把相邻三项稳定地装进四个位置。"
      tone="violet"
    />
  );
}

export function Mg4LinearTransformationLab() {
  return (
    <MathGirlOfficialLab
      cases={transformCases}
      caption="同一个矩阵既是代数运算表，也是平面变形；列向量、行列式和矩阵乘方分别揭示基向量的去向、是否塌缩与变换的复合。"
      tone="emerald"
    />
  );
}
