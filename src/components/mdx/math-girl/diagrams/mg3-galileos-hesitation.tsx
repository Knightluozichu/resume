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

/** 展示对象、集合、成员关系与子集关系的类型边界。 */
export function Mg3MembershipDiagram() {
  return (
    <Frame
      ariaLabel="集合层级图：集合A包含数字1和集合{1}两个元素；成员关系连接对象到集合，子集关系连接集合到集合，数字1与集合{1}不是同一个对象。"
      caption="先看关系两侧的对象类型：∈ 连接对象与集合，⊆ 比较两个集合。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        成员关系 ≠ 子集关系
      </text>
      <rect
        x={42}
        y={76}
        width={300}
        height={260}
        rx={16}
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text x={70} y={108} fontSize={15} fontWeight="700" fill={accent}>
        {"集合 A = {1, {1}}"}
      </text>
      <rect
        x={72}
        y={138}
        width={100}
        height={72}
        rx={12}
        fill={primary}
        fillOpacity="0.05"
        stroke={border}
      />
      <text x={122} y={181} textAnchor="middle" fontSize={22} fill={primary}>
        1
      </text>
      <rect
        x={194}
        y={138}
        width={112}
        height={72}
        rx={12}
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text x={250} y={181} textAnchor="middle" fontSize={19} fill={success}>
        {"{1}"}
      </text>
      <text x={189} y={247} textAnchor="middle" fontSize={13} fill={primary}>
        1 ∈ A，{`{1}`} ∈ A
      </text>
      <text x={189} y={282} textAnchor="middle" fontSize={13} fill={secondary}>
        两个元素的层级不同
      </text>
      <rect
        x={390}
        y={76}
        width={288}
        height={260}
        rx={16}
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x={534}
        y={108}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={warning}
      >
        关系类型检查
      </text>
      <text x={534} y={156} textAnchor="middle" fontSize={16} fill={primary}>
        1 ∈ {`{1}`}
      </text>
      <text x={534} y={192} textAnchor="middle" fontSize={13} fill={secondary}>
        对象 → 集合
      </text>
      <text x={534} y={240} textAnchor="middle" fontSize={16} fill={primary}>
        {`{1}`} ⊆ A
      </text>
      <text x={534} y={276} textAnchor="middle" fontSize={13} fill={secondary}>
        集合 → 集合
      </text>
      <text x={360} y={382} textAnchor="middle" fontSize={14} fill={danger}>
        1 ≠ {`{1}`}：不要跳过嵌套层级
      </text>
    </Frame>
  );
}

/** 用三个局部图把交并补和逻辑与或非对齐。 */
export function Mg3LogicDiagram() {
  const rows = [
    { label: "A ∩ B", logic: "P(x) ∧ Q(x)", color: accent, kind: "and" },
    { label: "A ∪ B", logic: "P(x) ∨ Q(x)", color: success, kind: "or" },
    { label: "U \\ A", logic: "¬P(x)", color: warning, kind: "not" },
  ];
  return (
    <Frame
      ariaLabel="集合与逻辑对应图：交集对应逻辑与，并集对应逻辑或，补集相对全集对应逻辑否定。"
      caption="固定全集 U 后，集合运算和成员命题可以逐项互译。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        集合运算 ↔ 逻辑运算
      </text>
      <text x={360} y={56} textAnchor="middle" fontSize={12} fill={secondary}>
        同一个 x：先判断成员资格，再组合真假条件
      </text>
      {rows.map((row, index) => {
        const y = 88 + index * 96;
        return (
          <g key={row.label}>
            <rect
              x={48}
              y={y}
              width={624}
              height={72}
              rx={14}
              fill={row.color}
              fillOpacity="0.08"
              stroke={row.color}
              strokeWidth="2"
            />
            <text
              x={82}
              y={y + 31}
              fontSize={16}
              fontWeight="700"
              fill={row.color}
            >
              {row.label}
            </text>
            {row.kind === "and" && (
              <>
                <circle
                  cx={280}
                  cy={y + 36}
                  r={25}
                  fill={accent}
                  fillOpacity="0.2"
                />
                <circle
                  cx={308}
                  cy={y + 36}
                  r={25}
                  fill={success}
                  fillOpacity="0.2"
                />
                <circle cx={294} cy={y + 36} r={10} fill={row.color} />
              </>
            )}
            {row.kind === "or" && (
              <>
                <circle
                  cx={280}
                  cy={y + 36}
                  r={25}
                  fill={accent}
                  fillOpacity="0.28"
                />
                <circle
                  cx={308}
                  cy={y + 36}
                  r={25}
                  fill={success}
                  fillOpacity="0.28"
                />
                <path
                  d={`M 266 ${y + 36} Q 294 ${y + 8} 322 ${y + 36} Q 294 ${y + 64} 266 ${y + 36}`}
                  fill={row.color}
                  fillOpacity="0.35"
                />
              </>
            )}
            {row.kind === "not" && (
              <>
                <rect
                  x={260}
                  y={y + 12}
                  width={64}
                  height={48}
                  rx={8}
                  fill={border}
                  fillOpacity="0.35"
                />
                <rect
                  x={276}
                  y={y + 20}
                  width={40}
                  height={32}
                  rx={6}
                  fill={row.color}
                  fillOpacity="0.45"
                />
                <line
                  x1={267}
                  y1={y + 10}
                  x2={317}
                  y2={y + 62}
                  stroke={danger}
                  strokeWidth="3"
                />
              </>
            )}
            <Arrow
              x1={368}
              y1={y + 36}
              x2={424}
              y2={y + 36}
              color={row.color}
            />
            <text
              x={462}
              y={y + 42}
              textAnchor="middle"
              fontSize={16}
              fill={primary}
            >
              {row.logic}
            </text>
          </g>
        );
      })}
      <text x={360} y={392} textAnchor="middle" fontSize={14} fill={secondary}>
        De Morgan：¬(P∧Q)=¬P∨¬Q，¬(P∨Q)=¬P∧¬Q
      </text>
    </Frame>
  );
}

