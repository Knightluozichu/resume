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

/** 用两组数据比较 A 与 G，并把等号条件显式标出来。 */
export function Mg1MeanBalanceDiagram() {
  const cases = [
    {
      label: "不均衡：a=1, b=9",
      a: 1,
      b: 9,
      mean: "A=5",
      geometric: "G=3",
      color: warning,
    },
    {
      label: "均衡：a=4, b=4",
      a: 4,
      b: 4,
      mean: "A=4",
      geometric: "G=4",
      color: success,
    },
  ] as const;
  return (
    <Frame
      ariaLabel="算术平均和几何平均比较图：a等于1 b等于9时算术平均5大于几何平均3；a等于4 b等于4时两者都等于4，等号恰在两数相等时成立。"
      caption="样例建立直觉，等号条件才把观察升级为可证明的命题。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        两种平均：差距来自不均衡
      </text>
      {cases.map((item, row) => {
        const y = 82 + row * 142;
        const barScale = 42;
        return (
          <g key={item.label}>
            <rect
              x={48}
              y={y}
              width={624}
              height={112}
              rx={14}
              fill={item.color}
              fillOpacity="0.07"
              stroke={item.color}
            />
            <text
              x={72}
              y={y + 28}
              fontSize={13}
              fontWeight="700"
              fill={item.color}
            >
              {item.label}
            </text>
            <rect
              x={72}
              y={y + 48}
              width={item.a * barScale}
              height={20}
              rx={6}
              fill={accent}
              fillOpacity="0.65"
            />
            <rect
              x={72 + item.a * barScale + 8}
              y={y + 48}
              width={item.b * barScale}
              height={20}
              rx={6}
              fill={success}
              fillOpacity="0.65"
            />
            <text x={72} y={y + 88} fontSize={12} fill={secondary}>
              两个输入的和 = {item.a + item.b}，积 = {item.a * item.b}
            </text>
            <text
              x={550}
              y={y + 58}
              textAnchor="middle"
              fontSize={14}
              fontWeight="700"
              fill={accent}
            >
              {item.mean}
            </text>
            <text
              x={550}
              y={y + 84}
              textAnchor="middle"
              fontSize={14}
              fontWeight="700"
              fill={success}
            >
              {item.geometric}
            </text>
          </g>
        );
      })}
      <Arrow x1={438} y1={212} x2={500} y2={212} color={warning} />
      <text x={360} y={374} textAnchor="middle" fontSize={12} fill={primary}>
        A−G = (√a−√b)² / 2 ≥ 0
      </text>
    </Frame>
  );
}

/** 展示第一条证明把差直接化为平方，视觉上保留每个等价变形。 */
export function Mg1SquareDifferenceDiagram() {
  const steps = [
    { label: "差", formula: "A − G", color: accent },
    { label: "展开", formula: "(a − 2√ab + b) / 2", color: warning },
    { label: "配方", formula: "(√a − √b)² / 2", color: success },
    { label: "符号", formula: "≥ 0", color: success },
  ] as const;
  return (
    <Frame
      ariaLabel="平方差证明流程图：算术平均减几何平均先写成(a+b)/2减平方根ab，再展开为(a减2平方根ab加b)/2，配方为(平方根a减平方根b)平方除以2，最后因为平方非负得到不等式。"
      caption="证明的终点不是熟悉的公式，而是一个可验证的非负平方。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        证明路线：把差变成非负平方
      </text>
      {steps.map((step, index) => {
        const x = 40 + index * 170;
        return (
          <g key={step.label}>
            <rect
              x={x}
              y={112}
              width={148}
              height={134}
              rx={14}
              fill={step.color}
              fillOpacity="0.09"
              stroke={step.color}
              strokeWidth={index === 2 ? 2 : 1.2}
            />
            <circle
              cx={x + 74}
              cy={145}
              r={20}
              fill={step.color}
              fillOpacity="0.18"
              stroke={step.color}
            />
            <text
              x={x + 74}
              y={151}
              textAnchor="middle"
              fontSize={13}
              fontWeight="700"
              fill={step.color}
            >
              {index + 1}
            </text>
            <text
              x={x + 74}
              y={184}
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              {step.label}
            </text>
            <text
              x={x + 74}
              y={215}
              textAnchor="middle"
              fontSize={13}
              fontWeight="700"
              fill={primary}
            >
              {step.formula}
            </text>
            {index < steps.length - 1 && (
              <Arrow
                x1={x + 152}
                y1={178}
                x2={x + 166}
                y2={178}
                color={step.color}
              />
            )}
          </g>
        );
      })}
      <rect
        x={96}
        y={292}
        width={528}
        height={66}
        rx={14}
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x={360}
        y={321}
        textAnchor="middle"
        fontSize={13}
        fontWeight="700"
        fill={success}
      >
        等号 ⇔ √a = √b ⇔ a = b
      </text>
      <text x={360} y={345} textAnchor="middle" fontSize={12} fill={primary}>
        同一平方同时负责方向与等号条件
      </text>
    </Frame>
  );
}

