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
  color = accent,
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

/** 展示材料蕴含的四行定义，并标出唯一失败行。 */
export function Mg3ImplicationTableDiagram() {
  const rows = [
    ["假", "假", "真"],
    ["假", "真", "真"],
    ["真", "假", "假"],
    ["真", "真", "真"],
  ];
  return (
    <Frame
      ariaLabel="材料蕴含真值表：A和B四种真假组合中，只有A为真且B为假时A蕴含B为假，其他三行都为真。"
      caption="材料蕴含只排除真到假的一行；这一定义不等于日常语言里的因果承诺。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        A → B：四行真值表
      </text>
      <text x={360} y={56} textAnchor="middle" fontSize={12} fill={secondary}>
        只在前件真、后件假时失败
      </text>
      <rect
        x={104}
        y={78}
        width={512}
        height={276}
        rx={14}
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x={212}
        y={112}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={primary}
      >
        A（前件）
      </text>
      <text
        x={360}
        y={112}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={primary}
      >
        B（后件）
      </text>
      <text
        x={512}
        y={112}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={accent}
      >
        A → B
      </text>
      {rows.map((row, index) => {
        const y = 144 + index * 48;
        const failed = index === 2;
        return (
          <g key={`${row[0]}-${row[1]}`}>
            <rect
              x={122}
              y={y - 22}
              width={476}
              height={38}
              rx={8}
              fill={failed ? danger : success}
              fillOpacity={failed ? "0.14" : "0.06"}
            />
            <text
              x={212}
              y={y + 4}
              textAnchor="middle"
              fontSize={15}
              fill={primary}
            >
              {row[0]}
            </text>
            <text
              x={360}
              y={y + 4}
              textAnchor="middle"
              fontSize={15}
              fill={primary}
            >
              {row[1]}
            </text>
            <text
              x={512}
              y={y + 4}
              textAnchor="middle"
              fontSize={15}
              fontWeight="700"
              fill={failed ? danger : success}
            >
              {row[2]}
            </text>
          </g>
        );
      })}
      <text x={360} y={386} textAnchor="middle" fontSize={14} fill={primary}>
        A → B ≡ ¬A ∨ B
      </text>
    </Frame>
  );
}

/** 对比语义学与句法学的研究对象。 */
export function Mg3SyntaxSemanticsDiagram() {
  return (
    <Frame
      ariaLabel="语义学与句法学对照图：语义学从赋值进入真假和模型，句法学从字符串进入生成规则、公理和证明；两者在形式化的进入与返回边界连接。"
      caption="同一公式可以有两个问题：它在模型中真吗？它能在系统内被证明吗？"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        含义世界 ↔ 式子世界
      </text>
      <rect
        x={42}
        y={78}
        width={276}
        height={260}
        rx={16}
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={180}
        y={112}
        textAnchor="middle"
        fontSize={16}
        fontWeight="700"
        fill={accent}
      >
        语义学
      </text>
      <text x={180} y={136} textAnchor="middle" fontSize={12} fill={secondary}>
        Semantics：解释与模型
      </text>
      <rect
        x={84}
        y={166}
        width={192}
        height={42}
        rx={10}
        fill={primary}
        fillOpacity="0.06"
        stroke={border}
      />
      <text x={180} y={192} textAnchor="middle" fontSize={14} fill={primary}>
        赋值 A=真，B=假
      </text>
      <Arrow x1={180} y1={218} x2={180} y2={246} color={accent} />
      <text x={180} y={274} textAnchor="middle" fontSize={15} fill={accent}>
        A → B 为假
      </text>
      <text x={180} y={312} textAnchor="middle" fontSize={13} fill={secondary}>
        公式在模型中是否成立？
      </text>
      <Arrow x1={328} y1={208} x2={392} y2={208} color={warning} />
      <text x={360} y={188} textAnchor="middle" fontSize={12} fill={warning}>
        形式化
      </text>
      <rect
        x={402}
        y={78}
        width={276}
        height={260}
        rx={16}
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x={540}
        y={112}
        textAnchor="middle"
        fontSize={16}
        fontWeight="700"
        fill={success}
      >
        句法学
      </text>
      <text x={540} y={136} textAnchor="middle" fontSize={12} fill={secondary}>
        Syntax：字符串与规则
      </text>
      <rect
        x={444}
        y={166}
        width={192}
        height={42}
        rx={10}
        fill={primary}
        fillOpacity="0.06"
        stroke={border}
      />
      <text x={540} y={192} textAnchor="middle" fontSize={14} fill={primary}>
        （A）∨（B）
      </text>
      <Arrow x1={540} y1={218} x2={540} y2={246} color={success} />
      <text x={540} y={274} textAnchor="middle" fontSize={15} fill={success}>
        F规则 / 公理 / 证明
      </text>
      <text x={540} y={312} textAnchor="middle" fontSize={13} fill={secondary}>
        字符串能否被系统推出？
      </text>
    </Frame>
  );
}

