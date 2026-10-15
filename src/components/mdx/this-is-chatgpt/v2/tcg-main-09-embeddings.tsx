"use client";

import { useId, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  line: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent [&_.mt-4.flex]:flex-wrap";
const selectClass =
  "mt-1 w-full rounded border border-border bg-bg px-2 py-2 text-sm text-primary";
const countSteps = ["前两条文档", "全部六条文档", "读取行并投影"].map(
  (label) => ({ label }),
);
const angleSteps = ["读取向量", "沿查询方向投影", "计算分数与近邻"].map(
  (label) => ({ label }),
);
const offsetSteps = ["构造偏移", "搬运偏移", "比较完整与投影距离"].map(
  (label) => ({ label }),
);
function useEmbeddingTrace(steps: readonly TeachingStep[]) {
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
function Choice({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}
      <select
        className={selectClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
function Fault({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={active ? "on" : "off"}
      aria-pressed={active}
      onClick={onClick}
      className="mt-3 w-full rounded border border-border px-2 py-2 text-sm"
    >
      {active ? "恢复规则：" : "注入故障："}
      {children}
    </button>
  );
}
function Drawing({
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
      style={{ fontSize: 14, overflow: "visible" }}
      fill={C.text}
    >
      {children}
    </svg>
  );
}
function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
      </marker>
    </defs>
  );
}
const documents = [
  "猫 追 球",
  "猫 睡 垫",
  "狗 追 球",
  "狗 追 车",
  "鸟 飞 天",
  "鸟 睡 枝",
].map((d) => d.split(" "));
const targets = ["猫", "狗", "鸟"];
const contexts = ["追", "睡", "球"];
function countContexts(
  radius: number,
  fault: boolean,
  docCount: number,
): number[][] {
  const docs = documents.slice(0, docCount);
  const streams = fault ? [docs.flat()] : docs;
  const counts = targets.map(() => contexts.map(() => 0));
  for (const tokens of streams)
    tokens.forEach((token, i) => {
      const row = targets.indexOf(token);
      if (row < 0) return;
      tokens.forEach((context, j) => {
        const col = contexts.indexOf(context);
        if (col >= 0 && i !== j && Math.abs(i - j) <= radius)
          counts[row][col] += 1;
      });
    });
  return counts;
}
function projectRow(row: number[], fold: boolean): number[] {
  return [row[0], row[1] + (fold ? row[2] : 0)];
}
function display(n: number) {
  return Number(n.toFixed(4)).toString();
}

export function TcgMain09EmbeddingsContextContractLab() {
  const [radius, setRadius] = useState("2");
  const [selected, setSelected] = useState("猫");
  const [projection, setProjection] = useState("first-two");
  const [fault, setFault] = useState(false);
  const trace = useEmbeddingTrace(countSteps);
  const id = useId();
  const docCount = trace.currentStep === 0 ? 2 : 6;
  const counts = countContexts(Number(radius), fault, docCount);
  const row = counts[targets.indexOf(selected)];
  const point = projectRow(row, projection === "fold-third");
  const reset = () => {
    trace.seek(0);
    setRadius("2");
    setSelected("猫");
    setProjection("first-two");
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-visual-kind="document-window-cooccurrence-row-map"
      aria-label="文档共现与行向量实验"
    >
      <h3 className="text-base font-semibold">实验一 · 文档边界决定向量行</h3>
      <p className="mt-2 text-sm text-secondary">
        合成语料按空格分词；只统计三行目标、三列上下文，不是转移概率。
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Choice label="窗口半径 r" value={radius} onChange={setRadius}>
          <option value="1">1：仅相邻</option>
          <option value="2">2：相距两格内</option>
        </Choice>
        <Choice label="读取目标行" value={selected} onChange={setSelected}>
          {targets.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Choice>
        <Choice
          label="公开指定的投影"
          value={projection}
          onChange={setProjection}
        >
          <option value="first-two">P(a,b,c)=(a,b)</option>
          <option value="fold-third">P(a,b,c)=(a,b+c)</option>
        </Choice>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        跨文档合并窗口
      </Fault>
      <Drawing
        height={535}
        label={`处理${docCount}条文档，${selected}行${row.join(",")}，投影${point.join(",")}`}
      >
        <Arrow id={id} />
        <text x="8" y="20">
          已计 {docCount} / 6 条文档 · r={radius}
        </text>
        <text x="8" y="45" fill={fault ? C.danger : C.muted}>
          {fault ? "边界被删：邻接计数已改变" : "各文档独立计数，不跨界"}
        </text>
        {contexts.map((c, j) => (
          <text key={c} x={102 + j * 62} y="80" textAnchor="middle">
            {c}
          </text>
        ))}
        {counts.map((values, i) => (
          <g key={targets[i]}>
            <text x="30" y={119 + i * 48}>
              {targets[i]}
            </text>
            {values.map((v, j) => (
              <g key={j}>
                <rect
                  x={73 + j * 62}
                  y={90 + i * 48}
                  width="58"
                  height="42"
                  rx="4"
                  fill={selected === targets[i] ? C.panel : C.bg}
                  stroke={selected === targets[i] ? C.accent : C.line}
                  strokeWidth={selected === targets[i] ? 2 : 1}
                />
                <text x={102 + j * 62} y={117 + i * 48} textAnchor="middle">
                  {v}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="8" y="258">
          {selected} = ({row.join(", ")})
        </text>
        <text x="8" y="283">
          P(v) = ({point.join(", ")})
        </text>
        <path d="M 40 470 H 254 M 40 470 V 321" stroke={C.muted} fill="none" />
        {[0, 1, 2, 3, 4].map((n) => (
          <g key={n}>
            <text x={40 + n * 48} y="492" textAnchor="middle">
              {n}
            </text>
            <text x="26" y={475 - n * 34} textAnchor="end">
              {n}
            </text>
          </g>
        ))}
        <text x="221" y="516">
          追计数
        </text>
        <text x="42" y="316">
          {projection === "fold-third" ? "睡 + 球" : "睡计数"}
        </text>
        {trace.currentStep === 2 ? (
          <g>
            <line
              x1="40"
              y1="470"
              x2={40 + point[0] * 48}
              y2={470 - point[1] * 34}
              stroke={fault ? C.danger : C.accent}
              strokeWidth="3"
              markerEnd={`url(#${id})`}
            />
            <circle
              cx={40 + point[0] * 48}
              cy={470 - point[1] * 34}
              r="5"
              fill={fault ? C.danger : C.accent}
            />
            <text x="65" y="349">
              所选行的二维坐标
            </text>
          </g>
        ) : (
          <text x="63" y="378" fill={C.muted}>
            第3步显示投影箭头
          </text>
        )}
      </Drawing>
      <p className="mt-2 text-sm" aria-live="polite">
        当前矩阵 {JSON.stringify(counts)}；行 ({row.join(", ")}) → (
        {point.join(", ")})。
      </p>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

type Vector = number[];
function dot(a: Vector, b: Vector): number {
  return a.reduce((sum, x, i) => sum + x * b[i], 0);
}
function norm(v: Vector): number {
  return Math.sqrt(dot(v, v));
}
function unit(v: Vector): Vector {
  const length = norm(v);
  if (length === 0) throw new Error("零向量没有余弦方向");
  return v.map((x) => x / length);
}
function neighborScores(
  query: Vector,
  scale: number,
  metric: string,
  fault: boolean,
) {
  const candidates = [
    { name: "U", vector: [1, 1] },
    { name: "V", vector: [scale, 0] },
    { name: "W", vector: [0, 1] },
  ];
  return candidates
    .map((item) => ({
      ...item,
      score:
        metric === "dot"
          ? dot(query, item.vector)
          : dot(unit(query), fault ? item.vector : unit(item.vector)),
    }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}
export function TcgMain09EmbeddingsComputeTraceLab() {
  const [queryName, setQueryName] = useState("axis");
  const [scale, setScale] = useState("0.4");
  const [metric, setMetric] = useState("cos");
  const [fault, setFault] = useState(false);
  const trace = useEmbeddingTrace(angleSteps);
  const id = useId();
  const query = queryName === "axis" ? [1, 0] : [1, 1];
  const qhat = unit(query);
  const scores = neighborScores(query, Number(scale), metric, fault);
  const normalized = metric === "cos" && !fault;
  const x = (v: number) => 95 + v * 65;
  const y = (v: number) => 220 - v * 65;
  const reset = () => {
    trace.seek(0);
    setQueryName("axis");
    setScale("0.4");
    setMetric("cos");
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-visual-kind="dot-cosine-norm-neighbor-switch"
      aria-label="点积与余弦近邻实验"
    >
      <h3 className="text-base font-semibold">
        实验二 · 同一候选，换一种相似规则
      </h3>
      <p className="mt-2 text-sm text-secondary">
        U=(1,1)，V=(s,0)，W=(0,1)。虚线垂足表示沿查询单位方向的投影。
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Choice label="查询向量 q" value={queryName} onChange={setQueryName}>
          <option value="axis">(1, 0)</option>
          <option value="diagonal">(1, 1)</option>
        </Choice>
        <Choice label="V的长度 s" value={scale} onChange={setScale}>
          <option value="0.4">0.4</option>
          <option value="2">2</option>
        </Choice>
        <Choice label="相似规则" value={metric} onChange={setMetric}>
          <option value="cos">余弦：双边归一化</option>
          <option value="dot">点积：保留模长</option>
        </Choice>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        余弦漏除候选模长
      </Fault>
      <Drawing
        height={365}
        label={`${metric}分数：${scores.map((s) => `${s.name}=${display(s.score)}`).join("，")}`}
      >
        <Arrow id={id} />
        <text x="8" y="20">
          {normalized ? "单位方向：端点在圆上" : "原始候选：端点保留长度"}
        </text>
        <text
          x="8"
          y="45"
          fill={fault && metric === "cos" ? C.danger : C.muted}
        >
          {fault && metric === "dot"
            ? "点积未用归一化：故障无作用"
            : fault
              ? "误算 q̂·v，可超出 [-1,1]"
              : "同一候选集合，仅改变度量"}
        </text>
        <circle
          cx={x(0)}
          cy={y(0)}
          r="65"
          fill="none"
          stroke={C.line}
          strokeDasharray="4 4"
        />
        <path d="M 18 220 H 255 M 95 290 V 105" stroke={C.line} fill="none" />
        <line
          x1={x(0)}
          y1={y(0)}
          x2={x(qhat[0] * 2.15)}
          y2={y(qhat[1] * 2.15)}
          stroke={C.muted}
          strokeWidth="2"
          markerEnd={`url(#${id})`}
        />
        <text x="204" y="281">
          q̂方向
        </text>
        <text x="85" y="243">
          0
        </text>
        <text x="158" y="275">
          1
        </text>
        {scores.map((item) => {
          const v = normalized ? unit(item.vector) : item.vector;
          const foot = dot(qhat, v);
          const fx = foot * qhat[0],
            fy = foot * qhat[1];
          const labelOffset =
            item.name === "V"
              ? [8, 24]
              : item.name === "W"
                ? [-25, -10]
                : [8, -13];
          return (
            <g key={item.name}>
              <line
                x1={x(0)}
                y1={y(0)}
                x2={x(v[0])}
                y2={y(v[1])}
                stroke={item.name === "V" ? C.accent : C.text}
                strokeWidth={item.name === "V" ? 3 : 2}
                markerEnd={`url(#${id})`}
              />
              <text x={x(v[0]) + labelOffset[0]} y={y(v[1]) + labelOffset[1]}>
                {item.name}
              </text>
              {trace.currentStep >= 1 && (
                <g>
                  <line
                    x1={x(v[0])}
                    y1={y(v[1])}
                    x2={x(fx)}
                    y2={y(fy)}
                    stroke={C.muted}
                    strokeDasharray="3 3"
                  />
                  <circle cx={x(fx)} cy={y(fy)} r="3" fill={C.accent} />
                </g>
              )}
            </g>
          );
        })}
        <text x="8" y="314">
          {normalized
            ? "单位圆半径=1；长度被消去"
            : "虚线圆半径=1；不是坐标边界"}
        </text>
        <text x="8" y="342">
          {trace.currentStep === 2
            ? `近邻：${scores[0].name}（并列按名称）`
            : "第3步读取分数排序"}
        </text>
      </Drawing>
      <p className="mt-2 text-sm" aria-live="polite">
        {scores.map((s) => `${s.name}: ${display(s.score)}`).join("；")}。排序{" "}
        {scores.map((s) => s.name).join(" > ")}（同分按名称；显示值四舍五入）。
      </p>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
function analogyDistances(multiplier: number, depth: number, fault: boolean) {
  const target = [multiplier, 1, multiplier];
  const candidates = [
    { name: "D", vector: [1.2, 1, 1] },
    { name: "E", vector: [1, 1, depth] },
    { name: "F", vector: [1.6, 1, 1] },
  ];
  const dimensions = fault ? 2 : 3;
  return {
    target,
    scores: candidates
      .map((c) => ({
        ...c,
        distance: c.vector
          .slice(0, dimensions)
          .reduce((sum, v, i) => sum + (v - target[i]) ** 2, 0),
      }))
      .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name)),
  };
}
export function TcgMain09EmbeddingsEvidenceGateLab() {
  const [multiplier, setMultiplier] = useState("1");
  const [depth, setDepth] = useState("4");
  const [fault, setFault] = useState(false);
  const trace = useEmbeddingTrace(offsetSteps);
  const id = useId();
  const result = analogyDistances(Number(multiplier), Number(depth), fault);
  const x = (v: number) => 36 + v * 88;
  const y = (v: number) => 239 - v * 105;
  const best = result.scores[0];
  const reset = () => {
    trace.seek(0);
    setMultiplier("1");
    setDepth("4");
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-visual-kind="analogy-offset-hidden-coordinate-counterexample"
      aria-label="偏移与第三维丢失反例实验"
    >
      <h3 className="text-base font-semibold">
        实验三 · 搬运偏移不等于保留距离
      </h3>
      <p className="mt-2 text-sm text-secondary">
        合成符号 A=(0,0,0)，B=(1,0,1)，C=(0,1,0)。不是实测词向量或词义类比结论。
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Choice label="偏移倍数 t" value={multiplier} onChange={setMultiplier}>
          <option value="1">1</option>
          <option value="2">2</option>
        </Choice>
        <Choice label="E的第三坐标 z" value={depth} onChange={setDepth}>
          <option value="4">4</option>
          <option value="1.4">1.4</option>
        </Choice>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        仅用二维投影选近邻
      </Fault>
      <Drawing
        height={570}
        label={`目标T=(${result.target.join(",")})，${fault ? "二维" : "三维"}距离最近${best.name}`}
      >
        <Arrow id={id} />
        <text x="8" y="20">
          上图仅画 Pxy；下尺保留 z
        </text>
        <text x="8" y="45">
          T = C + {multiplier}(B−A)
        </text>
        <path d="M 36 255 V 105 M 25 239 H 254" stroke={C.line} fill="none" />
        <line
          x1={x(0)}
          y1={y(0)}
          x2={x(1)}
          y2={y(0)}
          stroke={C.accent}
          strokeWidth="3"
          markerEnd={`url(#${id})`}
        />
        <text x="25" y="261">
          A
        </text>
        <text x="119" y="261">
          B
        </text>
        <text x="20" y="124">
          C
        </text>
        <text x="67" y="287">
          Pxy(B−A)=(1,0)
        </text>
        <line
          x1={x(0)}
          y1={y(0)}
          x2={x(0)}
          y2={y(1)}
          stroke={C.muted}
          strokeDasharray="4 4"
        />
        {trace.currentStep >= 1 && (
          <g>
            <line
              x1={x(0)}
              y1={y(1)}
              x2={x(Number(multiplier))}
              y2={y(1)}
              stroke={C.accent}
              strokeWidth="3"
              markerEnd={`url(#${id})`}
            />
            <line
              x1={x(Number(multiplier))}
              y1={y(0)}
              x2={x(Number(multiplier))}
              y2={y(1)}
              stroke={C.muted}
              strokeDasharray="4 4"
            />
            <circle
              cx={x(Number(multiplier))}
              cy={y(1)}
              r="7"
              fill="none"
              stroke={C.accent}
              strokeWidth="2"
            />
            <text x={x(Number(multiplier))} y="110" textAnchor="middle">
              T
            </text>
            {multiplier === "2" && (
              <line
                x1={x(1)}
                y1={y(0)}
                x2={x(2)}
                y2={y(0)}
                stroke={C.accent}
                strokeDasharray="4 4"
              />
            )}
          </g>
        )}
        {trace.currentStep === 2 && (
          <g>
            <line
              x1={x(Number(multiplier))}
              y1={y(1)}
              x2={x(best.vector[0])}
              y2={y(1)}
              stroke={fault ? C.danger : C.accent}
              strokeWidth="5"
              opacity="0.5"
            />
            {result.scores.map((c) => (
              <g key={c.name}>
                <path
                  d={`M ${x(c.vector[0]) - 4} ${y(1) - 4} l 8 8 m -8 0 l 8 -8`}
                  stroke={C.text}
                  strokeWidth="2"
                />
                <text
                  x={x(c.vector[0])}
                  y={c.name === "D" ? 176 : c.name === "E" ? 204 : 176}
                  textAnchor="middle"
                >
                  {c.name}
                </text>
                <line
                  x1={x(c.vector[0])}
                  y1="143"
                  x2={x(c.vector[0])}
                  y2={c.name === "E" ? 188 : 160}
                  stroke={C.line}
                />
              </g>
            ))}
            <text x="8" y="315">
              E与T在 t=1 时投影重合
            </text>
          </g>
        )}
        <text x="8" y="347" fill={fault ? C.danger : C.text}>
          {fault ? "z尺仍可见，但已被错误忽略" : "z参与完整三维距离计算"}
        </text>
        <path d="M 65 380 H 250" stroke={C.line} />
        {[0, 1, 2, 3, 4].map((n) => (
          <text key={n} x={65 + n * 43} y="373" textAnchor="middle">
            {n}
          </text>
        ))}
        {[
          { name: "T", z: result.target[2] },
          ...result.scores
            .map((c) => ({ name: c.name, z: c.vector[2] }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        ].map((c, i) => (
          <g key={c.name}>
            <text x="26" y={409 + i * 37}>
              {c.name}
            </text>
            <line
              x1="65"
              y1={404 + i * 37}
              x2="250"
              y2={404 + i * 37}
              stroke={C.line}
            />
            <circle
              cx={65 + c.z * 43}
              cy={404 + i * 37}
              r="5"
              fill={c.name === "T" ? C.accent : C.text}
            />
            <text x={65 + c.z * 43} y={425 + i * 37} textAnchor="middle">
              {display(c.z)}
            </text>
          </g>
        ))}
        <text x="8" y="560">
          {trace.currentStep === 2
            ? `按${fault ? "xy" : "xyz"}选：${best.name}`
            : "第3步显示候选与近邻连线"}
        </text>
      </Drawing>
      <p className="mt-2 text-sm" aria-live="polite">
        T=({result.target.join(", ")})；平方距离{" "}
        {result.scores
          .map((s) => `${s.name}=${display(s.distance)}`)
          .join("；")}
        。
        {fault
          ? "丢弃维度可能换近邻，并非必然换。"
          : "候选仅D/E/F；A/B/C不参与自匹配。"}
      </p>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
