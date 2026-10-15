"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent";
const control =
  "min-h-11 min-w-11 rounded border border-border bg-bg px-3 py-2 text-sm text-primary";
const svgClass = "mx-auto my-4 block w-full max-w-[280px]";
const fmt = (n: number) => n.toFixed(3);
function softmax(values: number[]) {
  const weights = values.map((v) => Math.exp(v - Math.max(...values)));
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map((v) => v / sum);
}
function subscribeMotion(cb: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
}
function useClock(last: number) {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  };
  useEffect(() => {
    if (!playing || reduced) return;
    timer.current = setInterval(
      () => setStep((s) => (s + 1) % (last + 1)),
      900,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
  }, [playing, reduced, last]);
  return {
    step,
    reduced,
    playing: playing && !reduced,
    seek: (n: number) => {
      stop();
      setStep(n);
    },
    toggle: () => {
      if (playing) stop();
      else if (!reduced) setPlaying(true);
    },
    reset: () => {
      stop();
      setStep(0);
    },
  };
}
function Clock({
  clock,
  last,
  label,
}: {
  clock: ReturnType<typeof useClock>;
  last: number;
  label: string;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button
        className={control}
        data-play
        disabled={clock.reduced}
        onClick={clock.toggle}
      >
        {clock.playing ? "暂停" : "播放"}
      </button>
      <label className="flex min-w-0 flex-1 flex-col text-sm">
        {label} {clock.step}/{last}
        <input
          aria-label={label}
          type="range"
          min={0}
          max={last}
          value={clock.step}
          onChange={(e) => clock.seek(Number(e.target.value))}
        />
      </label>
      {clock.reduced && (
        <p className="w-full text-sm">
          减少动态效果：自动播放已禁用，可手动改变进度。
        </p>
      )}
    </div>
  );
}
function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      {label}
      <select
        className={control}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(([v, t]) => (
          <option value={v} key={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

export function LlmOfficialFinalReviewContextContractLab() {
  const [split, setSplit] = useState("merged");
  const [temperature, setTemperature] = useState(1);
  const [query, setQuery] = useState(0);
  const [fault, setFault] = useState(false);
  const clock = useClock(3);
  const tokens = split === "merged" ? ["ab", "c"] : ["a", "b", "c"];
  const lookup: Record<string, number[]> = {
    a: [1, 0],
    b: [0, 1],
    ab: [1, 1],
    c: [1, -1],
  };
  const vectors = tokens.map((t) => lookup[t]);
  const scores = vectors.map((q) =>
    vectors.map((k) => (q[0] * k[0] + q[1] * k[1]) / Math.sqrt(2)),
  );
  const weights = scores.map((row, i) => {
    const allowed = row.filter((_, j) => fault || j <= i);
    const probs = softmax(allowed);
    return row.map((_, j) => (fault || j <= i ? probs[j] : 0));
  });
  const hidden = [0, 1].map((d) =>
    weights[query].reduce((s, w, j) => s + w * vectors[j][d], 0),
  );
  const probs = softmax([hidden[0] / temperature, hidden[1] / temperature, 0]);
  const future = weights[query].reduce((s, w, j) => s + (j > query ? w : 0), 0);
  const reset = () => {
    setSplit("merged");
    setTemperature(1);
    setQuery(0);
    setFault(false);
    clock.reset();
  };
  return (
    <section
      className={shell}
      data-lab="chain"
      data-visual-kind="token-attention-logit-matrix"
      aria-label="实验1 词元到下一词元"
    >
      <h3 className="text-lg font-semibold">实验1：同一字符，不同计算链</h3>
      <p className="mt-2 text-sm">
        手工词表与恒等 Q/K/V。先预测：拆开 ab 后，行0会读到 b
        吗？未来权重不是输出概率。
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Select
          label="分词方式"
          value={split}
          options={[
            ["merged", "合并 ab｜c"],
            ["split", "拆分 a｜b｜c"],
          ]}
          onChange={(v) => {
            setSplit(v);
            setQuery(0);
            clock.reset();
          }}
        />
        <Select
          label="输出温度"
          value={temperature}
          options={[
            ["0.5", "0.5"],
            ["1", "1"],
            ["2", "2"],
          ]}
          onChange={(v) => setTemperature(Number(v))}
        />
        <Select
          label="查询位置"
          value={query}
          options={tokens.map((t, i) => [String(i), `${i}：${t}`])}
          onChange={(v) => setQuery(Number(v))}
        />
      </div>
      <svg
        className={svgClass}
        viewBox="0 0 280 426"
        role="img"
        aria-label="词元嵌入、因果注意力矩阵与输出概率"
        fontSize="13"
        fill={C.text}
      >
        <text x="8" y="18">
          0 嵌入：token → [x₀, x₁]
        </text>
        {tokens.map((t, j) => (
          <g key={t}>
            <rect
              x={8 + j * 88}
              y="30"
              width="80"
              height="42"
              rx="4"
              fill={j === query ? C.accent : C.bg}
              fillOpacity={j === query ? 0.18 : 1}
              stroke={C.border}
            />
            <text x={48 + j * 88} y="47" textAnchor="middle">
              {j}: {t}
            </text>
            <text x={48 + j * 88} y="64" textAnchor="middle">
              [{vectors[j].join(", ")}]
            </text>
          </g>
        ))}
        <text x="8" y="98">
          {clock.step < 2 ? "1 缩放点积 sᵢⱼ" : "2 掩码后权重 aᵢⱼ"}
        </text>
        <text x="8" y="119" fill={C.muted}>
          行 = 查询 i；列 = 键 j
        </text>
        {tokens.map((t, j) => (
          <text key={t} x={78 + j * 64} y="142" textAnchor="middle">
            {j}: {t}
          </text>
        ))}
        {tokens.map((t, i) => (
          <g key={t}>
            <text x="14" y={178 + i * 48}>
              {i}
            </text>
            {tokens.map((k, j) => (
              <g key={k}>
                <rect
                  x={48 + j * 64}
                  y={151 + i * 48}
                  width="60"
                  height="44"
                  fill={clock.step >= 2 && !fault && j > i ? C.bg : C.accent}
                  fillOpacity={
                    clock.step >= 2 && !fault && j > i
                      ? 1
                      : 0.06 + (clock.step >= 2 ? weights[i][j] : 0.3) * 0.6
                  }
                  stroke={i === query ? C.accent : C.border}
                />
                <text
                  x={78 + j * 64}
                  y={178 + i * 48}
                  textAnchor="middle"
                  fill={clock.step >= 2 && j > i && fault ? C.danger : C.text}
                >
                  {clock.step < 2
                    ? scores[i][j].toFixed(2)
                    : !fault && j > i
                      ? "遮挡"
                      : fmt(weights[i][j])}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="8" y="315">
          3 h = [{hidden.map(fmt).join(", ")}]
        </text>
        <text x="8" y="336" fill={C.muted}>
          softmax([h₀,h₁,0] / T)
        </text>
        {["甲", "乙", "EOS"].map((t, i) => (
          <g key={t}>
            <rect
              x={17 + i * 88}
              y={395 - (clock.step === 3 ? probs[i] * 48 : 0)}
              width="64"
              height={clock.step === 3 ? probs[i] * 48 : 0}
              fill={C.accent}
            />
            <text x={49 + i * 88} y="414" textAnchor="middle">
              {t} {clock.step === 3 ? fmt(probs[i]) : "待计算"}
            </text>
          </g>
        ))}
      </svg>
      <output
        className="block text-sm"
        data-result
      >{`未来权重=${fmt(future)}；p(甲)=${fmt(probs[0])}；阶段=${clock.step}`}</output>
      <p className="mt-2 text-sm">
        阶段0/1定位输入与分数，阶段2施加掩码，阶段3显示输出柱。数值读数始终可复核。没有位置编码、残差或训练，不能当真实模型能力。
      </p>
      <Clock clock={clock} last={3} label="计算阶段" />
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          className={control}
          data-fault
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          {fault ? "恢复因果掩码" : "故障：放开未来列"}
        </button>
        <button className={control} data-reset onClick={reset}>
          完整重置
        </button>
      </div>
    </section>
  );
}

export function LlmOfficialFinalReviewComputeTraceLab() {
  const [alpha, setAlpha] = useState(0.5);
  const [beta, setBeta] = useState(1);
  const [winner, setWinner] = useState("B");
  const [fault, setFault] = useState(false);
  const clock = useClock(4);
  const reward = fault ? [0.9, 0.1] : winner === "A" ? [1, 0] : [0, 1];
  const retrieval = 0.9 * alpha + 0.2 * (1 - alpha);
  const optimal = softmax(reward.map((r) => r / beta));
  const objective = (p: number) =>
    p * reward[0] +
    (1 - p) * reward[1] -
    beta * (p * Math.log(p / 0.5) + (1 - p) * Math.log((1 - p) / 0.5));
  const trial = 0.1 + 0.2 * clock.step;
  const points = Array.from({ length: 49 }, (_, i) => {
    const p = 0.01 + (i * 0.98) / 48;
    return { p, j: objective(p) };
  });
  const minJ = Math.min(...points.map((v) => v.j), -0.05) - 0.05;
  const maxJ = Math.max(...points.map((v) => v.j)) + 0.1;
  const px = (p: number) => 36 + p * 218;
  const py = (j: number) => 340 - ((j - minJ) / (maxJ - minJ)) * 94;
  const path = points
    .map((v, i) => `${i ? "L" : "M"}${px(v.p)},${py(v.j)}`)
    .join(" ");
  const reset = () => {
    setAlpha(0.5);
    setBeta(1);
    setWinner("B");
    setFault(false);
    clock.reset();
  };
  return (
    <section
      className={shell}
      data-lab="objectives"
      data-visual-kind="latent-mixture-preference-objective"
      aria-label="实验2 检索与偏好目标"
    >
      <h3 className="text-lg font-semibold">实验2：求概率，还是优化偏好？</h3>
      <p className="mt-2 text-sm">
        上方边宽是 r(z)g(y|z)，下方曲线是 J(p)。参考策略始终为
        [0.5,0.5]，不是上方检索分布。
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Select
          label="文档0先验"
          value={alpha}
          options={[
            ["0.5", "0.5"],
            ["0.8", "0.8"],
          ]}
          onChange={(v) => setAlpha(Number(v))}
        />
        <Select
          label="KL惩罚系数"
          value={beta}
          options={[
            ["0.5", "0.5"],
            ["1", "1"],
            ["2", "2"],
          ]}
          onChange={(v) => setBeta(Number(v))}
        />
        <Select
          label="奖励偏向"
          value={winner}
          options={[
            ["A", "A 得1分"],
            ["B", "B 得1分"],
          ]}
          onChange={setWinner}
        />
      </div>
      <svg
        className={svgClass}
        viewBox="0 0 280 410"
        role="img"
        aria-label="潜文档概率合流与KL正则目标曲线"
        fontSize="13"
        fill={C.text}
      >
        <text x="8" y="18">
          潜文档 z 回答 y
        </text>
        {[
          [alpha * 0.9, 0, 0],
          [alpha * 0.1, 0, 1],
          [(1 - alpha) * 0.2, 1, 0],
          [(1 - alpha) * 0.8, 1, 1],
        ].map(([w, i, j], n) => (
          <line
            key={n}
            x1="76"
            y1={53 + i * 86}
            x2="200"
            y2={53 + j * 86}
            stroke={C.accent}
            strokeWidth={1 + 10 * w}
            opacity="0.6"
          />
        ))}
        {[alpha, 1 - alpha].map((p, i) => (
          <g key={i}>
            <circle
              cx="42"
              cy={53 + i * 86}
              r="28"
              fill={C.panel}
              stroke={C.accent}
            />
            <text x="42" y={50 + i * 86} textAnchor="middle">
              z{i}
            </text>
            <text x="42" y={67 + i * 86} textAnchor="middle">
              {p.toFixed(1)}
            </text>
          </g>
        ))}
        {[retrieval, 1 - retrieval].map((p, i) => (
          <g key={i}>
            <circle
              cx="234"
              cy={53 + i * 86}
              r="30"
              fill={C.panel}
              stroke={C.border}
            />
            <text x="234" y={50 + i * 86} textAnchor="middle">
              {i ? "B" : "A"}
            </text>
            <text x="234" y={68 + i * 86} textAnchor="middle">
              {fmt(p)}
            </text>
          </g>
        ))}
        <text x="8" y="190">
          g(A|z₀)=.9；g(A|z₁)=.2
        </text>
        <text x="8" y="212">
          奖励 [{reward.join(", ")}]，β={beta}
        </text>
        <text x="8" y="235">
          J(p) = E[r] − β KL(p ∥ ref)
        </text>
        <line x1="36" y1="246" x2="36" y2="341" stroke={C.border} />
        <line x1="36" y1="341" x2="254" y2="341" stroke={C.border} />
        <text x="6" y="258" fill={C.muted}>
          {maxJ.toFixed(1)}
        </text>
        <text x="6" y="340" fill={C.muted}>
          {minJ.toFixed(1)}
        </text>
        <path
          d={path}
          fill="none"
          stroke={fault ? C.danger : C.accent}
          strokeWidth="2"
        />
        <circle cx={px(trial)} cy={py(objective(trial))} r="5" fill={C.text} />
        <line
          x1={px(optimal[0])}
          x2={px(optimal[0])}
          y1="246"
          y2="341"
          stroke={C.danger}
          strokeDasharray="4 3"
        />
        <text x="36" y="362">
          0
        </text>
        <text x="250" y="362">
          1
        </text>
        <text x="145" y="362" textAnchor="middle">
          p(A)
        </text>
        <text x="8" y="384">
          虚线最优 p*(A)={fmt(optimal[0])}
        </text>
        <text x="8" y="404">
          圆点试算 p(A)={trial.toFixed(1)}
        </text>
      </svg>
      <output
        className="block text-sm"
        data-result
      >{`RAG(A)=${fmt(retrieval)}；最优π(A)=${fmt(optimal[0])}；试算J=${fmt(objective(trial))}`}</output>
      <p className="mt-2 text-sm">
        改变文档先验只改上方概率；改变奖励或 β 只改下方目标。故障以文档0的似然
        [.9,.1] 冒充奖励，曲线变了不代表证据更真实。有限两动作精确解，不是一次
        PPO 训练。
      </p>
      <Clock clock={clock} last={4} label="策略候选游标" />
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          className={control}
          data-fault
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          {fault ? "恢复独立奖励" : "故障：似然冒充奖励"}
        </button>
        <button className={control} data-reset onClick={reset}>
          完整重置
        </button>
      </div>
    </section>
  );
}

export function LlmOfficialFinalReviewEvidenceGateLab() {
  const [retrieved, setRetrieved] = useState(8);
  const [image, setImage] = useState(4);
  const [batch, setBatch] = useState(1);
  const [budget, setBudget] = useState(16);
  const [fault, setFault] = useState(false);
  const clock = useClock(8);
  const context = 8 + retrieved + image;
  const perRequest = (context + clock.step) / 4;
  const actual = 6 + batch * perRequest;
  const reported = 6 + batch * perRequest * (fault ? 0.5 : 1);
  const capacity = Math.floor((budget - 6) / ((context + 8) / 4));
  const claimed = Math.floor(
    (budget - 6) / (((context + 8) / 4) * (fault ? 0.5 : 1)),
  );
  const reset = () => {
    setRetrieved(8);
    setImage(4);
    setBatch(1);
    setBudget(16);
    setFault(false);
    clock.reset();
  };
  return (
    <section
      className={shell}
      data-lab="memory"
      data-visual-kind="kv-address-capacity-map"
      aria-label="实验3 KV内存与容量"
    >
      <h3 className="text-lg font-semibold">实验3：一条请求怎样占满内存？</h3>
      <p className="mt-2 text-sm">
        手工小模型：4层、2个 KV 头、头宽8、每元素2字节。每词元 K+V=256
        B；固定权重4 KiB、工作区2 KiB。没有测量实际硬件。
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Select
          label="检索词元"
          value={retrieved}
          options={[
            ["0", "0"],
            ["8", "8"],
          ]}
          onChange={(v) => setRetrieved(Number(v))}
        />
        <Select
          label="图像槽位"
          value={image}
          options={[
            ["0", "0"],
            ["4", "4"],
          ]}
          onChange={(v) => setImage(Number(v))}
        />
        <Select
          label="并发请求"
          value={batch}
          options={[
            ["1", "1"],
            ["2", "2"],
          ]}
          onChange={(v) => setBatch(Number(v))}
        />
        <Select
          label="内存预算KiB"
          value={budget}
          options={[
            ["16", "16"],
            ["32", "32"],
          ]}
          onChange={(v) => setBudget(Number(v))}
        />
      </div>
      <svg
        className={svgClass}
        viewBox="0 0 280 420"
        role="img"
        aria-label="输入槽位与真实KV地址占用，包含预算之外的溢出区域"
        fontSize="13"
        fill={C.text}
      >
        <text x="8" y="18">
          每请求槽位（不是图像真实patch数）
        </text>
        {Array.from({ length: context + clock.step }, (_, i) => (
          <rect
            key={i}
            x={8 + i * 9}
            y="30"
            width="7"
            height="24"
            fill={
              i < 8
                ? C.text
                : i < 8 + retrieved
                  ? C.accent
                  : i < context
                    ? C.muted
                    : C.danger
            }
          />
        ))}
        <text x="8" y="77">
          文本8 / 检索{retrieved} / 图像{image}
        </text>
        <text x="8" y="99">
          已生成{clock.step}；每请求 {perRequest.toFixed(2)} KiB
        </text>
        <text x="8" y="127">
          实际地址图：每格1 KiB（共32格）
        </text>
        {Array.from({ length: 32 }, (_, i) => {
          const used = Math.max(0, Math.min(1, actual - i));
          const x = 8 + (i % 8) * 33,
            y = 140 + Math.floor(i / 8) * 31;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="30"
                height="27"
                fill={C.bg}
                stroke={i >= budget ? C.danger : C.border}
                strokeDasharray={i >= budget ? "3 2" : undefined}
              />
              <rect
                x={x}
                y={y}
                width={30 * used}
                height="27"
                fill={
                  i < 4
                    ? C.muted
                    : i < 6
                      ? C.text
                      : i >= budget
                        ? C.danger
                        : C.accent
                }
                opacity="0.32"
              />
              <text x={x + 15} y={y + 18} textAnchor="middle">
                {i}
              </text>
            </g>
          );
        })}
        <text x="8" y="287">
          0–3 权重；4–5 工作区；6起 KV
        </text>
        <text x="8" y="310" fill={actual > budget ? C.danger : C.text}>
          实际 {actual.toFixed(2)} / {budget} KiB
        </text>
        <text x="8" y="333" fill={fault ? C.danger : C.text}>
          报告 {reported.toFixed(2)} KiB（
          {reported <= budget ? "可容纳" : "超预算"}）
        </text>
        <text x="8" y="357">
          终长容量：实际{capacity} / 声称{claimed}
        </text>
        <text x="8" y="379" fill={C.muted}>
          终长 = 输入{context} + 输出8
        </text>
        <text x="8" y="399" fill={C.muted}>
          红虚框：预算外地址，不是可用内存
        </text>
      </svg>
      <output
        className="block text-sm"
        data-result
      >{`实际=${actual.toFixed(2)}KiB；报告=${reported.toFixed(2)}KiB；容量=${capacity}/${claimed}；生成=${clock.step}`}</output>
      <p className="mt-2 text-sm">
        试设并发2并生成到8，预算16：实际20 KiB；漏掉 V 后却报告13
        KiB。图始终画真实占用，错误只改报表。简化模型不含分页碎片、通信、激活峰值或多设备分摊；并发容量不是吞吐量。
      </p>
      <Clock clock={clock} last={8} label="生成词元游标" />
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          className={control}
          data-fault
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          {fault ? "恢复K加V计数" : "故障：漏算V缓存"}
        </button>
        <button className={control} data-reset onClick={reset}>
          完整重置
        </button>
      </div>
    </section>
  );
}