/** 归一化图：把共同尺度去掉，只留下比例 t 与 1/t。 */
export function Mg1NormalizationDiagram() {
  const points = [
    { t: "1/3", ratio: "5/3", x: 112, color: warning },
    { t: "1", ratio: "1", x: 360, color: success },
    { t: "3", ratio: "5/3", x: 608, color: warning },
  ];
  return (
    <Frame
      ariaLabel="归一化比例图：A除以G等于二分之一乘以t加一除以t，t等于1时比值为1且等号成立；t偏离1时比值对称上升。"
      caption="交换 a 与 b 只把 t 换成 1/t，比例不变；最小点正是等号点。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        归一化：差距只看比例
      </text>
      <text x={360} y={72} textAnchor="middle" fontSize={14} fill={accent}>
        A / G = ½ ( t + 1/t )，其中 t = √(a/b)
      </text>
      <line
        x1={96}
        y1={220}
        x2={624}
        y2={220}
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1={360}
        y1={170}
        x2={360}
        y2={278}
        stroke={success}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      {points.map((point) => (
        <g key={point.t}>
          <circle
            cx={point.x}
            cy={220 - (point.t === "1" ? 0 : 54)}
            r={12}
            fill={point.color}
            fillOpacity="0.2"
            stroke={point.color}
            strokeWidth="2"
          />
          <text
            x={point.x}
            y={point.t === "1" ? 204 : 150}
            textAnchor="middle"
            fontSize={13}
            fontWeight="700"
            fill={point.color}
          >
            t={point.t}
          </text>
          <text
            x={point.x}
            y={point.t === "1" ? 254 : 200}
            textAnchor="middle"
            fontSize={12}
            fill={primary}
          >
            A/G={point.ratio}
          </text>
        </g>
      ))}
      <text
        x={360}
        y={307}
        textAnchor="middle"
        fontSize={13}
        fontWeight="700"
        fill={success}
      >
        t=1 ⇔ a=b ⇔ A/G=1
      </text>
      <text x={360} y={344} textAnchor="middle" fontSize={12} fill={secondary}>
        共同放大 a,b 不改变 A/G，只改变两个平均的共同尺度
      </text>
    </Frame>
  );
}

/** 固定和应用：把矩形面积和同周长正方形并排比较。 */
export function Mg1FixedSumDiagram() {
  return (
    <Frame
      ariaLabel="固定和最值图：两边a和b的和固定为S，矩形面积ab不超过边长S除以2的正方形面积S平方除以4，等号在a等于b时成立。"
      caption="同一周长下，正方形把两条边调到相等，面积达到最大。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        固定和 S：矩形向正方形靠拢
      </text>
      <rect
        x={74}
        y={112}
        width={246}
        height={152}
        rx={4}
        fill={warning}
        fillOpacity="0.12"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x={197}
        y={188}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={warning}
      >
        面积 ab
      </text>
      <text x={197} y={224} textAnchor="middle" fontSize={12} fill={primary}>
        a+b=S，a≠b
      </text>
      <Arrow x1={344} y1={188} x2={390} y2={188} color={accent} />
      <text x={366} y={165} textAnchor="middle" fontSize={11} fill={accent}>
        均衡
      </text>
      <rect
        x={430}
        y={92}
        width={190}
        height={190}
        rx={4}
        fill={success}
        fillOpacity="0.12"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x={525}
        y={184}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={success}
      >
        S² / 4
      </text>
      <text x={525} y={220} textAnchor="middle" fontSize={12} fill={primary}>
        a=b=S/2
      </text>
      <text
        x={360}
        y={332}
        textAnchor="middle"
        fontSize={14}
        fontWeight="700"
        fill={accent}
      >
        ab ≤ S²/4
      </text>
      <text x={360} y={360} textAnchor="middle" fontSize={12} fill={secondary}>
        上界可达，所以它就是最大值
      </text>
    </Frame>
  );
}

/** 交互实验：拖动偏差 d，观察固定和下乘积如何按 d² 损失。 */
export function Mg1AmGMLab() {
  const [offset, setOffset] = useState(0);
  const total = 10;
  const d = offset / 2;
  const a = total / 2 + d;
  const b = total / 2 - d;
  const product = a * b;
  const loss = d * d;
  return (
    <section
      aria-label="算术几何平均最值实验"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-secondary">
            AM-GM Lab
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            固定和 10：拖动不均衡量
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setOffset(0)}
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>
      <label className="block text-sm text-primary" htmlFor="mg1-amgm-offset">
        偏差 2d：{offset.toFixed(1)}（a=5+d，b=5−d）
      </label>
      <input
        id="mg1-amgm-offset"
        type="range"
        min={-10}
        max={10}
        step={1}
        value={offset}
        onChange={(event) => setOffset(Number(event.target.value))}
        className="mt-3 h-11 w-full accent-accent"
        aria-label="固定和下的两数偏差"
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-control border border-border p-3">
          <p className="text-xs text-secondary">两数</p>
          <p className="mt-1 text-sm font-semibold text-primary">
            a={a.toFixed(1)}，b={b.toFixed(1)}
          </p>
        </div>
        <div className="rounded-control border border-border p-3">
          <p className="text-xs text-secondary">乘积</p>
          <p className="mt-1 text-sm font-semibold text-success">
            ab={product.toFixed(2)}
          </p>
        </div>
        <div className="rounded-control border border-border p-3">
          <p className="text-xs text-secondary">离最大值的损失</p>
          <p className="mt-1 text-sm font-semibold text-warning">
            d²={loss.toFixed(2)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs text-secondary">
        公式验收：ab = 25 − d²，所以 d=0 时乘积达到 25；偏离均衡点的损失正好是
        d²。
      </p>
    </section>
  );
}
