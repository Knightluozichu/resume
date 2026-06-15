/**
 * <ProfileAnalyzerWorkflowDiagram step={0|1|2|3}>：Profile Analyzer 多帧统计对比流程。
 *
 * 导入数据 → 框选帧范围 → 统计计算 → 对比结论
 * step prop 控制高亮阶段：0=全览，1-3=对应阶段高亮 accent 色。
 */

type WorkflowStep = 0 | 1 | 2 | 3;

interface Props {
  step?: WorkflowStep;
}

export function ProfileAnalyzerWorkflowDiagram({ step }: Props) {
  const stages = [
    {
      label: "导入数据",
      sub: "多份 .data",
      detail: "基线 3–5 份\n优化后 3 份",
      x: 24,
      w: 130,
    },
    {
      label: "框选帧",
      sub: "排除干扰",
      detail: "切掉加载期\n留稳定运行段",
      x: 174,
      w: 130,
    },
    {
      label: "统计计算",
      sub: "四指标",
      detail: "均值/中位数\nP95/标准差",
      x: 324,
      w: 130,
    },
    {
      label: "对比结论",
      sub: "判定有效",
      detail: "四指标全降\n优化可合入",
      x: 474,
      w: 130,
    },
  ];

  const isActive = (idx: number) => step === undefined || step === idx;
  const boxStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");
  const boxBg = (idx: number) => (isActive(idx) ? "var(--bg-elevated)" : "var(--bg)");
  const textFill = (idx: number) => (isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)");
  const arrowStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");

  const bottomHints: Record<number, string> = {
    0: "第 ① 步：把基线采样数据和优化后采样数据全部导入 Profile Analyzer",
    1: "第 ② 步：手动框选每份数据的有效帧范围，排除场景加载和暂停期的异常帧",
    2: "第 ③ 步：Profiler Analyzer 自动计算均值、中位数、P95、标准差四组统计量",
    3: "第 ④ 步：基线与优化后数据并排对比，四指标全降低、标准差稳定 = 优化有效",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 200"
          role="img"
          aria-label="Profile Analyzer 使用流程：导入数据 → 框选帧范围 → 统计计算 → 对比结论"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {stages.map((s, i) => (
            <g key={s.label}>
              <rect
                x={s.x}
                y="40"
                width={s.w}
                height="84"
                rx="8"
                fill={boxBg(i)}
                stroke={boxStroke(i)}
                strokeWidth={isActive(i) ? 2.5 : 1.5}
              />
              <circle
                cx={s.x + 14}
                cy="58"
                r="10"
                fill={isActive(i) ? "var(--accent)" : "var(--border)"}
              />
              <text
                x={s.x + 14}
                y="62"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--bg)"
              >
                {i + 1}
              </text>
              <text
                x={s.x + s.w / 2}
                y="62"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={textFill(i)}
              >
                {s.label}
              </text>
              <text
                x={s.x + s.w / 2}
                y="82"
                textAnchor="middle"
                fontSize="12"
                fill={textFill(i)}
              >
                {s.sub}
              </text>
              <text
                x={s.x + s.w / 2}
                y="104"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[0]}
              </text>
              <text
                x={s.x + s.w / 2}
                y="118"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[1]}
              </text>
              {i < stages.length - 1 && (
                <>
                  <line
                    x1={s.x + s.w + 4}
                    y1="82"
                    x2={s.x + s.w + 18}
                    y2="82"
                    stroke={arrowStroke(i)}
                    strokeWidth="2"
                  />
                  <path
                    d={`M${s.x + s.w + 18} 82 l-8 -4 l0 8 z`}
                    fill={arrowStroke(i)}
                  />
                </>
              )}
            </g>
          ))}
          <text
            x="320"
            y="165"
            textAnchor="middle"
            fontSize="12"
            fill={step === 0 || step === undefined ? "var(--text-primary)" : "var(--text-secondary)"}
          >
            {step === undefined
              ? "Profile Analyzer 四步：导入 → 框帧 → 统计 → 对比"
              : bottomHints[step]}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Profile Analyzer 把「跑一次看看」变成「跑多次、看分布、比趋势」。
      </figcaption>
    </figure>
  );
}