/** 展示 H 中公式、公理和推理规则的分层。 */
export function Mg3FormalSystemDiagram() {
  return (
    <Frame
      ariaLabel="形式系统H分层图：F1到F4递归生成公式，P1到P4提供公理模式，Modus Ponens把已有公式推出下一行，最终形成定理。"
      caption="句法世界的流水线：先确认字符串是公式，再确认来源是公理实例或推理结果。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        形式系统 H：从字符串到定理
      </text>
      <rect
        x={44}
        y={82}
        width={190}
        height={190}
        rx={14}
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={139}
        y={114}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={accent}
      >
        F1–F4
      </text>
      <text x={139} y={148} textAnchor="middle" fontSize={14} fill={primary}>
        递归生成
      </text>
      <text x={139} y={180} textAnchor="middle" fontSize={15} fill={primary}>
        公式
      </text>
      <text x={139} y={224} textAnchor="middle" fontSize={13} fill={secondary}>
        括号也是字符串
      </text>
      <Arrow x1={248} y1={178} x2={304} y2={178} color={accent} />
      <rect
        x={324}
        y={82}
        width={190}
        height={190}
        rx={14}
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x={419}
        y={114}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={warning}
      >
        P1–P4
      </text>
      <text x={419} y={148} textAnchor="middle" fontSize={14} fill={primary}>
        公理模式
      </text>
      <text x={419} y={180} textAnchor="middle" fontSize={15} fill={primary}>
        实例化
      </text>
      <text x={419} y={224} textAnchor="middle" fontSize={13} fill={secondary}>
        可机械匹配
      </text>
      <Arrow x1={528} y1={178} x2={584} y2={178} color={success} />
      <rect
        x={604}
        y={82}
        width={72}
        height={190}
        rx={14}
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x={640}
        y={132}
        textAnchor="middle"
        fontSize={14}
        fontWeight="700"
        fill={success}
      >
        MP
      </text>
      <text x={640} y={170} textAnchor="middle" fontSize={13} fill={primary}>
        x
      </text>
      <text x={640} y={198} textAnchor="middle" fontSize={13} fill={primary}>
        x→y
      </text>
      <text x={640} y={230} textAnchor="middle" fontSize={13} fill={success}>
        y
      </text>
      <text x={360} y={326} textAnchor="middle" fontSize={14} fill={primary}>
        公式 + 公理实例 + 推理规则 → 形式定理
      </text>
      <text x={360} y={378} textAnchor="middle" fontSize={13} fill={secondary}>
        “真”是语义判断；“可证”是句法判断
      </text>
    </Frame>
  );
}

/** 展示 A→A 的五行证明如何由两次 MP 串起来。 */
export function Mg3ProofChainDiagram() {
  return (
    <Frame
      ariaLabel="A蕴含A形式证明图：L1、L2、L3是公理实例，L1和L2经第一次MP得到L4，L3和L4经第二次MP得到L5即A蕴含A。"
      caption="L5 的资格来自两次可追溯的 MP，而不是来自“显然成立”的语义直觉。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        A → A：L1–L5 的根据链
      </text>
      <rect
        x={42}
        y={76}
        width={214}
        height={238}
        rx={14}
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={149}
        y={108}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={accent}
      >
        公理实例
      </text>
      <text x={78} y={148} fontSize={14} fill={primary}>
        L1：P1[A]
      </text>
      <text x={78} y={192} fontSize={14} fill={primary}>
        L2：P4[…]
      </text>
      <text x={78} y={236} fontSize={14} fill={primary}>
        L3：P2[A,A]
      </text>
      <Arrow x1={278} y1={170} x2={344} y2={170} color={warning} />
      <rect
        x={362}
        y={102}
        width={126}
        height={72}
        rx={12}
        fill={warning}
        fillOpacity="0.12"
        stroke={warning}
      />
      <text
        x={425}
        y={132}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={warning}
      >
        L4
      </text>
      <text x={425} y={156} textAnchor="middle" fontSize={12} fill={primary}>
        MP(L1,L2)
      </text>
      <Arrow x1={298} y1={250} x2={344} y2={164} color={warning} />
      <Arrow x1={510} y1={138} x2={574} y2={138} color={success} />
      <Arrow x1={298} y1={250} x2={574} y2={198} color={success} />
      <rect
        x={592}
        y={102}
        width={86}
        height={116}
        rx={12}
        fill={success}
        fillOpacity="0.12"
        stroke={success}
      />
      <text
        x={635}
        y={136}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={success}
      >
        L5
      </text>
      <text x={635} y={166} textAnchor="middle" fontSize={13} fill={primary}>
        A → A
      </text>
      <text x={635} y={194} textAnchor="middle" fontSize={12} fill={primary}>
        MP(L3,L4)
      </text>
      <text x={360} y={360} textAnchor="middle" fontSize={14} fill={primary}>
        两次 MP，五行有限序列，末行成为形式定理
      </text>
      <text x={360} y={390} textAnchor="middle" fontSize={13} fill={secondary}>
        先出现依据，才能写下后续行
      </text>
    </Frame>
  );
}

