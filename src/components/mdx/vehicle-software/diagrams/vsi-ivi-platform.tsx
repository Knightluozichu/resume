/**
 * <VsiIviPlatformDiagram>：车载信息娱乐系统平台对比图。
 *
 * 并排三列对比 Android Automotive vs QNX vs Linux（AGL），每列五项属性：
 *   内核类型 · 实时性 · 生态丰富度 · 安全等级 · 适用场景
 * 列顶平台名 + 一句话定位，列底以进度条可视化"实时性 / 生态 / 安全"三角权衡。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×540（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 540;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const COL_W = 208;
const GAP = 16;
const MARGIN_X = 32;
const COL_X = [MARGIN_X, MARGIN_X + COL_W + GAP, MARGIN_X + 2 * (COL_W + GAP)]; // 32, 256, 480

interface Platform {
  name: string;
  tagline: string;
  color: string;
  attrs: { label: string; value: string }[];
  // 三角权衡 0~1：实时性、生态、安全
  bars: { label: string; ratio: number }[];
}

const PLATFORMS: readonly Platform[] = [
  {
    name: "Android Automotive",
    tagline: "Google 全栈生态",
    color: accent,
    attrs: [
      { label: "内核类型", value: "Linux 宏内核" },
      { label: "实时性", value: "一般 · 非硬实时" },
      { label: "生态丰富度", value: "极丰富 · Google 服务" },
      { label: "安全等级", value: "中 · ASIL-B 可达" },
      { label: "适用场景", value: "IVI 娱乐、应用生态" },
    ],
    bars: [
      { label: "实时", ratio: 0.35 },
      { label: "生态", ratio: 0.95 },
      { label: "安全", ratio: 0.5 },
    ],
  },
  {
    name: "QNX",
    tagline: "安全硬实时微内核",
    color: success,
    attrs: [
      { label: "内核类型", value: "微内核 · POSIX" },
      { label: "实时性", value: "硬实时" },
      { label: "生态丰富度", value: "较弱 · 封闭授权" },
      { label: "安全等级", value: "高 · ASIL-D" },
      { label: "适用场景", value: "仪表、安全域" },
    ],
    bars: [
      { label: "实时", ratio: 0.95 },
      { label: "生态", ratio: 0.35 },
      { label: "安全", ratio: 0.95 },
    ],
  },
  {
    name: "Linux (AGL)",
    tagline: "开源可定制",
    color: warning,
    attrs: [
      { label: "内核类型", value: "Linux 宏内核" },
      { label: "实时性", value: "一般 · PREEMPT_RT" },
      { label: "生态丰富度", value: "中等 · 开源社区" },
      { label: "安全等级", value: "中低" },
      { label: "适用场景", value: "原型、定制 IVI" },
    ],
    bars: [
      { label: "实时", ratio: 0.5 },
      { label: "生态", ratio: 0.6 },
      { label: "安全", ratio: 0.4 },
    ],
  },
];

export function VsiIviPlatformDiagram() {
  const headerY = 96;
  const headerH = 50;
  const attrStartY = 162;
  const attrRowH = 30;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="车载信息娱乐系统平台对比图。三列并排：Android Automotive（紫色，Linux 宏内核、非硬实时、生态极丰富、ASIL-B、IVI 娱乐）；QNX（绿色，微内核 POSIX、硬实时、生态较弱、ASIL-D、仪表安全域）；Linux AGL（黄色，Linux 宏内核、PREEMPT_RT、开源社区、安全中低、原型定制）。底部以进度条对比实时性、生态、安全三项权衡。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={40} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            IVI 平台对比 · Android Automotive vs QNX vs Linux
          </text>
          <text x={VIEW_W / 2} y={62} textAnchor="middle" fontSize="11" fill={secondary}>
            内核 / 实时性 / 生态 / 安全 / 场景 五维对照，底部三角权衡一目了然
          </text>

          {/* 三列 */}
          {PLATFORMS.map((p, ci) => {
            const x = COL_X[ci];
            return (
              <g key={p.name}>
                {/* 列外框 */}
                <rect x={x} y={headerY} width={COL_W} height={VIEW_H - headerY - 56} rx="12" fill={p.color} fillOpacity="0.04" stroke={p.color} strokeWidth="1.4" strokeOpacity="0.5" />
                {/* 列头 */}
                <rect x={x} y={headerY} width={COL_W} height={headerH} rx="12" fill={p.color} fillOpacity="0.16" stroke={p.color} strokeWidth="1.6" />
                <text x={x + COL_W / 2} y={headerY + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={p.color}>
                  {p.name}
                </text>
                <text x={x + COL_W / 2} y={headerY + 40} textAnchor="middle" fontSize="11" fill={secondary}>
                  {p.tagline}
                </text>

                {/* 属性行 */}
                {p.attrs.map((a, ai) => {
                  const ry = attrStartY + ai * attrRowH;
                  return (
                    <g key={a.label}>
                      <text x={x + 14} y={ry + 12} fontSize="11" fill={secondary}>
                        {a.label}
                      </text>
                      <text x={x + COL_W - 14} y={ry + 12} textAnchor="end" fontSize="11" fontWeight="600" fill={primary}>
                        {a.value}
                      </text>
                      {ai < p.attrs.length - 1 && (
                        <line x1={x + 12} y1={ry + 20} x2={x + COL_W - 12} y2={ry + 20} stroke={border} strokeWidth="1" strokeOpacity="0.7" />
                      )}
                    </g>
                  );
                })}

                {/* 三角权衡进度条 */}
                <text x={x + COL_W / 2} y={attrStartY + 5 * attrRowH + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill={p.color}>
                  实时 / 生态 / 安全
                </text>
                {p.bars.map((b, bi) => {
                  const by = attrStartY + 5 * attrRowH + 28 + bi * 22;
                  return (
                    <g key={b.label}>
                      <text x={x + 14} y={by + 10} fontSize="11" fill={secondary}>
                        {b.label}
                      </text>
                      <rect x={x + 44} y={by + 2} width={COL_W - 60} height="10" rx="3" fill={p.color} fillOpacity="0.1" stroke={border} strokeWidth="0.8" />
                      <rect x={x + 44} y={by + 2} width={(COL_W - 60) * b.ratio} height="10" rx="3" fill={p.color} fillOpacity="0.6" />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={VIEW_H - 24} textAnchor="middle" fontSize="12" fill={secondary}>
            娱乐选 Android · 安全选 QNX · 定制选 Linux——三角权衡，按域择优
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        IVI 平台三列对比：Android Automotive（Linux 宏内核、非硬实时、生态极丰富、ASIL-B、IVI 娱乐）；QNX（微内核 POSIX、硬实时、生态较弱、ASIL-D、仪表安全域）；Linux AGL（Linux 宏内核、PREEMPT_RT、开源社区、安全中低、原型定制）。底部以进度条对比实时性、生态、安全三项权衡。
      </figcaption>
    </figure>
  );
}
