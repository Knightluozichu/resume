/**
 * <PowerFrameRateDiagram>：Ch6 功耗优化 §3「帧率与功耗的非线性关系」核心图示。
 *
 * 展示 30/60/120 FPS 三档帧率下功耗的非线性增长——帧率翻倍，功耗不是翻倍而是超线性上涨。
 * 左侧三条带标尺的柱状图（30FPS=基准、60FPS≈2.5×、120FPS≈5.5×），
 * 右侧标注「帧间空闲」随帧率降低而增加，解释降频省电的非线性机制。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--bg/--bg-elevated/--border/
 * --text-primary/--text-secondary），无阴影、无裸 hex（硬规则 5）。
 */
export function PowerFrameRateDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="帧率与功耗非线性关系图。三条柱形分别代表 30FPS（基准 1.0 倍功耗）、60FPS（约 2.5 倍功耗，远不止两倍）和 120FPS（约 5.5 倍功耗），超线性增长。右侧虚线框标注帧间空闲：低帧率时芯片有大段空闲时间可以降频，这是省电的核心机制——不是少干活省电，而是活慢了可以降频休息省得更多。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 背景网格 */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`grid-${i}`}
              x1="70"
              y1={280 - i * 40}
              x2="600"
              y2={280 - i * 40}
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="3 4"
            />
          ))}
          <text
            x="56"
            y="284"
            textAnchor="end"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            0
          </text>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <text
              key={`label-${i}`}
              x="56"
              y={284 - i * 40}
              textAnchor="end"
              fontSize="8"
              fill="var(--text-secondary)"
            >
              {i}×
            </text>
          ))}

          {/* Y 轴 */}
          <line
            x1="66"
            y1="40"
            x2="66"
            y2="280"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* X 轴 */}
          <line
            x1="66"
            y1="280"
            x2="600"
            y2="280"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* ---- 30 FPS 柱 ---- */}
          <rect
            x="110"
            y="240"
            width="80"
            height="40"
            rx="4"
            fill="var(--accent)"
            opacity="0.4"
          />
          <text
            x="150"
            y="232"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            30 FPS
          </text>
          <text
            x="150"
            y="258"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            1.0×
          </text>

          {/* ---- 60 FPS 柱 ---- */}
          <rect
            x="270"
            y="180"
            width="80"
            height="100"
            rx="4"
            fill="var(--accent)"
            opacity="0.65"
          />
          <text
            x="310"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            60 FPS
          </text>
          <text
            x="310"
            y="198"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ≈2.5×
          </text>

          {/* ---- 120 FPS 柱 ---- */}
          <rect
            x="430"
            y="60"
            width="80"
            height="220"
            rx="4"
            fill="var(--accent)"
            opacity="0.9"
          />
          <text
            x="470"
            y="52"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            120 FPS
          </text>
          <text
            x="470"
            y="78"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ≈5.5×
          </text>

          {/* 右侧标注：帧间空闲降频省电机制 */}
          <rect
            x="525"
            y="56"
            width="72"
            height="228"
            rx="4"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="561"
            y="212"
            textAnchor="middle"
            fontSize="8"
            fill="var(--accent)"
          >
            帧间
          </text>
          <text
            x="561"
            y="224"
            textAnchor="middle"
            fontSize="8"
            fill="var(--accent)"
          >
            空闲
          </text>
          <text
            x="561"
            y="236"
            textAnchor="middle"
            fontSize="8"
            fill="var(--accent)"
          >
            降频
          </text>
          <text
            x="561"
            y="248"
            textAnchor="middle"
            fontSize="8"
            fill="var(--accent)"
          >
            省电
          </text>

          {/* 底部标注 */}
          <text
            x="320"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            帧率减半 → 功耗降 60% 以上。非线性来自降频省电，不是少算省电。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        30→60→120 FPS 功耗分别约为 <strong>1.0× / 2.5× / 5.5×</strong>。低帧率下
        CPU/GPU 有大段空闲可降频，这是非线性省电的核心所在。
      </figcaption>
    </figure>
  );
}