/** 展示罗素悖论的两分支与受限分离的安全边界。 */
export function Mg3RussellDiagram() {
  return (
    <Frame
      ariaLabel="罗素悖论图：无条件构造R等于不属于自身对象的集合后，R属于R和R不属于R两条分支都导致矛盾；受限分离先固定全集U再筛选。"
      caption="矛盾来自过强的集合形成规则；受限分离把筛选范围收回到已有集合 U。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        从自指矛盾到受限分离
      </text>
      <rect
        x={38}
        y={78}
        width={238}
        height={260}
        rx={14}
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
        strokeWidth="2"
      />
      <text
        x={157}
        y={110}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={danger}
      >
        无限制内涵
      </text>
      <text x={157} y={150} textAnchor="middle" fontSize={15} fill={primary}>
        {"R = {x : x ∉ x}"}
      </text>
      <Arrow x1={157} y1={166} x2={157} y2={198} color={danger} />
      <text x={157} y={226} textAnchor="middle" fontSize={14} fill={primary}>
        R ∈ R → R ∉ R
      </text>
      <text x={157} y={260} textAnchor="middle" fontSize={14} fill={primary}>
        R ∉ R → R ∈ R
      </text>
      <text
        x={157}
        y={304}
        textAnchor="middle"
        fontSize={14}
        fontWeight="700"
        fill={danger}
      >
        两分支都矛盾
      </text>
      <Arrow x1={286} y1={208} x2={346} y2={208} color={warning} />
      <rect
        x={370}
        y={78}
        width={312}
        height={260}
        rx={14}
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x={526}
        y={110}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={success}
      >
        受限分离
      </text>
      <rect
        x={406}
        y={136}
        width={240}
        height={120}
        rx={12}
        fill={primary}
        fillOpacity="0.05"
        stroke={border}
      />
      <text x={526} y={168} textAnchor="middle" fontSize={15} fill={primary}>
        已有全集 U
      </text>
      <text x={526} y={208} textAnchor="middle" fontSize={15} fill={success}>
        {"{x ∈ U : P(x)}"}
      </text>
      <text x={526} y={240} textAnchor="middle" fontSize={13} fill={secondary}>
        只从 U 内筛选
      </text>
      <text x={526} y={304} textAnchor="middle" fontSize={14} fill={success}>
        ZF 不假设存在全集 V
      </text>
    </Frame>
  );
}

/** 展示自然数到平方数的双射配对。 */
export function Mg3BijectionDiagram() {
  const pairs = [
    [1, 1],
    [2, 4],
    [3, 9],
    [4, 16],
    [5, 25],
  ];
  return (
    <Frame
      ariaLabel="双射图：自然数1到5依次映射到平方数1、4、9、16、25；平方数是自然数真子集，但每个平方数都有唯一原像。"
      caption="真子集与等势并不矛盾：无限集合可以通过双射和自己的真子集逐项配对。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        n ↦ n²：整体与真子集等势
      </text>
      <text
        x={180}
        y={70}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={accent}
      >
        自然数 N
      </text>
      <text
        x={540}
        y={70}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={success}
      >
        平方数 Q ⊊ N
      </text>
      {pairs.map(([n, square], index) => {
        const y = 106 + index * 48;
        return (
          <g key={n}>
            <circle
              cx={180}
              cy={y}
              r={17}
              fill={accent}
              fillOpacity="0.18"
              stroke={accent}
            />
            <text
              x={180}
              y={y + 5}
              textAnchor="middle"
              fontSize={14}
              fill={primary}
            >
              {n}
            </text>
            <Arrow x1={216} y1={y} x2={500} y2={y} color={accent} />
            <circle
              cx={540}
              cy={y}
              r={20}
              fill={success}
              fillOpacity="0.18"
              stroke={success}
            />
            <text
              x={540}
              y={y + 5}
              textAnchor="middle"
              fontSize={14}
              fill={primary}
            >
              {square}
            </text>
          </g>
        );
      })}
      <text x={360} y={370} textAnchor="middle" fontSize={14} fill={primary}>
        单射：不重复　满射：不遗漏　⇒　双射 ⇒ |N| = |Q|
      </text>
      <text x={360} y={397} textAnchor="middle" fontSize={13} fill={secondary}>
        Galileo 的犹豫：有限直觉不再适用于无限对象
      </text>
    </Frame>
  );
}

