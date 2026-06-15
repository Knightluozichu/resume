/**
 * <VsyncFrameBudgetDiagram step={0|1|2}>：TargetFrameRate 与 VSync 帧预算。
 *
 * step=0：全览（三行并排：VSync Off / VSync On 60FPS / VSync On 30FPS）
 * step=1：VSync Off（无等待、画面撕裂）
 * step=2：VSync On 60FPS / 30FPS（等待 vsync 信号、画面完整）
 */

type VsyncStep = 0 | 1 | 2;

interface Props {
  step?: VsyncStep;
}

export function VsyncFrameBudgetDiagram({ step }: Props) {
  const rows = [
    {
      label: "VSync Off",
      sub: "无垂直同步等待",
      fps: "不限帧",
      frameTime: "不等 VSync 信号",
      result: "画面撕裂（Tearing）",
      detail: "GPU 渲染一帧立刻上屏\n可能切到上一帧一半",
      x: 40,
      y: 50,
    },
    {
      label: "VSync On\n60FPS",
      sub: "每 16.67ms 一帧",
      fps: "60 FPS 上限",
      frameTime: "Application.targetFrameRate = 60",
      result: "流畅无撕裂",
      detail: "错过一个 VSync = 掉帧\n预算 16ms，超了就等下个",
      x: 220,
      y: 50,
    },
    {
      label: "VSync On\n30FPS",
      sub: "每 33.33ms 一帧",
      fps: "30 FPS 上限",
      frameTime: "Application.targetFrameRate = 30",
      result: "流畅省电",
      detail: "GPU 渲染完等 2 个 VSync\n功耗大幅下降",
      x: 400,
      y: 50,
    },
  ];

  const isActive = (idx: number) =>
    step === undefined || step === 0 || step - 1 === idx;

  const boxStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";
  const boxBg = (idx: number) =>
    isActive(idx) ? "var(--bg-elevated)" : "var(--bg)";
  const textFill = (idx: number) =>
    isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)";
  const lineStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";

  const colW = 170;
  const bottomHints: Record<number | "all", string> = {
    all: "VSync 是 GPU 上屏的节拍器：开了 = 等刷新周期（画面完整）、关了 = 抢跑上屏（撕裂）",
    1: "VSync Off（不限帧）：GPU 画完立刻抢占屏幕缓冲区，上帧下半还没显示完就被覆盖——画面中间出现水平撕裂线",
    2: "VSync On：Application.targetFrameRate 配合 VSync 设帧率上限，每帧必须等下一 vsync 信号才交换缓冲区——画面完整无撕裂",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="VSync 帧预算：VSync Off 画面撕裂、VSync On 60FPS 流畅、VSync On 30FPS 省电"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {rows.map((r, i) => (
            <g key={r.label}>
              <rect
                x={r.x}
                y={r.y}
                width={colW}
                height="150"
                rx="8"
                fill={boxBg(i)}
                stroke={boxStroke(i)}
                strokeWidth={isActive(i) ? 2.5 : 1.5}
              />
              {/* Mode label */}
              {r.label.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={r.x + colW / 2}
                  y={r.y + 22 + li * 18}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  fill={textFill(i)}
                >
                  {line}
                </text>
              ))}
              {/* Sub label — pushed down to avoid overlap with multi-line titles */}
              <text
                x={r.x + colW / 2}
                y={r.y + 56}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {r.sub}
              </text>
              {/* FPS */}
              <text
                x={r.x + colW / 2}
                y={r.y + 84}
                textAnchor="middle"
                fontSize="22"
                fontWeight="700"
                fill={isActive(i) ? "var(--accent)" : "var(--text-primary)"}
              >
                {r.fps}
              </text>
              {/* frameTime */}
              <text
                x={r.x + colW / 2}
                y={r.y + 106}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {r.frameTime}
              </text>
              {/* Result */}
              <rect
                x={r.x + 10}
                y={r.y + 118}
                width={colW - 20}
                height="22"
                rx="4"
                fill={isActive(i) ? "var(--accent-glow)" : "var(--bg)"}
              />
              <text
                x={r.x + colW / 2}
                y={r.y + 133}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill={isActive(i) ? "var(--accent)" : "var(--text-secondary)"}
              >
                {r.result}
              </text>
              {/* Detail */}
              <text
                x={r.x + colW / 2}
                y={r.y + 156}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                {r.detail.split("\n")[0]}
              </text>
              {/* Arrow between */}
              {i < rows.length - 1 && (
                <>
                  <line
                    x1={r.x + colW + 4}
                    y1={r.y + 66}
                    x2={r.x + colW + 18}
                    y2={r.y + 66}
                    stroke={lineStroke(i)}
                    strokeWidth="2"
                  />
                  <path
                    d={`M${r.x + colW + 18} ${r.y + 66} l-6 -3.5 l0 7 z`}
                    fill={lineStroke(i)}
                  />
                </>
              )}
            </g>
          ))}
          {/* VSync timeline */}
          <line
            x1="20"
            y1="225"
            x2="620"
            y2="225"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="8,4"
          />
          <text x="20" y="240" fontSize="9" fill="var(--text-secondary)">
            VSync 信号（每 16.67ms 一次）
          </text>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((t) => (
            <g key={t}>
              <line
                x1={20 + (t * 600) / 8}
                y1="219"
                x2={20 + (t * 600) / 8}
                y2="231"
                stroke={
                  isActive(0) || isActive(1) || isActive(2)
                    ? "var(--accent)"
                    : "var(--border)"
                }
                strokeWidth="1"
              />
              <circle
                cx={20 + (t * 600) / 8}
                cy="225"
                r="3"
                fill="var(--accent)"
                opacity={
                  isActive(0) || isActive(1) || isActive(2) ? 0.5 : 0.2
                }
              />
            </g>
          ))}
          {/* Bottom hint */}
          <text
            x="320"
            y="265"
            textAnchor="middle"
            fontSize="11"
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
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        VSync = 垂直同步信号，由显示器每 16.67ms（60Hz）发出一次。用
        Application.targetFrameRate 与 VSync 配合控制帧预算上限。
      </figcaption>
    </figure>
  );
}
