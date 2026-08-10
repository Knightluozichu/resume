"use client";

import { useState, type ReactNode } from "react";

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
  children: ReactNode;
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

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = secondary,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
      <path
        d={`M ${leftX} ${leftY} L ${x2} ${y2} L ${rightX} ${rightY}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** 展示形式系统如何把符号、公式、公理和有限证明连成机械管线。 */
export function Mg3FormalSystemDiagram() {
  const stages = [
    ["基本符号", "0 f ¬ ∨ ∀ ( )", accent],
    ["递归语法", "只有合式串", success],
    ["公理与规则", "I–V + 推理", warning],
    ["形式证明", "有限序列", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="形式系统管线图：基本符号经过递归语法生成公式，再通过公理与推理规则组成有限形式证明；每一步都有机械检查条件。"
      caption="Form System Pipeline：证明不是直觉上的说明，而是每一行都能检查的有限对象。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        形式系统 P：从符号到证明证书
      </text>
      {stages.map(([title, detail, color], index) => {
        const x = 36 + index * 170;
        return (
          <g key={`formal-stage-${title}`}>
            <rect
              x={x}
              y="110"
              width="142"
              height="142"
              rx="14"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
            />
            <text
              x={x + 71}
              y="148"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={color}
            >
              {title}
            </text>
            <text
              x={x + 71}
              y="190"
              textAnchor="middle"
              fontSize="14"
              fill={primary}
            >
              {detail}
            </text>
            <text
              x={x + 71}
              y="224"
              textAnchor="middle"
              fontSize="13"
              fill={secondary}
            >
              {index === 0
                ? "类型与字符"
                : index === 1
                  ? "递归生成"
                  : index === 2
                    ? "许可证"
                    : "末行是定理"}
            </text>
            {index < stages.length - 1 ? (
              <Arrow
                x1={x + 146}
                y1={181}
                x2={x + 164}
                y2={181}
                color={secondary}
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="126"
        y="300"
        width="468"
        height="64"
        rx="12"
        fill={border}
        fillOpacity="0.2"
        stroke={border}
      />
      <text
        x="360"
        y="327"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        IsProof(p,x)：逐行检查 p 是否由公理、规则合法生成
      </text>
      <text x="360" y="350" textAnchor="middle" fontSize="13" fill={secondary}>
        验证给定证明是机械的；搜索任意长度证明是另一件事
      </text>
    </Frame>
  );
}

/** 展示符号序列如何通过质数指数编码成可逆的哥德尔数。 */
export function Mg3GodelNumberDiagram() {
  return (
    <Frame
      ariaLabel="哥德尔数编码图：常量用奇数编码，符号串ff0变成序列3、3、1，再编码为2的3次方乘3的3次方乘5，得到1080；唯一质因数分解保证可逆。"
      caption="Godel Number Encoding：数项ff0、其符号序列和自然数1080属于三个不同层级。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        哥德尔数：把语法对象送进自然数
      </text>
      <rect
        x="42"
        y="98"
        width="190"
        height="178"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <rect
        x="265"
        y="98"
        width="190"
        height="178"
        rx="14"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <rect
        x="488"
        y="98"
        width="190"
        height="178"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="137"
        y="132"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        符号串
      </text>
      <text x="137" y="184" textAnchor="middle" fontSize="22" fill={primary}>
        ff0
      </text>
      <text x="137" y="230" textAnchor="middle" fontSize="14" fill={secondary}>
        形式世界的数项
      </text>
      <text
        x="360"
        y="132"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        符号码序列
      </text>
      <text x="360" y="184" textAnchor="middle" fontSize="22" fill={primary}>
        (3, 3, 1)
      </text>
      <text x="360" y="230" textAnchor="middle" fontSize="14" fill={secondary}>
        0→1，f→3
      </text>
      <text
        x="583"
        y="132"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        自然数编码
      </text>
      <text x="583" y="178" textAnchor="middle" fontSize="18" fill={primary}>
        2³·3³·5¹
      </text>
      <text
        x="583"
        y="216"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill={success}
      >
        1080
      </text>
      <text x="583" y="246" textAnchor="middle" fontSize="13" fill={secondary}>
        唯一分解 → 可逆
      </text>
      <Arrow x1={240} y1={186} x2={255} y2={186} color={accent} />
      <Arrow x1={463} y1={186} x2={478} y2={186} color={warning} />
      <rect
        x="122"
        y="318"
        width="476"
        height="50"
        rx="10"
        fill={border}
        fillOpacity="0.18"
        stroke={border}
      />
      <text x="360" y="349" textAnchor="middle" fontSize="14" fill={primary}>
        符号、序列、编码数：同一对象的三种层级，不可混读
      </text>
    </Frame>
  );
}

/** 展示表现定理怎样把含义世界的谓词送回形式系统。 */
export function Mg3RepresentabilityDiagram() {
  return (
    <Frame
      ariaLabel="表现定理桥梁图：含义世界中的原始递归谓词R(m,n)经过表示定理变成形式世界公式r(x,y)，对每个具体输入，真对应可证，假对应否定可证。"
      caption="Representability Bridge：桥梁不是相似，而是对每个具体输入都能在P中反映真假。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        表现定理：含义世界 ↔ 形式世界
      </text>
      <rect
        x="44"
        y="88"
        width="270"
        height="220"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <rect
        x="406"
        y="88"
        width="270"
        height="220"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="179"
        y="124"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        含义世界
      </text>
      <text x="179" y="166" textAnchor="middle" fontSize="16" fill={primary}>
        原始递归谓词 R(m,n)
      </text>
      <text x="179" y="210" textAnchor="middle" fontSize="14" fill={secondary}>
        具体输入，答案为真或假
      </text>
      <text x="179" y="252" textAnchor="middle" fontSize="14" fill={primary}>
        机械计算的有限过程
      </text>
      <text
        x="541"
        y="124"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        形式世界 P
      </text>
      <text x="541" y="166" textAnchor="middle" fontSize="16" fill={primary}>
        公式 r(x,y)
      </text>
      <text x="541" y="210" textAnchor="middle" fontSize="14" fill={secondary}>
        真：P⊢r(m,n)
      </text>
      <text x="541" y="252" textAnchor="middle" fontSize="14" fill={primary}>
        假：P⊢¬r(m,n)
      </text>
      <Arrow x1={324} y1={176} x2={396} y2={176} color={warning} />
      <text x="360" y="158" textAnchor="middle" fontSize="13" fill={warning}>
        表现定理
      </text>
      <text x="360" y="360" textAnchor="middle" fontSize="14" fill={primary}>
        公式成为谈论“证明”的数学对象
      </text>
    </Frame>
  );
}

/** 展示 Diag、Q、p 和固定点 g 的构造链，以及两半不可证结论。 */
export function Mg3FixedPointDiagram() {
  return (
    <Frame
      ariaLabel="固定点构造图：公式编码y经过Diag得到自身代入，Q判断x不是该结果的证明，p对所有x量化，最后g等于p的自身哥德尔数代入；相容性路线导出g不可证，omega相容性路线导出否定g不可证。"
      caption="Fixed-Point Route：自我指涉通过数项和编码实现，最后分开检查g与否定g。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        对角化：从可表示谓词到不可判定语句
      </text>
      {[
        ["Diag(y)", "自身代入", accent],
        ["Q(x,y)", "x不是证明", warning],
        ["p(y)", "∀x q(x,y)", success],
        ["g=p(⌜p⌝)", "固定点", danger],
      ].map(([title, detail, color], index) => {
        const x = 34 + index * 172;
        return (
          <g key={`fixed-stage-${title}`}>
            <rect
              x={x}
              y="112"
              width="142"
              height="126"
              rx="14"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
            />
            <text
              x={x + 71}
              y="151"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={color}
            >
              {title}
            </text>
            <text
              x={x + 71}
              y="194"
              textAnchor="middle"
              fontSize="14"
              fill={primary}
            >
              {detail}
            </text>
            {index < 3 ? (
              <Arrow
                x1={x + 146}
                y1={174}
                x2={x + 166}
                y2={174}
                color={secondary}
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="78"
        y="292"
        width="250"
        height="62"
        rx="12"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="203"
        y="318"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        相容性 → P⊬g
      </text>
      <text x="203" y="341" textAnchor="middle" fontSize="13" fill={secondary}>
        假设P⊢g会同时推出Prov与否定
      </text>
      <rect
        x="392"
        y="292"
        width="250"
        height="62"
        rx="12"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="517"
        y="318"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        ω相容性 → P⊬¬g
      </text>
      <text x="517" y="341" textAnchor="middle" fontSize="13" fill={secondary}>
        排除每个具体证明候选
      </text>
    </Frame>
  );
}

type LabMode = "formal" | "coding" | "fixed";

/** 让读者在证明管线、编码层级和固定点构造之间切换。 */
export function Mg3IncompletenessLab() {
  const [mode, setMode] = useState<LabMode>("fixed");
  const labels: Record<LabMode, string> = {
    formal: "形式证明",
    coding: "哥德尔编码",
    fixed: "固定点构造",
  };
  return (
    <section
      aria-label="哥德尔不完备定理实验"
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
    >
      <div>
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          Incompleteness Route Lab
        </p>
        <h3 className="m-0 mt-1 text-xl font-semibold text-primary">
          切换证明路线，保持层级不混
        </h3>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="不完备定理实验模式"
      >
        {(Object.keys(labels) as LabMode[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${mode === key ? "border-accent bg-accent/15 text-primary" : "border-border text-secondary hover:border-accent"}`}
          >
            {labels[key]}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMode("fixed")}
          className="min-h-11 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:border-accent"
        >
          重置实验
        </button>
      </div>
      <div className="mt-3 rounded-card border border-border bg-base p-3">
        {mode === "formal" ? <Mg3FormalSystemDiagram /> : null}
        {mode === "coding" ? <Mg3GodelNumberDiagram /> : null}
        {mode === "fixed" ? <Mg3FixedPointDiagram /> : null}
      </div>
      <p className="mt-3 mb-0 text-sm leading-6 text-secondary">
        当前证据：
        {mode === "formal"
          ? "给定证明可以逐行验证，但验证不等于搜索任意长度证明。"
          : mode === "coding"
            ? "唯一质因数分解把符号、公式和证明变成可计算的自然数。"
            : "对角化构造g，再分别使用相容性与ω相容性证明两半结论。"}
      </p>
    </section>
  );
}
