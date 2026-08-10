"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

/** 总览图：把概率空间、条件信息、期望和随机过程串成一条证据链。 */
export function MglProbabilityDiagram() {
  return (
    <Frame
      ariaLabel="概率导读总览：先定义样本空间与事件，再用条件概率更新信息，用随机变量和期望汇总数值，最后用转移矩阵分析随机漫步和随机算法。"
      caption="概率不是含糊的运气，而是从模型合同到可检验结论的一条证据链。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        不确定性也有严格的工作流
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        样本空间 → 信息更新 → 数值汇总 → 状态演化
      </text>
      <line
        x1="190"
        y1="126"
        x2="292"
        y2="126"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="428"
        y1="126"
        x2="530"
        y2="126"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="292,126 280,120 280,132" fill={border} />
      <polygon points="530,126 518,120 518,132" fill={border} />
      <rect
        x="48"
        y="88"
        width="190"
        height="78"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeOpacity="0.55"
      />
      <text
        x="143"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        概率空间
      </text>
      <text x="143" y="142" textAnchor="middle" fontSize="12" fill={primary}>
        (Ω,F,P)，事件与公理
      </text>
      <rect
        x="270"
        y="88"
        width="180"
        height="78"
        rx="12"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeOpacity="0.55"
      />
      <text
        x="360"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        条件与贝叶斯
      </text>
      <text x="360" y="142" textAnchor="middle" fontSize="12" fill={primary}>
        先验 × 似然 ÷ 证据
      </text>
      <rect
        x="482"
        y="88"
        width="190"
        height="78"
        rx="12"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeOpacity="0.55"
      />
      <text
        x="577"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        随机变量与期望
      </text>
      <text x="577" y="142" textAnchor="middle" fontSize="12" fill={primary}>
        加权平均、方差、指示器
      </text>
      <line
        x1="360"
        y1="166"
        x2="360"
        y2="272"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="360,272 354,260 366,260" fill={border} />
      <rect
        x="166"
        y="272"
        width="388"
        height="94"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.5"
      />
      <text
        x="360"
        y="304"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        随机漫步与随机算法
      </text>
      <text x="360" y="330" textAnchor="middle" fontSize="12" fill={primary}>
        路径概率相乘，互斥路径求和，P pₜ 更新状态
      </text>
      <text x="360" y="352" textAnchor="middle" fontSize="12" fill={secondary}>
        先写概率空间，再谈“平均表现”和“失败概率”
      </text>
    </Frame>
  );
}

