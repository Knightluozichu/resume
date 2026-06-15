/**
 * <RegressionDetectionDiagram step={0|1|2}>：性能回归检测三步流程。
 *
 * 建基线 → 设阈值 → 定时检测
 * step prop 控制高亮阶段：0=全览，1-2=对应阶段高亮 accent 色。
 */

type DetectionStep = 0 | 1 | 2;

interface Props {
  step?: DetectionStep;
}

export function RegressionDetectionDiagram({ step }: Props) {
  const stages = [
    {
      label: "建基线",
      sub: "录 5 份采样",
      detail: "记录四组\n统计指标",
      x: 30,
      w: 160,
    },
    {
      label: "设阈值",
      sub: "定义回归条件",
      detail: "均值 >5%\nP95 >8%",
      x: 240,
      w: 160,
    },
    {
      label: "定时检测",
      sub: "每次发版前",
      detail: "自动对比\n超标拦截",
      x: 450,
      w: 160,
    },
  ];

  const isActive = (idx: number) => step === undefined || step === idx;
  const boxStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");
  const boxBg = (idx: number) => (isActive(idx) ? "var(--bg-elevated)" : "var(--bg)");
  const textFill = (idx: number) => (isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)");
  const arrowStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");

  const bottomHints: Record<number, string> = {
    0: "第 ① 步：首次优化后用 Profile Analyzer 录 5 份采样建立黄金基线",
    1: "第 ② 步：设定回归阈值——均值超过基线 5% 或 P95 超过基线 8% 即算回归",
    2: "第 ③ 步：每次发版前跑同场景对比，超标自动拦截，永不漏掉性能退化",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="性能回归检测三步：建立基线 → 设定阈值 → 定时检测与自动拦截"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* Top: three stages */}
          {stages.map((s, i) => (
            <g key={s.label}>
              <rect
                x={s.x}
                y="36"
                width={s.w}
                height="82"
                rx="8"
                fill={boxBg(i)}
                stroke={boxStroke(i)}
                strokeWidth={isActive(i) ? 2.5 : 1.5}
              />
              <circle
                cx={s.x + 16}
                cy="56"
                r="10"
                fill={isActive(i) ? "var(--accent)" : "var(--border)"}
              />
              <text x={s.x + 16} y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--bg)">
                {i + 1}
              </text>
              <text
                x={s.x + s.w / 2 + 6}
                y="58"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={textFill(i)}
              >
                {s.label}
              </text>
              <text
                x={s.x + s.w / 2}
                y="76"
                textAnchor="middle"
                fontSize="12"
                fill={textFill(i)}
              >
                {s.sub}
              </text>
              <text x={s.x + s.w / 2} y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                {s.detail.split("\n")[0]}
              </text>
              <text x={s.x + s.w / 2} y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                {s.detail.split("\n")[1]}
              </text>

              {i < stages.length - 1 && (
                <>
                  <line
                    x1={s.x + s.w + 8}
                    y1="72"
                    x2={s.x + s.w + 40}
                    y2="72"
                    stroke={arrowStroke(i)}
                    strokeWidth="2"
                  />
                  <path d={`M${s.x + s.w + 40} 72 l-8 -4 l0 8 z`} fill={arrowStroke(i)} />
                </>
              )}
            </g>
          ))}

          {/* Bottom: regression illustration */}
          <text x="320" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            回归检测原理
          </text>

          {/* Baseline bar */}
          <rect x="80" y="160" width="120" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="140" y="176" textAnchor="middle" fontSize="10" fill="var(--success)">
            基线: 12ms
          </text>

          {/* Arrow to current */}
          <line x1="210" y1="172" x2="245" y2="172" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#regArrow)" />

          {/* Current bar */}
          <rect x="250" y="160" width="120" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="310" y="176" textAnchor="middle" fontSize="10" fill="var(--accent)">
            当前: 14.5ms
          </text>

          {/* Threshold line */}
          <line x1="80" y1="210" x2="370" y2="210" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="6,3" />
          <text x="378" y="214" fontSize="9" fill="var(--danger)">
            阈值区间 (×1.05)
          </text>

          {/* Arrow from threshold to "回归!" label */}
          <text x="215" y="228" fontSize="11" fontWeight="600" fill="var(--danger)">
            14.5 &gt; 12.6 → 回归！阻挡合入
          </text>

          {/* Defs */}
          <defs>
            <marker id="regArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        回归检测不是跑一次看看——是每次 PR 都自动对比基线，超标直接拦在门外。
      </figcaption>
    </figure>
  );
}
