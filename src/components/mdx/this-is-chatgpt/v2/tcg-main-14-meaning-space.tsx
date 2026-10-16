"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--color-accent)";
const border = "var(--color-border)";
const paper = "var(--bg)";
const danger = "var(--danger)";
const control =
  "min-h-11 min-w-11 max-w-full rounded border border-border bg-bg px-2 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const projectionSteps = ["投影点", "圈近邻", "匹配排名", "独立审计"].map(
  (label) => ({ label }),
);
const transitionSteps = [
  "初始质量",
  "第一轮分流",
  "第二轮汇流",
  "期望不是路径",
].map((label) => ({ label }));
const orderSteps = ["同一起点", "第一操作", "第二操作", "端点检验"].map(
  (label) => ({ label }),
);

// Quantize drawing output only. Never feed serialized coordinates into the model.
function svg(n: number) {
  if (!Number.isFinite(n)) throw new Error("Non-finite SVG geometry");
  return n.toFixed(9);
}
function shown(n: number) {
  return n.toFixed(3);
}
function useFrames(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add(
        clock,
        { value: steps.length, duration: steps.length * 1200, ease: "linear" },
        0,
      );
    },
  });
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
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_.mt-4.flex]:flex-wrap [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent"
    >
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
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
  change: (v: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm text-secondary">
      {label}
      <select
        data-param={name}
        aria-label={label}
        className={control}
        value={value}
        onChange={(e) => change(e.target.value)}
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
  id,
  active,
  click,
  children,
}: {
  id: string;
  active: boolean;
  click: () => void;
  children: ReactNode;
}) {
  return (
    <button
      data-fault={id}
      type="button"
      aria-pressed={active}
      className={`${control} mt-3 w-full whitespace-normal text-left`}
      onClick={click}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}
function Controls({
  id,
  t,
  reset,
}: {
  id: string;
  t: TeachingTimeline;
  reset: () => void;
}) {
  return (
    <div data-controls={id}>
      <TimelineControls timeline={t} />
      <button
        data-reset={id}
        type="button"
        className={`${control} mt-3 w-full`}
        onClick={reset}
      >
        完整重置
      </button>
    </div>
  );
}
function Readout({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div
      data-readout={id}
      aria-live="polite"
      className="mt-3 space-y-2 text-sm leading-relaxed wrap-break-word"
    >
      {children}
    </div>
  );
}

type Point = readonly [number, number, number];
const points = { A: [1, 0, 3], B: [2, 0, 0], C: [0, 3, 0] } as const;
type PointId = keyof typeof points;
function distance(p: Point) {
  return Math.sqrt(p.reduce((s, v) => s + v * v, 0));
}
function project(p: Point, plane: string) {
  return [p[0], p[plane === "xy" ? 1 : 2]] as const;
}
function neighborhood(plane: string, k: number) {
  const ids = Object.keys(points) as PointId[];
  const original = [...ids].sort(
    (a, b) => distance(points[a]) - distance(points[b]),
  );
  const projected = [...ids].sort((a, b) => {
    const norm = (id: PointId) => Math.hypot(...project(points[id], plane));
    return norm(a) - norm(b);
  });
  const overlap = original
    .slice(0, k)
    .filter((id) => projected.slice(0, k).includes(id)).length;
  return { original, projected, recall: overlap / k };
}
export function TcgMain14MeaningSpaceContextContractLab() {
  const [plane, setPlane] = useState("xy");
  const [k, setK] = useState(1);
  const [fault, setFault] = useState(false);
  const t = useFrames(projectionSteps),
    stage = t.currentStep;
  const change = (fn: () => void) => {
    rewind(t);
    fn();
  };
  const reset = () =>
    change(() => {
      setPlane("xy");
      setK(1);
      setFault(false);
    });
  const result = neighborhood(plane, k);
  const radius =
    Math.hypot(...project(points[result.projected[k - 1]], plane)) * 30;
  const px = (x: number) => 120 + x * 30,
    py = (y: number) => 170 - y * 30;
  return (
    <Lab
      id="projection-neighbors"
      kind="projection-neighborhood-diagnostic"
      title="实验一 · 平面上的邻居，原空间的邻居"
    >
      <div className="grid grid-cols-2 gap-3">
        <Choice
          name="projection-plane"
          label="投影保留轴"
          value={plane}
          options={[
            ["xy", "x / y"],
            ["xz", "x / z"],
          ]}
          change={(v) => change(() => setPlane(v))}
        />
        <Choice
          name="neighbor-count"
          label="近邻数 k"
          value={String(k)}
          options={[
            ["1", "1"],
            ["2", "2"],
          ]}
          change={(v) => change(() => setK(Number(v)))}
        />
      </div>
      <Fault
        id="projection-self-audit"
        active={fault}
        click={() => change(() => setFault(!fault))}
      >
        用投影集合自验，冒充原空间审计
      </Fault>
      <svg
        viewBox="0 0 330 525"
        role="img"
        aria-label="上方二维投影散点及近邻圈，下方原空间与投影近邻的排名匹配；交叉线揭示邻居改变"
        className="mt-3 block w-full"
        style={{ fontSize: 16 }}
      >
        <text x="12" y="24" fill={ink}>
          同一组三维点 → {plane}平面
        </text>
        <path d="M120,45 V170 H260" stroke={muted} fill="none" />
        <text x="268" y="176" fill={muted}>
          x
        </text>
        <text x="100" y="47" fill={muted}>
          {plane === "xy" ? "y" : "z"}
        </text>
        {stage >= 1 && (
          <circle
            cx="120"
            cy="170"
            r={svg(radius)}
            fill="none"
            stroke={fault ? danger : accent}
            strokeDasharray="5 4"
          />
        )}
        <circle
          cx="120"
          cy="170"
          r="7"
          fill={paper}
          stroke={ink}
          strokeWidth="2"
        />
        <text x="95" y="194" fill={ink}>
          O
        </text>
        {(Object.keys(points) as PointId[]).map((id) => {
          const p = project(points[id], plane),
            selected = result.projected.slice(0, k).includes(id);
          return (
            <g key={id}>
              <circle
                cx={svg(px(p[0]))}
                cy={svg(py(p[1]))}
                r={svg(selected ? 5 : 3)}
                fill={stage >= 1 && selected ? accent : muted}
              />
              <text
                x={svg(px(p[0]) + 12)}
                y={svg(py(p[1]) + (id === "B" ? 22 : -10))}
                fill={ink}
              >
                {id}
              </text>
            </g>
          );
        })}
        <text x="16" y="292" fill={ink}>
          原空间距离
        </text>
        <text x="192" y="292" fill={ink}>
          投影距离
        </text>
        {result.original.map((id, i) => {
          const j = result.projected.indexOf(id),
            y = 326 + i * 48;
          return (
            <g key={id}>
              {stage >= 2 && (
                <line
                  x1="119"
                  y1={svg(y - 5)}
                  x2="195"
                  y2={svg(321 + j * 48)}
                  stroke={i < k && j < k ? accent : border}
                  strokeWidth={svg(i < k ? 3 : 1)}
                />
              )}
              <text x="16" y={svg(y)} fill={i < k ? accent : muted}>
                {id} {shown(distance(points[id]))}
              </text>
            </g>
          );
        })}
        {result.projected.map((id, i) => (
          <text
            key={id}
            x="200"
            y={svg(326 + i * 48)}
            fill={i < k ? accent : muted}
          >
            {id} {shown(Math.hypot(...project(points[id], plane)))}
          </text>
        ))}
        {fault &&
          stage >= 3 &&
          result.projected.slice(0, k).map((id, i) => {
            const y = 321 + i * 48;
            return (
              <path
                key={id}
                d={`M282,${svg(y - 10)} C310,${svg(y - 10)} 310,${svg(y + 10)} 282,${svg(y + 10)}`}
                fill="none"
                stroke={danger}
                strokeWidth="3"
              />
            );
          })}
        <path d="M14,446 H314" stroke={border} />
        <text x="16" y="477" fill={fault ? danger : ink}>
          {stage >= 3
            ? `报告召回 ${shown(fault ? 1 : result.recall)}`
            : "推进到独立审计"}
        </text>
        <text x="16" y="507" fill={muted}>
          核对值 {shown(result.recall)}；无语义真值
        </text>
      </svg>
      <Readout id="projection-oracle">
        <p>
          原排序 {result.original.join("→")}；投影排序{" "}
          {result.projected.join("→")}。真实近邻召回 = {shown(result.recall)}；
          {fault ? "错误自验报告" : "正确报告"} ={" "}
          {shown(fault ? 1 : result.recall)}。
        </p>
        <p>
          三维坐标：A=(1,0,3)，B=(2,0,0)，C=(0,3,0)，查询
          O=(0,0,0)。圈只表示投影距离；图中k近邻不含O。
        </p>
        <p>
          遗漏轴会改变排名。故障时右列红色回环表示与自身比对；跨列连线保留真实对应。这个召回只核对自定义几何，不判定词义是否相近。
        </p>
      </Readout>
      <Controls id="projection-neighbors" t={t} reset={reset} />
    </Lab>
  );
}

function flow(context: string, r: number, fault = false) {
  const p = fault ? 0.5 : context === "orchard" ? 0.8 : 0.2;
  const terminal = p * r + (1 - p) * (1 - r);
  return {
    p,
    r,
    rows: [
      [1, 0, 0, 0, 0],
      [0, p, 1 - p, 0, 0],
      [0, 0, 0, terminal, 1 - terminal],
    ],
    terminal,
    meanY: 2 * terminal - 1,
  };
}
const stateXY = [
  [38, 162],
  [156, 75],
  [156, 249],
  [288, 75],
  [288, 249],
] as const;
const stateNames = ["U", "F", "D", "R", "S"] as const;
export function TcgMain14MeaningSpaceComputeTraceLab() {
  const [context, setContext] = useState("orchard");
  const [retention, setRetention] = useState(0.75);
  const [fault, setFault] = useState(false);
  const t = useFrames(transitionSteps),
    stage = t.currentStep;
  const change = (fn: () => void) => {
    rewind(t);
    fn();
  };
  const reset = () =>
    change(() => {
      setContext("orchard");
      setRetention(0.75);
      setFault(false);
    });
  const f = flow(context, retention, fault),
    reference = flow(context, retention);
  const row = f.rows[Math.min(stage, 2)];
  const edges = [
    [0, 1, f.p],
    [0, 2, 1 - f.p],
    [1, 3, f.p * f.r],
    [1, 4, f.p * (1 - f.r)],
    [2, 3, (1 - f.p) * (1 - f.r)],
    [2, 4, (1 - f.p) * f.r],
  ];
  const pxy = (x: number, y: number) =>
    `${svg(42 + x * 120)},${svg(542 - y * 42)}`;
  return (
    <Lab
      id="context-flow"
      kind="context-conditioned-transition-trajectory"
      title="实验二 · 同一个U，两种上下文的分流"
    >
      <div className="grid grid-cols-2 gap-3">
        <Choice
          name="semantic-context"
          label="上下文"
          value={context}
          options={[
            ["orchard", "果园"],
            ["repair", "维修"],
          ]}
          change={(v) => change(() => setContext(v))}
        />
        <Choice
          name="branch-retention"
          label="同侧概率 r"
          value={String(retention)}
          options={[
            ["0.75", "0.75"],
            ["1", "1"],
          ]}
          change={(v) => change(() => setRetention(Number(v)))}
        />
      </div>
      <Fault
        id="erase-context"
        active={fault}
        click={() => change(() => setFault(!fault))}
      >
        抹去上下文，把首轮概率改为一半
      </Fault>
      <svg
        viewBox="0 0 330 630"
        role="img"
        aria-label="五态概率流量图，下方为各轮质量带和期望位置；分支线宽为1加18倍到达质量，虚线不是单次路径"
        className="mt-3 block w-full"
        style={{ fontSize: 16 }}
      >
        <text x="12" y="24" fill={ink}>
          箭头方向：U → F/D → R/S
        </text>
        {edges.map(([a, b, m], i) => {
          const [x1, y1] = stateXY[a],
            [x2, y2] = stateXY[b],
            active = stage >= (a === 0 ? 1 : 2);
          const ex = x2 - 15,
            ey = y2;
          const length = Math.hypot(ex - (x1 + 12), ey - y1);
          const ux = (ex - (x1 + 12)) / length,
            uy = (ey - y1) / length;
          const arrow = [
            [ex, ey],
            [ex - 9 * ux + 4 * uy, ey - 9 * uy - 4 * ux],
            [ex - 9 * ux - 4 * uy, ey - 9 * uy + 4 * ux],
          ];
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={svg(x1 + 12)}
                y1={svg(y1)}
                x2={svg(x2 - 15)}
                y2={svg(y2)}
                stroke={fault ? danger : accent}
                strokeWidth={svg(active ? 1 + 18 * m : 1)}
                opacity={active && m > 0 ? 0.65 : 0.15}
                strokeDasharray={m === 0 ? "3 3" : undefined}
              />
              <polygon
                points={arrow.map(([x, y]) => `${svg(x)},${svg(y)}`).join(" ")}
                fill={fault ? danger : accent}
                opacity={active && m > 0 ? 0.8 : 0.15}
              />
              {active && (
                <text
                  x={svg(a === 0 ? 72 : 206)}
                  y={svg([111, 215, 59, 142, 189, 280][i])}
                  fill={ink}
                >
                  {shown(m)}
                </text>
              )}
            </g>
          );
        })}
        {stateXY.map(([x, y], i) => (
          <g key={stateNames[i]}>
            <circle
              cx={svg(x)}
              cy={svg(y)}
              r="15"
              fill={row[i] > 0 ? accent : paper}
              stroke={border}
              strokeWidth="2"
            />
            <text
              x={svg(x)}
              y={svg(y + 5)}
              textAnchor="middle"
              fill={row[i] > 0 ? paper : ink}
            >
              {stateNames[i]}
            </text>
          </g>
        ))}
        <text x="12" y="316" fill={muted}>
          线宽=1+18×质量；淡虚线=零质量
        </text>
        {f.rows.map((masses, tick) => {
          let offset = 0;
          return (
            <g key={tick}>
              <text x={svg(29 + tick * 111)} y="350" fill={ink}>
                t={tick}
              </text>
              {masses.map((mass, i) => {
                const y = 370 + offset * 82;
                offset += mass;
                return (
                  mass > 0 && (
                    <g key={stateNames[i]}>
                      <rect
                        x={svg(16 + tick * 111)}
                        y={svg(y)}
                        width="72"
                        height={svg(mass * 82)}
                        fill={i % 2 ? accent : muted}
                        opacity={stage >= tick ? 0.7 : 0.18}
                      />
                      {mass >= 0.19 && (
                        <text
                          x={svg(23 + tick * 111)}
                          y={svg(y + mass * 41 + 5)}
                          fill={paper}
                        >
                          {stateNames[i]} {mass.toFixed(2)}
                        </text>
                      )}
                    </g>
                  )
                );
              })}
            </g>
          );
        })}
        <text x="12" y="485" fill={ink}>
          下图：分支终点与期望位置
        </text>
        <path d="M42,497 V588 H298" fill="none" stroke={border} />
        <polyline
          points={`${pxy(0, 0)} ${pxy(1, 1)} ${pxy(2, 1)}`}
          stroke={muted}
          fill="none"
          opacity=".45"
        />
        <polyline
          points={`${pxy(0, 0)} ${pxy(1, -1)} ${pxy(2, -1)}`}
          stroke={muted}
          fill="none"
          opacity=".45"
        />
        {f.r < 1 &&
          [1, -1].map((side) => (
            <polyline
              key={side}
              points={`${pxy(0, 0)} ${pxy(1, side)} ${pxy(2, -side)}`}
              stroke={muted}
              fill="none"
              opacity=".25"
            />
          ))}
        {stage >= 3 && (
          <>
            <polyline
              points={`${pxy(0, 0)} ${pxy(1, 2 * f.p - 1)} ${pxy(2, f.meanY)}`}
              stroke={fault ? danger : accent}
              strokeWidth="3"
              strokeDasharray="6 4"
              fill="none"
            />
            <circle
              cx="282"
              cy={svg(542 - f.meanY * 42)}
              r="5"
              fill={fault ? danger : accent}
            />
          </>
        )}
        <text x="12" y="616" fill={muted}>
          期望终点 y={shown(f.meanY)}，不等于抽中一支
        </text>
      </svg>
      <Readout id="context-oracle">
        <p>
          首轮 p(F|U,c)={shown(f.p)}；第二轮 R={shown(f.terminal)}，S=
          {shown(1 - f.terminal)}；质量和=
          {shown(f.rows[2].reduce((s, v) => s + v, 0))}。当前帧 t=
          {Math.min(stage, 2)}：
          {stateNames.map((n, i) => `${n}:${shown(row[i])}`).join(" / ")}。
        </p>
        <p>
          保留上下文的独立参考 R={shown(reference.terminal)}；故障终点差=
          {shown(Math.abs(f.terminal - reference.terminal))}
          。R/S为吸收态（再一步质量不变），未在图上重复自环。
        </p>
        <p>
          U是含“苹果”的未消歧位置；F/D、R/S仅是人工定义的果园/设备分支标签。概率表不是模型输出；期望虚线不是词串，也不是连续受力运动。
        </p>
      </Readout>
      <Controls id="context-flow" t={t} reset={reset} />
    </Lab>
  );
}