/** 交互实验：切换等可能、偏置和条件信息，观察样本权重如何改变。 */
export function MglProbabilityLab() {
  const [mode, setMode] = useState<"fair" | "biased" | "conditioned">("fair");
  const data = {
    fair: {
      title: "公平硬币",
      left: 0.5,
      right: 0.5,
      note: "HH、HT、TH、TT 等可能",
    },
    biased: {
      title: "偏置硬币",
      left: 0.8,
      right: 0.2,
      note: "结果数相同，权重不再相同",
    },
    conditioned: {
      title: "已知至少一枚正面",
      left: 2 / 3,
      right: 1 / 3,
      note: "排除 TT 后，HH 的条件概率为 1/3",
    },
  }[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="probability-model-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {[
            ["fair", "公平"],
            ["biased", "偏置"],
            ["conditioned", "条件"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value as typeof mode)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${mode === value ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMode("fair")}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`概率模型实验。当前为${data.title}；正面概率 ${(data.left * 100).toFixed(0)}%，反面概率 ${(data.right * 100).toFixed(0)}%。${data.note}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            结果数量不等于结果权重
          </text>
          <text
            x="360"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {data.title}：先明确样本空间，再计算事件概率
          </text>
          <rect
            x="58"
            y="100"
            width="604"
            height="214"
            rx="12"
            fill={accent}
            fillOpacity="0.05"
            stroke={accent}
            strokeOpacity="0.4"
          />
          <text x="104" y="134" fontSize="14" fontWeight="700" fill={accent}>
            正面 H
          </text>
          <rect
            x="104"
            y="156"
            width="470"
            height="34"
            rx="8"
            fill={accent}
            fillOpacity="0.12"
            stroke={accent}
            strokeOpacity="0.55"
          />
          <rect
            x="104"
            y="156"
            width={470 * data.left}
            height="34"
            rx="8"
            fill={accent}
            fillOpacity="0.75"
          />
          <text x="590" y="179" fontSize="13" textAnchor="end" fill={primary}>
            {(data.left * 100).toFixed(0)}%
          </text>
          <text x="104" y="230" fontSize="14" fontWeight="700" fill={warning}>
            反面 T
          </text>
          <rect
            x="104"
            y="252"
            width="470"
            height="34"
            rx="8"
            fill={warning}
            fillOpacity="0.12"
            stroke={warning}
            strokeOpacity="0.55"
          />
          <rect
            x="104"
            y="252"
            width={470 * data.right}
            height="34"
            rx="8"
            fill={warning}
            fillOpacity="0.75"
          />
          <text x="590" y="275" fontSize="13" textAnchor="end" fill={primary}>
            {(data.right * 100).toFixed(0)}%
          </text>
          <text
            x="360"
            y="350"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={mode === "conditioned" ? warning : success}
          >
            {data.note}
          </text>
          <text
            x="360"
            y="378"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            重置回公平模型，再重新写 P(A)=有利权重总和
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换模型观察“等可能”“偏置”和“已知信息”三个条件；重置回公平硬币。
      </figcaption>
    </figure>
  );
}

export function MglBayesBaseRateDiagram() {
  return (
    <Frame
      ariaLabel="贝叶斯基础率图：10000 人中 100 人患病，灵敏度 99% 得到 99 个真阳性；9900 人未患病，假阳性率 1% 得到 99 个假阳性，因此阳性后的患病概率为 1/2。"
      caption="把总体展开成计数树，基础率谬误就变成可以逐格验算的贝叶斯公式。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        条件概率：信息改变了你要看的总体
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        10000 人 → 患病/未患病 → 阳性/阴性
      </text>
      <line
        x1="360"
        y1="100"
        x2="360"
        y2="150"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="360"
        y1="150"
        x2="192"
        y2="204"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="360"
        y1="150"
        x2="528"
        y2="204"
        stroke={border}
        strokeWidth="2"
      />
      <rect
        x="284"
        y="78"
        width="152"
        height="44"
        rx="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeOpacity="0.55"
      />
      <text
        x="360"
        y="106"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        10000 人
      </text>
      <rect
        x="86"
        y="184"
        width="212"
        height="50"
        rx="10"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
        strokeOpacity="0.5"
      />
      <text
        x="192"
        y="214"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        患病：100（1%）
      </text>
      <rect
        x="422"
        y="184"
        width="212"
        height="50"
        rx="10"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="528"
        y="214"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        未患病：9900（99%）
      </text>
      <line
        x1="192"
        y1="234"
        x2="130"
        y2="286"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="192"
        y1="234"
        x2="254"
        y2="286"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="528"
        y1="234"
        x2="466"
        y2="286"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="528"
        y1="234"
        x2="590"
        y2="286"
        stroke={border}
        strokeWidth="2"
      />
      <text x="130" y="310" textAnchor="middle" fontSize="12" fill={danger}>
        真阳性 99
      </text>
      <text x="254" y="310" textAnchor="middle" fontSize="12" fill={secondary}>
        阴性 1
      </text>
      <text x="466" y="310" textAnchor="middle" fontSize="12" fill={warning}>
        假阳性 99
      </text>
      <text x="590" y="310" textAnchor="middle" fontSize="12" fill={secondary}>
        阴性 9801
      </text>
      <rect
        x="170"
        y="342"
        width="380"
        height="46"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeOpacity="0.45"
      />
      <text
        x="360"
        y="371"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        P(患病｜阳性)=99/(99+99)=1/2
      </text>
    </Frame>
  );
}

export function MglExpectationDiagram() {
  return (
    <Frame
      ariaLabel="期望与方差图：公平骰子的期望是 3.5，期望是概率加权平均而不是一次结果；方差衡量偏离均值的平方平均；指示器随机变量的期望等于事件概率。"
      caption="期望汇总中心位置，方差记录波动，指示器把计数问题转成概率之和。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        随机变量把结果变成可计算的数值
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        E[X] 是加权平均；Var(X) 是离均值的平方波动
      </text>
      <line
        x1="78"
        y1="232"
        x2="304"
        y2="232"
        stroke={border}
        strokeWidth="2"
      />
      {[1, 2, 3, 4, 5, 6].map((value, index) => (
        <g key={`die-${value}`}>
          <rect
            x={84 + index * 34}
            y={232 - value * 20}
            width="22"
            height={value * 20}
            rx="4"
            fill={accent}
            fillOpacity="0.65"
          />
          <text
            x={95 + index * 34}
            y="256"
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            {value}
          </text>
        </g>
      ))}
      <line
        x1="84"
        y1="162"
        x2="288"
        y2="162"
        stroke={warning}
        strokeWidth="3"
        strokeDasharray="6 4"
      />
      <text
        x="184"
        y="146"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        E[X]=3.5
      </text>
      <text x="184" y="290" textAnchor="middle" fontSize="12" fill={secondary}>
        一次不会掷出 3.5，但长期平均趋近它
      </text>
      <rect
        x="344"
        y="94"
        width="328"
        height="112"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="508"
        y="126"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        期望线性
      </text>
      <text
        x="508"
        y="156"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        E[aX+bY]=aE[X]+bE[Y]
      </text>
      <text x="508" y="184" textAnchor="middle" fontSize="12" fill={secondary}>
        不要求 X、Y 独立
      </text>
      <rect
        x="344"
        y="228"
        width="328"
        height="112"
        rx="12"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
        strokeOpacity="0.5"
      />
      <text
        x="508"
        y="260"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        波动与计数
      </text>
      <text
        x="508"
        y="290"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill={primary}
      >
        Var(X)=E[(X−E[X])²]
      </text>
      <text x="508" y="318" textAnchor="middle" fontSize="12" fill={secondary}>
        E[I_A]=P(A)，指示器适合逐项计数
      </text>
      <text x="360" y="384" textAnchor="middle" fontSize="12" fill={danger}>
        方差相加还要处理 Cov(X,Y)，不能照搬期望线性
      </text>
    </Frame>
  );
}

export function MglRandomWalkDiagram() {
  return (
    <Frame
      ariaLabel="随机漫步与马尔可夫链图：状态 A、B、C 通过转移矩阵 P 更新概率向量；路径概率是转移概率乘积，互斥路径到同一终点时相加，马尔可夫性是只依赖当前状态的模型假设。"
      caption="路径先乘概率、再对互斥路径求和；矩阵把这条重复计算压缩为状态向量更新。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        随机漫步：从一条路径到一个状态分布
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        马尔可夫性：下一步只依赖当前状态，而不是整个历史
      </text>
      <circle
        cx="120"
        cy="184"
        r="28"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="120"
        y="189"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        A
      </text>
      <circle
        cx="240"
        cy="184"
        r="28"
        fill={success}
        fillOpacity="0.12"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="240"
        y="189"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        B
      </text>
      <circle
        cx="180"
        cy="286"
        r="28"
        fill={warning}
        fillOpacity="0.12"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="180"
        y="291"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        C
      </text>
      <line
        x1="148"
        y1="184"
        x2="212"
        y2="184"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="224"
        y1="207"
        x2="195"
        y2="262"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="165"
        y1="262"
        x2="136"
        y2="207"
        stroke={border}
        strokeWidth="2"
      />
      <text x="180" y="168" textAnchor="middle" fontSize="11" fill={secondary}>
        0.6
      </text>
      <text x="218" y="238" textAnchor="middle" fontSize="11" fill={secondary}>
        0.4
      </text>
      <text x="142" y="238" textAnchor="middle" fontSize="11" fill={secondary}>
        0.5
      </text>
      <rect
        x="330"
        y="96"
        width="328"
        height="196"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="494"
        y="128"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        转移矩阵 P
      </text>
      <text
        x="494"
        y="164"
        textAnchor="middle"
        fontSize="16"
        fontFamily="monospace"
        fill={primary}
      >
        [ 0.4 0.6 0.0 ]
      </text>
      <text
        x="494"
        y="192"
        textAnchor="middle"
        fontSize="16"
        fontFamily="monospace"
        fill={primary}
      >
        [ 0.5 0.0 0.5 ]
      </text>
      <text
        x="494"
        y="220"
        textAnchor="middle"
        fontSize="16"
        fontFamily="monospace"
        fill={primary}
      >
        [ 0.3 0.7 0.0 ]
      </text>
      <text
        x="494"
        y="260"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill={warning}
      >
        pₜ₊₁=Ppₜ
      </text>
      <rect
        x="94"
        y="344"
        width="532"
        height="44"
        rx="9"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="372"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        两条互斥路径到同一终点：概率相乘后相加；Pⁿ 汇总所有 n 步路径
      </text>
    </Frame>
  );
}
