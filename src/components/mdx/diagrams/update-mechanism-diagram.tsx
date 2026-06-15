/**
 * <UpdateMechanismDiagram step={0|1|2}>：
 * Update vs Coroutine vs InvokeRepeating 三种调度机制对比。
 */

type MechanismStep = 0 | 1 | 2;

interface Props {
  /** 0=Update 每帧；1=Coroutine yield；2=InvokeRepeating 定时 */
  step?: MechanismStep;
}

const mechanisms = [
  {
    title: "Update",
    sub: "每帧主线程",
    detail: "与帧率绑定\n适合输入/动画",
    pros: "响应最快",
    cons: "空跑也调",
  },
  {
    title: "Coroutine",
    sub: "yield 挂起",
    detail: "等秒/等帧恢复\n适合分步流程",
    pros: "可跨帧等待",
    cons: "有分配开销",
  },
  {
    title: "InvokeRepeating",
    sub: "定时回调",
    detail: "固定间隔触发\n适合低频轮询",
    pros: "写法简单",
    cons: "字符串反射",
  },
];

export function UpdateMechanismDiagram({ step }: Props) {
  const isActive = (idx: number) => step === undefined || step === idx;

  const hints: Record<MechanismStep | "all", string> = {
    all: "三种机制：Update 每帧、Coroutine 可挂起、InvokeRepeating 定间隔",
    0: "Update：与帧率同步，适合每帧都要跑的逻辑；避免空函数堆积",
    1: "Coroutine：yield return 把执行权还给引擎，下一帧/下一秒再继续",
    2: "InvokeRepeating：按秒重复调用，适合 AI 巡逻、资源刷新等低频任务",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 240"
          role="img"
          aria-label="Update、Coroutine、InvokeRepeating 调度机制对比"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {mechanisms.map((m, i) => {
            const x = 24 + i * 200;
            const active = isActive(i);
            return (
              <g key={m.title}>
                <rect
                  x={x}
                  y="32"
                  width="176"
                  height="140"
                  rx="8"
                  fill={active ? "var(--bg-elevated)" : "var(--bg)"}
                  stroke={active ? "var(--accent)" : "var(--border)"}
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <text x={x + 88} y="58" textAnchor="middle" fontSize="14" fontWeight="600" fill={active ? "var(--text-primary)" : "var(--text-secondary)"}>
                  {m.title}
                </text>
                <text x={x + 88} y="78" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {m.sub}
                </text>
                <text x={x + 88} y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                  {m.detail.split("\n")[0]}
                </text>
                <text x={x + 88} y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                  {m.detail.split("\n")[1]}
                </text>
                <text x={x + 88} y="138" textAnchor="middle" fontSize="10" fill="var(--accent)">
                  ✓ {m.pros}
                </text>
                <text x={x + 88} y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                  ✗ {m.cons}
                </text>
              </g>
            );
          })}
          <text x="320" y="200" textAnchor="middle" fontSize="12" fill={step === undefined ? "var(--text-secondary)" : "var(--text-primary)"}>
            {step === undefined ? hints.all : hints[step]}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        按「多久跑一次」选机制：每帧用 Update，等时间用 Coroutine/Invoke，能事件驱动就别轮询。
      </figcaption>
    </figure>
  );
}
