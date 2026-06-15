/**
 * <ProfilerSamplingDiagram>：Profiler 采样频率与自定义标记示意图。
 *
 * 上半部：三种采样模式对比（标准同步、Deep Profile、Better Stream）
 * 下半部：自定义标记工作流（BeginSample/EndSample vs ProfilerMarker）
 */

export function ProfilerSamplingDiagram() {
  const modes = [
    {
      name: "标准同步采样",
      rate: "每帧一次",
      cost: "低",
      bestFor: "日常诊断",
      detail: "与 Target Frame Rate 同步。看到每帧总体 CPU/GPU 分布。",
    },
    {
      name: "Deep Profile",
      rate: "每方法调用",
      cost: "极高",
      bestFor: "定位特定函数",
      detail: "插桩每个 C# 方法——信息爆炸但开销大，只在怀疑特定函数时开。",
    },
    {
      name: "Better Stream",
      rate: "多帧写文件",
      cost: "低（内存）",
      bestFor: "长时复现",
      detail: "记录数十分钟数据到文件，不占 Editor 内存。抓偶发卡顿。",
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {/* 采样模式对比 */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-accent">
            三种采样模式
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {modes.map((m) => (
              <div
                key={m.name}
                className="rounded-md border border-border bg-bg p-3"
              >
                <p className="text-sm font-medium text-primary">{m.name}</p>
                <div className="mt-1 flex gap-2 text-[11px]">
                  <span className="text-secondary">
                    频率：<span className="text-accent">{m.rate}</span>
                  </span>
                  <span className="text-secondary">
                    开销：<span className="text-accent">{m.cost}</span>
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-secondary">
                  <span className="font-medium text-primary">适用：</span>
                  {m.bestFor}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-secondary">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 自定义标记工作流 */}
        <div className="rounded-md border border-border bg-bg p-3">
          <p className="mb-2 text-xs font-semibold text-accent">
            自定义标记：BeginSample → 代码执行 → EndSample
          </p>
          <svg
            viewBox="0 0 520 90"
            role="img"
            aria-label="Profiler 自定义标记工作流：BeginSample 开始标记 → 代码执行 → EndSample 结束标记 → Profiler CPU 模块显示自定义色条"
            className="mx-auto block h-auto w-full max-w-[520px]"
          >
            {/* 标记线 */}
            <line
              x1="20"
              y1="30"
              x2="500"
              y2="30"
              stroke="var(--border)"
              strokeWidth="2"
            />
            {/* 自定义标记块 */}
            <rect
              x="60"
              y="18"
              width="160"
              height="24"
              rx="4"
              fill="var(--accent)"
              opacity="0.2"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="140"
              y="34"
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--accent)"
            >
              AI.Pathfinding
            </text>
            {/* 第二个标记 */}
            <rect
              x="240"
              y="18"
              width="200"
              height="24"
              rx="4"
              fill="var(--accent)"
              opacity="0.15"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="340"
              y="34"
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--accent)"
            >
              AI.DecisionMaking
            </text>
            {/* 箭头 */}
            <text
              x="140"
              y="58"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              BeginSample
            </text>
            <text
              x="340"
              y="58"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              EndSample
            </text>
            {/* ProfilerMarker 对比行 */}
            <rect
              x="60"
              y="70"
              width="160"
              height="16"
              rx="3"
              fill="var(--accent)"
              opacity="0.25"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <text
              x="140"
              y="81"
              textAnchor="middle"
              fontSize="10"
              fill="var(--accent)"
            >
              ProfilerMarker (零 GC)
            </text>
          </svg>
          <p className="mt-1 text-center text-[11px] text-secondary">
            ProfilerMarker 静态实例免字符串分配 · 热路径首选
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Profiler 采样频率决定数据精度；自定义标记把「一大坨 Update」变成「具体子系统色条」。
      </figcaption>
    </figure>
  );
}