type XY = readonly [number, number];
function shift([x, y]: XY): XY {
  return [x + 1, y];
}
function shear([x, y]: XY, s: number): XY {
  return [x, y + s * x];
}
function orderPaths(x: number, s: number) {
  const start: XY = [x, 0],
    a = shift(start),
    b = shear(start, s);
  const ab = shear(a, s),
    ba = shift(b);
  return { start, a, b, ab, ba, gap: Math.hypot(ab[0] - ba[0], ab[1] - ba[1]) };
}
export function TcgMain14MeaningSpaceEvidenceGateLab() {
  const [startX, setStartX] = useState(0);
  const [strength, setStrength] = useState(1);
  const [fault, setFault] = useState(false);
  const t = useFrames(orderSteps),
    stage = t.currentStep;
  const change = (fn: () => void) => {
    rewind(t);
    fn();
  };
  const reset = () =>
    change(() => {
      setStartX(0);
      setStrength(1);
      setFault(false);
    });
  const o = orderPaths(startX, strength),
    observedBA = fault ? o.ab : o.ba;
  const reportedGap = Math.hypot(
    o.ab[0] - observedBA[0],
    o.ab[1] - observedBA[1],
  );
  const px = (x: number) => 48 + x * 94,
    py = (y: number) => 406 - y * 72;
  const point = (p: XY) => `${svg(px(p[0]))},${svg(py(p[1]))}`;
  const upper = [
    o.start,
    ...(stage >= 1 ? [o.a] : []),
    ...(stage >= 2 ? [o.ab] : []),
  ];
  const lower = [
    o.start,
    ...(stage >= 1 ? [o.b] : []),
    ...(stage >= 2 ? [observedBA] : []),
  ];
  return (
    <Lab
      id="order-falsification"
      kind="order-branch-falsification-square"
      title="实验三 · 先后交换，终点还一样吗？"
    >
      <div className="grid grid-cols-2 gap-3">
        <Choice
          name="order-start-x"
          label="起点 x₀"
          value={String(startX)}
          options={[
            ["0", "0"],
            ["1", "1"],
          ]}
          change={(v) => change(() => setStartX(Number(v)))}
        />
        <Choice
          name="shear-strength"
          label="操作B强度 s"
          value={String(strength)}
          options={[
            ["1", "1"],
            ["2", "2"],
          ]}
          change={(v) => change(() => setStrength(Number(v)))}
        />
      </div>
      <Fault
        id="copy-order-endpoint"
        active={fault}
        click={() => change(() => setFault(!fault))}
      >
        把BA终点抄成AB，再检查是否相等
      </Fault>
      <svg
        viewBox="0 0 330 510"
        role="img"
        aria-label="两种操作次序的路径与交换方格；实线先A后B，虚线先B后A，端点竖向差反驳顺序无关假说"
        className="mt-3 block w-full"
        style={{ fontSize: 16 }}
      >
        <text x="12" y="24" fill={ink}>
          A：向右1；B：y增加s·x
        </text>
        <text x="12" y="52" fill={muted}>
          实线 A→B；虚线 B→A
        </text>
        <path d="M48,102 V406 H294" stroke={border} fill="none" />
        {[0, 1, 2, 3, 4].map((y) => (
          <g key={y}>
            <line
              x1="44"
              x2="294"
              y1={svg(py(y))}
              y2={svg(py(y))}
              stroke={border}
              strokeDasharray="2 5"
            />
            <text x="18" y={svg(py(y) + 5)} fill={muted}>
              {y}
            </text>
          </g>
        ))}
        <polyline
          points={upper.map(point).join(" ")}
          stroke={accent}
          strokeWidth="5"
          fill="none"
        />
        <polyline
          points={lower.map(point).join(" ")}
          stroke={fault ? danger : muted}
          strokeWidth="3"
          strokeDasharray="6 4"
          fill="none"
        />
        <circle
          cx={svg(px(o.start[0]))}
          cy={svg(py(o.start[1]))}
          r="6"
          fill={ink}
        />
        {stage >= 1 &&
          [o.a, o.b].map((p, i) => (
            <circle
              key={i}
              cx={svg(px(p[0]))}
              cy={svg(py(p[1]))}
              r={svg(i ? 4 : 5)}
              fill={i ? muted : accent}
            />
          ))}
        {stage >= 2 && (
          <>
            <circle
              cx={svg(px(o.ab[0]))}
              cy={svg(py(o.ab[1]))}
              r="7"
              fill={accent}
            />
            <circle
              cx={svg(px(observedBA[0]))}
              cy={svg(py(observedBA[1]))}
              r="10"
              fill="none"
              stroke={fault ? danger : muted}
              strokeWidth="2"
            />
            {fault && (
              <>
                <circle
                  cx={svg(px(o.ba[0]))}
                  cy={svg(py(o.ba[1]))}
                  r="8"
                  fill="none"
                  stroke={danger}
                  strokeDasharray="3 3"
                />
                <line
                  x1={svg(px(o.ba[0]))}
                  y1={svg(py(o.ba[1]))}
                  x2={svg(px(o.ab[0]))}
                  y2={svg(py(o.ab[1]))}
                  stroke={danger}
                  strokeDasharray="2 5"
                />
              </>
            )}
          </>
        )}
        {stage >= 3 && (
          <line
            x1={svg(px(o.ab[0]) + 19)}
            x2={svg(px(o.ab[0]) + 19)}
            y1={svg(py(o.ab[1]))}
            y2={svg(py(o.ba[1]))}
            stroke={danger}
            strokeWidth="4"
          />
        )}
        <text x="12" y="448" fill={ink}>
          AB=({o.ab.join(",")})；BA=({o.ba.join(",")})
        </text>
        <text x="12" y="478" fill={fault ? danger : ink}>
          报告差 {shown(reportedGap)}；独立差 {shown(o.gap)}
        </text>
        <text x="12" y="504" fill={muted}>
          反例只针对这两个定义的操作
        </text>
      </svg>
      <Readout id="order-oracle">
        <p>
          先A后B：({o.a.join(",")}) → ({o.ab.join(",")})；先B后A：(
          {o.b.join(",")}) → ({o.ba.join(",")})。真实端点差={shown(o.gap)}
          ，报告差={shown(reportedGap)}。
        </p>
        <p>
          待检验命题是“这两个操作在指定起点可交换，即差=0”。
          {fault ? "故障报告假通过；独立重算仍拒绝。" : "独立反例拒绝该命题。"}
          虚线空圈保留被覆盖的真实终点。
        </p>
        <p>
          这些操作没有来自任何语言模型。反驳顺序无关，不等于证明没有任何规则，也不证明语言空间弯曲或服从物理定律。
        </p>
      </Readout>
      <Controls id="order-falsification" t={t} reset={reset} />
    </Lab>
  );
}
