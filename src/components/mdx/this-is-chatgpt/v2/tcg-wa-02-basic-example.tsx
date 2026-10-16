"use client";

import { useState, type ReactNode } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  bg: "var(--bg)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_.mt-4.flex]:flex-wrap [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent";
const arcSteps = ["两个球面点", "夹角与弦", "最短球弧"].map((label) => ({
  label,
}));
const havSteps = ["角度输入", "半弦平方", "反算与误差"].map((label) => ({
  label,
}));
const answerSteps = ["半径假设", "单位换算", "舍入单元"].map((label) => ({
  label,
}));
function useDistanceTrace(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add(clock, { value: 3, duration: 3600, ease: "linear" }, 0);
    },
  });
}
// Canonicalize drawing coordinates only; never round domain arithmetic here.
function xy(n: number) {
  if (!Number.isFinite(n))
    throw new Error("Non-finite distance drawing coordinate");
  return Number(n.toFixed(9));
}
function fmt(n: number) {
  if (n !== 0 && Math.abs(n) < 0.00001) return n.toExponential(6);
  return Number(n.toFixed(6)).toString();
}
function Select({
  name,
  label,
  value,
  onChange,
  children,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}
      <select
        data-param={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border border-border bg-bg px-2 py-2 text-sm"
      >
        {children}
      </select>
    </label>
  );
}
function Svg({
  label,
  height,
  children,
}: {
  label: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 280 ${height}`}
      className="mx-auto mt-4 block h-auto w-full max-w-[280px]"
      fill={C.text}
      style={{ fontSize: 14 }}
    >
      {children}
    </svg>
  );
}
function Fault({
  name,
  active,
  onClick,
  children,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={name}
      data-active={active}
      aria-pressed={active}
      onClick={onClick}
      className="mt-3 w-full rounded border border-border px-2 py-2 text-sm"
    >
      {active ? "恢复计算：" : "注入故障："}
      {children}
    </button>
  );
}
function Controls({
  name,
  trace,
  reset,
}: {
  name: string;
  trace: TeachingTimeline;
  reset: () => void;
}) {
  return (
    <div
      data-controls={name}
      data-playing={trace.isPlaying}
      data-frame={trace.currentStep}
      data-progress={trace.progress}
    >
      <TimelineControls
        timeline={trace}
        caption="改参数或故障开关回首帧并暂停；重置恢复全部默认。"
      />
      <button
        type="button"
        data-reset={name}
        onClick={reset}
        className="mt-3 w-full rounded border border-border px-2 py-2 text-sm"
      >
        完整重置
      </button>
    </div>
  );
}

type Route = "chicago-tokyo" | "quarter" | "same";
const routes: Record<Route, readonly [number, number, number, number]> = {
  "chicago-tokyo": [41.8781, -87.6298, 35.6762, 139.6503],
  quarter: [0, 0, 0, 90],
  same: [41.8781, -87.6298, 41.8781, -87.6298],
};
function unitVector(lat: number, lon: number, degrees: boolean) {
  const scale = degrees ? Math.PI / 180 : 1;
  const p = lat * scale,
    l = lon * scale;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}
function centralAngle(a: number[], b: number[]) {
  const dot = a.reduce((sum, n, i) => sum + n * b[i], 0);
  const cross = Math.hypot(
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  );
  return Math.atan2(cross, dot);
}
function sphereCase(route: Route, radius: number, fault: boolean) {
  const [p, l, q, m] = routes[route];
  const angle = centralAngle(
    unitVector(p, l, !fault),
    unitVector(q, m, !fault),
  );
  const referenceAngle = centralAngle(
    unitVector(p, l, true),
    unitVector(q, m, true),
  );
  return {
    angle,
    referenceAngle,
    distance: radius * angle,
    referenceDistance: radius * referenceAngle,
    chord: 2 * radius * Math.sin(angle / 2),
  };
}
function sectionPoint(angle: number, radius: number) {
  return [
    xy(140 + radius * Math.cos(angle)),
    xy(180 + radius * Math.sin(angle)),
  ];
}
function sectionArc(c: number, r: number) {
  const a = sectionPoint(-Math.PI / 2 - c / 2, r),
    b = sectionPoint(-Math.PI / 2 + c / 2, r);
  return `M${a[0]},${a[1]} A${xy(r)},${xy(r)} 0 0 1 ${b[0]},${b[1]}`;
}

export function TcgWa02BasicExampleContextContractLab() {
  const [route, setRoute] = useState<Route>("chicago-tokyo");
  const [radius, setRadius] = useState("6371");
  const [fault, setFault] = useState(false);
  const trace = useDistanceTrace(arcSteps);
  const result = sphereCase(route, Number(radius), fault);
  const r = (95 * Number(radius)) / 6371;
  const a = sectionPoint(-Math.PI / 2 - result.angle / 2, r),
    b = sectionPoint(-Math.PI / 2 + result.angle / 2, r);
  const reset = () => {
    setRoute("chicago-tokyo");
    setRadius("6371");
    setFault(false);
    trace.seek(0);
  };
  return (
    <section
      className={shell}
      data-lab="great-circle-section"
      aria-label="球心截面与大圆距离实验"
    >
      <h3 className="text-base font-semibold">球弧不是穿球的弦</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Select
          name="route"
          label="本页定义的两端点"
          value={route}
          onChange={(v) => {
            setRoute(v as Route);
            trace.seek(0);
          }}
        >
          <option value="chicago-tokyo">Chicago → Tokyo（独立坐标）</option>
          <option value="quarter">赤道 0° → 90°</option>
          <option value="same">Chicago → 同一点</option>
        </Select>
        <Select
          name="sphere-radius"
          label="球半径 / km"
          value={radius}
          onChange={(v) => {
            setRadius(v);
            trace.seek(0);
          }}
        >
          <option value="6371">6371（本页球模型）</option>
          <option value="7000">7000（假想大球）</option>
        </Select>
      </div>
      <Svg
        height={410}
        label="大圆所在平面截面：端点A、B、中心角、直弦和球面短弧；这不是世界地图。"
      >
        <text x="140" y="23" textAnchor="middle">
          过球心的大圆平面截面
        </text>
        <circle
          cx="140"
          cy="180"
          r={xy(r)}
          fill="none"
          stroke={C.border}
          strokeWidth="2"
        />
        {fault && (
          <path
            d={sectionArc(result.referenceAngle, r)}
            fill="none"
            stroke={C.muted}
            strokeWidth="5"
            strokeDasharray="4 5"
          />
        )}
        {trace.currentStep >= 1 && (
          <g>
            <path
              d={`M${a[0]},${a[1]} L140,180 L${b[0]},${b[1]}`}
              fill="none"
              stroke={C.muted}
            />
            <path
              d={sectionArc(result.angle, 36)}
              fill="none"
              stroke={C.accent}
              strokeWidth="2"
            />
            <line
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke={C.muted}
              strokeDasharray="5 4"
            />
          </g>
        )}
        {trace.currentStep >= 2 && (
          <path
            d={sectionArc(result.angle, r)}
            fill="none"
            stroke={fault ? C.danger : C.accent}
            strokeWidth="5"
          />
        )}
        <circle cx={a[0]} cy={a[1]} r="5" fill={C.accent} />
        <circle cx={b[0]} cy={b[1]} r="5" fill={fault ? C.danger : C.accent} />
        <text x={a[0]} y={xy(a[1] - 12)} textAnchor="middle">
          A
        </text>
        <text x={b[0]} y={xy(b[1] + 24)} textAnchor="middle">
          B
        </text>
        <circle cx="140" cy="180" r="3" fill={C.muted} />
        <text x="140" y="205" textAnchor="middle">
          O
        </text>
        <text x="140" y="318" textAnchor="middle">
          c = {fmt(result.angle)} rad
        </text>
        <text x="140" y="345" textAnchor="middle">
          弧长 Rc = {fmt(result.distance)} km
        </text>
        <text x="140" y="373" textAnchor="middle" fill={C.muted}>
          {fault ? "虚线灰弧：正确弧度对照" : "虚线直线是弦，不是表面距离"}
        </text>
      </Svg>
      <p
        data-readout="great-circle-section"
        data-angle={result.angle}
        data-distance-km={result.distance}
        data-chord-km={result.chord}
        data-reference-km={result.referenceDistance}
        className="break-words text-sm"
      >
        计算距离 {fmt(result.distance)} km；直弦 {fmt(result.chord)}{" "}
        km；正确对照 {fmt(result.referenceDistance)} km。当前阶段：
        {arcSteps[trace.currentStep].label}。
      </p>
      <Fault
        name="degrees-as-radians"
        active={fault}
        onClick={() => {
          setFault(!fault);
          trace.seek(0);
        }}
      >
        把度数直接传给三角函数
      </Fault>
      <Controls name="great-circle-section" trace={trace} reset={reset} />
    </section>
  );
}

function haversineCase(angleDegrees: number, fault: boolean) {
  const theta = (angleDegrees * Math.PI) / 180;
  const rawA = Math.sin(theta / 2) ** 2;
  const a = Math.min(
    1,
    Math.max(0, fault ? Math.round(rawA * 1e6) / 1e6 : rawA),
  );
  const complement = 1 - a;
  const referenceComplement =
    angleDegrees === 180 ? 0 : Math.cos(theta / 2) ** 2;
  const angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(complement));
  const referenceAngle = Math.atan2(Math.abs(Math.sin(theta)), Math.cos(theta));
  return {
    theta,
    rawA,
    a,
    complement,
    referenceComplement,
    angle,
    referenceAngle,
    distance: 6371 * angle,
    referenceDistance: 6371 * referenceAngle,
    errorMetres: 6371000 * Math.abs(angle - referenceAngle),
  };
}
function complementX(b: number) {
  return b <= 0
    ? 255
    : xy(35 + (190 * Math.min(18, Math.max(0, -Math.log10(b)))) / 18);
}

export function TcgWa02BasicExampleComputeTraceLab() {
  const [separation, setSeparation] = useState("179.999");
  const [fault, setFault] = useState(false);
  const trace = useDistanceTrace(havSteps);
  const result = haversineCase(Number(separation), fault);
  const points = Array.from(
    { length: 91 },
    (_, i) =>
      `${xy(35 + (210 * i) / 90)},${xy(205 - 145 * Math.sin((i * Math.PI) / 180) ** 2)}`,
  ).join(" ");
  const x = xy(35 + (210 * Number(separation)) / 180),
    y = xy(205 - 145 * result.a);
  const reset = () => {
    setSeparation("179.999");
    setFault(false);
    trace.seek(0);
  };
  return (
    <section
      className={shell}
      data-lab="haversine-conditioning"
      aria-label="haversine反算与对跖精度实验"
    >
      <h3 className="text-base font-semibold">a 接近 1 时，余量去了哪里？</h3>
      <Select
        name="equatorial-separation"
        label="赤道两点经差 / 度"
        value={separation}
        onChange={(v) => {
          setSeparation(v);
          trace.seek(0);
        }}
      >
        <option value="0.000001">0.000001°（极近）</option>
        <option value="90">90°（四分之一圈）</option>
        <option value="179.999">179.999°（近对跖）</option>
        <option value="179.999999">179.999999°（更近对跖）</option>
        <option value="180">180°（对跖）</option>
      </Select>
      <Svg
        height={465}
        label="上图是中心角到半弦平方的非线性曲线；下图放大1减a的对数刻度，零单列在右侧。"
      >
        <text x="140" y="24" textAnchor="middle">
          a = sin²(θ / 2)，赤道特例
        </text>
        <path d="M35,52 V205 H250" fill="none" stroke={C.muted} />
        <polyline
          points={points}
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="10" y="65">
          1
        </text>
        <text x="10" y="207">
          0
        </text>
        <text x="35" y="232" textAnchor="middle">
          0°
        </text>
        <text x="140" y="232" textAnchor="middle">
          90°
        </text>
        <text x="245" y="232" textAnchor="middle">
          180°
        </text>
        <line
          x1={x}
          x2={x}
          y1="55"
          y2="205"
          stroke={C.muted}
          strokeDasharray="3 4"
        />
        {trace.currentStep >= 1 && (
          <g>
            <line
              x1="35"
              x2={x}
              y1={y}
              y2={y}
              stroke={C.muted}
              strokeDasharray="3 4"
            />
            <circle cx={x} cy={y} r="5" fill={fault ? C.danger : C.accent} />
          </g>
        )}
        <text x="140" y="280" textAnchor="middle">
          余量 b = 1 − a（对数放大）
        </text>
        <line x1="35" x2="225" y1="325" y2="325" stroke={C.muted} />
        {[0, 9, 18].map((e) => (
          <g key={e}>
            <line
              x1={xy(35 + (190 * e) / 18)}
              x2={xy(35 + (190 * e) / 18)}
              y1="320"
              y2="330"
              stroke={C.muted}
            />
            <text x={xy(35 + (190 * e) / 18)} y="355" textAnchor="middle">
              {e === 0 ? "1" : `1e−${e}`}
            </text>
          </g>
        ))}
        <text x="255" y="355" textAnchor="middle">
          0
        </text>
        {trace.currentStep >= 1 && (
          <g>
            <line
              x1={complementX(result.referenceComplement)}
              x2={complementX(result.complement)}
              y1="307"
              y2="307"
              stroke={fault ? C.danger : C.accent}
              strokeWidth="3"
            />
            <circle
              cx={complementX(result.referenceComplement)}
              cy="307"
              r="5"
              fill={C.bg}
              stroke={C.muted}
              strokeWidth="2"
            />
            <path
              d={`M${complementX(result.complement)},318 l-5,9 h10 z`}
              fill={fault ? C.danger : C.accent}
            />
          </g>
        )}
        <text x="140" y="386" textAnchor="middle" fill={C.muted}>
          空心：cos²(θ/2)；三角：1−a
        </text>
        {trace.currentStep >= 2 && (
          <text
            x="140"
            y="424"
            textAnchor="middle"
            fill={result.errorMetres > 0.01 ? C.danger : C.text}
          >
            距离误差 {fmt(result.errorMetres)} m
          </text>
        )}
        <text x="140" y="451" textAnchor="middle" fill={C.muted}>
          小于 1e−18 的正值靠右截示
        </text>
      </Svg>
      <p
        data-readout="haversine-conditioning"
        data-a={result.a}
        data-raw-a={result.rawA}
        data-complement={result.complement}
        data-angle={result.angle}
        data-error-metres={result.errorMetres}
        data-distance-km={result.distance}
        className="break-words text-sm"
      >
        a 原值 {result.rawA.toPrecision(17)} → 使用值 {result.a.toPrecision(17)}
        ；1−a = {result.complement.toExponential(6)}。反算{" "}
        {fmt(result.distance)} km；向量对照 {fmt(result.referenceDistance)}{" "}
        km；误差 {fmt(result.errorMetres)} m。夹紧只守定义域，不恢复精度。
      </p>
      <Fault
        name="round-half-chord"
        active={fault}
        onClick={() => {
          setFault(!fault);
          trace.seek(0);
        }}
      >
        先把 a 保留 6 位小数
      </Fault>
      <Controls name="haversine-conditioning" trace={trace} reset={reset} />
    </section>
  );
}

type DistanceUnit = "km" | "mi";
function answerCase(
  spread: number,
  unit: DistanceUnit,
  decimals: number,
  fault: boolean,
) {
  const angle = sphereCase("chicago-tokyo", 6371, false).angle;
  const kmLow = (6371 - spread) * angle,
    kmHigh = (6371 + spread) * angle;
  const factor = unit === "mi" ? 1.609344 : 1;
  const low = kmLow / factor,
    high = kmHigh / factor;
  const observedLow = fault ? kmLow : low,
    observedHigh = fault ? kmHigh : high;
  const quantum = 10 ** -decimals;
  const candidate =
    Math.floor((observedLow + observedHigh) / 2 / quantum + 0.5) * quantum;
  const cellLow = candidate - quantum / 2,
    cellHigh = candidate + quantum / 2;
  const outerLow = Math.floor(low / quantum) * quantum,
    outerHigh = Math.ceil(high / quantum) * quantum;
  return {
    angle,
    kmLow,
    kmHigh,
    low,
    high,
    observedLow,
    observedHigh,
    quantum,
    candidate,
    cellLow,
    cellHigh,
    outerLow,
    outerHigh,
    singleCell: low >= cellLow && high < cellHigh,
  };
}

export function TcgWa02BasicExampleEvidenceGateLab() {
  const [spread, setSpread] = useState("1");
  const [unit, setUnit] = useState<DistanceUnit>("km");
  const [decimals, setDecimals] = useState("0");
  const [fault, setFault] = useState(false);
  const trace = useDistanceTrace(answerSteps);
  const result = answerCase(Number(spread), unit, Number(decimals), fault);
  const isKmStage = trace.currentStep === 0;
  const lo = isKmStage ? result.kmLow : result.low,
    hi = isKmStage ? result.kmHigh : result.high;
  const center = (lo + hi) / 2,
    half = Math.max((hi - lo) * 0.8, result.quantum * 4);
  const domainLo = center - half,
    domainHi = center + half;
  const axis = (n: number) =>
    xy(
      Math.max(
        30,
        Math.min(250, 30 + ((n - domainLo) * 220) / (domainHi - domainLo)),
      ),
    );
  const offscale = result.cellLow > domainHi || result.cellHigh < domainLo;
  const ticks = Array.from(
    { length: 9 },
    (_, i) =>
      (Math.floor(center / result.quantum + 0.5) + i - 3.5) * result.quantum,
  );
  const reset = () => {
    setSpread("1");
    setUnit("km");
    setDecimals("0");
    setFault(false);
    trace.seek(0);
  };
  return (
    <section
      className={shell}
      data-lab="distance-answer-interval"
      aria-label="受约束距离答复的区间和舍入实验"
    >
      <h3 className="text-base font-semibold">
        一个数，还是一个有边界的回答？
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <Select
          name="radius-spread"
          label="半径假设 / km"
          value={spread}
          onChange={(v) => {
            setSpread(v);
            trace.seek(0);
          }}
        >
          <option value="0.01">6371 ± 0.01</option>
          <option value="1">6371 ± 1</option>
          <option value="10">6371 ± 10</option>
        </Select>
        <Select
          name="answer-unit"
          label="回答单位"
          value={unit}
          onChange={(v) => {
            setUnit(v as DistanceUnit);
            trace.seek(0);
          }}
        >
          <option value="km">km</option>
          <option value="mi">mi（1 mi = 1.609344 km）</option>
        </Select>
        <Select
          name="decimal-places"
          label="小数位（half-up）"
          value={decimals}
          onChange={(v) => {
            setDecimals(v);
            trace.seek(0);
          }}
        >
          <option value="0">0 位</option>
          <option value="1">1 位</option>
        </Select>
      </div>
      <Svg
        height={390}
        label="距离区间细尺，比较输入允许的距离带与候选数字的半开舍入单元；错误候选越界用箭头指示。"
      >
        <text x="140" y="24" textAnchor="middle">
          {isKmStage ? "d = cR：半径区间的像" : `正确距离带 / ${unit}`}
        </text>
        <text x="140" y="51" textAnchor="middle" fill={C.muted}>
          坐标范围随正确区间调整
        </text>
        <line x1="30" x2="250" y1="160" y2="160" stroke={C.muted} />
        <rect
          x={axis(lo)}
          y="111"
          width={xy(axis(hi) - axis(lo))}
          height="42"
          fill={C.accent}
          opacity="0.2"
        />
        <line
          x1={axis(lo)}
          x2={axis(hi)}
          y1="132"
          y2="132"
          stroke={C.accent}
          strokeWidth="5"
        />
        {[lo, hi].map((n, i) => (
          <g key={i}>
            <line
              x1={axis(n)}
              x2={axis(n)}
              y1="101"
              y2="168"
              stroke={C.accent}
            />
            <text x={axis(n)} y={i === 0 ? 84 : 195} textAnchor="middle">
              {n.toFixed(3)}
            </text>
          </g>
        ))}
        {trace.currentStep >= 2 && (
          <g>
            {ticks
              .filter((n) => n >= domainLo && n <= domainHi)
              .map((n, i) => (
                <line
                  key={i}
                  x1={axis(n)}
                  x2={axis(n)}
                  y1="207"
                  y2="252"
                  stroke={C.border}
                />
              ))}
            {!offscale ? (
              <rect
                x={axis(result.cellLow)}
                y="215"
                width={xy(axis(result.cellHigh) - axis(result.cellLow))}
                height="28"
                fill="none"
                stroke={fault ? C.danger : C.text}
                strokeWidth="2"
              />
            ) : (
              <path
                d="M220,229 H265 M254,220 L265,229 L254,238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
              />
            )}
            <text x="140" y="280" textAnchor="middle">
              候选 {result.candidate.toFixed(Number(decimals))} {unit}
              {offscale ? "（越界）" : ""}
            </text>
            <text
              x="140"
              y="308"
              textAnchor="middle"
              fill={result.singleCell ? C.text : C.danger}
            >
              {result.singleCell
                ? "整带落入同一舍入单元"
                : "整带不能都舍入成此数"}
            </text>
          </g>
        )}
        <text x="140" y="346" textAnchor="middle" fill={C.muted}>
          蓝带：允许值；空框：舍入单元
        </text>
        <text x="140" y="374" textAnchor="middle" fill={C.muted}>
          区间来自假设，不是置信区间
        </text>
      </Svg>
      <p
        data-readout="distance-answer-interval"
        data-low={result.low}
        data-high={result.high}
        data-outer-low={result.outerLow}
        data-outer-high={result.outerHigh}
        data-candidate={result.candidate}
        data-cell-low={result.cellLow}
        data-cell-high={result.cellHigh}
        data-single-cell={result.singleCell}
        className="break-words text-sm"
      >
        正确允许区间 [{fmt(result.low)}, {fmt(result.high)}] {unit}；向外包络 [
        {result.outerLow.toFixed(Number(decimals))},{" "}
        {result.outerHigh.toFixed(Number(decimals))}] {unit}。候选{" "}
        {result.candidate.toFixed(Number(decimals))} {unit} 的舍入单元为 [
        {fmt(result.cellLow)}, {fmt(result.cellHigh)}
        )。此包络不等于所有可能舍入标签的集合，也不表示真实航程。
      </p>
      <Fault
        name="relabel-without-conversion"
        active={fault}
        onClick={() => {
          setFault(!fault);
          trace.seek(0);
        }}
      >
        省略换算，直接贴回答单位
      </Fault>
      <Controls name="distance-answer-interval" trace={trace} reset={reset} />
    </section>
  );
}
