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
const svgClass = "mx-auto block w-full max-w-[280px]";
const fmt = (n: number) => n.toFixed(3);
function softmax(xs: number[]) {
  const es = xs.map((x) => Math.exp(x - Math.max(...xs)));
  return es.map((e) => e / es.reduce((a, b) => a + b, 0));
}
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
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
      1000,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
  }, [playing, reduced, last]);
  return {
    step,
    playing: playing && !reduced,
    reduced,
    seek: (s: number) => {
      stop();
      setStep(s);
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
function ClockControls({
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
        onClick={clock.toggle}
        disabled={clock.reduced}
        data-play
      >
        {clock.playing ? "暂停" : "播放"}
      </button>
      <label className="flex min-w-0 flex-1 flex-col text-sm">
        {label} {clock.step + 1}/{last + 1}
        <input
          aria-label={label}
          type="range"
          min="0"
          max={last}
          value={clock.step}
          onChange={(e) => clock.seek(Number(e.target.value))}
        />
      </label>
      {clock.reduced && (
        <p className="w-full text-sm">
          减少动态效果已启用：只允许手动逐步查看。
        </p>
      )}
    </div>
  );
}

export function Llm08RetrievalAugmentedLmContextContractLab() {
  const [metric, setMetric] = useState("l2");
  const [k, setK] = useState(2);
  const [lambda, setLambda] = useState(0.4);
  const [corpus, setCorpus] = useState("text");
  const [fault, setFault] = useState(false);
  const entries = [
    { id: "A", key: [0.8, 0.6], token: "桥" },
    {
      id: "B",
      key: fault
        ? metric === "dot"
          ? [6, 0]
          : [1, 0]
        : corpus === "image"
          ? [4, 0.4]
          : [3, 4],
      token: "河",
    },
    { id: "C", key: [0.6, -0.8], token: "桥" },
  ].map((d) => {
    const norm = Math.hypot(...d.key);
    const key = metric === "cosine" ? d.key.map((x) => x / norm) : d.key;
    return {
      ...d,
      plot: key,
      score: metric === "l2" ? -((1 - key[0]) ** 2 + key[1] ** 2) : key[0],
    };
  });
  const selected = [...entries]
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, k);
  const weights = softmax(selected.map((d) => d.score));
  const bridge = selected.reduce(
    (s, d, i) => s + (d.token === "桥" ? weights[i] : 0),
    0,
  );
  const out = (1 - lambda) * 0.6 + lambda * bridge;
  const reset = () => {
    setMetric("l2");
    setK(2);
    setLambda(0.4);
    setCorpus("text");
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="knn"
      data-visual-kind="embedding-scatter-neighbor-mixture"
      aria-label="实验1：近邻词元概率"
    >
      <h3 className="text-lg font-semibold">实验1 · 向量近，不等于证据真</h3>
      <p className="mt-2 text-sm">
        固定 q=(1,0)，A/C 的值是“桥”，B 的值是“河”。默认 s=−‖q−k‖²，按 exp(s)
        合票；内积/余弦仅是相似度 toy
        对照，不是原论文的原样算法。图像键只是手工配对向量，不是视觉模型。
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          距离核 / 对照相似度
          <select
            className={control}
            aria-label="相似度"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          >
            <option value="l2">负平方 L2（距离核）</option>
            <option value="cosine">归一化内积（余弦）</option>
            <option value="dot">原始内积</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          近邻数量 k
          <select
            className={control}
            aria-label="近邻数量"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          >
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          键库（值均为文本）
          <select
            className={control}
            aria-label="键库"
            value={corpus}
            onChange={(e) => setCorpus(e.target.value)}
          >
            <option value="text">文本上下文键</option>
            <option value="image">图像键：改变 B 位置</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          插值 λ={lambda.toFixed(1)}
          <input
            aria-label="插值权重"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={lambda}
            onChange={(e) => setLambda(Number(e.target.value))}
          />
        </label>
      </div>
      <svg
        viewBox="0 0 280 260"
        className={svgClass}
        role="img"
        aria-label="二维检索键与查询的几何图；实心点为入选邻居"
        fontSize="12"
      >
        <path d="M 40 225 V 22 M 40 155 H 260" stroke={C.border} fill="none" />
        <text x="247" y="175" fill={C.muted}>
          x
        </text>
        <text x="9" y="24" fill={C.muted}>
          y
        </text>
        {[1, 3, 6].map((x) => (
          <text
            key={x}
            x={40 + x * 34}
            y="242"
            fill={C.muted}
            textAnchor="middle"
          >
            {x}
          </text>
        ))}
        {metric === "cosine" && (
          <circle
            cx="40"
            cy="155"
            r="34"
            fill="none"
            stroke={C.border}
            strokeDasharray="3 3"
          />
        )}
        {entries.map((d, i) => {
          const x = 40 + d.plot[0] * 34,
            y = 155 - d.plot[1] * 34;
          const chosen = selected.some((s) => s.id === d.id);
          const lx = i === 1 ? 148 : 30,
            ly = i === 0 ? 110 : i === 1 ? 50 : 205;
          const color = fault && d.id === "B" ? C.danger : C.accent;
          return (
            <g key={d.id}>
              <line
                x1="40"
                y1="155"
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth={chosen ? 2 : 1}
                strokeDasharray={chosen ? undefined : "3 3"}
              />
              <circle
                cx={x}
                cy={y}
                r={chosen ? 5 : 3}
                fill={chosen ? color : C.bg}
                stroke={color}
              />
              <path
                d={`M${x},${y} L${lx + 8},${ly + 5}`}
                stroke={C.border}
                fill="none"
              />
              <text x={lx} y={ly} fill={color}>
                {d.id}: ({fmt(d.plot[0])}, {fmt(d.plot[1])})
              </text>
            </g>
          );
        })}
        <path d="M40 155 H74" stroke={C.text} strokeWidth="2" />
        <path d="M74 155 l-5 -4 v8 z" fill={C.text} />
        <text x="89" y="164" fill={C.text}>
          q=(1,0)
        </text>
      </svg>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="mb-2 text-left">
            入选顺序与归一化票数（T=1）
          </caption>
          <thead>
            <tr>
              <th>键→值</th>
              <th>分数</th>
              <th>票数</th>
            </tr>
          </thead>
          <tbody>
            {selected.map((d, i) => (
              <tr key={d.id}>
                <td className="py-2">
                  {d.id}→{d.token}
                </td>
                <td>{fmt(d.score)}</td>
                <td>{fmt(weights[i])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm" data-output>
        p近邻(桥)={fmt(bridge)}；p混合(桥)={fmt(out)}，p混合(河)={fmt(1 - out)}
        。
      </p>
      <p className="mt-2 text-sm" role="status">
        {fault
          ? "阻断：B 索引已污染。这里显示未经防护的算法票数，不得据此采信内容或执行文档指令。"
          : "证据边界：这里只计算相似性与概率；没有核验桥/河是否为问题的事实答案。静态几何无时间轴，故不设播放。"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className={control}
          data-fault
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          {" "}
          {fault ? "撤销索引污染" : "注入索引污染"}
        </button>
        <button className={control} data-reset onClick={reset}>
          完整重置
        </button>
      </div>
    </section>
  );
}

export function Llm08RetrievalAugmentedLmComputeTraceLab() {
  const [mode, setMode] = useState("sequence");
  const [r, setR] = useState(0.5);
  const [fault, setFault] = useState(false);
  const clock = useClock(1);
  const prior = fault ? (r >= 0.5 ? [1, 0] : [0, 1]) : [r, 1 - r];
  const sequence = prior[0] * 0.9 * 0.2 + prior[1] * 0.1 * 0.8;
  const token =
    (prior[0] * 0.9 + prior[1] * 0.1) * (prior[0] * 0.2 + prior[1] * 0.8);
  const result = mode === "sequence" ? sequence : token;
  const reset = () => {
    clock.reset();
    setMode("sequence");
    setR(0.5);
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="rag"
      data-visual-kind="latent-document-path-lattice"
      aria-label="实验2：RAG概率路径"
    >
      <h3 className="text-lg font-semibold">实验2 · 先求和，还是先相乘？</h3>
      <p className="mt-2 text-sm">
        固定目标 y₁,y₂。A 的条件概率为 (.9,.2)，B 为
        (.1,.8)；第二列均已条件于同一真实前缀
        y₁，不是无条件独立假设。圆大小随该词元的加权贡献变化。
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          文档变量作用域
          <select
            className={control}
            aria-label="文档变量作用域"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="sequence">Sequence · 整序列</option>
            <option value="token">Token · 逐词元</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          p(A|x)={r.toFixed(1)}
          <input
            aria-label="文档A先验"
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
          />
        </label>
      </div>
      <svg
        className={svgClass}
        viewBox="0 0 280 270"
        role="img"
        aria-label={`${mode}潜文档路径；${mode === "token" ? "可跨文档" : "整序列固定文档"}`}
        fontSize="13"
      >
        <text x="15" y="25" fill={C.muted}>
          文档
        </text>
        <text x="115" y="25" fill={C.text}>
          y₁
        </text>
        <text x="225" y="25" fill={C.text}>
          y₂
        </text>
        {[0, 1].map((d) => {
          const y = d === 0 ? 85 : 185;
          const ps = d === 0 ? [0.9, 0.2] : [0.1, 0.8];
          return (
            <g key={d} opacity={prior[d] === 0 ? 0.2 : 1}>
              <text x="10" y={y - 25} fill={C.text}>
                {d === 0 ? "A" : "B"}: {fmt(prior[d])}
              </text>
              <line
                x1="44"
                y1={y}
                x2="125"
                y2={y}
                stroke={C.accent}
                strokeWidth={1 + prior[d] * 5}
              />
              <line
                x1="125"
                y1={y}
                x2="235"
                y2={y}
                stroke={C.accent}
                strokeWidth={2}
              />
              {ps.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={125 + i * 110}
                    cy={y}
                    r={5 + Math.sqrt(prior[d] * p) * 18}
                    fill={clock.step === i ? C.accent : C.panel}
                    stroke={C.accent}
                  />
                  <text
                    x={125 + i * 110}
                    y={y + 38}
                    textAnchor="middle"
                    fill={C.text}
                  >
                    {p.toFixed(1)}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
        {mode === "token" && prior.every((p) => p > 0) && (
          <g stroke={C.muted} strokeDasharray="4 3" fill="none">
            <path d="M142 90 L219 175" />
            <path d="M142 180 L219 95" />
          </g>
        )}
        <text x="12" y="251" fill={fault ? C.danger : C.muted}>
          {fault
            ? "硬选 top1：丢弃另一文档路径"
            : mode === "sequence"
              ? "只允许 A→A、B→B"
              : "还允许 A→B、B→A（虚线）"}
        </text>
      </svg>
      <p className="text-sm" data-output>
        p(y₁,y₂|x)={fmt(result)}；对照：Sequence={fmt(sequence)}，Token=
        {fmt(token)}。
      </p>
      <p className="mt-2 text-sm">
        Sequence 的未归一化文档贡献：A={fmt(prior[0] * 0.18)}，B=
        {fmt(prior[1] * 0.08)}。它不是“回答正确率”。
      </p>
      <ClockControls clock={clock} last={1} label="词元游标" />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className={control}
          data-fault
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          {fault ? "恢复文档求和" : "错误硬选 top1"}
        </button>
        <button className={control} data-reset onClick={reset}>
          完整重置
        </button>
      </div>
      <p className="mt-2 text-sm" role="status">
        {fault
          ? "故障使近似支持集退化为单文档；必须重算，不能沿用原边际概率。"
          : "本例仅在两个候选上归一化；未计入被 top-k 排除的文档概率质量。"}
      </p>
    </section>
  );
}

export function Llm08RetrievalAugmentedLmEvidenceGateLab() {
  const [m, setM] = useState(2);
  const [k, setK] = useState(1);
  const [fault, setFault] = useState(false);
  const clock = useClock(3 * m - 1);
  const packet = (i: number) =>
    fault ? Math.floor(i / m) : Math.floor((i + 1) / m) - 1;
  const active = packet(clock.step);
  const leakCount = Array.from({ length: 3 * m }, (_, i) =>
    i < (packet(i) + 1) * m - 1 ? 1 : 0,
  ).reduce<number>((a, b) => a + b, 0);
  const reset = () => {
    clock.reset();
    setM(2);
    setK(1);
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="retro"
      data-visual-kind="retro-shifted-packet-window"
      aria-label="实验3：RETRO可见性"
    >
      <h3 className="text-lg font-semibold">
        实验3 · 检索包何时才有资格可见？
      </h3>
      <p className="mt-2 text-sm">
        输入行 i 的输出预测 xᵢ₊₁。检索包 E_c 由完整 C_c
        查询得到，里面每个邻居都是 [N_c | F_c]（相似块与其原文后继）。矩阵画直接
        cross-attention 的当前 shifted window 对 E_c
        的包级路由；不是累计依赖，也不是完整真实 RETRO
        mask。显示更长流的前三块，不模拟有限批次尾部 padding。
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          chunk 长度 m
          <select
            className={control}
            aria-label="chunk长度"
            value={m}
            onChange={(e) => {
              clock.reset();
              setM(Number(e.target.value));
            }}
          >
            <option value="2">2 词元</option>
            <option value="3">3 词元</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          每包邻居数 k
          <select
            className={control}
            aria-label="每包邻居数"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          >
            <option value="1">1 邻居</option>
            <option value="2">2 邻居</option>
          </select>
        </label>
      </div>
      <svg
        viewBox={`0 0 280 ${144 + 3 * m * 29 + k * 30}`}
        className={svgClass}
        role="img"
        aria-label="RETRO当前移位包路由；非完整mask，圆点可见，叉号为过早泄漏"
        fontSize="12"
      >
        <text x="9" y="22" fill={C.text}>
          行 i → 预测 i+1
        </text>
        {[0, 1, 2].map((c) => (
          <text
            key={c}
            x={130 + c * 57}
            y="45"
            fill={C.text}
            textAnchor="middle"
          >
            E{c}
          </text>
        ))}
        {Array.from({ length: 3 * m }, (_, i) => (
          <g key={i}>
            <text
              x="8"
              y={70 + i * 29}
              fill={i === clock.step ? C.accent : C.muted}
            >
              i={i} (C{Math.floor(i / m)})
            </text>
            {[0, 1, 2].map((c) => {
              const visible = packet(i) === c;
              const leak = visible && i < (c + 1) * m - 1;
              return (
                <g key={c}>
                  <rect
                    x={106 + c * 57}
                    y={51 + i * 29}
                    width="49"
                    height="26"
                    rx="3"
                    fill={visible ? (leak ? C.danger : C.accent) : C.bg}
                    stroke={i === clock.step ? C.text : C.border}
                    strokeWidth={i === clock.step ? 2 : 1}
                  />
                  <text
                    x={130 + c * 57}
                    y={69 + i * 29}
                    textAnchor="middle"
                    fill={visible ? C.bg : C.muted}
                  >
                    {visible ? (leak ? "×" : "●") : "—"}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        <text x="8" y={87 + 3 * m * 29} fill={active < 0 ? C.muted : C.text}>
          {active < 0
            ? "当前无可见检索包"
            : `当前 E${active}：k × 2m = ${k} × ${2 * m}`}
        </text>
        {Array.from({ length: k }, (_, n) => (
          <g key={n}>
            <text x="8" y={111 + 3 * m * 29 + n * 30} fill={C.muted}>
              邻{n + 1}
            </text>
            {Array.from({ length: 2 * m }, (_, j) => (
              <g key={j} opacity={active < 0 ? 0.3 : 1}>
                <rect
                  x={46 + j * (224 / (2 * m))}
                  y={94 + 3 * m * 29 + n * 30}
                  width={224 / (2 * m) - 2}
                  height="26"
                  fill={j < m ? C.panel : C.bg}
                  stroke={j < m ? C.accent : C.muted}
                />
                <text
                  x={46 + (j + 0.5) * (224 / (2 * m)) - 1}
                  y={111 + 3 * m * 29 + n * 30}
                  textAnchor="middle"
                  fill={C.text}
                >
                  {j < m ? "N" : "F"}
                  {j % m}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
      <p className="text-sm" data-output>
        过早可见行={leakCount}；当前直接读取 {active < 0 ? "∅" : `E${active}`}。
        {fault ? "因果门失败。" : "移位门通过。"}
      </p>
      <ClockControls clock={clock} last={3 * m - 1} label="输入行游标" />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className={control}
          data-fault
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          {fault ? "恢复移位路由" : "错误提前解锁"}
        </button>
        <button className={control} data-reset onClick={reset}>
          完整重置
        </button>
      </div>
      <p className="mt-2 text-sm" role="status">
        {fault
          ? "提前读 E_c 会依赖 C_c 中尚未看到的输入，即使没有把答案文字直接放入提示也会泄漏。"
          : "直接读取一个移位包；更早包可经因果自注意力间接传播。外部邻居后继不是本序列未来；仍需过滤同源文档以免抄回目标。"}
      </p>
    </section>
  );
}
