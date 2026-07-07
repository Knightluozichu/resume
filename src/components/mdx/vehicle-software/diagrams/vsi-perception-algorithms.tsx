/**
 * <VsiPerceptionAlgorithmsDiagram>：感知算法 pipeline 流程图。
 *
 * 从原始图像到感知结果的主干流水线（左→右）：
 *   图像输入 → 预处理（去畸变/增强）→ Backbone 特征提取 → Neck 颈部网络
 * 随后分两支任务头：
 *   - 检测头（2D/3D 框）→ 目标检测输出
 *   - 分割头（语义分割）→ 像素级输出
 * 标注代表算法：YOLO（检测）、BEVFormer（3D/BEV）、DeepLab（分割）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const accent2 = "var(--accent)";

interface Stage {
  name: string;
  detail: string;
  color: string;
  x: number;
}

const STAGE_W = 132;
const STAGE_H = 68;
const STAGE_GAP = 20;
const STAGE_START_X = (VIEW_W - STAGE_W * 4 - STAGE_GAP * 3) / 2; // 66
const STAGE_Y = 110;

const STAGES: readonly Stage[] = [
  { name: "图像输入", detail: "RGB / 多摄", color: primary, x: STAGE_START_X },
  { name: "预处理", detail: "去畸变 · 增强", color: warning, x: STAGE_START_X + (STAGE_W + STAGE_GAP) },
  { name: "Backbone", detail: "CNN / Transformer", color: accent, x: STAGE_START_X + 2 * (STAGE_W + STAGE_GAP) },
  { name: "Neck", detail: "FPN / PAN 多尺度", color: accent2, x: STAGE_START_X + 3 * (STAGE_W + STAGE_GAP) },
];

const HEAD_Y = 244;
const HEAD_W = 150;
const HEAD_H = 64;
// 两头分别置于 Neck 下方左右
const DET_X = STAGES[3].x - 24;
const SEG_X = STAGES[3].x + STAGE_W - HEAD_W + 24;

export function VsiPerceptionAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="感知算法 pipeline 流程图。主干：图像输入 → 预处理（去畸变、增强）→ Backbone 特征提取 → Neck 颈部网络。随后分两支：检测头输出 2D/3D 框（代表算法 YOLO、BEVFormer），分割头输出语义分割（代表算法 DeepLab）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vpa-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vpa-arrow-acc" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            感知算法 · 端到端 Pipeline
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            图像进 → 特征提 → 多尺度融合 → 检测 / 分割双头出
          </text>

          {/* 主干四阶段 */}
          {STAGES.map((s, i) => (
            <g key={s.name}>
              <rect x={s.x} y={STAGE_Y} width={STAGE_W} height={STAGE_H} rx="10" fill={s.color} fillOpacity="0.07" stroke={s.color} strokeWidth="1.5" />
              <text x={s.x + STAGE_W / 2} y={STAGE_Y + 28} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>
                {s.name}
              </text>
              <text x={s.x + STAGE_W / 2} y={STAGE_Y + 48} textAnchor="middle" fontSize="11" fill={secondary}>
                {s.detail}
              </text>
              {i < STAGES.length - 1 && (
                <line
                  x1={s.x + STAGE_W + 1}
                  y1={STAGE_Y + STAGE_H / 2}
                  x2={STAGES[i + 1].x - 1}
                  y2={STAGE_Y + STAGE_H / 2}
                  stroke={secondary}
                  strokeWidth="1.6"
                  markerEnd="url(#vpa-arrow)"
                />
              )}
            </g>
          ))}

          {/* Neck 分流到两个头 */}
          <line x1={STAGES[3].x + STAGE_W / 2 - 20} y1={STAGE_Y + STAGE_H} x2={DET_X + HEAD_W / 2} y2={HEAD_Y} stroke={accent} strokeWidth="1.6" markerEnd="url(#vpa-arrow-acc)" />
          <line x1={STAGES[3].x + STAGE_W / 2 + 20} y1={STAGE_Y + STAGE_H} x2={SEG_X + HEAD_W / 2} y2={HEAD_Y} stroke={accent} strokeWidth="1.6" markerEnd="url(#vpa-arrow-acc)" />
          <text x={STAGES[3].x + STAGE_W / 2} y={STAGE_Y + STAGE_H + 56} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
            多任务分头
          </text>

          {/* 检测头 */}
          <rect x={DET_X} y={HEAD_Y} width={HEAD_W} height={HEAD_H} rx="10" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.6" />
          <text x={DET_X + HEAD_W / 2} y={HEAD_Y + 26} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            检测头
          </text>
          <text x={DET_X + HEAD_W / 2} y={HEAD_Y + 46} textAnchor="middle" fontSize="11" fill={secondary}>
            2D / 3D 框回归
          </text>

          {/* 分割头 */}
          <rect x={SEG_X} y={HEAD_Y} width={HEAD_W} height={HEAD_H} rx="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.6" />
          <text x={SEG_X + HEAD_W / 2} y={HEAD_Y + 26} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            分割头
          </text>
          <text x={SEG_X + HEAD_W / 2} y={HEAD_Y + 46} textAnchor="middle" fontSize="11" fill={secondary}>
            语义 / 实例分割
          </text>

          {/* 输出 */}
          <line x1={DET_X + HEAD_W / 2} y1={HEAD_Y + HEAD_H} x2={DET_X + HEAD_W / 2} y2={HEAD_Y + HEAD_H + 28} stroke={accent} strokeWidth="1.5" markerEnd="url(#vpa-arrow-acc)" />
          <line x1={SEG_X + HEAD_W / 2} y1={HEAD_Y + HEAD_H} x2={SEG_X + HEAD_W / 2} y2={HEAD_Y + HEAD_H + 28} stroke={success} strokeWidth="1.5" markerEnd="url(#vpa-arrow)" />

          {/* 检测输出示意（框） */}
          <g>
            <rect x={DET_X} y={HEAD_Y + HEAD_H + 36} width={HEAD_W} height={50} rx="8" fill="var(--bg)" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
            <rect x={DET_X + 18} y={HEAD_Y + HEAD_H + 48} width="34" height="22" rx="2" fill="none" stroke={accent} strokeWidth="1.4" />
            <rect x={DET_X + 64} y={HEAD_Y + HEAD_H + 52} width="28" height="16" rx="2" fill="none" stroke={accent} strokeWidth="1.4" />
            <rect x={DET_X + 100} y={HEAD_Y + HEAD_H + 56} width="20" height="14" rx="2" fill="none" stroke={accent} strokeWidth="1.4" />
            <text x={DET_X + HEAD_W / 2} y={HEAD_Y + HEAD_H + 80} textAnchor="middle" fontSize="11" fill={secondary}>
              目标检测输出
            </text>
          </g>

          {/* 分割输出示意（色块） */}
          <g>
            <rect x={SEG_X} y={HEAD_Y + HEAD_H + 36} width={HEAD_W} height={50} rx="8" fill="var(--bg)" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
            <rect x={SEG_X + 14} y={HEAD_Y + HEAD_H + 46} width="38" height="16" rx="2" fill={success} fillOpacity="0.5" />
            <rect x={SEG_X + 58} y={HEAD_Y + HEAD_H + 50} width="30" height="20" rx="2" fill={accent} fillOpacity="0.4" />
            <rect x={SEG_X + 94} y={HEAD_Y + HEAD_H + 48} width="28" height="18" rx="2" fill={warning} fillOpacity="0.4" />
            <text x={SEG_X + HEAD_W / 2} y={HEAD_Y + HEAD_H + 80} textAnchor="middle" fontSize="11" fill={secondary}>
              像素级分割输出
            </text>
          </g>

          {/* 代表算法标注 */}
          <line x1={32} y1={390} x2={VIEW_W - 32} y2={390} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            代表算法
          </text>
          {[
            { name: "YOLO系列", task: "2D 实时检测", color: accent, x: 56 },
            { name: "BEVFormer", task: "3D / BEV 感知", color: accent, x: 280 },
            { name: "DeepLab / SegFormer", task: "语义分割", color: success, x: 460 },
          ].map((a) => (
            <g key={a.name}>
              <rect x={a.x} y={424} width={208} height={56} rx="8" fill={a.color} fillOpacity="0.06" stroke={a.color} strokeWidth="1.3" />
              <text x={a.x + 104} y={446} textAnchor="middle" fontSize="12" fontWeight="700" fill={a.color}>
                {a.name}
              </text>
              <text x={a.x + 104} y={466} textAnchor="middle" fontSize="11" fill={secondary}>
                {a.task}
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={506} textAnchor="middle" fontSize="11" fill={secondary}>
            Backbone 提特征 · Neck 融多尺度 · 双头分任务——一套主干多种感知
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        感知算法 pipeline：图像输入 → 预处理（去畸变、增强）→ Backbone 特征提取（CNN/Transformer）→ Neck 颈部网络（FPN/PAN 多尺度），随后分两支任务头：检测头输出 2D/3D 框（代表算法 YOLO、BEVFormer），分割头输出语义分割（代表算法 DeepLab/SegFormer）。
      </figcaption>
    </figure>
  );
}