type LabMode = "semantics" | "syntax" | "proof";

const labCopy: Record<LabMode, { label: string; conclusion: string }> = {
  semantics: {
    label: "真值检查",
    conclusion: "A→A 在每个赋值下为真，但这还不是句法证明。",
  },
  syntax: {
    label: "句法检查",
    conclusion: "F1–F4、P1–P4 和 MP 决定字符串能否进入证明链。",
  },
  proof: {
    label: "证明检查",
    conclusion: "L1–L5 用两次 MP 把 A→A 送入 H 的定理集合。",
  },
};

/** 切换语义、句法和证明三个视角，帮助区分真假与可证。 */
export function Mg3LeibnizLab() {
  const [mode, setMode] = useState<LabMode>("semantics");
  const reset = () => setMode("semantics");
  return (
    <section
      className="not-prose mx-auto my-6 max-w-[720px] rounded-card border border-border bg-elevated p-5"
      aria-label="莱布尼茨形式系统实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="m-0 text-lg font-semibold text-primary">
            Leibniz Logic Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            把“真”“公式”和“可证”分开观察。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-control border border-border px-3 py-2 text-sm text-primary transition-colors hover:border-accent"
        >
          重置实验
        </button>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="toolbar"
        aria-label="逻辑视角"
      >
        {(Object.keys(labCopy) as LabMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            className={`rounded-control border px-3 py-2 text-sm transition-colors ${mode === key ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:text-primary"}`}
          >
            {labCopy[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-card border border-border bg-bg p-2">
        <svg
          viewBox="0 0 720 220"
          role="img"
          aria-label={`当前视角：${labCopy[mode].label}。${labCopy[mode].conclusion}`}
          className="block h-auto w-full"
        >
          <text
            x={360}
            y={34}
            textAnchor="middle"
            fontSize={16}
            fontWeight="700"
            fill={primary}
          >
            当前视角：{labCopy[mode].label}
          </text>
          {mode === "semantics" && (
            <>
              <rect
                x={110}
                y={74}
                width={180}
                height={70}
                rx={12}
                fill={accent}
                fillOpacity="0.12"
                stroke={accent}
              />
              <text
                x={200}
                y={116}
                textAnchor="middle"
                fontSize={15}
                fill={primary}
              >
                四行真值表
              </text>
              <Arrow x1={314} y1={109} x2={406} y2={109} color={accent} />
              <rect
                x={430}
                y={74}
                width={180}
                height={70}
                rx={12}
                fill={success}
                fillOpacity="0.12"
                stroke={success}
              />
              <text
                x={520}
                y={116}
                textAnchor="middle"
                fontSize={15}
                fill={primary}
              >
                永真？
              </text>
              <text
                x={360}
                y={190}
                textAnchor="middle"
                fontSize={14}
                fill={accent}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
          {mode === "syntax" && (
            <>
              <rect
                x={68}
                y={74}
                width={150}
                height={70}
                rx={12}
                fill={accent}
                fillOpacity="0.12"
                stroke={accent}
              />
              <text
                x={143}
                y={116}
                textAnchor="middle"
                fontSize={14}
                fill={primary}
              >
                F1–F4 公式
              </text>
              <Arrow x1={238} y1={109} x2={300} y2={109} color={warning} />
              <rect
                x={318}
                y={74}
                width={150}
                height={70}
                rx={12}
                fill={warning}
                fillOpacity="0.12"
                stroke={warning}
              />
              <text
                x={393}
                y={116}
                textAnchor="middle"
                fontSize={14}
                fill={primary}
              >
                P1–P4 公理
              </text>
              <Arrow x1={488} y1={109} x2={550} y2={109} color={success} />
              <rect
                x={568}
                y={74}
                width={92}
                height={70}
                rx={12}
                fill={success}
                fillOpacity="0.12"
                stroke={success}
              />
              <text
                x={614}
                y={116}
                textAnchor="middle"
                fontSize={14}
                fill={primary}
              >
                MP
              </text>
              <text
                x={360}
                y={190}
                textAnchor="middle"
                fontSize={14}
                fill={warning}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
          {mode === "proof" && (
            <>
              <text
                x={150}
                y={102}
                textAnchor="middle"
                fontSize={15}
                fill={accent}
              >
                L1 + L2
              </text>
              <Arrow x1={206} y1={96} x2={310} y2={96} color={warning} />
              <text
                x={360}
                y={102}
                textAnchor="middle"
                fontSize={15}
                fill={warning}
              >
                L4
              </text>
              <Arrow x1={410} y1={96} x2={514} y2={96} color={success} />
              <text
                x={580}
                y={102}
                textAnchor="middle"
                fontSize={15}
                fill={success}
              >
                L5：A→A
              </text>
              <text
                x={360}
                y={190}
                textAnchor="middle"
                fontSize={14}
                fill={success}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
        </svg>
      </div>
      <p className="mt-3 text-sm text-secondary" aria-live="polite">
        结论：{labCopy[mode].conclusion}
      </p>
    </section>
  );
}
