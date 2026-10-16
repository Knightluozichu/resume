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
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
  bg: "var(--bg-elevated)",
} as const;

const control =
  "min-h-11 min-w-11 w-full rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Serialize geometry only. Never feed rounded coordinates back into model math.
function coord(n: number) {
  if (!Number.isFinite(n)) throw new Error("Nonfinite drawing coordinate");
  return Number(n.toFixed(9));
}

/* ------------------------------------------------------------------ */
/* shared UI atoms (batch-28 pattern, chapter-local copies)            */
/* ------------------------------------------------------------------ */

function useTrace(labels: string[]) {
  const key = JSON.stringify(labels);
  const steps = useMemo(
    () => (JSON.parse(key) as string[]).map((label) => ({ label })),
    [key],
  );
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      steps.forEach(({ label }, i) => tl.label(label, i * 900));
      tl.add(
        { tick: 0 },
        { tick: steps.length, duration: steps.length * 900, ease: "linear" },
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
  intro,
  children,
}: {
  id: string;
  kind: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={id}
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[480px]"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">{intro}</p>
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
  id,
  active,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={id}
      aria-pressed={active}
      onClick={onClick}
      className={`${control} my-3 h-auto py-2 text-left`}
    >
      故障{active ? "开启" : "关闭"}：{children}
    </button>
  );
}

