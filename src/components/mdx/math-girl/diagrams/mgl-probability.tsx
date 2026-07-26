"use client";

import { MathGirlOfficialLab } from "./official-lab";

/**
 * <MglProbabilityDiagram>：概率论核心概念图解（mgl-probability 章）。
 *
 * 左侧：贝叶斯定理的文氏图示意。
 * 右侧：期望与方差 + 蒙特卡洛示意。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const foundationCases = [
  {
    label: "概率空间",
    fields: [
      ["样本空间Ω", "全部可能结果"],
      ["事件", "Ω的子集"],
      ["概率P", "事件到[0,1]的函数"],
      ["公理", "非负、规范、可列可加"],
    ],
  },
  {
    label: "互斥",
    fields: [
      ["条件", "A∩B为空"],
      ["加法", "P(A∪B)=P(A)+P(B)"],
      ["含义", "不能同时发生"],
      ["不等于", "独立"],
    ],
  },
  {
    label: "独立",
    fields: [
      ["条件", "P(A∩B)=P(A)P(B)"],
      ["含义", "知道一个不改变另一个概率"],
      ["可能", "独立事件可同时发生"],
      ["陷阱", "互斥且正概率则不独立"],
    ],
  },
  {
    label: "条件概率",
    fields: [
      ["前提", "P(B)>0"],
      ["定义", "P(A|B)=P(A∩B)/P(B)"],
      ["作用", "把样本空间缩到B"],
      ["贝叶斯", "交换条件方向"],
    ],
    alert:
      "互斥描述能否同时发生，独立描述信息是否改变概率；两者是不同关系。",
  },
] as const;

const expectationCases = [
  {
    label: "随机变量",
    fields: [
      ["定义", "从样本空间到数值的函数"],
      ["离散分布", "列出取值与概率"],
      ["期望", "ΣxP(X=x)"],
      ["注意", "期望不必是可取值"],
    ],
  },
  {
    label: "线性法则",
    fields: [
      ["公式", "E[aX+bY]=aE[X]+bE[Y]"],
      ["条件", "不要求X,Y独立"],
      ["用途", "把总计数拆成局部期望"],
      ["第4卷", "优惠券与随机快排"],
    ],
  },
  {
    label: "指示器",
    fields: [
      ["取值", "事件发生为1，否则0"],
      ["期望", "E[I]=P(I=1)"],
      ["总数", "X=ΣIi"],
      ["价值", "计数问题转成概率求和"],
    ],
  },
  {
    label: "方差",
    fields: [
      ["定义", "E[(X-E[X])²]"],
      ["恒等式", "E[X²]-E[X]²"],
      ["独立和", "方差可相加"],
      ["相关", "还需协方差项"],
    ],
    alert:
      "期望线性不要求独立；方差相加通常需要独立或零协方差，不能把两条规则混用。",
  },
] as const;

const processCases = [
  {
    label: "随机漫步",
    fields: [
      ["状态", "当前位置或分配"],
      ["一步", "按转移概率改变状态"],
      ["路径", "状态序列"],
      ["分析", "路径计数乘转移概率"],
    ],
  },
  {
    label: "马尔可夫链",
    fields: [
      ["性质", "给定当前状态后未来与更早历史无关"],
      ["矩阵", "P记录一步转移概率"],
      ["分布", "pn+1=Ppn"],
      ["长期", "由特征值与平稳分布分析"],
    ],
  },
  {
    label: "Monte Carlo",
    fields: [
      ["估计量", "样本平均或命中比例"],
      ["误差", "有限样本随机波动"],
      ["复现", "记录生成器、种子与样本数"],
      ["置信", "用界或区间量化"],
    ],
  },
  {
    label: "随机算法",
    fields: [
      ["输入平均", "先假设输入分布"],
      ["算法随机", "固定输入，随机性来自内部"],
      ["Las Vegas", "结果正确、时间随机"],
      ["Monte Carlo", "时间受控、结果可小概率错"],
    ],
    alert:
      "“多跑几次更准确”需要独立或受控相关的重复，以及明确聚合规则；复用同一伪随机序列不自动放大置信度。",
  },
] as const;

export function MglProbabilityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="概率论核心概念图解。左侧贝叶斯定理：P(A|B)=P(B|A)×P(A)/P(B)，用文氏图展示条件概率。医学检测示例：发病率1%、准确率99%、阳性时真患病=50%（基础率谬误）。右侧期望与方差：骰子期望3.5，方差度量波动。底部蒙特卡洛估算π。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>概率论：贝叶斯、期望与蒙特卡洛</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>处理不确定性的数学工具</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：贝叶斯定理 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>贝叶斯定理</text>

          {/* 文氏图 */}
          <rect x="60" y="104" width="240" height="100" rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
          <circle cx="140" cy="154" r="36" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5" />
          <circle cx="200" cy="154" r="36" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1.5" />
          <text x="120" y="158" textAnchor="middle" fontSize="11" fill={accent}>P(A)</text>
          <text x="220" y="158" textAnchor="middle" fontSize="11" fill={danger}>P(B)</text>
          <text x="170" y="158" textAnchor="middle" fontSize="11" fill={primary}>A∩B</text>

          <text x="180" y="226" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="600" fill={primary}>P(A|B) = P(B|A)·P(A) / P(B)</text>
          <text x="180" y="246" textAnchor="middle" fontSize="11" fill={secondary}>后验 = 似然 × 先验 / 证据</text>

          {/* 医学检测示例 */}
          <rect x="48" y="264" width="272" height="108" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="284" fontSize="12" fontWeight="700" fill={danger}>医学检测（基础率谬误）</text>
          <text x="64" y="304" fontSize="11" fill={primary}>发病率：1%（先验）</text>
          <text x="64" y="322" fontSize="11" fill={primary}>灵敏度99%，假阳性率1%</text>
          <text x="64" y="342" fontSize="11" fontWeight="600" fill={warning}>错误直觉：阳性→99%患病</text>
          <text x="64" y="360" fontSize="11" fontWeight="600" fill={danger}>实际：P(病|阳性)=50%</text>

          {/* ===== 右侧：期望 + 蒙特卡洛 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>期望与方差</text>

          <rect x="360" y="104" width="312" height="72" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="124" fontSize="12" fontWeight="700" fill={success}>骰子的期望</text>
          <text x="376" y="144" fontSize="12" fontFamily="monospace" fill={primary}>E[X] = (1+2+3+4+5+6)/6 = 3.5</text>
          <text x="376" y="162" fontSize="11" fill={secondary}>期望=加权平均，不一定是最可能值</text>

          <rect x="360" y="192" width="312" height="72" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="212" fontSize="12" fontWeight="700" fill={warning}>方差</text>
          <text x="376" y="232" fontSize="12" fontFamily="monospace" fill={primary}>Var(X) = E[(X-E[X])²]</text>
          <text x="376" y="250" fontSize="11" fill={secondary}>方差越大，波动越大</text>

          {/* 蒙特卡洛 */}
          <rect x="360" y="280" width="312" height="92" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="300" fontSize="12" fontWeight="700" fill={accent}>蒙特卡洛模拟</text>
          <text x="376" y="320" fontSize="11" fill={primary}>随机撒点估算 π</text>
          <text x="376" y="338" fontSize="11" fontFamily="monospace" fill={primary}>π ≈ 4 × (圆内点/总点数)</text>
          <text x="376" y="358" fontSize="11" fill={secondary}>大数定律：点数越多越精确</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        贝叶斯定理根据先验、灵敏度与假阳性率更新后验。期望是加权平均，方差度量波动；蒙特卡洛用随机采样构造估计量。
      </figcaption>
    </figure>
  );
}

export function MglProbabilityFoundationLab() {
  return (
    <MathGirlOfficialLab
      cases={foundationCases}
      caption="概率空间先定义结果和事件；互斥决定概率能否直接相加，独立决定联合概率能否相乘。"
      tone="cyan"
    />
  );
}

export function MglExpectationIndicatorLab() {
  return (
    <MathGirlOfficialLab
      cases={expectationCases}
      caption="期望线性不要求独立，指示器把计数转成概率；方差相加则必须处理协方差。"
      tone="amber"
    />
  );
}

export function MglRandomProcessLab() {
  return (
    <MathGirlOfficialLab
      cases={processCases}
      caption="随机漫步、马尔可夫链、蒙特卡洛估计与随机算法共享概率语言，但随机源和保证对象不同。"
      tone="violet"
    />
  );
}
