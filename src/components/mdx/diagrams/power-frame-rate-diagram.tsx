/**
 * <PowerFrameRateDiagram step={0|1|2|3}>：帧率与功耗关系的三档对比。
 *
 * 30FPS（续航优先）→ 60FPS（流畅优先）→ 动态帧率（自适应）
 * step prop：0=全览，1=30FPS，2=60FPS，3=动态帧率
 */

type FrameRateStep = 0 | 1 | 2 | 3;

interface Props {
  step?: FrameRateStep;
}

export function PowerFrameRateDiagram({ step }: Props) {
  const modes = [
    {
      label: "30 FPS",
      sub: "续航优先",
      cpu: "CPU 每帧 ≈ 25ms 预算",
      gpu: "低功耗/低发热",
      battery: "省电 ★★★",
      use: "回合制/休闲",
      x: 24,
      w: 180,
    },
    {
      label: "60 FPS",
      sub: "流畅优先",
      cpu: "CPU 每帧 ≈ 12ms 预算",
      gpu: "满性能渲染",
      battery: "耗电 ★★☆",
      use: "动作/竞速/音游",
      x: 228,
      w: 180,
    },
    {
      label: "动态帧率",
      sub: "自适应",
      cpu: "按场景切换预算",
      gpu: "温控降频感知",
      battery: "平衡 ★★☆",
      use: "开放世界/MMO",
      x: 432,
      w: 180,
    },
  ];

  const isActive = (idx: number) =>
    step === undefined || step - 1 === idx || (step === 0 && idx < 3);
  const boxStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";
  const boxBg = (idx: number) =>
    isActive(idx) ? "var(--bg-elevated)" : "var(--bg)";
  const textFill = (idx: number) =>
    isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)";

  // Battery bars: 3 bars max
  const batteryBars = [3, 2, 2];
  const barLabel = [
    "够撑 6h+ 连续游戏",
    "约 3-4h 连续游戏",
    "场景自适应省电",
  ];

  const bottomHints: Record<number | "all", string> = {
    all: "帧率越高 → 每帧预算越紧 → CPU/GPU 工作越密集 → 功耗越大。权衡：流畅 vs 续航。",
    1: "30FPS：每帧约 33ms 空闲窗口，CPU/GPU 有充足时间降频降压，适合不需要高帧率的游戏",
    2: "60FPS：每帧只有约 16ms（含系统开销只剩 ~12ms），CPU/GPU 必须高频全速运行，功耗翻倍",
    3: "动态帧率：战斗切 60FPS（流畅），探索切 30FPS（省电），菜单切 30FPS 以下——智能分配预算",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 240"
          role="img"
          aria-label="帧率与功耗关系：30FPS 省电、60FPS 流畅、动态帧率自适应平衡"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {modes.map((m, i) => (
            <g key={m.label}>
              <rect
                x={m.x}
                y="30"
                width={m.w}
                height="130"
                rx="8"
                fill={boxBg(i)}
                stroke={boxStroke(i)}
                strokeWidth={isActive(i) ? 2.5 : 1.5}
              />
              {/* Title */}
              <text
                x={m.x + m.w / 2}
                y="52"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={textFill(i)}
              >
                {m.label}
              </text>
              <text
                x={m.x + m.w / 2}
                y="70"
                textAnchor="middle"
                fontSize="12"
                fill={textFill(i)}
              >
                {m.sub}
              </text>
              {/* CPU/GPU info */}
              <text
                x={m.x + 12}
                y="92"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {m.cpu}
              </text>
              <text
                x={m.x + 12}
                y="108"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {m.gpu}
              </text>
              {/* Battery bars */}
              <g>
                {[0, 1, 2].map((b) => (
                  <rect
                    key={b}
                    x={m.x + 12 + b * 22}
                    y="118"
                    width="18"
                    height={b < batteryBars[i] ? "18" : "8"}
                    rx="3"
                    fill={
                      b < batteryBars[i]
                        ? isActive(i)
                          ? "var(--accent)"
                          : "var(--border)"
                        : "transparent"
                    }
                    stroke={isActive(i) ? "var(--accent)" : "var(--border)"}
                    strokeWidth="1"
                  />
                ))}
                <text
                  x={m.x + 86}
                  y="131"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {m.battery}
                </text>
              </g>
              {/* Use case */}
              <text
                x={m.x + m.w / 2}
                y="152"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {m.use}
              </text>
              {i < modes.length - 1 && (
                <>
                  <line
                    x1={m.x + m.w + 4}
                    y1="95"
                    x2={m.x + m.w + 18}
                    y2="95"
                    stroke={
                      isActive(i) ? "var(--accent)" : "var(--border)"
                    }
                    strokeWidth="2"
                  />
                  <path
                    d={`M${m.x + m.w + 18} 95 l-6 -3.5 l0 7 z`}
                    fill={isActive(i) ? "var(--accent)" : "var(--border)"}
                  />
                </>
              )}
            </g>
          ))}
          {/* Dynamic FPS arrow hint */}
          <path
            d="M480 126 Q510 112 540 126"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
          <text
            x="510"
            y="112"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            场景切换
          </text>
          {/* Bottom hint */}
          <text
            x="320"
            y="195"
            textAnchor="middle"
            fontSize="12"
            fill={
              step === undefined
                ? "var(--text-secondary)"
                : "var(--text-primary)"
            }
          >
            {step === undefined
              ? bottomHints.all
              : bottomHints[step]}
          </text>
          {/* Power curve sketch */}
          <path
            d="M24 225 Q180 210 320 220 T620 215"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <text
            x="320"
            y="232"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            功耗趋势：帧率 ↑ → 功耗 ↑（非线性，翻倍帧率功耗不止翻倍）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        帧率是功耗的放大器：从 30 变 60，像素吞吐量翻倍但 CPU/GPU 常需超频才能赶上——功耗往往翻 2-4 倍。
      </figcaption>
    </figure>
  );
}
