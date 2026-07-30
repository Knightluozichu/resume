"use client";

import { useMemo, useState } from "react";

export type ConcreteMathEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  experiment:
    | "cross"
    | "hanoi"
    | "sum"
    | "floor"
    | "gcd"
    | "binomial"
    | "special"
    | "generating"
    | "probability"
    | "asymptotic";
  proofSteps: readonly {
    label: string;
    expression: string;
    reason: string;
  }[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: ConcreteMathEvidenceModel;
  view: "identity-contract" | "exact-workbench" | "proof-gate";
};

const controlClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" className={controlClass} onClick={onReset}>
      重置本实验
    </button>
  );
}

function IdentityContract({ model }: { model: ConcreteMathEvidenceModel }) {
  const [coordinate, setCoordinate] = useState(0);
  const [track, setTrack] = useState<"publisher" | "sample" | "errata">(
    "publisher",
  );
  const [obligation, setObligation] = useState<
    "definition" | "transformation" | "boundary"
  >("definition");

  function reset() {
    setCoordinate(0);
    setTrack("publisher");
    setObligation("definition");
  }

  const trackText = {
    publisher: "出版社页与授权样章目录只确定第二版书志、9章与57个编号小节。",
    sample:
      "出版社授权样章可核对第3章正文；作者页另提供样卷，但不授权复制整本正文。",
    errata:
      "作者勘误与2022替换页修正后续印次，尤其要显式声明 Bernoulli 数的 B₁ 约定。",
  }[track];
  const obligationText = {
    definition: `先写对象、索引域、初值与边界约定；${model.title}不接受无定义的公式。`,
    transformation: `每次换元、交换求和或提取系数都保存等价理由；${model.title}不跳步。`,
    boundary: `用零规模、第一非平凡值和破坏前提的反例验收；${model.title}把失败留在证据中。`,
  }[obligation];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="concrete-math-identity-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            来源身份与证明义务
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先确定目录坐标和来源层，再决定当前结论必须交付哪一种数学证据。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            正式目录坐标
            <select
              className="mt-1 min-h-11 w-full rounded-control border border-border bg-background px-3 py-2 text-sm"
              value={coordinate}
              onChange={(event) => setCoordinate(Number(event.target.value))}
            >
              {model.concepts.map((concept, index) => (
                <option key={`${concept}-${index}`} value={index}>
                  {concept}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-2 sm:grid-cols-3">
            {(["publisher", "sample", "errata"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${controlClass} ${track === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "publisher"
                  ? "出版社目录"
                  : item === "sample"
                    ? "授权样章"
                    : "作者勘误"}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {(
              [
                ["definition", "定义与适用域"],
                ["transformation", "等价变换"],
                ["boundary", "边界与反例"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`${controlClass} w-full ${obligation === value ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={obligation === value}
                onClick={() => setObligation(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">
            坐标 {coordinate + 1}/{model.concepts.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">
            {model.concepts[coordinate]}
          </h4>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">来源能证明什么</dt>
              <dd className="mt-1 text-foreground">{trackText}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">本页证明义务</dt>
              <dd className="mt-1 text-foreground">{obligationText}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">不变量</dt>
              <dd className="mt-1 text-foreground">{model.invariant}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-card border border-border bg-background p-3 text-sm">
      <span className="flex items-center justify-between gap-3">
        <span className="font-medium text-foreground">{label}</span>
        <output className="font-mono text-primary">{value}</output>
      </span>
      <input
        className="mt-3 min-h-11 w-full accent-[var(--primary)]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function choose(n: number, k: number): bigint {
  if (k < 0 || k > n) return BigInt(0);
  const reduced = Math.min(k, n - k);
  let result = BigInt(1);
  for (let i = 1; i <= reduced; i += 1) {
    result = (result * BigInt(n - reduced + i)) / BigInt(i);
  }
  return result;
}

function gcd(a: number, b: number): { value: number; divisions: string[] } {
  let x = Math.abs(a);
  let y = Math.abs(b);
  const divisions: string[] = [];
  while (y !== 0) {
    divisions.push(`${x} = ${Math.floor(x / y)} × ${y} + ${x % y}`);
    [x, y] = [y, x % y];
  }
  return { value: x, divisions };
}

function fibonacci(n: number): bigint {
  let previous = BigInt(0);
  let current = BigInt(1);
  for (let i = 0; i < n; i += 1) {
    [previous, current] = [current, previous + current];
  }
  return previous;
}

type ResultRow = { label: string; value: string; note: string };

function evaluate(
  experiment: ConcreteMathEvidenceModel["experiment"],
  n: number,
  auxiliary: number,
): { rows: ResultRow[]; verdict: string } {
  if (experiment === "hanoi") {
    let recurrence = BigInt(0);
    for (let i = 1; i <= n; i += 1) {
      recurrence = BigInt(2) * recurrence + BigInt(1);
    }
    const closed = (BigInt(1) << BigInt(n)) - BigInt(1);
    return {
      rows: [
        {
          label: "递推重放",
          value: recurrence.toString(),
          note: "从 H₀=0 逐步执行 Hₙ=2Hₙ₋₁+1",
        },
        {
          label: "闭式",
          value: closed.toString(),
          note: "计算 2ⁿ−1",
        },
      ],
      verdict:
        recurrence === closed
          ? "递推值与闭式精确一致。"
          : "两条路径不一致，拒绝闭式。",
    };
  }

  if (experiment === "sum") {
    let direct = BigInt(0);
    for (let k = 0; k <= n; k += 1) direct += BigInt(k);
    const closed = (BigInt(n) * BigInt(n + 1)) / BigInt(2);
    return {
      rows: [
        {
          label: "逐项有限和",
          value: direct.toString(),
          note: `显式累加 k=0…${n}`,
        },
        {
          label: "配对闭式",
          value: closed.toString(),
          note: "n(n+1)/2",
        },
      ],
      verdict:
        direct === closed ? "有限和证书通过。" : "边界项不一致，拒绝变换。",
    };
  }

  if (experiment === "floor") {
    const divisor = Math.max(2, auxiliary);
    let direct = 0;
    for (let k = 0; k <= n; k += 1) direct += Math.floor(k / divisor);
    const quotient = Math.floor(n / divisor);
    const remainder = n % divisor;
    const blocked =
      (divisor * quotient * (quotient - 1)) / 2 + quotient * (remainder + 1);
    return {
      rows: [
        {
          label: "逐项取整和",
          value: direct.toString(),
          note: `Σ floor(k/${divisor})，k=0…${n}`,
        },
        {
          label: "按商分块",
          value: blocked.toString(),
          note: `q=${quotient}，r=${remainder}`,
        },
      ],
      verdict:
        direct === blocked
          ? "逐项枚举与商—余数分块一致。"
          : "分块遗漏边界，拒绝公式。",
    };
  }

  if (experiment === "gcd") {
    const a = n + 12;
    const b = auxiliary + 6;
    const result = gcd(a, b);
    return {
      rows: [
        {
          label: "输入整数",
          value: `(${a}, ${b})`,
          note: "只在整数域执行 Euclid 算法",
        },
        {
          label: "最大公约数",
          value: result.value.toString(),
          note: result.divisions.join("；"),
        },
      ],
      verdict: `${result.value} 同时整除两个输入；除法链的最后非零余数给出证书。`,
    };
  }

  if (experiment === "binomial") {
    const r = n;
    const s = auxiliary + 4;
    const target = Math.min(6, r + s);
    let convolution = BigInt(0);
    for (let k = 0; k <= target; k += 1) {
      convolution += choose(r, k) * choose(s, target - k);
    }
    const merged = choose(r + s, target);
    return {
      rows: [
        {
          label: "Vandermonde 左侧",
          value: convolution.toString(),
          note: `Σ C(${r},k)C(${s},${target}−k)`,
        },
        {
          label: "一次选择",
          value: merged.toString(),
          note: `C(${r + s},${target})`,
        },
      ],
      verdict:
        convolution === merged
          ? "卷积分组与从并集直接选择精确一致。"
          : "组合边界不一致，拒绝恒等式。",
    };
  }

  if (experiment === "special") {
    const current = fibonacci(n);
    const next = fibonacci(n + 1);
    const after = fibonacci(n + 2);
    return {
      rows: [
        {
          label: `F_${n}`,
          value: current.toString(),
          note: "F₀=0，F₁=1",
        },
        {
          label: `F_${n + 2}`,
          value: after.toString(),
          note: `${current}+${next}=${current + next}`,
        },
        {
          label: "Bernoulli 约定",
          value: "B₁=+1/2",
          note: "本站跟随作者2022替换页；与 B₁=−1/2 的来源换算后再比较",
        },
      ],
      verdict:
        current + next === after
          ? "Fibonacci 递推通过；Bernoulli 符号约定已显式冻结。"
          : "特殊数递推不一致。",
    };
  }

  if (experiment === "generating") {
    let coefficient = 0;
    for (let k = 0; k <= n; k += 1) coefficient += 1 * 1;
    return {
      rows: [
        {
          label: "Cauchy 卷积",
          value: coefficient.toString(),
          note: `Σ 1·1，k=0…${n}`,
        },
        {
          label: "代数提取",
          value: (n + 1).toString(),
          note: "[zⁿ](1−z)⁻²=n+1",
        },
      ],
      verdict:
        coefficient === n + 1
          ? "形式幂级数乘法与逐项卷积一致。"
          : "系数提取失败。",
    };
  }

  if (experiment === "probability") {
    const bins = Math.max(2, auxiliary);
    const pairs = (n * (n - 1)) / 2;
    const expectation = pairs / bins;
    return {
      rows: [
        {
          label: "键对数量",
          value: pairs.toString(),
          note: `C(${n},2)`,
        },
        {
          label: "期望碰撞对",
          value: expectation.toFixed(4),
          note: `C(n,2)/${bins}；只要求均匀哈希，不要求各指示变量独立`,
        },
      ],
      verdict:
        "这是期望的精确代数值，不是一次随机模拟结果；方差仍需另算协方差。",
    };
  }

  if (experiment === "asymptotic") {
    const positiveN = Math.max(1, n);
    let harmonic = 0;
    for (let k = 1; k <= positiveN; k += 1) harmonic += 1 / k;
    const gamma = 0.5772156649015329;
    const approximation = Math.log(positiveN) + gamma + 1 / (2 * positiveN);
    const residual = harmonic - approximation;
    return {
      rows: [
        {
          label: "精确有限和",
          value: harmonic.toFixed(10),
          note: `H_${positiveN}=Σ 1/k`,
        },
        {
          label: "三项近似",
          value: approximation.toFixed(10),
          note: "ln n + γ + 1/(2n)",
        },
        {
          label: "有符号残差",
          value: residual.toExponential(4),
          note: "精确值减近似值；下一修正项的量级为 n⁻²",
        },
      ],
      verdict:
        "残差随 n 变化只诊断近似质量；没有余项定理时不能把图上接近当成证明。",
    };
  }

  const triangular = (n * (n + 1)) / 2;
  const gcdResult = gcd(n + 12, auxiliary + 6).value;
  const binomial = choose(n, Math.min(3, n));
  return {
    rows: [
      {
        label: "有限和坐标",
        value: triangular.toString(),
        note: "n(n+1)/2",
      },
      {
        label: "数论坐标",
        value: gcdResult.toString(),
        note: `gcd(${n + 12},${auxiliary + 6})`,
      },
      {
        label: "组合坐标",
        value: binomial.toString(),
        note: `C(${n},${Math.min(3, n)})`,
      },
    ],
    verdict:
      "三种结果来自不同定义与证书；全书地图只连接它们，不把它们压成无意义综合分。",
  };
}

function ExactWorkbench({ model }: { model: ConcreteMathEvidenceModel }) {
  const [n, setN] = useState(8);
  const [auxiliary, setAuxiliary] = useState(5);
  const evaluation = useMemo(
    () => evaluate(model.experiment, n, auxiliary),
    [auxiliary, model.experiment, n],
  );

  function reset() {
    setN(8);
    setAuxiliary(5);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="concrete-math-exact-workbench"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            精确值—变换值双路重放
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            调整整数输入，比较定义侧的逐步计算与变换侧的公式；所有数字都可由当前输入复算。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <RangeControl
          label="主整数 n"
          value={n}
          min={model.experiment === "probability" ? 2 : 1}
          max={model.experiment === "hanoi" ? 24 : 40}
          onChange={setN}
        />
        <RangeControl
          label={
            model.experiment === "probability"
              ? "桶数量 m"
              : model.experiment === "floor"
                ? "除数 m"
                : "辅助整数 m"
          }
          value={auxiliary}
          min={2}
          max={20}
          onChange={setAuxiliary}
        />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3" aria-live="polite">
        {evaluation.rows.map((row) => (
          <article
            key={row.label}
            className="rounded-card border border-border bg-background p-4"
          >
            <p className="text-xs text-muted-foreground">{row.label}</p>
            <p className="mt-1 break-words font-mono text-lg font-semibold text-primary">
              {row.value}
            </p>
            <p className="mt-2 text-sm text-foreground">{row.note}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 rounded-card border border-border bg-background p-3 text-sm text-foreground">
        <span className="font-semibold">裁决：</span>
        {evaluation.verdict}
      </p>
    </section>
  );
}

function ProofGate({ model }: { model: ConcreteMathEvidenceModel }) {
  const [trace, setTrace] = useState<"baseline" | "fault" | "recovery">(
    "baseline",
  );
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(() =>
    model.gates.map(() => false),
  );
  const current = model.proofSteps[step] ?? model.proofSteps[0];

  function reset() {
    setTrace("baseline");
    setStep(0);
    setChecked(model.gates.map(() => false));
  }

  function toggleGate(index: number) {
    setChecked((previous) =>
      previous.map((value, itemIndex) =>
        itemIndex === index ? !value : value,
      ),
    );
  }

  const traceText =
    trace === "baseline"
      ? current?.reason
      : trace === "fault"
        ? `只注入“${model.fault}”。在“${current?.label}”检查表达式 ${current?.expression} 的第一个失效前提。`
        : `撤销故障，从原始定义重放“${current?.label}”；只有表达式 ${current?.expression} 与边界样例同时恢复才通过。`;

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="concrete-math-proof-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—反例—恢复证明轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            沿推导步骤定位首个失效前提，并逐项关闭发布门；勾选状态不会生成正确率。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(["baseline", "fault", "recovery"] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={`${controlClass} ${trace === item ? "border-primary bg-primary/10" : ""}`}
            aria-pressed={trace === item}
            onClick={() => setTrace(item)}
          >
            {item === "baseline"
              ? "参考推导"
              : item === "fault"
                ? "单前提反例"
                : "撤销后重放"}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          {model.proofSteps.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
              type="button"
              className={`${controlClass} w-full ${step === index ? "border-primary bg-primary/10" : ""}`}
              aria-pressed={step === index}
              onClick={() => setStep(index)}
            >
              <span className="mr-2 font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">当前等式或关系</p>
          <p className="mt-1 font-mono text-sm font-semibold text-primary">
            {current?.expression}
          </p>
          <p className="mt-3 text-sm text-foreground">{traceText}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            交付工件：{model.artifact}
          </p>
        </article>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-foreground">
          发布前逐项核对
        </legend>
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {model.gates.map((gate, index) => (
            <label
              key={gate.label}
              className="flex cursor-pointer gap-3 rounded-card border border-border bg-background p-3"
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--primary)]"
                checked={checked[index] ?? false}
                onChange={() => toggleGate(index)}
              />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {gate.label}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {gate.detail}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}

export function ConcreteMathEvidenceLab({ model, view }: Props) {
  if (view === "identity-contract") {
    return <IdentityContract model={model} />;
  }
  if (view === "exact-workbench") {
    return <ExactWorkbench model={model} />;
  }
  return <ProofGate model={model} />;
}
