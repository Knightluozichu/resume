"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function SequenceFrame({
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

/** 主图：切换候选模型，观察同一前缀如何产生不同下一项。 */
export function MglSequenceModelDiagram() {
  const [model, setModel] = useState<"linear" | "square" | "piecewise">(
    "linear",
  );
  const modelData = {
    linear: { label: "一次模型", formula: "aₙ = n", next: "5", color: success },
    square: {
      label: "平方模型",
      formula: "aₙ = n²−n+1",
      next: "17",
      color: warning,
    },
    piecewise: {
      label: "分段模型",
      formula: "aₙ = n (n≤4), 10(n−4) (n≥5)",
      next: "10",
      color: danger,
    },
  } as const;
  const current = modelData[model];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {(["linear", "square", "piecewise"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={model === key}
              onClick={() => setModel(key)}
              className={`rounded-full border px-3 py-1 text-sm ${model === key ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              {modelData[key].label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setModel("linear")}
            className="rounded-full border border-border px-3 py-1 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`数列和数学模型、数列智力题没有唯一答案的候选模型图。同一数列前缀 1、2、3、4 当前选择 ${current.label}，公式为 ${current.formula}，第五项为 ${current.next}；有限观测不能单独决定无限延拓。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            同一前缀，不同模型，不同下一项
          </text>
          <text x="84" y="72" fontSize="13" fill={accent}>
            已观测：1 · 2 · 3 · 4
          </text>
          <line
            x1="84"
            y1="128"
            x2="312"
            y2="128"
            stroke={border}
            strokeWidth="2"
          />
          {[1, 2, 3, 4].map((value, index) => (
            <g key={value}>
              <circle cx={108 + index * 62} cy="128" r="9" fill={success} />
              <text
                x={108 + index * 62}
                y="164"
                textAnchor="middle"
                fontSize="13"
                fill={primary}
              >
                {value}
              </text>
            </g>
          ))}
          <line
            x1="312"
            y1="128"
            x2="388"
            y2="128"
            stroke={current.color}
            strokeWidth="3"
          />
          <circle cx="420" cy="128" r="13" fill={current.color} />
          <text
            x="420"
            y="170"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={current.color}
          >
            {current.next}
          </text>
          <text
            x="420"
            y="194"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            第五项
          </text>
          <rect
            x="64"
            y="226"
            width="596"
            height="116"
            rx="12"
            fill={current.color}
            fillOpacity="0.07"
            stroke={current.color}
            strokeOpacity="0.5"
          />
          <text
            x="92"
            y="264"
            fontSize="14"
            fontWeight="700"
            fill={current.color}
          >
            当前模型：{current.label}
          </text>
          <text
            x="92"
            y="298"
            fontSize="15"
            fontFamily="monospace"
            fill={primary}
          >
            {current.formula}
          </text>
          <text x="92" y="326" fontSize="12" fill={secondary}>
            选择模型前，先写清允许的模型族和评价标准
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换三个候选规则；重置回到一次模型。图示的是“信息不足”，不是“数学没有规律”。
      </figcaption>
    </figure>
  );
}

export function MglFinitePrefixDiagram() {
  return (
    <SequenceFrame
      ariaLabel="有限前缀与无限延拓图。左侧四个绿色观测点 1、2、3、4 相同，右侧分叉成第五项 5 和 29 两条延拓；零点乘积扰动在前四个索引为零，在第五项不为零。"
      caption="有限前缀只钉住已经观测的点；在没有模型限制时，后续可以有多个彼此不同的无限延拓。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        前四项相同，不代表第五项唯一
      </text>
      <text x="72" y="76" fontSize="13" fontWeight="700" fill={accent}>
        有限前缀
      </text>
      <line
        x1="72"
        y1="132"
        x2="300"
        y2="132"
        stroke={border}
        strokeWidth="2"
      />
      {[1, 2, 3, 4].map((value, index) => (
        <g key={value}>
          <circle cx={94 + index * 64} cy="132" r="9" fill={success} />
          <text
            x={94 + index * 64}
            y="166"
            textAnchor="middle"
            fontSize="13"
            fill={primary}
          >
            {value}
          </text>
        </g>
      ))}
      <line
        x1="304"
        y1="132"
        x2="400"
        y2="90"
        stroke={success}
        strokeWidth="3"
      />
      <line
        x1="304"
        y1="132"
        x2="400"
        y2="238"
        stroke={warning}
        strokeWidth="3"
      />
      <circle cx="430" cy="90" r="13" fill={success} />
      <circle cx="430" cy="238" r="13" fill={warning} />
      <text x="458" y="96" fontSize="14" fontWeight="700" fill={success}>
        f(n)=n → 5
      </text>
      <text x="458" y="244" fontSize="14" fontWeight="700" fill={warning}>
        f(n)+(n−1)…(n−4) → 29
      </text>
      <rect
        x="72"
        y="284"
        width="566"
        height="70"
        rx="10"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.45"
      />
      <text x="94" y="314" fontSize="13" fill={primary}>
        扰动项在 n=1、2、3、4 都为 0，却在 n=5 不为 0
      </text>
      <text x="94" y="338" fontSize="12" fill={secondary}>
        只要模型族没有限制，改变常数 c 就能得到无穷多条延拓
      </text>
    </SequenceFrame>
  );
}

export function MglSequenceRepresentationsDiagram() {
  return (
    <SequenceFrame
      ariaLabel="数列四种表示图。四个卡片分别展示列表、显式式、递推式和生成过程，并标注列表接近观测、显式式支持随机访问、递推式强调状态演化、生成过程解释对象来源。"
      caption="表示法不是装饰：每一种写法都把一种信息放在前台，也把另一种信息留在后台。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        同一数列的四种表示
      </text>
      <rect
        x="54"
        y="72"
        width="282"
        height="112"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
      />
      <text x="76" y="106" fontSize="14" fontWeight="700" fill={success}>
        列表：贴近观测
      </text>
      <text x="76" y="144" fontSize="15" fontFamily="monospace" fill={primary}>
        1, 1, 2, 3, 5, …
      </text>
      <text x="76" y="168" fontSize="12" fill={secondary}>
        看见数据，但不自动定义后续
      </text>
      <rect
        x="384"
        y="72"
        width="282"
        height="112"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
      />
      <text x="406" y="106" fontSize="14" fontWeight="700" fill={accent}>
        显式式：随机访问
      </text>
      <text x="406" y="144" fontSize="15" fontFamily="monospace" fill={primary}>
        aₙ = n²
      </text>
      <text x="406" y="168" fontSize="12" fill={secondary}>
        直接定位，但可能隐藏机制
      </text>
      <rect
        x="54"
        y="224"
        width="282"
        height="112"
        rx="12"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
      />
      <text x="76" y="258" fontSize="14" fontWeight="700" fill={warning}>
        递推式：状态演化
      </text>
      <text x="76" y="296" fontSize="15" fontFamily="monospace" fill={primary}>
        aₙ₊₁ = aₙ + 2n + 1
      </text>
      <text x="76" y="320" fontSize="12" fill={secondary}>
        需要初值，常能解释结构
      </text>
      <rect
        x="384"
        y="224"
        width="282"
        height="112"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text x="406" y="258" fontSize="14" fontWeight="700" fill={danger}>
        生成过程：解释来源
      </text>
      <text x="406" y="296" fontSize="15" fontFamily="monospace" fill={primary}>
        计数 / 铺砖 / 递归
      </text>
      <text x="406" y="320" fontSize="12" fill={secondary}>
        必须证明无遗漏、无重复
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        表示法互相等价需要证明，不能只凭前几项相同
      </text>
    </SequenceFrame>
  );
}

export function MglFalsificationDiagram() {
  return (
    <SequenceFrame
      ariaLabel="模式、规则与猜想的可证伪流程图。观测数据进入候选模型，模型生成预测，再用保留的新索引区分模型；若失败则修订模型族或承认信息不足。"
      caption="把“我觉得像”改成可复查流程：拟合、预测、区分、修订，每一步都留下失败证据。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        模式 → 规则 → 猜想：必须留下区分实验
      </text>
      <rect
        x="54"
        y="112"
        width="140"
        height="82"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="124"
        y="146"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        观测数据
      </text>
      <text x="124" y="174" textAnchor="middle" fontSize="12" fill={primary}>
        前 10 项
      </text>
      <line
        x1="194"
        y1="153"
        x2="264"
        y2="153"
        stroke={border}
        strokeWidth="3"
      />
      <rect
        x="264"
        y="112"
        width="140"
        height="82"
        rx="12"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="334"
        y="146"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        候选规则
      </text>
      <text x="334" y="174" textAnchor="middle" fontSize="12" fill={primary}>
        A / B / C
      </text>
      <line
        x1="404"
        y1="153"
        x2="474"
        y2="153"
        stroke={border}
        strokeWidth="3"
      />
      <rect
        x="474"
        y="112"
        width="192"
        height="82"
        rx="12"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="570"
        y="146"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        保留新索引
      </text>
      <text x="570" y="174" textAnchor="middle" fontSize="12" fill={primary}>
        找分歧最大的点
      </text>
      <path
        d="M570 194 C570 278 334 278 334 210"
        fill="none"
        stroke={danger}
        strokeWidth="3"
      />
      <text x="452" y="270" textAnchor="middle" fontSize="12" fill={danger}>
        失败：修订模型族 / 补充条件
      </text>
      <rect
        x="118"
        y="306"
        width="432"
        height="52"
        rx="10"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.45"
      />
      <text x="334" y="338" textAnchor="middle" fontSize="13" fill={primary}>
        新数据支持 → 暂时保留猜想；反例出现 → 不把模式写成定理
      </text>
    </SequenceFrame>
  );
}