function Readout({
  name,
  value,
  children,
}: {
  name: string;
  value: object;
  children: ReactNode;
}) {
  return (
    <output
      data-readout={name}
      data-oracle={JSON.stringify(value)}
      aria-live="polite"
      className="block break-words rounded border border-border p-3 text-sm leading-6"
    >
      {children}
    </output>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 1 — min/max 配对淘汰账本                                        */
/* ------------------------------------------------------------------ */

type MinMaxStrategy = "pairing" | "sequential";

function pairingFormula(n: number) {
  return Math.ceil((3 * n) / 2) - 2;
}

function minmaxLedger(n: number, strategy: MinMaxStrategy, fault: boolean) {
  const values = Array.from({ length: n }, (_, i) => ((11 * i + 3) % n) + 1);
  const elimMin = Array.from({ length: n }, () => false);
  const elimMax = Array.from({ length: n }, () => false);
  let comparisons = 0;
  let minIndex = 0;
  let maxIndex = 0;

  if (strategy === "pairing") {
    let start: number;
    if (n % 2 === 0) {
      comparisons += 1;
      if (values[0] < values[1]) {
        elimMax[0] = true;
        elimMin[1] = true;
        minIndex = 0;
        maxIndex = 1;
      } else {
        elimMin[0] = true;
        elimMax[1] = true;
        minIndex = 1;
        maxIndex = 0;
      }
      start = 2;
    } else {
      start = 1;
    }
    for (let j = start; j < n; j += 2) {
      comparisons += 3;
      const x = values[j];
      const y = values[j + 1];
      const winner = x > y ? j : j + 1;
      const loser = x > y ? j + 1 : j;
      if (values[winner] > values[maxIndex]) {
        elimMax[maxIndex] = true;
        maxIndex = winner;
      } else {
        elimMax[winner] = true;
      }
      if (values[loser] < values[minIndex]) {
        elimMin[minIndex] = true;
        minIndex = loser;
      } else {
        elimMin[loser] = true;
      }
    }
  } else {
    for (let j = 1; j < n; j++) {
      comparisons += 1;
      if (values[j] < values[minIndex]) {
        elimMin[minIndex] = true;
        minIndex = j;
      } else {
        elimMin[j] = true;
      }
    }
    for (let j = 1; j < n; j++) {
      comparisons += 1;
      if (values[j] > values[maxIndex]) {
        elimMax[maxIndex] = true;
        maxIndex = j;
      } else {
        elimMax[j] = true;
      }
    }
  }

  const formulaPairing = pairingFormula(n);
  const formulaSequential = 2 * n - 2;
  const claimed =
    strategy === "pairing"
      ? fault
        ? formulaSequential
        : formulaPairing
      : fault
        ? formulaPairing
        : formulaSequential;

  return {
    values,
    comparisons,
    min: values[minIndex],
    max: values[maxIndex],
    minIndex,
    maxIndex,
    elimMin,
    elimMax,
    formulaPairing,
    formulaSequential,
    claimed,
    valid: claimed === comparisons,
  };
}

function LedgerBar({
  label,
  count,
  scale,
  tone,
  x,
  y,
}: {
  label: string;
  count: number;
  scale: number;
  tone: string;
  x: number;
  y: number;
}) {
  const width = Math.max(4, count * scale);
  return (
    <g>
      <text x={coord(x)} y={coord(y + 11)} fontSize={11} fill={C.muted}>
        {label}
      </text>
      <rect
        x={coord(x)}
        y={coord(y + 18)}
        width={coord(width)}
        height={16}
        rx={4}
        fill={tone}
        fillOpacity={0.25}
        stroke={tone}
        strokeWidth={1.5}
      />
      <text
        x={coord(x + width + 6)}
        y={coord(y + 31)}
        fontSize={11}
        fill={C.ink}
      >
        {count}
      </text>
    </g>
  );
}

function MinMaxPlot({
  n,
  strategy,
  fault,
}: {
  n: number;
  strategy: MinMaxStrategy;
  fault: boolean;
}) {
  const labels = ["全是候选", "首对定初值", "逐对三比较", "账本核对"];
  const trace = useTrace(labels);
  const stage = trace.currentStep;
  const ledger = useMemo(
    () => minmaxLedger(n, strategy, fault),
    [n, strategy, fault],
  );
  const perRow = 7;
  const rows = Math.ceil(n / perRow);
  const cellW = Math.min(38, 284 / perRow);
  const oracle = { ...ledger, frame: stage };

  return (
    <>
      <svg
        viewBox="0 0 300 400"
        role="img"
        aria-label="min/max 配对淘汰实验：每个元素带着最小候选与最大候选两枚徽章，配对比较逐枚淘汰，账本记录实际比较次数并与理论公式核对。"
        fontSize={15}
      >
        <text x={12} y={24} fontSize={13} fontWeight={700} fill={C.ink}>
          n={n} · {strategy === "pairing" ? "配对法" : "顺序法"} ·{" "}
          {ledger.comparisons} 次比较
        </text>
        {ledger.values.map((value, i) => {
          const row = Math.floor(i / perRow);
          const col = i % perRow;
          const cx = 12 + col * cellW;
          const cy = 40 + row * 74;
          const processed = stage >= 2 || (stage === 1 && n % 2 === 0 && i < 2);
          const badgeMin = processed ? !ledger.elimMin[i] : true;
          const badgeMax = processed ? !ledger.elimMax[i] : true;
          const isCur =
            stage >= 1 && (i === ledger.minIndex || i === ledger.maxIndex);
          return (
            <g key={"slot-" + i}>
              <rect
                x={coord(cx)}
                y={coord(cy)}
                width={coord(cellW - 4)}
                height={34}
                rx={6}
                fill={isCur ? C.accent : C.bg}
                fillOpacity={isCur ? 0.18 : 1}
                stroke={isCur ? C.accent : C.border}
                strokeWidth={isCur ? 2 : 1}
              />
              <text
                x={coord(cx + (cellW - 4) / 2)}
                y={coord(cy + 22)}
                textAnchor="middle"
                fontSize={13}
                fill={C.ink}
              >
                {value}
              </text>
              <text
                x={coord(cx + 8)}
                y={coord(cy + 48)}
                fontSize={11}
                fill={badgeMin ? C.success : C.muted}
              >
                ▽
              </text>
              <text
                x={coord(cx + cellW - 14)}
                y={coord(cy + 48)}
                fontSize={11}
                fill={badgeMax ? C.warning : C.muted}
              >
                △
              </text>
            </g>
          );
        })}
        <text x={12} y={40 + rows * 74 + 2} fontSize={11} fill={C.muted}>
          ▽=仍可能最小 △=仍可能最大；灰掉=已被某次比较淘汰
        </text>

        <g transform={`translate(0 ${coord(52 + rows * 74)})`}>
          <LedgerBar
            label="实际计数"
            count={ledger.comparisons}
            scale={240 / (2 * n)}
            tone={C.accent}
            x={12}
            y={0}
          />
          <LedgerBar
            label={
              strategy === "pairing" ? "配对公式 ⌈3n/2⌉−2" : "顺序公式 2n−2"
            }
            count={
              strategy === "pairing"
                ? ledger.formulaPairing
                : ledger.formulaSequential
            }
            scale={240 / (2 * n)}
            tone={C.success}
            x={12}
            y={44}
          />
          {fault && (
            <LedgerBar
              label="错标公式"
              count={ledger.claimed}
              scale={240 / (2 * n)}
              tone={C.danger}
              x={12}
              y={88}
            />
          )}
          <text x={12} y={coord(fault ? 150 : 106)} fontSize={12} fill={C.ink}>
            min={ledger.min} max={ledger.max} ·{" "}
            {ledger.valid ? "账本一致 ✓" : "账本对不上 ✗"}
          </text>
        </g>
      </svg>
      <Readout name="minmax-ledger" value={oracle}>
        实际比较 {ledger.comparisons} 次；本策略公式应得{" "}
        {strategy === "pairing"
          ? ledger.formulaPairing
          : ledger.formulaSequential}{" "}
        次{fault && `；故障账本错标为 ${ledger.claimed} 次`}。读出 min=
        {ledger.min}、max={ledger.max}。核对：
        {ledger.valid ? "通过" : "失败——公式张冠李戴"}。
      </Readout>
      <div data-control="minmax-ledger-timeline">
        <TimelineControls timeline={trace} />
      </div>
    </>
  );
}

export function Clrs4Chapter09MediansOrderStatisticsLab() {
  const [n, setN] = useState(8);
  const [strategy, setStrategy] = useState<MinMaxStrategy>("pairing");
  const [fault, setFault] = useState(false);
  const [generation, setGeneration] = useState(0);
  const reset = () => {
    setN(8);
    setStrategy("pairing");
    setFault(false);
    setGeneration((g) => g + 1);
  };
  return (
    <Frame
      id="clrs4-09-minmax"
      kind="minmax-pairing-elimination-ledger"
      title="实验一：同时找最小与最大的淘汰账本"
      intro="本站确定性有限教具：数组由固定公式生成，配对/顺序两种机制逐次比较真实模拟，徽章随比较被淘汰。"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="数组长度 n">
          <select
            data-control="array-length"
            data-param="array-length"
            className={control}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          >
            {[8, 9, 10, 12, 14].map((v) => (
              <option key={v} value={v}>
                n = {v}
                {v % 2 === 1 ? "（奇数边界）" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="寻找策略">
          <select
            data-control="search-strategy"
            data-param="search-strategy"
            className={control}
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as MinMaxStrategy)}
          >
            <option value="pairing">配对法 · ⌈3n/2⌉−2</option>
            <option value="sequential">顺序法 · 2n−2</option>
          </select>
        </Field>
      </div>
      <Fault
        id="formula-swap"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        账本错标：用另一种策略的公式记账
      </Fault>
      <MinMaxPlot
        key={`${n}-${strategy}-${fault}-${generation}`}
        n={n}
        strategy={strategy}
        fault={fault}
      />
      <button
        type="button"
        data-reset="minmax"
        className={`${control} mt-3`}
        onClick={reset}
      >
        重置实验
      </button>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 2 — RANDOMIZED-SELECT 秩收缩树                                  */
/* ------------------------------------------------------------------ */

type PivotPolicy = "balanced" | "quarter" | "adversary";
type TargetChoice = "median" | "quartile";

type SelectRound = {
  m: number;
  k: number;
  i: number;
  side: "hit" | "left" | "right";
  work: number;
};

type SelectTrace = {
  rounds: SelectRound[];
  work: number;
  terminated: boolean;
  answer: number | null;
  targetRank: number;
};

function selectTrace(
  n: number,
  policy: PivotPolicy,
  targetRank: number,
  fault: boolean,
  cap = 8,
): SelectTrace {
  const values = Array.from({ length: n }, (_, i) => ((11 * i) % n) + 1);
  let lo = 0;
  let hi = n - 1;
  let i = targetRank;
  let work = 0;
  const rounds: SelectRound[] = [];
  let terminated = false;
  let answer: number | null = null;

  for (let round = 0; round < cap; round++) {
    const m = hi - lo + 1;
    work += m - 1;
    let p: number;
    if (policy === "balanced") {
      p = lo + ((m - 1) >> 1);
    } else if (policy === "quarter") {
      p = lo + Math.floor((3 * (m - 1)) / 4);
    } else {
      p = lo;
      for (let j = lo + 1; j <= hi; j++) {
        if (values[j] < values[p]) p = j;
      }
    }
    const x = values[p];
    let k = 0;
    for (let j = lo; j <= hi; j++) {
      if (values[j] < x) k++;
    }
    const kr = k + 1;
    const side: SelectRound["side"] =
      i === kr ? "hit" : i < kr ? "left" : "right";
    rounds.push({ m, k: kr, i, side, work });
    if (i === kr) {
      terminated = true;
      answer = x;
      break;
    }
    if (m === 1) {
      terminated = true;
      answer = values[lo];
      break;
    }
    if (i < kr) {
      hi = lo + k - 1;
    } else {
      lo = lo + k + 1;
      i = fault ? i : i - kr;
    }
  }
  return { rounds, work, terminated, answer, targetRank };
}

function targetRankOf(n: number, choice: TargetChoice) {
  return choice === "median" ? (n + 1) >> 1 : Math.ceil(n / 4);
}

function SelectPlot({
  n,
  policy,
  target,
  fault,
}: {
  n: number;
  policy: PivotPolicy;
  target: TargetChoice;
  fault: boolean;
}) {
  const targetRank = targetRankOf(n, target);
  const run = useMemo(
    () => selectTrace(n, policy, targetRank, fault),
    [n, policy, targetRank, fault],
  );
  const correct = useMemo(
    () => selectTrace(n, policy, targetRank, false),
    [n, policy, targetRank],
  );
  const labels = useMemo(
    () => [
      "声明目标秩",
      ...run.rounds.map((r, idx) => `第${idx + 1}轮 · 规模${r.m}`),
      "期望账本总结",
    ],
    [run.rounds],
  );
  const trace = useTrace(labels);
  const stage = trace.currentStep;
  const valid = run.terminated && run.answer === correct.answer;
  const oracle = {
    targetRank,
    rounds: run.rounds.length,
    work: run.work,
    terminated: run.terminated,
    answer: run.answer,
    correctAnswer: correct.answer,
    valid,
    frame: stage,
  };
  const unit = 240 / n;
  const spineRows = Math.min(run.rounds.length, 6);

  return (
    <>
      <svg
        viewBox="0 0 300 430"
        role="img"
        aria-label="RANDOMIZED-SELECT 秩收缩实验：每一轮给出当前区间规模、主元实际秩、保留哪一侧以及秩是否平移，脊状条形随规模收缩。"
        fontSize={15}
      >
        <text x={12} y={24} fontSize={13} fontWeight={700} fill={C.ink}>
          n={n} · 目标秩 i={targetRank} · 累计比较 {run.work}
        </text>

        {run.rounds.slice(0, spineRows).map((r, idx) => {
          const shown = stage >= idx + 1 && stage <= run.rounds.length;
          const y = 44 + idx * 46;
          const sideText =
            r.side === "hit"
              ? "命中主元"
              : r.side === "left"
                ? "留左侧，i 不变"
                : fault
                  ? "留右侧，i 未平移 ✗"
                  : "留右侧，i←i−k";
          return (
            <g key={"round-" + idx} opacity={shown ? 1 : 0.28}>
              <rect
                x={coord(12)}
                y={coord(y)}
                width={coord(Math.max(6, r.m * unit))}
                height={22}
                rx={5}
                fill={
                  r.side === "hit"
                    ? C.success
                    : fault && r.side === "right"
                      ? C.danger
                      : C.accent
                }
                fillOpacity={0.18}
                stroke={
                  r.side === "hit"
                    ? C.success
                    : fault && r.side === "right"
                      ? C.danger
                      : C.accent
                }
                strokeWidth={1.5}
              />
              <rect
                x={coord(12 + Math.max(6, r.m * unit))}
                y={coord(y)}
                width={coord(Math.max(4, (n - r.m) * unit))}
                height={22}
                rx={5}
                fill={C.border}
                fillOpacity={0.12}
              />
              <text x={16} y={coord(y + 15)} fontSize={11} fill={C.ink}>
                第{idx + 1}轮 m={r.m} · k={r.k} · i={r.i}
              </text>
              <text
                x={288}
                y={coord(y + 15)}
                textAnchor="end"
                fontSize={11}
                fill={fault && r.side === "right" ? C.danger : C.muted}
              >
                {sideText}
              </text>
            </g>
          );
        })}

        {run.rounds.length > spineRows && (
          <text
            x={12}
            y={coord(44 + spineRows * 46 - 10)}
            fontSize={11}
            fill={C.muted}
          >
            … 共 {run.rounds.length} 轮，只画前 {spineRows} 轮
          </text>
        )}

        <g transform={`translate(0 ${coord(56 + spineRows * 46)})`}>
          <text x={12} y={0} fontSize={12} fontWeight={700} fill={C.ink}>
            期望账本
          </text>
          <text x={12} y={20} fontSize={11} fill={C.muted}>
            秩落在中间一半 ⇒ 下一规模 ≤ 3m/4，概率 ≥ 1/2
          </text>
          <text x={12} y={38} fontSize={11} fill={C.muted}>
            级数 n + 3n/4 + (3n/4)² + … = O(n)，最坏仍 Θ(n²)
          </text>
          <text x={12} y={62} fontSize={12} fill={C.ink}>
            本轮读出{" "}
            {run.terminated
              ? `第 ${targetRank} 小 = ${run.answer}`
              : "超过轮限未命中"}
            ；正确版 {correct.terminated ? `= ${correct.answer}` : "未命中"}
          </text>
          <text
            x={12}
            y={82}
            fontSize={12}
            fontWeight={700}
            fill={valid ? C.success : C.danger}
          >
            {valid ? "秩 bookkeeping 一致 ✓" : "返回了错误的顺序统计量 ✗"}
          </text>
        </g>
      </svg>
      <Readout name="select-trace" value={oracle}>
        目标秩 {targetRank}：共 {run.rounds.length} 轮、累计 {run.work}{" "}
        次划分比较，
        {run.terminated ? `返回 ${run.answer}` : "超过 8 轮上限仍未命中"}
        ；正确版返回 {correct.answer}。核对：
        {valid ? "通过" : "失败——右侧递归忘记把 i 平移 i←i−k"}。
      </Readout>
      <div data-control="select-timeline">
        <TimelineControls timeline={trace} />
      </div>
    </>
  );
}

export function Clrs4Chapter09MediansOrderStatisticsSelectLab() {
  const [n, setN] = useState(15);
  const [policy, setPolicy] = useState<PivotPolicy>("quarter");
  const [target, setTarget] = useState<TargetChoice>("median");
  const [fault, setFault] = useState(false);
  const [generation, setGeneration] = useState(0);
  const reset = () => {
    setN(15);
    setPolicy("quarter");
    setTarget("median");
    setFault(false);
    setGeneration((g) => g + 1);
  };
  return (
    <Frame
      id="clrs4-09-select"
      kind="pivot-rank-subproblem-contraction-tree"
      title="实验二：RANDOMIZED-SELECT 只留目标那一侧"
      intro="本站确定性有限教具：主元位置由所选策略确定给出（均匀随机分析见正文），逐轮真实模拟 partition 的秩判定与单侧收缩。"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="数组长度 n">
          <select
            data-control="select-array-length"
            data-param="select-array-length"
            className={control}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          >
            {[15, 21, 27].map((v) => (
              <option key={v} value={v}>
                n = {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="主元位置策略">
          <select
            data-control="pivot-policy"
            data-param="pivot-policy"
            className={control}
            value={policy}
            onChange={(e) => setPolicy(e.target.value as PivotPolicy)}
          >
            <option value="quarter">四分位 · 类好主元</option>
            <option value="balanced">居中 · 类好主元</option>
            <option value="adversary">对抗 · 总取最小元</option>
          </select>
        </Field>
        <Field label="目标秩 i">
          <select
            data-control="target-rank"
            data-param="target-rank"
            className={control}
            value={target}
            onChange={(e) => setTarget(e.target.value as TargetChoice)}
          >
            <option value="median">上中位数 ⌈n/2⌉</option>
            <option value="quartile">第一四分位 ⌈n/4⌉</option>
          </select>
        </Field>
      </div>
      <Fault
        id="rank-shift-omitted"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        右侧递归忘记秩平移 i←i−k
      </Fault>
      <SelectPlot
        key={`${n}-${policy}-${target}-${fault}-${generation}`}
        n={n}
        policy={policy}
        target={target}
        fault={fault}
      />
      <button
        type="button"
        data-reset="select"
        className={`${control} mt-3`}
        onClick={reset}
      >
        重置实验
      </button>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 3 — 中位数的中位数淘汰保证网格                                  */
/* ------------------------------------------------------------------ */

type MomGrid = {
  n: number;
  s: number;
  g: number;
  groups: number[][];
  sortedGroups: number[][];
  medians: number[];
  x: number;
  less: number;
  greater: number;
  certifiedElim: number;
  certifiedSide: number;
  proofRatio: number;
  exactMaxSide: number;
  guaranteeOk: boolean;
};

function momGrid(n: number, s: number, fault: boolean): MomGrid {
  const values = Array.from({ length: n }, (_, i) => ((11 * i) % n) + 1);
  const g = Math.ceil(n / s);
  const groups: number[][] = [];
  for (let i = 0; i < g; i++) {
    groups.push(values.slice(i * s, Math.min(n, (i + 1) * s)));
  }
  const sortedGroups = groups.map((grp) => [...grp].sort((a, b) => a - b));
  const perGroup = (s + 1) / 2;
  const medians = sortedGroups.map((sg) =>
    fault ? sg[sg.length - 1] : sg[sg.length >> 1],
  );
  const sortedMedians = [...medians].sort((a, b) => a - b);
  const x = sortedMedians[g >> 1];
  const less = values.filter((v) => v < x).length;
  const greater = values.filter((v) => v > x).length;
  const certifiedElim = Math.max(0, perGroup * (Math.ceil(g / 2) - 2));
  const certifiedSide = n - certifiedElim;
  const proofRatio = 1 / s + (1 - (s + 1) / (4 * s));
  const exactMaxSide = Math.max(less, greater);
  const guaranteeOk =
    Math.min(less, greater) >= certifiedElim && exactMaxSide <= certifiedSide;
  return {
    n,
    s,
    g,
    groups,
    sortedGroups,
    medians,
    x,
    less,
    greater,
    certifiedElim,
    certifiedSide,
    proofRatio,
    exactMaxSide,
    guaranteeOk,
  };
}

function MomPlot({ n, s, fault }: { n: number; s: number; fault: boolean }) {
  const grid = useMemo(() => momGrid(n, s, fault), [n, s, fault]);
  const labels = [
    "分组",
    "组内排序取中位",
    "中位数的中位数 x",
    "三路划分计数",
    "保证与预算核对",
  ];
  const trace = useTrace(labels);
  const stage = trace.currentStep;
  const oracle = { ...grid, frame: stage };
  const cellW = Math.min(40, 284 / s);
  const rowH = 24;
  const cellH = 20;
  const gridTop = 38;
  const gridH = grid.g * rowH;
  const mediansY = gridTop + gridH + 26;
  const panelY = mediansY + 36;
  const svgH = panelY + 136;
  const barScale = 120 / n;
  const medianStep = Math.min(34, 264 / Math.max(1, grid.g));

  return (
    <>
      <svg
        viewBox={`0 0 300 ${coord(svgH)}`}
        role="img"
        aria-label="median-of-medians 实验：n 个元素分成每组 s 个的网格，组内排序取中位数，中位数的中位数作为主元，条形显示两侧淘汰数量与理论保证线的关系。"
        fontSize={15}
      >
        <text x={12} y={24} fontSize={13} fontWeight={700} fill={C.ink}>
          n={n} · 组大小 s={s} · {grid.g} 组 · 主元 x={grid.x}
          {fault ? "（故障代表）" : ""}
        </text>

        {grid.groups.map((grp, gi) => (
          <g key={"group-" + gi}>
            {(stage >= 1 ? grid.sortedGroups[gi] : grp).map((value, ci) => {
              const cx = 12 + ci * cellW;
              const cy = gridTop + gi * rowH;
              const isMedian =
                stage >= 1 &&
                ci === grid.sortedGroups[gi].length >> 1 &&
                !fault;
              const isFaultRep =
                fault && stage >= 1 && ci === grid.sortedGroups[gi].length - 1;
              const tone = isFaultRep
                ? C.danger
                : isMedian
                  ? C.accent
                  : C.border;
              return (
                <g key={"cell-" + gi + "-" + ci}>
                  <rect
                    x={coord(cx)}
                    y={coord(cy)}
                    width={coord(cellW - 4)}
                    height={cellH}
                    rx={4}
                    fill={isMedian || isFaultRep ? tone : C.bg}
                    fillOpacity={isMedian || isFaultRep ? 0.2 : 1}
                    stroke={tone}
                    strokeWidth={isMedian || isFaultRep ? 2 : 1}
                  />
                  <text
                    x={coord(cx + (cellW - 4) / 2)}
                    y={coord(cy + cellH / 2 + 4)}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.ink}
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        <g transform={`translate(0 ${coord(mediansY)})`}>
          {stage >= 2 ? (
            grid.medians.map((m, gi) => {
              const cx = 18 + gi * medianStep;
              const isX = m === grid.x;
              return (
                <g key={"median-" + gi}>
                  <circle
                    cx={coord(cx)}
                    cy={10}
                    r={10}
                    fill={isX ? C.accent : C.bg}
                    fillOpacity={isX ? 0.25 : 1}
                    stroke={isX ? C.accent : C.border}
                    strokeWidth={isX ? 2.5 : 1.5}
                  />
                  <text
                    x={coord(cx)}
                    y={14}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.ink}
                  >
                    {m}
                  </text>
                </g>
              );
            })
          ) : (
            <text x={12} y={14} fontSize={11} fill={C.muted}>
              （推进到第 3 步看组中位数行）
            </text>
          )}
          {stage >= 2 && (
            <text x={288} y={14} textAnchor="end" fontSize={11} fill={C.accent}>
              x = {grid.x}
            </text>
          )}

          <g transform="translate(0 34)">
            <text x={12} y={0} fontSize={11} fill={C.muted}>
              三路划分（{stage >= 3 ? "实测" : "待推进"}）
            </text>
            {[
              { label: `< x : ${grid.less}`, count: grid.less, tone: C.accent },
              {
                label: `> x : ${grid.greater}`,
                count: grid.greater,
                tone: C.success,
              },
            ].map((bar, bi) => {
              const y = 10 + bi * 30;
              const overflow = stage >= 4 && bar.count > grid.certifiedSide;
              return (
                <g key={"pbar-" + bi} opacity={stage >= 3 ? 1 : 0.3}>
                  <text x={12} y={coord(y + 12)} fontSize={11} fill={C.muted}>
                    {bar.label}
                  </text>
                  <rect
                    x={86}
                    y={coord(y)}
                    width={coord(Math.max(4, bar.count * barScale))}
                    height={16}
                    rx={4}
                    fill={overflow ? C.danger : bar.tone}
                    fillOpacity={0.3}
                    stroke={overflow ? C.danger : bar.tone}
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}
            <line
              x1={86}
              y1={coord(2)}
              x2={coord(86 + grid.certifiedSide * barScale)}
              y2={coord(2)}
              stroke={C.danger}
              strokeWidth={2}
              strokeDasharray="5 4"
              opacity={stage >= 4 ? 1 : 0.25}
            />
            <text x={12} y={coord(84)} fontSize={11} fill={C.muted}>
              虚线 = 保证线 7n/10+O(1)（本参数 {grid.certifiedSide}）
            </text>
            <text x={12} y={coord(102)} fontSize={11} fill={C.ink}>
              保证每侧 ≥ {grid.certifiedElim} 个被淘汰 · 渐近证明比例{" "}
              {grid.proofRatio.toFixed(3)}
            </text>
            <text
              x={12}
              y={coord(122)}
              fontSize={12}
              fontWeight={700}
              fill={grid.guaranteeOk ? C.success : C.danger}
            >
              {grid.guaranteeOk
                ? "保证成立，递推比例和 < 1 ⇒ 最坏 Θ(n)"
                : "保证被破坏——这一侧越过了证明线"}
            </text>
          </g>
        </g>
      </svg>
      <Readout name="mom-guarantee" value={oracle}>
        {grid.g} 组 × s={s}：x={grid.x}；&lt;x 有 {grid.less} 个，&gt;x 有{" "}
        {grid.greater} 个； 保证每侧淘汰 ≥ {grid.certifiedElim}，较大侧应 ≤{" "}
        {grid.certifiedSide}，实测 {grid.exactMaxSide}；渐近证明比例{" "}
        {grid.proofRatio.toFixed(3)}。核对：
        {grid.guaranteeOk ? "通过" : "失败——代表筛选被跳过"}。
      </Readout>
      <div data-control="mom-timeline">
        <TimelineControls timeline={trace} />
      </div>
    </>
  );
}

export function Clrs4Chapter09MediansOrderStatisticsWorstCaseLab() {
  const [n, setN] = useState(30);
  const [s, setS] = useState(5);
  const [fault, setFault] = useState(false);
  const [generation, setGeneration] = useState(0);
  const reset = () => {
    setN(30);
    setS(5);
    setFault(false);
    setGeneration((g) => g + 1);
  };
  return (
    <Frame
      id="clrs4-09-mom"
      kind="median-of-medians-elimination-guarantee-grid"
      title="实验三：五分组中位数的中位数，保证从哪来"
      intro="本站确定性有限教具：分组、组内排序、代表筛选与三路计数全部真实计算；保证线来自证明结构，不是来自这一次输入运气好。"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="数组长度 n">
          <select
            data-control="mom-array-length"
            data-param="mom-array-length"
            className={control}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          >
            {[25, 30, 35, 40].map((v) => (
              <option key={v} value={v}>
                n = {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="组大小 s">
          <select
            data-control="group-size"
            data-param="group-size"
            className={control}
            value={s}
            onChange={(e) => setS(Number(e.target.value))}
          >
            {[3, 5, 7].map((v) => (
              <option key={v} value={v}>
                s = {v}
                {v === 3 ? "（证明比例=1）" : v === 5 ? "（经典选择）" : ""}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Fault
        id="skip-representative-screening"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        跳过代表筛选：直接用每组最大元冒充满员中位数
      </Fault>
      <MomPlot
        key={`${n}-${s}-${fault}-${generation}`}
        n={n}
        s={s}
        fault={fault}
      />
      <button
        type="button"
        data-reset="mom"
        className={`${control} mt-3`}
        onClick={reset}
      >
        重置实验
      </button>
    </Frame>
  );
}
