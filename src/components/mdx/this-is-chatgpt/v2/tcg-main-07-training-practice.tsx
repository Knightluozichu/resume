"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  border: "var(--border)",
  bg: "var(--bg-elevated)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 w-full rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const SEEDS = [11, 29, 47, 83, 101, 137];
// Geometry serialization only: retain full precision in the teaching calculations.
// Node and Chrome may differ in the last bits of tanh/log10; SVG attributes must not.
function svgCoord(value: number) {
  return value.toFixed(9);
}
function fmt(n: number) {
  return Math.abs(n) > 0 && Math.abs(n) < 0.0001
    ? n.toExponential(3)
    : n.toFixed(6);
}
function mean(xs: number[]) {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function activationTrace(scale: number, depth: number, fault = false) {
  let a = 0.5;
  let jacobian = 1;
  let exact = 1;
  return Array.from({ length: depth }, (_, i) => {
    const z = scale * a;
    a = Math.tanh(z);
    const derivative = 1 - a * a;
    exact *= scale * derivative;
    jacobian *= scale * (fault ? 1 : derivative);
    return { layer: i + 1, z, a, derivative, jacobian, exact };
  });
}
function learningTrace(noise: number, epochs = 10, w = 0, v = 0) {
  return Array.from({ length: epochs + 1 }, (_, epoch) => {
    const row = {
      epoch,
      w,
      v,
      train: (w - 1) ** 2 + (v - noise) ** 2,
      validation: (w - 1) ** 2 + v ** 2,
    };
    w += 0.25 * (1 - w);
    v += 0.25 * (noise - v);
    return row;
  });
}
function checkpoint(
  rows: ReturnType<typeof learningTrace>,
  patience: number,
  fault = false,
) {
  let best = 0;
  let stop = rows.length - 1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].validation < rows[best].validation) best = i;
    if (i - best >= patience) {
      stop = i;
      break;
    }
  }
  let restored = best;
  if (fault) {
    restored = 0;
    for (let i = 1; i <= stop; i++) {
      if (rows[i].train < rows[restored].train) restored = i;
    }
  }
  return { best, stop, restored };
}
function seededPairs(amplitude: number, budget: number) {
  return SEEDS.map((seed) => {
    const first = (1664525 * seed + 1013904223) % 2 ** 32;
    const second = (1664525 * first + 1013904223) % 2 ** 32;
    const w = amplitude * (2 * (first / 2 ** 32) - 1);
    const v = amplitude * (2 * (second / 2 ** 32) - 1);
    const rows = learningTrace(1, budget, w, v);
    return { seed, w, v, a: rows[2].validation, b: rows[budget].validation };
  });
}
function pairedReport(rows: ReturnType<typeof seededPairs>, fault = false) {
  const a = mean(rows.map((r) => r.a));
  const b = mean(rows.map((r) => r.b));
  const bestB = Math.min(...rows.map((r) => r.b));
  return {
    a,
    b,
    bestB,
    pairedDelta: b - a,
    reportedDelta: (fault ? bestB : b) - a,
  };
}
function useTrace(labels: string[]) {
  const labelsKey = JSON.stringify(labels);
  const steps = useMemo(
    () => (JSON.parse(labelsKey) as string[]).map((label) => ({ label })),
    [labelsKey],
  );
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      steps.forEach(({ label }, i) => tl.label(label, i * 1100));
      tl.add(
        { tick: 0 },
        { tick: steps.length, duration: steps.length * 1100, ease: "linear" },
        0,
      );
    },
    [steps],
  );
  const timeline = useTeachingTimeline({ steps, build });
  const { reducedMotion, isPlaying, pause } = timeline;
  useEffect(() => {
    if (reducedMotion && isPlaying) pause();
  }, [reducedMotion, isPlaying, pause]);
  return timeline;
}
function Frame({
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
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:min-w-11 [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[520px]"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">
        本站有限数学模拟，不训练真实语言模型，也不是作者实验复现。
      </p>
      {children}
    </section>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      {label}
      {children}
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
      data-fault={active ? "active" : "inactive"}
      aria-pressed={active}
      onClick={onClick}
      className={`${control} my-3 py-2 text-left`}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}
function InitializationLab({ reset }: { reset: () => void }) {
  const [scale, setScale] = useState(1);
  const [depth, setDepth] = useState(3);
  const [fault, setFault] = useState(false);
  const trace = useTrace(
    Array.from({ length: depth }, (_, i) => `第${i + 1}层`),
  );
  const rows = activationTrace(scale, depth, fault);
  const row = rows[Math.min(trace.currentStep, rows.length - 1)];
  const restart = () => {
    trace.pause();
    trace.goToStep(0);
  };
  const x = (z: number) => svgCoord(42 + ((z + 4) / 8) * 234);
  const y = (a: number) => svgCoord(100 - a * 60);
  const slope = fault ? 1 : row.derivative;
  const curve = Array.from({ length: 81 }, (_, i) => {
    const z = -4 + i / 10;
    return `${x(z)},${y(Math.tanh(z))}`;
  }).join(" ");
  const jy = (j: number) =>
    svgCoord(
      310 -
        ((Math.max(-20, Math.min(4, Math.log10(Math.max(Math.abs(j), 1e-20)))) +
          20) /
          24) *
          100,
    );
  const lx = (i: number) => svgCoord(42 + ((i + 1) / depth) * 234);
  return (
    <Frame
      id="initialization"
      kind="initialization-tanh-tangent-chain"
      title="实验一：尺度、切线与逐层导数"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="初始化尺度 s">
          <select
            className={control}
            value={scale}
            onChange={(e) => {
              restart();
              setScale(Number(e.target.value));
            }}
          >
            <option value={0.2}>0.2：小</option>
            <option value={1}>1：中</option>
            <option value={4}>4：大</option>
          </select>
        </Field>
        <Field label="层数 L">
          <select
            className={control}
            value={depth}
            onChange={(e) => {
              restart();
              setDepth(Number(e.target.value));
            }}
          >
            {[1, 3, 5].map((n) => (
              <option key={n} value={n}>
                {n} 层
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          trace.pause();
          setFault(!fault);
        }}
      >
        反向漏乘 tanh 导数（当作 1）
      </Fault>
      <p className="text-sm text-secondary">
        实线为所用切线／导数，虚线为正确值。输入 a₀=0.5；上图横轴
        z，下图横轴层号。
      </p>
      <svg
        viewBox="0 0 300 350"
        role="img"
        aria-label={`tanh曲线及第${row.layer}层切线，尺度${scale}，累计导数${fmt(row.jacobian)}`}
        fontSize={14}
        fill={C.ink}
      >
        <text x={42} y={19}>
          a = tanh(z)
        </text>
        <path d="M42 100H276 M159 30V170" stroke={C.border} fill="none" />
        <polyline
          points={curve}
          stroke={C.accent}
          strokeWidth={2}
          fill="none"
        />
        <line
          x1={x(row.z - 0.35)}
          x2={x(row.z + 0.35)}
          y1={y(row.a - 0.35 * row.derivative)}
          y2={y(row.a + 0.35 * row.derivative)}
          stroke={C.muted}
          strokeWidth={3}
          strokeDasharray="3 3"
        />
        <line
          x1={x(row.z - 0.35)}
          x2={x(row.z + 0.35)}
          y1={y(row.a - 0.35 * slope)}
          y2={y(row.a + 0.35 * slope)}
          stroke={fault ? C.danger : C.ink}
          strokeWidth={2}
        />
        <circle cx={x(row.z)} cy={y(row.a)} r={5} fill={C.accent} />
        <text x={17} y={45}>
          1
        </text>
        <text x={9} y={165}>
          −1
        </text>
        <text x={42} y={190}>
          −4
        </text>
        <text x={155} y={190}>
          0
        </text>
        <text x={268} y={190}>
          4
        </text>
        <text x={42} y={211}>
          log₁₀ |J|（低于 −20 截断）
        </text>
        <path d="M42 222V310H276" fill="none" stroke={C.border} />
        <text x={8} y={232}>
          0
        </text>
        <text x={0} y={312}>
          −20
        </text>
        <polyline
          points={`42,${jy(1)} ${rows.map((r, i) => `${lx(i)},${jy(r.exact)}`).join(" ")}`}
          stroke={C.muted}
          strokeDasharray="4 3"
          fill="none"
        />
        <polyline
          points={`42,${jy(1)} ${rows
            .slice(0, row.layer)
            .map((r, i) => `${lx(i)},${jy(r.jacobian)}`)
            .join(" ")}`}
          stroke={fault ? C.danger : C.accent}
          strokeWidth={2}
          fill="none"
        />
        {rows.map((r, i) => (
          <g key={r.layer}>
            <text x={lx(i)} y={335} textAnchor="end">
              {r.layer}
            </text>
            {i < row.layer && (
              <circle
                cx={lx(i)}
                cy={jy(r.jacobian)}
                r={4}
                fill={fault ? C.danger : C.accent}
              />
            )}
          </g>
        ))}
      </svg>
      <div
        className="space-y-1 break-words text-sm"
        aria-live="polite"
        data-output="initialization"
      >
        <p>
          第 {row.layer} 层：z={fmt(row.z)}，a={fmt(row.a)}
        </p>
        <p>
          正确局部导数 d={fmt(row.derivative)}；所用 d={fmt(slope)}
        </p>
        <p>
          累计 J={fmt(row.jacobian)}；正确 J={fmt(row.exact)}
        </p>
      </div>
      <TimelineControls
        timeline={trace}
        caption="逐层计算，不是训练步。撤销故障仅修正导数，不改变前向激活。"
        reset={{ label: "全部重置", onClick: reset }}
      />
    </Frame>
  );
}
function ValidationLab({ reset }: { reset: () => void }) {
  const [noise, setNoise] = useState(1);
  const [patience, setPatience] = useState(2);
  const [fault, setFault] = useState(false);
  const trace = useTrace(Array.from({ length: 11 }, (_, i) => `epoch ${i}`));
  const rows = learningTrace(noise);
  const selected = checkpoint(rows, patience, fault);
  const row = rows[Math.min(trace.currentStep, 10)];
  const restored = rows[selected.restored];
  const restart = () => {
    trace.pause();
    trace.goToStep(0);
  };
  const max = Math.max(...rows.map((r) => Math.max(r.train, r.validation)));
  const x = (epoch: number) => svgCoord(42 + epoch * 23.4);
  const y = (loss: number) => svgCoord(230 - (loss / max) * 200);
  return (
    <Frame
      id="validation"
      kind="train-validation-checkpoint-curves"
      title="实验二：下降的训练误差，回升的验证误差"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="训练伪信号 n">
          <select
            className={control}
            value={noise}
            onChange={(e) => {
              restart();
              setNoise(Number(e.target.value));
            }}
          >
            {[0.5, 1, 1.5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label="耐心 p（连续未改善次数）">
          <select
            className={control}
            value={patience}
            onChange={(e) => {
              restart();
              setPatience(Number(e.target.value));
            }}
          >
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          trace.pause();
          setFault(!fault);
        }}
      >
        停止后按训练误差选恢复点
      </Fault>
      <p className="text-sm text-secondary">
        蓝色实线：训练 MSE；灰色虚线：验证 MSE。全曲线是预先模拟的 10
        轮预算，停止后的部分仅供反事实比较。
      </p>
      <svg
        viewBox="0 0 300 280"
        role="img"
        aria-label={`训练验证双曲线，验证最佳epoch${selected.best}，停止${selected.stop}，恢复${selected.restored}`}
        fontSize={14}
        fill={C.ink}
      >
        <text x={42} y={18}>
          MSE
        </text>
        <path d="M42 30V230H276" stroke={C.border} fill="none" />
        <text x={2} y={39}>
          {max.toFixed(2)}
        </text>
        <text x={22} y={235}>
          0
        </text>
        <polyline
          points={rows.map((r) => `${x(r.epoch)},${y(r.train)}`).join(" ")}
          fill="none"
          stroke={C.accent}
          strokeWidth={2}
        />
        <polyline
          points={rows.map((r) => `${x(r.epoch)},${y(r.validation)}`).join(" ")}
          fill="none"
          stroke={C.muted}
          strokeWidth={2}
          strokeDasharray="5 3"
        />
        <line
          x1={x(selected.best)}
          x2={x(selected.best)}
          y1={30}
          y2={230}
          stroke={C.accent}
          strokeDasharray="2 4"
        />
        <line
          x1={x(selected.stop)}
          x2={x(selected.stop)}
          y1={30}
          y2={230}
          stroke={C.muted}
          strokeDasharray="7 4"
        />
        <line
          x1={x(row.epoch)}
          x2={x(row.epoch)}
          y1={30}
          y2={230}
          stroke={C.border}
          strokeWidth={3}
        />
        <circle cx={x(row.epoch)} cy={y(row.train)} r={4} fill={C.accent} />
        <circle cx={x(row.epoch)} cy={y(row.validation)} r={4} fill={C.muted} />
        <circle
          cx={x(restored.epoch)}
          cy={y(restored.validation)}
          r={7}
          stroke={fault ? C.danger : C.accent}
          strokeWidth={3}
          fill={C.bg}
        />
        {[0, 2, 4, 6, 8, 10].map((e) => (
          <text key={e} x={x(e)} y={255} textAnchor="middle">
            {e}
          </text>
        ))}
        <text x={225} y={277}>
          epoch
        </text>
      </svg>
      <div
        className="space-y-1 break-words text-sm"
        aria-live="polite"
        data-output="validation"
      >
        <p>
          游标 epoch {row.epoch}：训练={fmt(row.train)}；验证=
          {fmt(row.validation)}
        </p>
        <p>
          验证最佳 {selected.best}（细点线）；停止 {selected.stop}
          （长虚线）。空心圈是恢复点。
        </p>
        <p>
          恢复 epoch {selected.restored}：验证 MSE={fmt(restored.validation)}
        </p>
      </div>
      <TimelineControls
        timeline={trace}
        caption="耐心从最近一次严格改善开始计；等值也算未改善。全预算不等于实际继续训练。"
        reset={{ label: "全部重置", onClick: reset }}
      />
    </Frame>
  );
}
function SeedsLab({ reset }: { reset: () => void }) {
  const [amplitude, setAmplitude] = useState(0.6);
  const [budget, setBudget] = useState(8);
  const [fault, setFault] = useState(false);
  const trace = useTrace(SEEDS.map((s) => `加入 seed ${s}`));
  const rows = seededPairs(amplitude, budget);
  const count = Math.min(trace.currentStep + 1, rows.length);
  const revealed = rows.slice(0, count);
  const report = pairedReport(revealed, fault);
  const restart = () => {
    trace.pause();
    trace.goToStep(0);
  };
  const max = Math.max(1, ...rows.flatMap((r) => [r.a, r.b])) * 1.1;
  const x = (loss: number) => svgCoord(48 + (loss / max) * 228);
  const bound =
    Math.max(
      0.1,
      Math.abs(report.pairedDelta),
      Math.abs(report.bestB - report.a),
    ) * 1.3;
  const dx = (delta: number) => svgCoord(162 + (delta / bound) * 106);
  return (
    <Frame
      id="seeds"
      kind="paired-seed-selection-distribution"
      title="实验三：配对种子与只报最好一次的偏差"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="初始权重振幅 h">
          <select
            className={control}
            value={amplitude}
            onChange={(e) => {
              restart();
              setAmplitude(Number(e.target.value));
            }}
          >
            {[0.2, 0.6, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label="方案 B 训练预算">
          <select
            className={control}
            value={budget}
            onChange={(e) => {
              restart();
              setBudget(Number(e.target.value));
            }}
          >
            <option value={4}>4 epoch</option>
            <option value={8}>8 epoch</option>
          </select>
        </Field>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          trace.pause();
          setFault(!fault);
        }}
      >
        只报告 B 的最低误差，A 仍报均值
      </Fault>
      <p className="text-sm text-secondary">
        每行同一初始权重；空心 A 固定 2 轮，实心 B
        使用所选预算。淡点是尚未计入的配对；横轴为干净验证 MSE。
      </p>
      <svg
        viewBox="0 0 300 390"
        role="img"
        aria-label={`${count}个配对，真实均值差${fmt(report.pairedDelta)}，报告差${fmt(report.reportedDelta)}`}
        fontSize={14}
        fill={C.ink}
      >
        <text x={1} y={19}>
          seed
        </text>
        <text x={176} y={19}>
          A ○ / B ●
        </text>
        {rows.map((r, i) => {
          const y = 50 + i * 33;
          const chosen = fault && i < count && r.b === report.bestB;
          return (
            <g key={r.seed} opacity={i < count ? 1 : 0.25}>
              <text x={2} y={y + 5}>
                {r.seed}
              </text>
              <line
                x1={x(r.a)}
                x2={x(r.b)}
                y1={y}
                y2={y}
                stroke={C.muted}
                strokeWidth={2}
              />
              <circle
                cx={x(r.a)}
                cy={y}
                r={5}
                fill={C.bg}
                stroke={C.muted}
                strokeWidth={2}
              />
              <circle
                cx={x(r.b)}
                cy={y}
                r={chosen ? 8 : 5}
                fill={chosen ? C.danger : C.accent}
              />
            </g>
          );
        })}
        <path d="M48 240H276" stroke={C.border} fill="none" />
        <text x={48} y={260}>
          0
        </text>
        <text x={276} y={260} textAnchor="end">
          {max.toFixed(2)}
        </text>
        <text x={48} y={290}>
          Δ = B − A；负数才是 B 更好
        </text>
        <path d="M56 329H268 M162 310V345" stroke={C.border} fill="none" />
        <line
          x1={dx(report.pairedDelta)}
          x2={dx(report.reportedDelta)}
          y1={329}
          y2={329}
          stroke={C.danger}
          strokeWidth={3}
        />
        <circle
          cx={dx(report.pairedDelta)}
          cy={329}
          r={7}
          fill={C.bg}
          stroke={C.muted}
          strokeWidth={2}
        />
        <circle
          cx={dx(report.reportedDelta)}
          cy={329}
          r={4}
          fill={fault ? C.danger : C.accent}
        />
        <text x={56} y={369}>
          −{bound.toFixed(2)}
        </text>
        <text x={162} y={369} textAnchor="middle">
          0
        </text>
        <text x={268} y={369} textAnchor="end">
          +{bound.toFixed(2)}
        </text>
      </svg>
      <div
        className="space-y-1 break-words text-sm"
        aria-live="polite"
        data-output="seeds"
      >
        <p>
          已计入 {count}/6 配对；A 均值={fmt(report.a)}，B 均值={fmt(report.b)}
        </p>
        <p>
          B 最低值={fmt(report.bestB)}；真实配对均值差={fmt(report.pairedDelta)}
          （空心圈）
        </p>
        <p>
          所报告差={fmt(report.reportedDelta)}（实心点）；
          {report.reportedDelta < 0 ? "表面上 B 更好" : "B 未优于 A"}
        </p>
      </div>
      <TimelineControls
        timeline={trace}
        caption="请推进到 6/6 再判断；这些固定种子不是总体显著性的证明。故障不改变任何一个运行结果。"
        reset={{ label: "全部重置", onClick: reset }}
      />
    </Frame>
  );
}

// Re-mount owns the entire lab state and cancels its old timeline in hook cleanup.
export function TcgMain07TrainingPracticeContextContractLab() {
  const [revision, setRevision] = useState(0);
  return (
    <InitializationLab key={revision} reset={() => setRevision((r) => r + 1)} />
  );
}
export function TcgMain07TrainingPracticeComputeTraceLab() {
  const [revision, setRevision] = useState(0);
  return (
    <ValidationLab key={revision} reset={() => setRevision((r) => r + 1)} />
  );
}
export function TcgMain07TrainingPracticeEvidenceGateLab() {
  const [revision, setRevision] = useState(0);
  return <SeedsLab key={revision} reset={() => setRevision((r) => r + 1)} />;
}
