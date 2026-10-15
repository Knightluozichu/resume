"use client";

import { useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--color-accent)";
const border = "var(--color-border)";
const paper = "var(--bg)";
const danger = "var(--danger)";
const control =
  "min-h-11 min-w-11 max-w-full rounded border border-border bg-bg px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const splineSteps = ["第一段", "中间段", "最后一段", "误差探针"].map(
  (label) => ({ label }),
);
const sampleSteps = ["观测位置", "连线插值", "留出探针", "残差验收"].map(
  (label) => ({ label }),
);
const ruleSteps = ["初始行", "第一轮", "预算中途", "预算末端"].map((label) => ({
  label,
}));

// Independent finite constructions, NOT fitted models or product specifications.
function reluSpline(x: number, n: number, fault = false) {
  let y = x / n;
  if (!fault) for (let i = 1; i < n; i++) y += (2 / n) * Math.max(0, x - i / n);
  return y;
}
function sine(x: number, k: number) {
  return Math.sin(2 * Math.PI * k * x);
}
function interpolate(x: number, k: number, m: number) {
  const i = Math.min(m - 1, Math.max(0, Math.floor(x * m)));
  const q = x * m - i;
  return (1 - q) * sine(i / m, k) + q * sine((i + 1) / m, k);
}
function residuals(k: number, m: number, fault = false) {
  // The faulty diagnostic reuses observations; correct grid has 257 held-out/check points.
  const intervals = fault ? m : 256;
  return Array.from({ length: intervals + 1 }, (_, i) => {
    const x = i / intervals;
    return { x, error: Math.abs(sine(x, k) - interpolate(x, k, m)) };
  });
}
function evolve(seed: string, rounds: number) {
  let row = Array.from({ length: 31 }, (_, i) =>
    seed === "pair" ? Number(i === 14 || i === 16) : Number(i === 15),
  );
  const rows = [row];
  for (let t = 0; t < rounds; t++) {
    row = row.map(
      (c, i, a) => (110 >> (4 * (a[i - 1] ?? 0) + 2 * c + (a[i + 1] ?? 0))) & 1,
    );
    rows.push(row);
  }
  return rows;
}
function budgetResult(
  seed: string,
  target: number,
  budget: number,
  fault = false,
) {
  const executed = Math.min(target, budget);
  const rows = evolve(seed, executed);
  return {
    rows,
    executed,
    answer: executed === target || fault ? rows[executed][15] : null,
  };
}
function fixed(x: number) {
  return Math.abs(x) < 1e-10 ? "0.000000" : x.toFixed(6);
}
function useTrace(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const cursor = { value: 0 };
      steps.forEach((step, i) => tl.label(step.label, i * 1400));
      tl.add(
        cursor,
        { value: steps.length, duration: steps.length * 1400, ease: "linear" },
        0,
      );
    },
  });
}
function Lab({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_.mt-4.flex]:flex-wrap"
    >
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Select({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: number;
  options: number[];
  change: (n: number) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm text-secondary">
      {label}
      <select
        className={control}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
        aria-label={label}
      >
        {options.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  );
}
function Fault({
  active,
  text,
  click,
}: {
  active: boolean;
  text: string;
  click: () => void;
}) {
  return (
    <button
      type="button"
      data-fault
      aria-pressed={active}
      onClick={click}
      className={`${control} mt-3 w-full whitespace-normal py-2 text-left`}
    >
      {active ? "撤销故障：" : "注入故障："}
      {text}
    </button>
  );
}
function Note({ children }: { children: ReactNode }) {
  return (
    <div
      aria-live="polite"
      className="mt-3 min-w-0 space-y-2 text-sm leading-relaxed wrap-break-word"
    >
      {children}
    </div>
  );
}
// Serialize geometry at the SVG boundary, not at full libm precision: Node and
// Chromium may differ in the final sine bits. Keep numerical calculations intact.
function svgNumber(value: number) {
  return value.toFixed(9);
}
function curve(
  fn: (x: number) => number,
  xMax: number,
  px: (x: number) => number,
  py: (y: number) => number,
  count = 160,
) {
  return Array.from({ length: count + 1 }, (_, i) => {
    const x = (i / count) * xMax;
    return `${svgNumber(px(x))},${svgNumber(py(fn(x)))}`;
  }).join(" ");
}

export function TcgMain08UniversalNetworkContextContractLab() {
  const [segments, setSegments] = useState(4);
  const [probe, setProbe] = useState(0.5);
  const [fault, setFault] = useState(false);
  const timeline = useTrace(splineSteps);
  const rewind = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    rewind();
    setSegments(4);
    setProbe(0.5);
    setFault(false);
  };
  const stage = timeline.currentStep;
  const px = (x: number) => 42 + x * 212;
  const py = (y: number) => 258 - y * 126;
  const fn = (x: number) => reluSpline(x, segments, fault);
  const focus = Math.min(
    segments - 1,
    [0, Math.floor(segments / 2), segments - 1, Math.floor(probe * segments)][
      stage
    ],
  );
  const midpoint = (focus + 0.5) / segments;
  const x = stage === 3 ? probe : midpoint;
  return (
    <Lab
      kind="relu-spline-finite-interval-error"
      title="实验一 · 可表示，不等于已学会"
    >
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="区间段数 n"
          value={segments}
          options={[2, 4, 8]}
          change={(n) => {
            rewind();
            setSegments(n);
          }}
        />
        <Select
          label="检查位置 x"
          value={probe}
          options={[0.125, 0.5, 1.25]}
          change={(n) => {
            rewind();
            setProbe(n);
          }}
        />
      </div>
      <Fault
        active={fault}
        text="删除全部非线性铰链"
        click={() => {
          rewind();
          setFault(!fault);
        }}
      />
      <svg
        viewBox="0 0 330 305"
        role="img"
        aria-label="平方曲线、显式ReLU插值、区间外阴影及逐段误差探针"
        className="mt-3 w-full"
        style={{ fontSize: 16 }}
      >
        <rect
          x={svgNumber(px(1))}
          y="30"
          width={svgNumber(px(1.25) - px(1))}
          height="228"
          fill={border}
          opacity="0.3"
        />
        <path
          d={`M42,30 V258 H${svgNumber(px(1.25))}`}
          stroke={muted}
          fill="none"
        />
        <text x="8" y="46" fill={muted}>
          y
        </text>
        <text x="14" y={svgNumber(py(1) + 5)} fill={muted}>
          1
        </text>
        <text x="35" y="283" fill={muted}>
          0
        </text>
        <text x={svgNumber(px(1) - 4)} y="283" fill={muted}>
          1
        </text>
        <text x="278" y="283" fill={muted}>
          1.25
        </text>
        <polyline
          points={curve((v) => v * v, 1.25, px, py)}
          stroke={ink}
          strokeWidth="2"
          fill="none"
        />
        <polyline
          points={curve(fn, 1.25, px, py)}
          stroke={fault ? danger : accent}
          strokeWidth="2.5"
          fill="none"
        />
        {Array.from({ length: segments + 1 }, (_, i) => (
          <circle
            key={i}
            cx={svgNumber(px(i / segments))}
            cy={svgNumber(py(fn(i / segments)))}
            r={svgNumber(i <= focus + 1 ? 4 : 2)}
            fill={fault ? danger : accent}
          />
        ))}
        <line
          x1={svgNumber(px(x))}
          x2={svgNumber(px(x))}
          y1={svgNumber(py(x * x))}
          y2={svgNumber(py(fn(x)))}
          stroke={danger}
          strokeWidth="5"
        />
        <circle
          cx={svgNumber(px(x))}
          cy={svgNumber(py(x * x))}
          r="5"
          fill={paper}
          stroke={danger}
          strokeWidth="2"
        />
        <path
          d={`M${svgNumber(px(focus / segments))},294 H${svgNumber(px((focus + 1) / segments))}`}
          stroke={accent}
          strokeWidth="4"
        />
        <text x="45" y="22" fill={ink}>
          实线：目标；彩线：构造
        </text>
      </svg>
      <Note>
        <p>
          n={segments}，{segments - 1} 个铰链＋仿射直连。灰区 x&gt;1
          不在误差保证内。
        </p>
        <p>
          检查位置 x={probe}：目标 {fixed(probe ** 2)}；构造 {fixed(fn(probe))}
          ；误差 {fixed(Math.abs(fn(probe) - probe ** 2))}
          。到第4步移动图上探针。
        </p>
        <p>
          {fault
            ? `故障构造仅余 x/n，区间内最大误差 ${fixed(1 - 1 / segments)}。`
            : `完整构造在 [0,1] 的精确最大误差 = 1/(4n²) = ${fixed(1 / (4 * segments ** 2))}。`}
        </p>
        <p>
          播放切换被检查的区间/探针，不代表优化器训练。所有权重直接由公式指定。
        </p>
      </Note>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}

export function TcgMain08UniversalNetworkComputeTraceLab() {
  const [frequency, setFrequency] = useState(4);
  const [samples, setSamples] = useState(4);
  const [fault, setFault] = useState(false);
  const timeline = useTrace(sampleSteps);
  const rewind = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    rewind();
    setFrequency(4);
    setSamples(4);
    setFault(false);
  };
  const stage = timeline.currentStep;
  const px = (x: number) => 42 + x * 268;
  const py = (y: number) => 108 - y * 62;
  const checks = residuals(frequency, samples, fault);
  const worst = Math.max(...checks.map((p) => p.error));
  // Drawing-only tie-break: visually identical serialized pixel heights keep
  // the first marker. The numerical maximum above remains unrounded.
  const visualWorstPoint = checks.reduce((best, p) =>
    Number(svgNumber(292 - p.error * 64)) <
    Number(svgNumber(292 - best.error * 64))
      ? p
      : best,
  );
  const independent = Math.max(
    ...residuals(frequency, samples).map((d) => d.error),
  );
  // Exact displayed comb is a readable subset of the acceptance grid, not its max estimator.
  const comb = fault ? checks : checks.filter((_, i) => i % 4 === 0);
  return (
    <Lab
      kind="high-frequency-sample-alias-residual"
      title="实验二 · 看见的样本，没看见的波峰"
    >
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="目标频率 k"
          value={frequency}
          options={[1, 4, 8]}
          change={(n) => {
            rewind();
            setFrequency(n);
          }}
        />
        <Select
          label="采样间隔数 m"
          value={samples}
          options={[4, 8, 16]}
          change={(n) => {
            rewind();
            setSamples(n);
          }}
        />
      </div>
      <Fault
        active={fault}
        text="只在原采样点验收"
        click={() => {
          rewind();
          setFault(!fault);
        }}
      />
      <svg
        viewBox="0 0 330 330"
        role="img"
        aria-label="高频目标和采样插值波形，下方为验收位置的绝对残差梳齿"
        className="mt-3 w-full"
        style={{ fontSize: 16 }}
      >
        <text x="42" y="22" fill={ink}>
          目标波形 / 样本连线
        </text>
        <path d="M42,36 V178 M42,108 H310" stroke={muted} fill="none" />
        <text x="14" y="51" fill={muted}>
          1
        </text>
        <text x="5" y="173" fill={muted}>
          −1
        </text>
        <polyline
          points={curve((x) => sine(x, frequency), 1, px, py, 256)}
          fill="none"
          stroke={ink}
          strokeWidth="1.8"
        />
        <polyline
          points={curve(
            (x) => interpolate(x, frequency, samples),
            1,
            px,
            py,
            256,
          )}
          fill="none"
          stroke={accent}
          strokeWidth={stage >= 1 ? 3 : 1}
          strokeDasharray={stage >= 1 ? undefined : "4 4"}
        />
        {Array.from({ length: samples + 1 }, (_, i) => (
          <circle
            key={i}
            cx={svgNumber(px(i / samples))}
            cy={svgNumber(py(sine(i / samples, frequency)))}
            r="4"
            fill={paper}
            stroke={accent}
            strokeWidth="2"
          />
        ))}
        {stage >= 2 && (
          <line
            x1={svgNumber(px(1 / 16))}
            x2={svgNumber(px(1 / 16))}
            y1={svgNumber(py(sine(1 / 16, frequency)))}
            y2={svgNumber(py(interpolate(1 / 16, frequency, samples)))}
            stroke={danger}
            strokeWidth="4"
          />
        )}
        <text x="42" y="204" fill={fault ? danger : ink}>
          {fault ? "故障：复用样本验收" : "独立网格验收残差"}
        </text>
        <path d="M42,222 V292 H310" stroke={muted} fill="none" />
        <text x="12" y="229" fill={muted}>
          1
        </text>
        <text x="12" y="297" fill={muted}>
          0
        </text>
        {comb.map((d, i) => (
          <line
            key={i}
            x1={svgNumber(px(d.x))}
            x2={svgNumber(px(d.x))}
            y1="292"
            y2={svgNumber(292 - d.error * 64)}
            stroke={fault ? danger : accent}
            opacity={stage >= 2 ? 1 : 0.35}
            strokeWidth={fault ? 3 : 1.5}
          />
        ))}
        {stage === 3 && (
          <circle
            cx={svgNumber(px(visualWorstPoint.x))}
            cy={svgNumber(292 - visualWorstPoint.error * 64)}
            r="4"
            fill={danger}
          />
        )}
        <text x="37" y="317" fill={muted}>
          0
        </text>
        <text x="302" y="317" fill={muted}>
          1
        </text>
      </svg>
      <Note>
        <p>
          观测 {samples + 1} 点。验收网格 {checks.length} 点，最大残差{" "}
          {fixed(worst)}；以阈值0.25判定：{worst <= 0.25 ? "通过" : "拒绝"}。
        </p>
        <p>
          独立核对始终为257点：最大残差 {fixed(independent)}
          。此离散最大值不是连续区间误差上界。
        </p>
        <p>
          x=1/16：目标 {fixed(sine(1 / 16, frequency))}；插值{" "}
          {fixed(interpolate(1 / 16, frequency, samples))}
          。训练点吻合不证明点间吻合。
        </p>
        <p>
          播放依次强调样本、连线、留出探针与残差；故障改变实际验收集合，绝不改目标函数。
        </p>
      </Note>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}

export function TcgMain08UniversalNetworkEvidenceGateLab() {
  const [seed, setSeed] = useState("pair");
  const [target, setTarget] = useState(6);
  const [budget, setBudget] = useState(2);
  const [fault, setFault] = useState(false);
  const timeline = useTrace(ruleSteps);
  const rewind = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    rewind();
    setSeed("pair");
    setTarget(6);
    setBudget(2);
    setFault(false);
  };
  const result = budgetResult(seed, target, budget, fault);
  // Offline oracle is for auditing only. Its work is NOT charged to the displayed executor.
  const oracle = evolve(seed, target);
  const shown = [
    0,
    1,
    Math.max(1, Math.floor(result.executed / 2)),
    result.executed,
  ][timeline.currentStep];
  const visible = Math.min(shown, result.executed);
  const cell = 8.6;
  const left = 42;
  const top = 40;
  const cx = (i: number) => left + (i + 0.5) * cell;
  const cy = (t: number) => top + t * 24 + 10;
  const offlineY = top + (target + 1) * 24 + 40;
  const answerRow = result.answer === null ? null : result.executed;
  return (
    <Lab
      kind="local-rule-dependency-cone-budget"
      title="实验三 · 规则执行不能被预算标签替代"
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="flex min-w-0 flex-col gap-1 text-sm text-secondary">
          初始种子
          <select
            aria-label="初始种子"
            className={control}
            value={seed}
            onChange={(e) => {
              rewind();
              setSeed(e.target.value);
            }}
          >
            <option value="pair">双点 14、16</option>
            <option value="single">单点 15</option>
          </select>
        </label>
        <Select
          label="目标轮数 T"
          value={target}
          options={[4, 6, 8]}
          change={(n) => {
            rewind();
            setTarget(n);
          }}
        />
        <Select
          label="执行预算 B"
          value={budget}
          options={[2, 4, 8]}
          change={(n) => {
            rewind();
            setBudget(n);
          }}
        />
        <button
          type="button"
          className={control}
          onClick={() => {
            rewind();
            setBudget(target <= 4 ? 4 : 8);
            setFault(false);
          }}
        >
          工具：继续计算
        </button>
      </div>
      <Fault
        active={fault}
        text="把截断行冒充目标行"
        click={() => {
          rewind();
          setFault(!fault);
        }}
      />
      <svg
        viewBox={`0 0 330 ${svgNumber(offlineY + 36)}`}
        role="img"
        aria-label="规则110时空格，阴影为目标中心的可能依赖锥，虚线空格表示未执行，底部离线核对行单独计费"
        className="mt-3 w-full"
        style={{ fontSize: 16 }}
      >
        <text x="42" y="22" fill={ink}>
          31格；每行一次同步更新
        </text>
        <polygon
          points={`${svgNumber(cx(15 - target))},${svgNumber(cy(0))} ${svgNumber(cx(15 + target))},${svgNumber(cy(0))} ${svgNumber(cx(15))},${svgNumber(cy(target))}`}
          fill={accent}
          opacity="0.13"
          stroke={accent}
        />
        {Array.from({ length: target + 1 }, (_, t) => (
          <g key={t}>
            <text
              x="7"
              y={svgNumber(cy(t) + 5)}
              fill={t > result.executed ? muted : ink}
            >
              {t}
            </text>
            {Array.from({ length: 31 }, (_, i) => {
              const computed = t <= visible;
              const bit = computed ? result.rows[t][i] : 0;
              return (
                <rect
                  key={i}
                  x={svgNumber(left + i * cell)}
                  y={svgNumber(top + t * 24)}
                  width={svgNumber(cell - 0.8)}
                  height="19"
                  fill={computed && bit ? accent : "none"}
                  stroke={border}
                  strokeDasharray={computed ? undefined : "2 2"}
                />
              );
            })}
            {t === answerRow && (
              <rect
                x={svgNumber(cx(15) - cell / 2)}
                y={svgNumber(top + t * 24)}
                width={svgNumber(cell - 0.8)}
                height="19"
                fill="none"
                stroke={fault && result.executed < target ? danger : ink}
                strokeWidth="2.5"
              />
            )}
          </g>
        ))}
        <text x="42" y={svgNumber(offlineY - 15)} fill={muted}>
          离线核对：目标行（另计费）
        </text>
        {oracle[target].map((bit, i) => (
          <rect
            key={i}
            x={svgNumber(left + i * cell)}
            y={svgNumber(offlineY)}
            width={svgNumber(cell - 0.8)}
            height="19"
            fill={bit ? muted : "none"}
            stroke={border}
          />
        ))}
        <rect
          x={svgNumber(cx(15) - cell / 2)}
          y={svgNumber(offlineY)}
          width={svgNumber(cell - 0.8)}
          height="19"
          fill="none"
          stroke={ink}
          strokeWidth="2.5"
        />
      </svg>
      <Note>
        <p>
          已执行 {result.executed}/{target} 轮，实际 {31 * result.executed}{" "}
          次局部规则求值。播放目前显示到第{visible}
          行；所有虚线空格均非预测的零。
        </p>
        <p>
          中心15的对外答案：
          {result.answer === null ? "未知（预算不足）" : result.answer}
          ；离线目标位 {oracle[target][15]}。
          {fault && result.executed < target
            ? `故障冒充使用第${result.executed}行的位 ${result.rows[result.executed][15]}。`
            : "只在执行满目标轮数后给出答案。"}
        </p>
        <p>
          离线核对另做 {31 * target}{" "}
          次求值，不计入执行器预算。锥形只表示最近邻规则的可能依赖范围，不证明每格必然有影响。
        </p>
        <p>
          这是固定有限窗口算例，不证明所有规则都无捷径，也不测量任何真实模型的推理能力。
        </p>
      </Note>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}
