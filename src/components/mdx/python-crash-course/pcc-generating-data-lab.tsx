"use client";

import { useId, useMemo, useState } from "react";

// Deliberately a JS LCG, not Python random.Random. Equal seeds only reproduce
// this implementation; they do not promise cross-language equal sequences.
function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

type Point = { x: number; y: number };
type Settings = { seed: number; count: number; step: number };
const INITIAL: Settings = { seed: 42, count: 120, step: 4 };
const DEFAULT_MESSAGE =
  "当前默认状态：seed=42，数量=120，最大步长=4，显示坐标轴，正确理论分布。";
const control =
  "min-h-11 w-full min-w-0 rounded-control border border-border bg-[var(--bg)] px-3 text-base text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const button =
  "min-h-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

function randomWalk(seed: number, count: number, maxStep: number): Point[] {
  const random = seededRandom(seed);
  const points: Point[] = [{ x: 0, y: 0 }];
  // Rejection sampling: both coordinates staying still does not add a point.
  // A generous guard also protects the UI if the generator is changed later.
  for (
    let attempt = 0;
    points.length < count && attempt < count * 100;
    attempt++
  ) {
    const dx = (random() < 0.5 ? -1 : 1) * Math.floor(random() * (maxStep + 1));
    const dy = (random() < 0.5 ? -1 : 1) * Math.floor(random() * (maxStep + 1));
    if (dx === 0 && dy === 0) continue;
    const last = points[points.length - 1];
    points.push({ x: last.x + dx, y: last.y + dy });
  }
  return points;
}

function diceFrequencies(seed: number, count: number) {
  const random = seededRandom(seed);
  const frequencies = Array<number>(11).fill(0);
  for (let roll = 0; roll < count; roll++) {
    const total = 2 + Math.floor(random() * 6) + Math.floor(random() * 6);
    frequencies[total - 2]++;
  }
  return frequencies;
}

