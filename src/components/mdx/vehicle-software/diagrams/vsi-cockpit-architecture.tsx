/**
 * <VsiCockpitArchitectureDiagram>：智能座舱分层架构图。
 *
 * 自上而下四层带状堆叠，层间用箭头表示调用关系：
 *   - 应用层（accent 紫）：导航、语音助手、娱乐影音、车控互联
 *   - 中间件层（success 绿）：通信总线、多媒体框架、安全服务
 *   - OS 层（warning 黄）：QNX（仪表/安全）+ Android（IVI/娱乐），由 Hypervisor 隔离
 *   - 硬件层（primary 中性）：中控屏、仪表盘、HUD、麦克风阵列
 * 底部独立标注 SoC 芯片（双系统共享一颗 SoC）与多屏互动链路。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 带状层几何
const BAND_X = 56;
const BAND_W = VIEW_W - 112; // 608
const TAG_W = 96; // 左侧层名标签宽

interface LayerBand {
  name: string;
  en: string;
  color: string;
  y: number;
  h: number;
  cells: string[];
}

const BANDS: readonly LayerBand[] = [
  { name: "应用层", en: "Application", color: accent, y: 88, h: 68, cells: ["导航", "语音助手", "娱乐影音", "车控互联"] },
  { name: "中间件层", en: "Middleware", color: success, y: 170, h: 60, cells: ["通信总线", "多媒体框架", "安全服务"] },
  { name: "OS 层", en: "OS", color: warning, y: 246, h: 72, cells: ["QNX · 仪表/安全域", "Android · IVI/娱乐域"] },
  { name: "硬件层", en: "Hardware", color: primary, y: 332, h: 72, cells: ["中控屏", "液晶仪表", "HUD", "麦克风阵列"] },
];

export function VsiCockpitArchitectureDiagram() {
  const cellAreaX = BAND_X + TAG_W + 16;
  const cellAreaW = BAND_W - TAG_W - 32;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="智能座舱分层架构图。自上而下四层：应用层（紫色，含导航、语音助手、娱乐影音、车控互联）；中间件层（绿色，含通信总线、多媒体框架、安全服务）；OS 层（黄色，含 QNX 仪表安全域与 Android IVI 娱乐域，由 Hypervisor 隔离）；硬件层（含中控屏、液晶仪表、HUD、麦克风阵列）。底部标注 SoC 芯片（双系统共享一颗 SoC）与多屏互动链路。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vca-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vca-arrow-accent" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={40} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            智能座舱 · 分层架构
          </text>
          <text x={VIEW_W / 2} y={62} textAnchor="middle" fontSize="11" fill={secondary}>
            应用调用中间件 → 中间件调度双 OS → 双 OS 经 Hypervisor 共享 SoC → 驱动硬件外设
          </text>

          {/* 四层带 */}
          {BANDS.map((b) => {
            const n = b.cells.length;
            const gap = 14;
            const cellW = (cellAreaW - gap * (n - 1)) / n;
            return (
              <g key={b.name}>
                <rect x={BAND_X} y={b.y} width={BAND_W} height={b.h} rx="10" fill={b.color} fillOpacity="0.05" stroke={b.color} strokeWidth="1.4" strokeOpacity="0.55" />
                {/* 左侧层名标签 */}
                <rect x={BAND_X + 10} y={b.y + 10} width={TAG_W - 16} height={b.h - 20} rx="8" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.2" strokeOpacity="0.5" />
                <text x={BAND_X + 10 + (TAG_W - 16) / 2} y={b.y + b.h / 2 - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>
                  {b.name}
                </text>
                <text x={BAND_X + 10 + (TAG_W - 16) / 2} y={b.y + b.h / 2 + 14} textAnchor="middle" fontSize="11" fill={secondary}>
                  {b.en}
                </text>
                {/* 内容单元格 */}
                {b.cells.map((c, i) => {
                  const cx = cellAreaX + i * (cellW + gap);
                  return (
                    <g key={c}>
                      <rect x={cx} y={b.y + 12} width={cellW} height={b.h - 24} rx="8" fill="var(--bg)" stroke={b.color} strokeWidth="1.2" strokeOpacity="0.4" />
                      <text x={cx + cellW / 2} y={b.y + b.h / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
                        {c}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 层间向下箭头（调用方向） */}
          {BANDS.slice(0, -1).map((b, i) => {
            const y1 = b.y + b.h + 2;
            const y2 = BANDS[i + 1].y - 2;
            return (
              <line
                key={`down-${b.name}`}
                x1={BAND_X + BAND_W / 2}
                y1={y1}
                x2={BAND_X + BAND_W / 2}
                y2={y2}
                stroke={secondary}
                strokeWidth="1.4"
                markerEnd="url(#vca-arrow)"
              />
            );
          })}

          {/* Hypervisor 标注（位于 OS 层与硬件层之间） */}
          <rect x={BAND_X + 4} y={BANDS[2].y + BANDS[2].h - 18} width={BAND_W - 8} height="14" rx="4" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
          <text x={BAND_X + BAND_W / 2} y={BANDS[2].y + BANDS[2].h - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            Hypervisor 虚拟化隔离
          </text>

          {/* SoC 芯片标注（硬件层下方） */}
          <rect x={BAND_X + 120} y={424} width={BAND_W - 240} height="42" rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={BAND_X + BAND_W / 2} y={442} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            SoC 芯片（高通 8155 / 8295）
          </text>
          <text x={BAND_X + BAND_W / 2} y={458} textAnchor="middle" fontSize="11" fill={secondary}>
            CPU + GPU + NPU + ISP · 双系统共享一颗 SoC
          </text>
          {/* 硬件层 → SoC 连接 */}
          <line x1={BAND_X + BAND_W / 2} y1={BANDS[3].y + BANDS[3].h + 2} x2={BAND_X + BAND_W / 2} y2={424} stroke={accent} strokeWidth="1.4" strokeOpacity="0.6" markerEnd="url(#vca-arrow-accent)" />

          {/* 多屏互动链路标注（底部） */}
          <line x1={48} y1={486} x2={VIEW_W - 48} y2={486} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={506} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            多屏互动 · 中控 / 仪表 / HUD 跨屏协同
          </text>
          <text x={VIEW_W / 2} y={524} textAnchor="middle" fontSize="11" fill={secondary}>
            导航画面跨屏投射 · 仪表警报上浮 HUD · 语音全局接管 · 车控状态回流
          </text>
          <text x={VIEW_W / 2} y={546} textAnchor="middle" fontSize="12" fill={secondary}>
            座舱是体验入口 · OS 是双域隔离 · SoC 是算力底座
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        智能座舱分层架构：应用层（导航、语音、娱乐、车控）经中间件层（通信总线、多媒体、安全服务）调度 OS 层（QNX 仪表安全域 + Android IVI 娱乐域，Hypervisor 隔离），双系统共享一颗 SoC（8155/8295）驱动中控屏、仪表、HUD、麦克风阵列，并支持多屏互动跨屏协同。
      </figcaption>
    </figure>
  );
}
