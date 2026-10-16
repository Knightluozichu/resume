"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  bg: "var(--bg)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";
// Only drawing coordinates are canonicalized, never the mathematical results.
const geo = (n: number) => (Number.isFinite(n) ? Number(n.toFixed(9)) : 0);
const percent = (n: number) => `${Number((100 * n).toFixed(4))}%`;
function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}
function fraction(n: number, d: number) {
  const g = gcd(n, d);
  const sign = d < 0 ? -1 : 1;
  return Math.abs(d / g) === 1
    ? String((sign * n) / g)
    : `${(sign * n) / g}/${Math.abs(d / g)}`;
}
type Probe = "hole" | "next" | "zero";
function rationalRun(a: number, divisor: number, probe: Probe, fault: boolean) {
  const x = probe === "hole" ? a : probe === "next" ? a + 1 : 0;
  const numerator = x * x - a * a;
  const denominator = divisor * (x - a);
  const actual = denominator === 0 ? null : numerator / denominator;
  const extension = (x + a) / divisor;
  const reported = fault ? extension : actual;
  return {
    x,
    numerator,
    denominator,
    actual,
    extension,
    reported,
    actualExact: actual === null ? "未定义" : fraction(numerator, denominator),
    reportedExact: reported === null ? "未定义" : fraction(x + a, divisor),
    mismatch: actual === null && reported !== null,
  };
}
type SortRow = { id: string; key: number };
const SORT_DATA = {
  tens: [10, 2, 2, 30],
  ties: [3, 12, 3, 1],
} as const;
type Dataset = keyof typeof SORT_DATA;
type Direction = "asc" | "desc";
function compareKey(
  a: SortRow,
  b: SortRow,
  direction: Direction,
  lexical: boolean,
) {
  const aa = lexical ? String(a.key) : a.key;
  const bb = lexical ? String(b.key) : b.key;
  const sign = aa < bb ? -1 : aa > bb ? 1 : 0;
  return direction === "asc" ? sign : -sign;
}
function mergeRows(
  left: SortRow[],
  right: SortRow[],
  direction: Direction,
  lexical: boolean,
) {
  const out: SortRow[] = [];
  const trace: { left: string; right: string; chosen: string; tie: boolean }[] =
    [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    const l = left[i];
    const r = right[j];
    const takeLeft = !r || (!!l && compareKey(l, r, direction, lexical) <= 0);
    const chosen = takeLeft ? left[i++] : right[j++];
    trace.push({
      left: l?.id ?? "—",
      right: r?.id ?? "—",
      chosen: chosen.id,
      tie: !!l && !!r && l.key === r.key,
    });
    out.push(chosen);
  }
  return { out, trace };
}
function mergeRun(dataset: Dataset, direction: Direction, fault: boolean) {
  const input = SORT_DATA[dataset].map((key, i) => ({ id: "ABCD"[i], key }));
  const first = mergeRows(
    input.slice(0, 1),
    input.slice(1, 2),
    direction,
    fault,
  ).out;
  const second = mergeRows(
    input.slice(2, 3),
    input.slice(3, 4),
    direction,
    fault,
  ).out;
  const merged = mergeRows(first, second, direction, fault);
  const numeric = [...input].sort((a, b) => compareKey(a, b, direction, false));
  return {
    input,
    pairs: [...first, ...second],
    ...merged,
    numeric,
    mismatch: merged.out.some((r, i) => r.id !== numeric[i].id),
  };
}
const SNAPSHOT = {
  "2022": [
    { region: "北", population: 100, events: 20 },
    { region: "南", population: 900, events: 90 },
  ],
  "2023": [
    { region: "北", population: 200, events: 60 },
    { region: "南", population: 800, events: 80 },
  ],
} as const;
type Year = keyof typeof SNAPSHOT;
type Scope = "all" | "north" | "south";
function aggregateSnapshot(year: Year, scope: Scope, fault: boolean) {
  const rows = SNAPSHOT[year].filter(
    (r) => scope === "all" || r.region === (scope === "north" ? "北" : "南"),
  );
  const population = rows.reduce((s, r) => s + r.population, 0);
  const events = rows.reduce((s, r) => s + r.events, 0);
  const actual = events / population;
  const equalRegion =
    rows.reduce((s, r) => s + r.events / r.population, 0) / rows.length;
  const reported = fault ? equalRegion : actual;
  const tiles = rows.flatMap((r) =>
    Array.from({ length: r.population / 10 }, (_, i) => ({
      region: r.region,
      event: i < r.events / 10,
    })),
  );
  return {
    rows,
    population,
    events,
    actual,
    equalRegion,
    reported,
    tiles,
    mismatch: Math.abs(reported - actual) > 1e-12,
  };
}
const LABELS = {
  rational: ["原式与限制", "分解分子", "约去因子", "代值检查"],
  merge: [
    "输入身份",
    "二元归并",
    "输出第1项",
    "输出第2项",
    "输出第3项",
    "输出第4项",
  ],
  snapshot: ["冻结年与地区", "标出事件人数", "合并总体分母", "计算与对照"],
};
const STEPS = Object.fromEntries(
  Object.entries(LABELS).map(([k, labels]) => [
    k,
    labels.map((label) => ({ label })),
  ]),
);
function useDomainTimeline(kind: keyof typeof LABELS) {
  const t = useTeachingTimeline({
    steps: STEPS[kind],
    build: (tl) => {
      const clock = { value: 0 };
      LABELS[kind].forEach((label, i) => tl.label(label, i * 800));
      tl.add(
        clock,
        { value: 1, duration: (LABELS[kind].length - 1) * 800, ease: "linear" },
        0,
      );
    },
  });
  const { reducedMotion, pause } = t;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return t;
}
function rewind(t: TeachingTimeline) {
  t.pause();
  t.seek(0);
}
function Lab({
  id,
  kind,
  title,
  children,
}: {
  id: string;
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={id}
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-bg p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11"
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Choice({
  name,
  label,
  value,
  options,
  change,
}: {
  name: string;
  label: string;
  value: string;
  options: readonly (readonly [string, string])[];
  change: (value: string) => void;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}
      <select
        data-param={name}
        data-control={name}
        aria-label={label}
        value={value}
        onChange={(e) => change(e.target.value)}
        className={`${control} mt-1 block w-full`}
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function Fault({
  name,
  active,
  change,
  children,
}: {
  name: string;
  active: boolean;
  change: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={name}
      aria-pressed={active}
      onClick={change}
      className={`${control} my-3 w-full whitespace-normal text-left`}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}
function Transport({ t, reset }: { t: TeachingTimeline; reset: () => void }) {
  return (
    <div
      data-control="transport"
      data-timeline={t.currentStep}
      data-progress={t.progress}
      data-playing={String(t.isPlaying)}
      data-reduced-motion={String(t.reducedMotion)}
    >
      <TimelineControls timeline={t} />
      <button
        type="button"
        data-reset="full"
        aria-label="完全重置实验"
        className={`${control} mt-3 w-full`}
        onClick={reset}
      >
        完全重置实验
      </button>
    </div>
  );
}
function Picture({
  title,
  height,
  children,
}: {
  title: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 300 ${height}`}
      role="img"
      aria-label={title}
      className="mx-auto mt-3 block h-auto w-full max-w-[520px]"
      style={{ color: C.text }}
    >
      <title>{title}</title>
      <g fontSize={13} fill={C.text}>
        {children}
      </g>
    </svg>
  );
}

export function TcgWa03MoreExamplesContextContractLab() {
  const [a, setA] = useState(2);
  const [divisor, setDivisor] = useState(1);
  const [probe, setProbe] = useState<Probe>("hole");
  const [fault, setFault] = useState(false);
  const t = useDomainTimeline("rational");
  const r = rationalRun(a, divisor, probe, fault);
  const stage = t.currentStep;
  const px = (x: number) => geo(34 + (x + 1) * 38);
  const py = (y: number) => geo(340 - y * 17);
  const holeY = (2 * a) / divisor;
  const yLine = `${px(-1)},${py((-1 + a) / divisor)} ${px(5)},${py((5 + a) / divisor)}`;
  const reset = () => {
    rewind(t);
    setA(2);
    setDivisor(1);
    setProbe("hole");
    setFault(false);
  };
  return (
    <Lab
      id="rational-hole"
      kind="rational-factor-cancellation-hole"
      title="实验一：约分没有填上定义域的洞"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Choice
          name="root"
          label="被排除根 a"
          value={String(a)}
          options={[
            ["1", "a = 1"],
            ["2", "a = 2"],
            ["3", "a = 3"],
          ]}
          change={(v) => {
            rewind(t);
            setA(Number(v));
          }}
        />
        <Choice
          name="divisor"
          label="分母倍数 d"
          value={String(divisor)}
          options={[
            ["1", "d = 1"],
            ["2", "d = 2"],
          ]}
          change={(v) => {
            rewind(t);
            setDivisor(Number(v));
          }}
        />
        <Choice
          name="probe"
          label="代入位置"
          value={probe}
          options={[
            ["hole", "x = a（洞）"],
            ["next", "x = a + 1"],
            ["zero", "x = 0"],
          ]}
          change={(v) => {
            rewind(t);
            setProbe(v as Probe);
          }}
        />
      </div>
      <Fault
        name="drop-domain"
        active={fault}
        change={() => {
          rewind(t);
          setFault(!fault);
        }}
      >
        丢弃 x ≠ a
      </Fault>
      <Picture
        height={400}
        title="有理式因式约分及函数排除点；空心圆表示原式不能取值"
      >
        <text x={150} y={20} textAnchor="middle">
          {stage === 0
            ? `(x² − ${a * a}) / [${divisor}(x − ${a})]`
            : `[(x − ${a})(x + ${a})] / [${divisor}(x − ${a})]`}
        </text>
        <text
          x={150}
          y={43}
          textAnchor="middle"
          fill={fault ? C.danger : C.muted}
        >
          {fault ? "错误：不再限制 x" : `定义域限制：x ≠ ${a}`}
        </text>
        <rect
          x={28}
          y={61}
          width={104}
          height={35}
          rx={5}
          fill="none"
          stroke={stage >= 2 ? C.muted : C.accent}
        />
        <text x={80} y={84} textAnchor="middle">{`(x − ${a})`}</text>
        <rect
          x={165}
          y={61}
          width={104}
          height={35}
          rx={5}
          fill="none"
          stroke={C.accent}
        />
        <text x={217} y={84} textAnchor="middle">{`(x + ${a})`}</text>
        <line x1={26} y1={107} x2={272} y2={107} stroke={C.text} />
        <text x={80} y={132} textAnchor="middle">{`(x − ${a})`}</text>
        <text x={217} y={132} textAnchor="middle">
          {divisor}
        </text>
        {stage >= 2 && (
          <>
            <line
              x1={40}
              y1={70}
              x2={121}
              y2={89}
              stroke={C.accent}
              strokeWidth={2}
            />
            <line
              x1={40}
              y1={120}
              x2={121}
              y2={137}
              stroke={C.accent}
              strokeWidth={2}
            />
            <text
              x={150}
              y={160}
              textAnchor="middle"
            >{`约分后 (x + ${a}) / ${divisor}`}</text>
          </>
        )}
        <text x={15} y={186} fill={C.muted}>
          y
        </text>
        <line x1={34} y1={199} x2={34} y2={349} stroke={C.border} />
        <line x1={28} y1={340} x2={278} y2={340} stroke={C.border} />
        {[0, 2, 4, 6, 8].map((y) => (
          <text key={y} x={25} y={py(y) + 4} textAnchor="end" fill={C.muted}>
            {y}
          </text>
        ))}
        <polyline
          points={yLine}
          fill="none"
          stroke={C.accent}
          strokeWidth={2}
        />
        {[0, 1, 2, 3, 4, 5].map((x) => (
          <text key={x} x={px(x)} y={363} textAnchor="middle" fill={C.muted}>
            {x}
          </text>
        ))}
        <circle
          data-mark="excluded-point"
          cx={px(a)}
          cy={py(holeY)}
          r={7}
          fill={fault ? C.danger : C.bg}
          stroke={fault ? C.danger : C.accent}
          strokeWidth={2}
        />
        {stage === 3 && (
          <>
            <line
              x1={px(r.x)}
              y1={340}
              x2={px(r.x)}
              y2={py(r.extension)}
              stroke={C.muted}
              strokeDasharray="4 3"
            />
            <circle
              cx={px(r.x)}
              cy={py(r.extension)}
              r={11}
              fill="none"
              stroke={r.mismatch ? C.danger : C.text}
            />
          </>
        )}
        <text
          x={150}
          y={389}
          textAnchor="middle"
        >{`x = ${r.x}；${stage < 3 ? "推进到代值检查" : `原式 ${r.actualExact}`}`}</text>
      </Picture>
      <output
        data-readout="rational"
        data-x={r.x}
        data-actual={r.actual === null ? "undefined" : r.actual}
        data-reported={r.reported === null ? "undefined" : r.reported}
        data-mismatch={String(r.mismatch)}
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        x={r.x}，分子={r.numerator}，分母={r.denominator}；原式={r.actualExact}
        ；报告={r.reportedExact}。
        {r.mismatch
          ? "原式0/0，填成实心点是改变函数。"
          : "空心洞保留原限制；其余位置两式相等。"}
      </output>
      <p className="mt-2 text-sm text-secondary">
        本站自造有理式，非原文图片；曲线表示原函数在允许位置的值，洞的位置始终由a决定。读数是当前参数的最终oracle，时间线分解计算。
      </p>
      <Transport t={t} reset={reset} />
    </Lab>
  );
}

export function TcgWa03MoreExamplesComputeTraceLab() {
  const [dataset, setDataset] = useState<Dataset>("tens");
  const [direction, setDirection] = useState<Direction>("asc");
  const [fault, setFault] = useState(false);
  const t = useDomainTimeline("merge");
  const r = mergeRun(dataset, direction, fault);
  const emitted = Math.max(0, t.currentStep - 1);
  const prefix = r.out.slice(0, emitted);
  const reset = () => {
    rewind(t);
    setDataset("tens");
    setDirection("asc");
    setFault(false);
  };
  const x = (i: number) => 42 + 72 * i;
  const pairsVisible = t.currentStep >= 1;
  const ids = (rows: SortRow[]) => rows.map((v) => v.id).join("");
  const comparison = emitted > 0 ? r.trace[emitted - 1] : null;
  return (
    <Lab
      id="numeric-merge"
      kind="stable-numeric-merge-rank-braid"
      title="实验二：数值键驱动稳定归并"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          name="dataset"
          label="四项数值输入"
          value={dataset}
          options={[
            ["tens", "A10 B2 C2 D30"],
            ["ties", "A3 B12 C3 D1"],
          ]}
          change={(v) => {
            rewind(t);
            setDataset(v as Dataset);
          }}
        />
        <Choice
          name="direction"
          label="排序方向"
          value={direction}
          options={[
            ["asc", "从小到大"],
            ["desc", "从大到小"],
          ]}
          change={(v) => {
            rewind(t);
            setDirection(v as Direction);
          }}
        />
      </div>
      <Fault
        name="lexical-key"
        active={fault}
        change={() => {
          rewind(t);
          setFault(!fault);
        }}
      >
        把数值键改为十进制字符串
      </Fault>
      <Picture
        height={400}
        title="带身份项目从输入到二元归并再到输出的位置编织；曲线记录真实排名移动"
      >
        <text x={150} y={18} textAnchor="middle">
          身份A/B/C/D不随数值改变
        </text>
        {r.input.map((row, i) => (
          <g key={row.id}>
            <circle cx={x(i)} cy={56} r={24} fill={C.bg} stroke={C.accent} />
            <text x={x(i)} y={52} textAnchor="middle">
              {row.id}
            </text>
            <text x={x(i)} y={69} textAnchor="middle">
              {row.key}
            </text>
          </g>
        ))}
        {pairsVisible &&
          r.pairs.map((row, i) => {
            const source = r.input.findIndex((a) => a.id === row.id);
            const target = prefix.findIndex((a) => a.id === row.id);
            return (
              <g key={row.id}>
                <path
                  d={`M ${x(source)} 82 C ${x(source)} 114 ${x(i)} 114 ${x(i)} 145`}
                  fill="none"
                  stroke={C.muted}
                  strokeWidth={1.5}
                />
                <circle
                  cx={x(i)}
                  cy={171}
                  r={24}
                  fill={C.bg}
                  stroke={C.accent}
                />
                <text x={x(i)} y={167} textAnchor="middle">
                  {row.id}
                </text>
                <text x={x(i)} y={184} textAnchor="middle">
                  {row.key}
                </text>
                {target >= 0 && (
                  <path
                    d={`M ${x(i)} 198 C ${x(i)} 230 ${x(target)} 235 ${x(target)} 265`}
                    fill="none"
                    stroke={fault ? C.danger : C.accent}
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
        {!pairsVisible && (
          <text x={150} y={176} textAnchor="middle" fill={C.muted}>
            下一步：分别归并 AB 与 CD
          </text>
        )}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle
              cx={x(i)}
              cy={292}
              r={24}
              fill={C.bg}
              stroke={prefix[i] ? (fault ? C.danger : C.accent) : C.border}
            />
            <text x={x(i)} y={288} textAnchor="middle">
              {prefix[i]?.id ?? "·"}
            </text>
            <text x={x(i)} y={305} textAnchor="middle">
              {prefix[i]?.key ?? "—"}
            </text>
            <text x={x(i)} y={335} textAnchor="middle" fill={C.muted}>
              {i + 1}
            </text>
          </g>
        ))}
        <text x={150} y={361} textAnchor="middle">
          {comparison
            ? `左${comparison.left} / 右${comparison.right} → 取${comparison.chosen}${comparison.tie ? "（同键取左）" : ""}`
            : "同键取左，保留先来的身份"}
        </text>
        <text
          x={150}
          y={387}
          textAnchor="middle"
          fill={fault && r.mismatch ? C.danger : C.muted}
        >
          {fault ? '字符串："10" < "2"' : "数值：2 < 10；字面长度不参与"}
        </text>
      </Picture>
      <output
        data-readout="merge"
        data-order={ids(r.out)}
        data-numeric-order={ids(r.numeric)}
        data-prefix={ids(prefix)}
        data-mismatch={String(r.mismatch)}
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        已输出：{ids(prefix) || "空"}；最终排序：
        {r.out.map((v) => `${v.id}:${v.key}`).join(" → ")}；数值参照：
        {ids(r.numeric)}。
      </output>
      <p className="mt-2 text-sm text-secondary">
        本站自造四项输入，无原文名单。第二层保持左右两个已排好子列；第三层每步只输出两端较小/较大者。同键无论升降都先取左。
      </p>
      <Transport t={t} reset={reset} />
    </Lab>
  );
}

export function TcgWa03MoreExamplesEvidenceGateLab() {
  const [year, setYear] = useState<Year>("2022");
  const [scope, setScope] = useState<Scope>("all");
  const [fault, setFault] = useState(false);
  const t = useDomainTimeline("snapshot");
  const r = aggregateSnapshot(year, scope, fault);
  const reset = () => {
    rewind(t);
    setYear("2022");
    setScope("all");
    setFault(false);
  };
  const axisX = (rate: number) => geo(25 + (250 * rate) / 0.4);
  return (
    <Lab
      id="snapshot-denominator"
      kind="snapshot-population-denominator-mosaic"
      title="实验三：分母跟随固定快照与地区"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          name="year"
          label="自造快照年份"
          value={year}
          options={[
            ["2022", "快照2022（自造）"],
            ["2023", "快照2023（自造）"],
          ]}
          change={(v) => {
            rewind(t);
            setYear(v as Year);
          }}
        />
        <Choice
          name="scope"
          label="纳入地区"
          value={scope}
          options={[
            ["all", "北与南合计"],
            ["north", "只取北"],
            ["south", "只取南"],
          ]}
          change={(v) => {
            rewind(t);
            setScope(v as Scope);
          }}
        />
      </div>
      <Fault
        name="equal-region-denominator"
        active={fault}
        change={() => {
          rewind(t);
          setFault(!fault);
        }}
      >
        把地区比例等权平均当作人数占比
      </Fault>
      <Picture
        height={455}
        title="自造人口快照每格十人；填色为事件人数，分区线显示地区人口差异，轴对照真实与报告占比"
      >
        <text x={150} y={20} textAnchor="middle">
          {year} 固定快照 · 每格10人
        </text>
        <text x={150} y={44} textAnchor="middle">
          {r.rows
            .map((v) => `${v.region} ${v.events}/${v.population}`)
            .join("；")}
        </text>
        {r.tiles.map((tile, i) => (
          <rect
            key={i}
            data-tile-region={tile.region}
            data-tile-event={String(tile.event)}
            x={40 + (i % 10) * 22}
            y={62 + Math.floor(i / 10) * 21}
            width={19}
            height={18}
            rx={2}
            fill={t.currentStep >= 1 && tile.event ? C.accent : C.bg}
            stroke={C.border}
          />
        ))}
        {scope === "all" && (
          <>
            <line
              x1={34}
              x2={264}
              y1={geo(62 + (r.rows[0].population / 100) * 21 - 2)}
              y2={geo(62 + (r.rows[0].population / 100) * 21 - 2)}
              stroke={C.text}
            />
            <text x={18} y={77}>
              北
            </text>
            <text x={18} y={geo(77 + (r.rows[0].population / 100) * 21)}>
              南
            </text>
          </>
        )}
        <path
          d="M 40 278 V 287 H 257 V 278"
          stroke={t.currentStep >= 2 ? C.accent : C.border}
          fill="none"
          strokeWidth={2}
        />
        <text x={150} y={310} textAnchor="middle">
          分子 {r.events}人 / 分母 {r.population}人
        </text>
        <line x1={25} x2={275} y1={365} y2={365} stroke={C.border} />
        {[0, 0.1, 0.2, 0.3, 0.4].map((v) => (
          <g key={v}>
            <line
              x1={axisX(v)}
              x2={axisX(v)}
              y1={360}
              y2={370}
              stroke={C.muted}
            />
            <text x={axisX(v)} y={390} textAnchor="middle" fill={C.muted}>
              {percent(v)}
            </text>
          </g>
        ))}
        {t.currentStep >= 3 && (
          <>
            <line
              x1={axisX(r.actual)}
              x2={axisX(r.reported)}
              y1={343}
              y2={343}
              stroke={fault ? C.danger : C.accent}
              strokeWidth={3}
            />
            <circle
              data-mark="actual-rate"
              cx={axisX(r.actual)}
              cy={343}
              r={7}
              fill={C.bg}
              stroke={C.accent}
              strokeWidth={2}
            />
            <path
              data-mark="reported-rate"
              d={`M ${axisX(r.reported)} 333 l 6 10 l -6 10 l -6 -10 Z`}
              fill={fault ? C.danger : C.accent}
            />
            <text x={150} y={420} textAnchor="middle">
              ○真实 {percent(r.actual)}；◇报告 {percent(r.reported)}
            </text>
          </>
        )}
        <text x={150} y={446} textAnchor="middle" fill={C.muted}>
          填色是人数，不是模型表现评分
        </text>
      </Picture>
      <output
        data-readout="snapshot"
        data-events={r.events}
        data-population={r.population}
        data-actual={r.actual}
        data-reported={r.reported}
        data-mismatch={String(r.mismatch)}
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        事件人数{r.events}，总体人数{r.population}；真实占比{percent(r.actual)}
        ；报告占比{percent(r.reported)}。
        {r.mismatch
          ? "错误给每个地区相同票数，忽略人口。"
          : "分子与分母属于同一年、同一地区集合。"}
      </output>
      <p className="mt-2 text-sm text-secondary">
        所有数字均为本站虚构教学快照，与Turkey、真实人口或疾病无关。人数占比的分母不能换成地区数；只取单地区时，此故障可能被掩盖。
      </p>
      <Transport t={t} reset={reset} />
    </Lab>
  );
}
