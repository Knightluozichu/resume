/**
 * <AsyncLoadDiagram>：同步加载卡顿 vs 异步分帧加载流程。
 */

export function AsyncLoadDiagram({ step = 0 }: { step?: number }) {
  const steps = [
    { label: "同步 Load", desc: "主线程阻塞 · 一帧卡死", bad: true },
    { label: "发起 Async", desc: "LoadAsync / LoadFromFileAsync", bad: false },
    { label: "分帧推进", desc: "isDone=false 时每帧 yield", bad: false },
    { label: "激活/实例化", desc: "进度条满后 allowSceneActivation", bad: false },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 200"
          role="img"
          aria-label="异步加载：同步加载阻塞主线程造成卡顿；异步加载分多帧推进，配合进度条与 allowSceneActivation"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            同步 vs 异步加载时间线
          </text>

          {/* Sync timeline - spike */}
          <text x="100" y="52" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            同步
          </text>
          <line
            x1="40"
            y1="120"
            x2="200"
            y2="120"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="88"
            y="60"
            width="24"
            height="60"
            rx="4"
            fill="var(--danger)"
            opacity="0.7"
          />
          <text
            x="100"
            y="140"
            textAnchor="middle"
            fontSize="9"
            fill="var(--danger)"
          >
            单帧尖峰
          </text>

          {/* Async timeline - spread */}
          <text x="420" y="52" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            异步
          </text>
          <line
            x1="280"
            y1="120"
            x2="560"
            y2="120"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={300 + i * 44}
              y={100 - (i === 4 ? 20 : 12)}
              width="28"
              height={i === 4 ? 20 : 12}
              rx="3"
              fill={
                step === i || (step >= 4 && i === 4)
                  ? "var(--accent)"
                  : "var(--success)"
              }
              opacity={0.7}
            />
          ))}
          <text
            x="420"
            y="140"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            分摊到多帧
          </text>

          {/* Step labels */}
          {steps.map((s, i) => (
            <g key={s.label}>
              <circle
                cx={80 + i * 140}
                cy="172"
                r="6"
                fill={
                  step === i
                    ? "var(--accent)"
                    : s.bad
                      ? "var(--danger)"
                      : "var(--success)"
                }
              />
              <text
                x={80 + i * 140}
                y="190"
                textAnchor="middle"
                fontSize="8"
                fill="var(--text-secondary)"
              >
                {s.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {steps[Math.min(step, steps.length - 1)].desc}——异步加载把 IO 与反序列化摊到多帧，避免切换场景时单帧尖峰。
      </figcaption>
    </figure>
  );
}