type LabMode = "membership" | "logic" | "bijection";

const labCopy: Record<LabMode, { label: string; conclusion: string }> = {
  membership: {
    label: "成员关系",
    conclusion: "∈ 连接对象与集合，⊆ 连接集合与集合。",
  },
  logic: {
    label: "集合逻辑",
    conclusion: "固定全集后，交并补分别对应与、或、非。",
  },
  bijection: {
    label: "双射配对",
    conclusion: "n↦n² 不重不漏，所以自然数与平方数等势。",
  },
};

/** 交互切换三种视角，练习先确认对象类型再读取结论。 */
export function Mg3SetLab() {
  const [mode, setMode] = useState<LabMode>("membership");
  const reset = () => setMode("membership");
  return (
    <section
      className="not-prose mx-auto my-6 max-w-[720px] rounded-card border border-border bg-elevated p-5"
      aria-label="集合关系实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="m-0 text-lg font-semibold text-primary">
            Set Relation Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换同一章的三种证据视角。
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
        aria-label="集合视角"
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
          {mode === "membership" && (
            <>
              <rect
                x={76}
                y={72}
                width={184}
                height={94}
                rx={14}
                fill={accent}
                fillOpacity="0.12"
                stroke={accent}
              />
              <text
                x={168}
                y={106}
                textAnchor="middle"
                fontSize={15}
                fill={primary}
              >
                对象：1
              </text>
              <Arrow x1={276} y1={118} x2={416} y2={118} color={accent} />
              <text
                x={346}
                y={102}
                textAnchor="middle"
                fontSize={13}
                fill={secondary}
              >
                ∈
              </text>
              <rect
                x={434}
                y={72}
                width={210}
                height={94}
                rx={14}
                fill={success}
                fillOpacity="0.12"
                stroke={success}
              />
              <text
                x={539}
                y={106}
                textAnchor="middle"
                fontSize={15}
                fill={primary}
              >
                集合：{`{1}`}
              </text>
              <text
                x={360}
                y={198}
                textAnchor="middle"
                fontSize={14}
                fill={accent}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
          {mode === "logic" && (
            <>
              <circle
                cx={294}
                cy={116}
                r={46}
                fill={accent}
                fillOpacity="0.22"
              />
              <circle
                cx={364}
                cy={116}
                r={46}
                fill={success}
                fillOpacity="0.22"
              />
              <text
                x={294}
                y={121}
                textAnchor="middle"
                fontSize={14}
                fill={primary}
              >
                A
              </text>
              <text
                x={364}
                y={121}
                textAnchor="middle"
                fontSize={14}
                fill={primary}
              >
                B
              </text>
              <text
                x={360}
                y={198}
                textAnchor="middle"
                fontSize={14}
                fill={success}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
          {mode === "bijection" && (
            <>
              {[1, 2, 3, 4].map((n, index) => {
                const y = 72 + index * 28;
                return (
                  <g key={n}>
                    <circle
                      cx={224}
                      cy={y}
                      r={12}
                      fill={accent}
                      fillOpacity="0.22"
                      stroke={accent}
                    />
                    <text
                      x={224}
                      y={y + 4}
                      textAnchor="middle"
                      fontSize={12}
                      fill={primary}
                    >
                      {n}
                    </text>
                    <Arrow x1={244} y1={y} x2={466} y2={y} color={success} />
                    <circle
                      cx={494}
                      cy={y}
                      r={14}
                      fill={success}
                      fillOpacity="0.22"
                      stroke={success}
                    />
                    <text
                      x={494}
                      y={y + 4}
                      textAnchor="middle"
                      fontSize={12}
                      fill={primary}
                    >
                      {n * n}
                    </text>
                  </g>
                );
              })}
              <text
                x={360}
                y={198}
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
