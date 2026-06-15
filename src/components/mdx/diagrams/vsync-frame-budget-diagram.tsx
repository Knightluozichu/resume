/**
 * <VsyncFrameBudgetDiagram>：Ch6 功耗优化 §3「VSync 与帧预算」核心图示。
 *
 * 展示 60Hz 屏幕上 60 FPS vs 30 FPS 的帧预算对比：
 *  - 上排 60 FPS：每 16.67ms 交一帧，CPU/GPU 几乎全程满载，空闲接近零
 *  - 下排 30 FPS：每 33.3ms（两屏）交一帧，CPU/GPU 有整整一半时间空闲可降频
 *
 * 左右两栏：左栏是「帧预算时间条」——实色=工作时长、半透明=空闲时长；
 * 右栏是「VSync 节奏线」——每 16.67ms 一条竖虚线标记屏幕刷新时刻，箭头标 VBlank。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--bg/--bg-elevated/--border/
 * --text-primary/--text-secondary），无阴影、无裸 hex（硬规则 5）。
 */
export function VsyncFrameBudgetDiagram() {
  const barW = 280;
  const barH = 28;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="VSync 帧预算对比示意图。上排 60 FPS：每帧预算只有 16.67 毫秒，CPU 和 GPU 几乎全程满载没有空闲。下排 30 FPS：帧预算翻倍到 33.3 毫秒，CPU 工作 16 毫秒后有一半时间空闲可以降频，GPU 在第一个 VBlank 交出画面后第二个 VBlank 时无事可做。垂直虚线标记屏幕刷新时刻 VBlank，箭头指示每两个 VBlank 之间 GPU 才交一次新画面。底下一行字说明：vSyncCount=2 不是每隔两秒，而是每两个 VBlank 同步一次，所以 60Hz 屏幕上 vSyncCount=2 就是 30 FPS。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ==== 上排：60 FPS ==== */}
          <text
            x="16"
            y="44"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            60 FPS
          </text>
          <text
            x="80"
            y="44"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每帧预算 16.67ms
          </text>

          {/* CPU 条 */}
          <text x="16" y="74" fontSize="10" fill="var(--text-secondary)">
            CPU
          </text>
          <rect
            x="52"
            y="62"
            width={barW}
            height={barH}
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* 满载 — 几乎整条 */}
          <rect
            x="54"
            y="64"
            width={barW - 4}
            height={barH - 4}
            rx="3"
            fill="var(--accent)"
            opacity="0.75"
          />
          <text
            x="196"
            y="80"
            textAnchor="middle"
            fontSize="9"
            fill="var(--bg)"
          >
            满载 ≈16ms
          </text>

          {/* GPU 条 */}
          <text x="16" y="118" fontSize="10" fill="var(--text-secondary)">
            GPU
          </text>
          <rect
            x="52"
            y="106"
            width={barW}
            height={barH}
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <rect
            x="54"
            y="108"
            width={barW - 4}
            height={barH - 4}
            rx="3"
            fill="var(--accent)"
            opacity="0.75"
          />
          <text
            x="196"
            y="124"
            textAnchor="middle"
            fontSize="9"
            fill="var(--bg)"
          >
            满载 ≈15ms
          </text>

          {/* 右侧 VBlank 标记 */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 370 + i * 60;
            return (
              <g key={`vsync-60-${i}`}>
                <line
                  x1={x}
                  y1="58"
                  x2={x}
                  y2={132}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={x}
                  y="54"
                  textAnchor="middle"
                  fontSize="7"
                  fill="var(--text-secondary)"
                >
                  V
                </text>
              </g>
            );
          })}
          <text
            x="580"
            y="98"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            VBlank
            <tspan x="580" dy="12">
              每 16.67ms
            </tspan>
          </text>

          {/* 30/60 分隔线 */}
          <line
            x1="16"
            y1="148"
            x2="620"
            y2="148"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ==== 下排：30 FPS ==== */}
          <text
            x="16"
            y="180"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            30 FPS
          </text>
          <text
            x="80"
            y="180"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每帧预算 33.3ms（两屏）
          </text>

          {/* CPU 条 — 一半工作一半空闲 */}
          <text x="16" y="210" fontSize="10" fill="var(--text-secondary)">
            CPU
          </text>
          <rect
            x="52"
            y="198"
            width={barW}
            height={barH}
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <rect // 工作段 — 前一半
            x="54"
            y="200"
            width={barW / 2 - 4}
            height={barH - 4}
            rx="3"
            fill="var(--accent)"
            opacity="0.75"
          />
          <rect // 空闲段 — 后半半透明
            x={54 + barW / 2}
            y="200"
            width={barW / 2 - 4}
            height={barH - 4}
            rx="3"
            fill="var(--accent)"
            opacity="0.15"
          />
          <text
            x="124"
            y="216"
            textAnchor="middle"
            fontSize="9"
            fill="var(--bg)"
          >
            工作 ≈16ms
          </text>
          <text
            x="264"
            y="216"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            空闲 降频
          </text>

          {/* GPU 条 — 交一帧后空闲 */}
          <text x="16" y="252" fontSize="10" fill="var(--text-secondary)">
            GPU
          </text>
          <rect
            x="52"
            y="240"
            width={barW}
            height={barH}
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <rect // 工作段 — 前一半
            x="54"
            y="242"
            width={barW / 2 - 4}
            height={barH - 4}
            rx="3"
            fill="var(--accent)"
            opacity="0.75"
          />
          <rect // 空闲段 — 后半
            x={54 + barW / 2}
            y="242"
            width={barW / 2 - 4}
            height={barH - 4}
            rx="3"
            fill="var(--accent)"
            opacity="0.15"
          />
          <text
            x="124"
            y="258"
            textAnchor="middle"
            fontSize="9"
            fill="var(--bg)"
          >
            工作 ≈15ms
          </text>
          <text
            x="264"
            y="258"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            空闲 降频
          </text>

          {/* 右 VBlank 30FPS */}
          {[0, 1, 2].map((i) => {
            const x = 370 + i * 120;
            return (
              <g key={`vsync-30-${i}`}>
                <line
                  x1={x}
                  y1="194"
                  x2={x}
                  y2={268}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={x + 60}
                  y="236"
                  textAnchor="middle"
                  fontSize="8"
                  fill="var(--accent)"
                >
                  交帧
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>60 FPS</strong>：CPU/GPU 几乎全程满载，无空闲降频。
        <strong>30 FPS</strong>：帧预算翻倍，一半时间空闲——芯片降频后功耗大降。
        VSync 把帧率锁在屏幕刷新周期的整数分之一。
      </figcaption>
    </figure>
  );
}
