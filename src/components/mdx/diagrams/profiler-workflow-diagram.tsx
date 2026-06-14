/**
 * <ProfilerWorkflowDiagram step={0|1|2|3}>：Unity 性能优化工作流四步。
 *
 * 建立基线 → 定位瓶颈 → 验证修复 → 回归测试
 * step prop 控制高亮阶段：0=全览，1-3=对应阶段高亮 accent 色。
 */

type WorkflowStep = 0 | 1 | 2 | 3;

interface Props {
  /** 0–3 对应四步工作流；省略则四步全高亮（概览） */
  step?: WorkflowStep;
}

export function ProfilerWorkflowDiagram({ step }: Props) {
  const stages = [
    {
      label: "建立基线",
      sub: "Profiler 记录",
      detail: "固定场景·画质\n记录 FPS/耗时",
      x: 24,
      w: 130,
    },
    {
      label: "定位瓶颈",
      sub: "CPU/GPU 模块",
      detail: "找最热函数\n或最重 Draw",
      x: 174,
      w: 130,
    },
    {
      label: "验证修复",
      sub: "对比前后",
      detail: "同场景复测\n看指标下降",
      x: 324,
      w: 130,
    },
    {
      label: "回归测试",
      sub: "防回退",
      detail: "多设备·长时\n纳入 CI 基线",
      x: 474,
      w: 130,
    },
  ];

  const isActive = (idx: number) =>
    step === undefined || step === idx;
  const boxStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";
  const boxBg = (idx: number) =>
    isActive(idx) ? "var(--bg-elevated)" : "var(--bg)";
  const textFill = (idx: number) =>
    isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)";
  const arrowStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";

  const bottomHints: Partial<Record<WorkflowStep, string>> & { all: string } = {
    all: "四步循环：建立基线 → 定位瓶颈 → 验证修复 → 回归测试",
    0: "第 ① 步：在固定场景下用 Profiler 记下 FPS、CPU ms、GPU ms，建立对照尺",
    1: "第 ② 步：展开 CPU Usage / Rendering，找到耗时最高的热点",
    2: "第 ③ 步：改完在同场景复测，对比基线数字是否变好",
    3: "第 ④ 步：多轮、多设备回归，防止后续提交把性能改回去",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 200"
          role="img"
          aria-label="Unity Profiler 优化工作流：建立基线、定位瓶颈、验证修复、回归测试"
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
            fill={
              step === undefined ? "var(--text-secondary)" : "var(--text-primary)"
            }
          >
            {step === undefined ? bottomHints.all : bottomHints[step]}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Profile First：先测量再优化。四步循环避免「盲改代码却越改越慢」。
      </figcaption>
    </figure>
  );
}
