/**
 * <PostProcessStackDiagram highlight="bloom|dof|color|stack|all">：
 * URP/HDRP 后处理栈全屏 Pass 与相对 GPU 开销示意。
 */

type PostHighlight = "bloom" | "dof" | "color" | "stack" | "all";

interface Props {
  highlight?: PostHighlight;
}

const EFFECTS: {
  key: PostHighlight;
  label: string;
  cost: number;
  note: string;
}[] = [
  { key: "color", label: "Color Grading / Tonemap", cost: 18, note: "LUT·曲线" },
  { key: "dof", label: "Depth of Field", cost: 42, note: "多 Pass 模糊" },
  { key: "bloom", label: "Bloom", cost: 55, note: "阈值+乒乓模糊" },
  { key: "stack", label: "Motion Blur / SSR", cost: 72, note: "全分辨率采样" },
];

export function PostProcessStackDiagram({
  highlight = "all",
}: Props) {
  const active = (key: PostHighlight) =>
    highlight === "all" || highlight === key;
  const maxCost = 80;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="后处理栈：多个全屏 Pass 叠加 GPU 开销"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x="48" y="28" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            后处理栈（自下而上执行，每层 ≈ 全屏 Pass）
          </text>

          {EFFECTS.map((fx, i) => {
            const y = 48 + i * 44;
            /* 条形图最大宽度限制到 260，避免条末与右侧注释文字重叠 */
            const barW = (fx.cost / maxCost) * 260;
            const isOn = active(fx.key);
            return (
              <g key={fx.key}>
                <rect
                  x="40"
                  y={y}
                  width="560"
                  height="36"
                  rx="8"
                  fill={isOn ? "var(--bg-elevated)" : "var(--bg)"}
                  stroke={isOn ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isOn ? 2 : 1}
                />
                <text
                  x="56"
                  y={y + 22}
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {fx.label}
                </text>
                <rect
                  x="240"
                  y={y + 10}
                  width={barW}
                  height="16"
                  rx="4"
                  fill={isOn ? "var(--accent)" : "var(--border)"}
                  opacity={isOn ? 0.85 : 0.45}
                />
                <text
                  x="596"
                  y={y + 22}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {fx.note}
                </text>
              </g>
            );
          })}

          <text x="320" y="248" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            {highlight === "all" &&
              "Profiler Post-processing ms 高 → 逐项关 Volume 对比；移动端常只留 Tonemap + 轻 Bloom"}
            {highlight === "bloom" &&
              "Bloom：亮区提取 + 多遍高斯 = 2N+1 次全屏；降 Iterations / 降分辨率可减半开销"}
            {highlight === "dof" &&
              "DOF：CoC + 分离模糊，近远景各采样；对话场景可开，开放世界常关"}
            {highlight === "color" &&
              "Color Grading 相对便宜，但 LUT 512³ 仍有带宽；Built-in/URP Volume 默认常开"}
            {highlight === "stack" &&
              "Motion Blur / SSR 等最贵：每像素多次采样 + 历史缓冲；竞技类应默认关"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        后处理无「合批」可言——每个 Effect 多为独立全屏 Draw；优化靠减 Pass、降分辨率、按平台分级 Volume。
      </figcaption>
    </figure>
  );
}