export function PccGeneratingDataLab() {
  const id = useId();
  const [draft, setDraft] = useState({ seed: "42", count: "120", step: "4" });
  const [settings, setSettings] = useState<Settings>(INITIAL);
  const [showAxes, setShowAxes] = useState(true);
  const [wrongTheory, setWrongTheory] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const walks = useMemo(
    () => [
      randomWalk(settings.seed, settings.count, settings.step),
      randomWalk((settings.seed + 1) >>> 0, settings.count, settings.step),
    ],
    [settings],
  );
  const frequencies = useMemo(
    () => diceFrequencies(settings.seed, settings.count),
    [settings],
  );
  const extent = Math.max(
    1,
    ...walks.flatMap((walk) =>
      walk.flatMap(({ x, y }) => [Math.abs(x), Math.abs(y)]),
    ),
  );
  const bound = Math.ceil(extent / 5) * 5;
  const wx = (x: number) => 160 + (x / bound) * 98;
  const wy = (y: number) => 130 - (y / bound) * 98;
  const expected = frequencies.map(
    (_, index) => (settings.count * (6 - Math.abs(index - 5))) / 36,
  );
  const ymax = Math.ceil(Math.max(...frequencies, ...expected, 1) * 1.15);
  const by = (count: number) => 218 - (count / ymax) * 180;
  const errorPercent =
    Math.max(
      ...frequencies.map((f, i) =>
        Math.abs(f / settings.count - expected[i] / settings.count),
      ),
    ) * 100;
  const incomplete = walks.some((walk) => walk.length !== settings.count);

  function generate() {
    const values = [draft.seed, draft.count, draft.step];
    const [seed, count, step] = values.map(Number);
    if (
      values.some((value) => value.trim() === "") ||
      ![seed, count, step].every(Number.isInteger) ||
      seed < 0 ||
      seed > 4294967295 ||
      count < 2 ||
      count > 1200 ||
      step < 1 ||
      step > 6
    ) {
      setError(
        "请输入整数：seed 为 0–4294967295，数量为 2–1200，最大步长为 1–6。图中保留上一次有效样本。",
      );
      return;
    }
    setSettings({ seed, count, step });
    setError("");
    setMessage(
      `已生成 seed=${seed}、数量=${count}、最大步长=${step} 的样本。相同参数会得到同一结果。`,
    );
  }

  function reset() {
    setDraft({ seed: "42", count: "120", step: "4" });
    setSettings(INITIAL);
    setShowAxes(true);
    setWrongTheory(false);
    setError("");
    setMessage(DEFAULT_MESSAGE);
  }

  return (
    <section
      aria-label="生成数据实验"
      className="my-6 min-w-0 space-y-4 rounded-card border border-border bg-elevated p-3 text-sm text-primary"
    >
      <h3 className="text-lg font-semibold">生成 → 绘制 → 核对</h3>
      <p>
        先预测：把数量从 120 改成
        600，双骰柱形一定更贴近理论吗？最大步长加倍时，路径范围一定加倍吗？
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          generate();
        }}
        className="space-y-3"
        noValidate
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-3">
          {(
            [
              ["seed", "随机种子 seed", 0, 4294967295],
              ["count", "点数 / 投掷次数 N", 2, 1200],
              ["step", "每轴最大步长", 1, 6],
            ] as const
          ).map(([name, label, min, max]) => (
            <label
              key={name}
              htmlFor={`${id}-${name}`}
              className="block min-w-0 space-y-1"
            >
              <span>{label}</span>
              <input
                id={`${id}-${name}`}
                className={control}
                type="number"
                inputMode="numeric"
                step="1"
                min={min}
                max={max}
                value={draft[name]}
                aria-invalid={Boolean(error)}
                aria-describedby={`${id}-limits${error ? ` ${id}-error` : ""}`}
                onChange={(event) =>
                  setDraft((old) => ({ ...old, [name]: event.target.value }))
                }
              />
            </label>
          ))}
        </div>
        <p id={`${id}-limits`}>
          seed：0–4294967295；N：2–1200（含游走原点）；步长：1–6。输入只在生成后生效。
        </p>
        <div className="flex flex-wrap gap-2">
          <button className={button} type="submit">
            生成样本
          </button>
          <button className={button} type="button" onClick={reset}>
            完整重置
          </button>
          <button
            className={button}
            type="button"
            aria-pressed={showAxes}
            onClick={() => setShowAxes((value) => !value)}
          >
            坐标轴：{showAxes ? "显示" : "隐藏"}
          </button>
          <button
            className={button}
            type="button"
            aria-pressed={wrongTheory}
            onClick={() => setWrongTheory((value) => !value)}
          >
            错误理论：{wrongTheory ? "开启" : "关闭"}
          </button>
        </div>
      </form>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-semibold text-[var(--danger)]"
        >
          {error}
        </p>
      )}
      {incomplete && (
        <p role="alert">
          生成器达到安全上限；只显示已生成的点，请恢复默认参数。
        </p>
      )}
      <p role="status" aria-live="polite">
        {message}
      </p>
      <p>
        当前图：seed={settings.seed}；N={settings.count}；最大步长=
        {settings.step}
        。页面无自动播放、动画或计时器，减少动态效果设置下同样可操作。
      </p>

      <figure className="m-0 min-w-0">
        <figcaption className="mb-2 font-semibold">
          ① 同一组平方数：连线表示顺序，圆点表示采样位置
        </figcaption>
        <svg
          viewBox="0 0 300 270"
          role="img"
          aria-labelledby={`${id}-square-title ${id}-square-desc`}
          className="mx-auto block h-auto w-full max-w-[420px]"
          style={{ fontSize: 16 }}
        >
          <title id={`${id}-square-title`}>平方数的线图与散点叠加</title>
          <desc id={`${id}-square-desc`}>
            横轴为输入 1 到 5，纵轴为平方 1 到
            25。五个实测点由折线连接，深色表示较大的平方值；连线不是新增观测。
          </desc>
          <g stroke="var(--border)" fill="none">
            {[0, 10, 20, 30].map((value) => (
              <path key={value} d={`M45 ${218 - value * 6} H273`} />
            ))}
          </g>
          <path d="M45 28 V218 H273" stroke="currentColor" fill="none" />
          {[0, 10, 20, 30].map((value) => (
            <text
              key={value}
              x="37"
              y={223 - value * 6}
              textAnchor="end"
              fill="currentColor"
            >
              {value}
            </text>
          ))}
          <polyline
            points={[1, 2, 3, 4, 5]
              .map((x) => `${45 + x * 43},${218 - x * x * 6}`)
              .join(" ")}
            stroke="var(--accent)"
            strokeWidth="2"
            fill="none"
          />
          {[1, 2, 3, 4, 5].map((x) => (
            <g key={x}>
              <circle
                cx={45 + x * 43}
                cy={218 - x * x * 6}
                r="5"
                fill={`hsl(210 65% ${78 - x * 9}%)`}
                stroke="currentColor"
              />
              <text
                x={45 + x * 43}
                y="240"
                textAnchor="middle"
                fill="currentColor"
              >
                {x}
              </text>
            </g>
          ))}
          <text x="48" y="20" fill="currentColor">
            平方 y
          </text>
          <text x="266" y="259" textAnchor="end" fill="currentColor">
            输入 x
          </text>
        </svg>
        <p>
          折线与圆点使用同一批坐标；浅→深仅表示 y 增大。Matplotlib 对应
          plot、scatter 和颜色映射。
        </p>
      </figure>

      <figure className="m-0 min-w-0">
        <figcaption className="mb-2 font-semibold">
          ② 两条随机游走：共享等比例坐标
        </figcaption>
        <svg
          viewBox="0 0 300 270"
          role="img"
          aria-labelledby={`${id}-walk-title ${id}-walk-desc`}
          className="mx-auto block h-auto w-full max-w-[420px]"
          style={{ fontSize: 16 }}
        >
          <title id={`${id}-walk-title`}>两条随机游走与起终点</title>
          <desc id={`${id}-walk-desc`}>
            A 使用当前种子，B 使用种子加一并回绕到 32
            位。圆形是共同原点；方形是终点。横纵轴一单位占相同长度。具体终点在图下列出。
          </desc>
          {showAxes && (
            <g fill="currentColor">
              {[-bound, 0, bound].map((value) => (
                <g key={value}>
                  <path
                    d={`M${wx(value)} 32 V228 M62 ${wy(value)} H258`}
                    stroke="var(--border)"
                    fill="none"
                  />
                  <text x={wx(value)} y="250" textAnchor="middle">
                    {value}
                  </text>
                  <text x="55" y={wy(value) + 5} textAnchor="end">
                    {value}
                  </text>
                </g>
              ))}
              <path
                d="M62 130 H258 M160 32 V228"
                stroke="currentColor"
                fill="none"
              />
              <text x="279" y="135">
                x
              </text>
              <text x="156" y="21">
                y
              </text>
            </g>
          )}
          {walks.map((walk, index) => (
            <g key={index}>
              <polyline
                points={walk.map(({ x, y }) => `${wx(x)},${wy(y)}`).join(" ")}
                fill="none"
                stroke={index ? "var(--warning, #b45309)" : "var(--accent)"}
                strokeWidth="1.7"
                strokeDasharray={index ? "5 3" : undefined}
              />
              {index === 0 &&
                walk.map((point, n) => (
                  <circle
                    key={n}
                    cx={wx(point.x)}
                    cy={wy(point.y)}
                    r="1.5"
                    fill={`hsl(210 65% ${80 - (50 * n) / Math.max(1, walk.length - 1)}%)`}
                  />
                ))}
              <rect
                x={wx(walk[walk.length - 1].x) - 5}
                y={wy(walk[walk.length - 1].y) - 5}
                width="10"
                height="10"
                fill={index ? "var(--warning, #b45309)" : "var(--accent)"}
                stroke="currentColor"
              />
            </g>
          ))}
          <circle
            cx={wx(0)}
            cy={wy(0)}
            r="6"
            fill="var(--bg)"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <p>
          空心圆＝共同起点；方形＝终点（若返回原点会重合）。A
          为实线、点由浅到深表示先后；B
          为虚线。两图轴尺度相同，隐藏轴只影响显示，不改数据。
        </p>
        <ul className="list-inside list-disc">
          {walks.map((walk, index) => (
            <li key={index}>
              {index ? "B" : "A"}：{walk.length} 点；终点 (
              {walk[walk.length - 1].x}, {walk[walk.length - 1].y})
            </li>
          ))}
        </ul>
        <p>
          两轴范围均为 −{bound} 到 {bound}；样本前四点 A：
          {walks[0]
            .slice(0, 4)
            .map((point) => `(${point.x}, ${point.y})`)
            .join(" → ")}
          。
        </p>
      </figure>

      <figure className="m-0 min-w-0">
        <figcaption className="mb-2 font-semibold">
          ③ 双骰点数和：实际频数柱与理论期望
        </figcaption>
        <svg
          viewBox="0 0 300 285"
          role="img"
          aria-labelledby={`${id}-dice-title ${id}-dice-desc`}
          className="mx-auto block h-auto w-full max-w-[420px]"
          style={{ fontSize: 16 }}
        >
          <title id={`${id}-dice-title`}>两颗公平六面骰的和的频数柱状图</title>
          <desc id={`${id}-dice-desc`}>
            柱表示实际次数，折线表示理论期望次数。正确期望在 7
            达峰值，错误理论则把 2 到 12 当成等可能。精确频数见图下列表。
          </desc>
          {[0, Math.round(ymax / 2), ymax].map((value) => (
            <g key={value}>
              <path d={`M47 ${by(value)} H287`} stroke="var(--border)" />
              <text
                x="42"
                y={by(value) + 5}
                textAnchor="end"
                fill="currentColor"
              >
                {value}
              </text>
            </g>
          ))}
          <path d="M47 32 V218 H287" fill="none" stroke="currentColor" />
          {frequencies.map((frequency, index) => (
            <g key={index}>
              <rect
                x={50 + index * 21}
                y={by(frequency)}
                width="15"
                height={218 - by(frequency)}
                fill="var(--accent)"
                opacity="0.65"
              />
              <text
                x={57.5 + index * 21}
                y={index % 2 ? 254 : 238}
                textAnchor="middle"
                fill="currentColor"
              >
                {index + 2}
              </text>
            </g>
          ))}
          <polyline
            points={expected
              .map(
                (value, index) =>
                  `${57.5 + index * 21},${by(wrongTheory ? settings.count / 11 : value)}`,
              )
              .join(" ")}
            stroke={wrongTheory ? "var(--danger)" : "currentColor"}
            strokeWidth="2.5"
            strokeDasharray="4 3"
            fill="none"
          />
          <text x="48" y="21" fill="currentColor">
            频数（次）
          </text>
          <text x="283" y="273" textAnchor="end" fill="currentColor">
            点数和
          </text>
        </svg>
        <p
          className={wrongTheory ? "font-semibold text-[var(--danger)]" : ""}
          aria-live="polite"
        >
          {wrongTheory
            ? "错误：将 11 种和当成等可能，得到 N/11 的水平线。和为 7 有 6 种组合，和为 2 只有 1 种；关闭错误理论即可修复。"
            : "虚线是 N × (6 − |和 − 7|) / 36，不要求每根柱精确贴线。实际与正确理论的最大频率差："}
          {!wrongTheory && `${errorPercent.toFixed(2)} 个百分点。`}
        </p>
        <p>
          实际总数 {frequencies.reduce((sum, value) => sum + value, 0)} =
          N；和的范围始终为 2–12，未出现的和保留零柱。
        </p>
        <ul
          aria-label="精确频数"
          className="grid list-none grid-cols-2 gap-x-2 gap-y-1 pl-0 sm:grid-cols-3"
        >
          {frequencies.map((frequency, index) => (
            <li key={index}>
              和 {index + 2}：{frequency} 次
            </li>
          ))}
        </ul>
      </figure>
      <p>
        操作与解释：保留 seed，只改
        N，旧样本是新样本的前缀；频率通常趋近理论，但一次扩样不保证误差变小。改步长会改变游走，骰子不受影响。此处使用
        JavaScript LCG；Python random.Random 的相同 seed 不承诺相同序列。
      </p>
    </section>
  );
}
