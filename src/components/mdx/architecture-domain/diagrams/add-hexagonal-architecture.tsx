/**
 * <AddHexagonalArchitectureDiagram>：六边形架构图（architecture-domain 架构实践章）。
 *
 * 中心是 Application Core（Domain + Application Services），周围六个端口：
 *   HTTP API, CLI, Test, DB, Message Queue, External API
 * 端口用六边形表示，适配器在外侧。箭头从适配器指向端口
 * （适配器实现端口接口）。标注「核心不依赖外部」。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const CX = 360;
const CY = 290;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 六个端口（角度从正上方开始顺时针）
const PORTS: { label: string; angle: number; color: string }[] = [
  { label: "HTTP API", angle: -90, color: accent },
  { label: "CLI", angle: -30, color: accent },
  { label: "Test", angle: 30, color: success },
  { label: "DB", angle: 90, color: warning },
  { label: "Msg Queue", angle: 150, color: accent },
  { label: "External API", angle: 210, color: accent },
];

const PORT_R = 190; // 端口中心距圆心
const ADAPTER_R = 260; // 适配器中心距圆心

function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
}

function polar(r: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export function AddHexagonalArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="六边形架构图。中心是 Application Core（Domain + Application Services），周围六个端口（六边形）：HTTP API、CLI、Test、DB、Message Queue、External API。适配器在外侧，箭头从适配器指向端口（适配器实现端口接口）。标注核心不依赖外部。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="hex-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            六边形架构 · 端口与适配器
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            核心不依赖外部——适配器实现端口，端口定义在核心内
          </text>

          {/* 外六边形边界（大） */}
          <polygon
            points={hexPoints(CX, CY, 150)}
            fill="none"
            stroke={border}
            strokeWidth="1.2"
            strokeDasharray="6 4"
            strokeOpacity="0.5"
          />

          {/* 中心 Application Core */}
          <polygon
            points={hexPoints(CX, CY, 78)}
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="2"
          />
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize="14" fontWeight="700" fill={success}>
            Application
          </text>
          <text x={CX} y={CY + 10} textAnchor="middle" fontSize="14" fontWeight="700" fill={success}>
            Core
          </text>
          <text x={CX} y={CY + 28} textAnchor="middle" fontSize="11" fill={secondary}>
            Domain + Services
          </text>

          {/* 六个端口 + 适配器 */}
          {PORTS.map((port) => {
            const pp = polar(PORT_R, port.angle);
            const ap = polar(ADAPTER_R, port.angle);
            return (
              <g key={port.label}>
                {/* 端口（小六边形） */}
                <polygon
                  points={hexPoints(pp.x, pp.y, 30)}
                  fill={port.color}
                  fillOpacity="0.08"
                  stroke={port.color}
                  strokeWidth="1.5"
                />
                <text
                  x={pp.x}
                  y={pp.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={port.color}
                  fontFamily="monospace"
                >
                  {port.label}
                </text>

                {/* 适配器标签（外侧） */}
                <rect
                  x={ap.x - 48}
                  y={ap.y - 14}
                  width="96"
                  height="28"
                  rx="6"
                  fill={primary}
                  fillOpacity="0.04"
                  stroke={secondary}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <text
                  x={ap.x}
                  y={ap.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  Adapter
                </text>

                {/* 适配器 → 端口 箭头 */}
                <line
                  x1={ap.x}
                  y1={ap.y}
                  x2={pp.x}
                  y2={pp.y}
                  stroke={secondary}
                  strokeWidth="1.4"
                  strokeOpacity="0.6"
                  markerEnd="url(#hex-arrow)"
                />
              </g>
            );
          })}

          {/* 核心不依赖外部 标注 */}
          <text x={CX} y={CY + 50} textAnchor="middle" fontSize="11" fill={success} fontStyle="italic">
            «核心不依赖外部»
          </text>

          {/* 图例 */}
          <line x1={48} y1={500} x2={VIEW_W - 48} y2={500} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <g>
            <polygon points={hexPoints(72, 524, 10)} fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
            <text x={92} y={528} fontSize="11" fill={primary}>Application Core（核心）</text>
            <polygon points={hexPoints(296, 524, 10)} fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5" />
            <text x={316} y={528} fontSize="11" fill={primary}>Port（端口）</text>
            <rect x={440} y={518} width="20" height="14" rx="3" fill={primary} fillOpacity="0.04" stroke={secondary} strokeWidth="1" strokeOpacity="0.5" />
            <text x={468} y={528} fontSize="11" fill={primary}>Adapter（适配器）</text>
          </g>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={552} textAnchor="middle" fontSize="12" fill={secondary}>
            端口是接口，适配器是实现——外部替换适配器不影响核心
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        六边形架构：中心是 Application Core（Domain + Application Services），周围六个端口（HTTP API、CLI、Test、DB、Message Queue、External API）。适配器在外侧实现端口接口，箭头从适配器指向端口——核心不依赖任何外部。
      </figcaption>
    </figure>
  );
}
