/**
 * <PopPythonOpsBasicsDiagram>：Python 运维能力栈三层模型。
 *
 * 工程化层（venv/pip/日志/测试）→ 第三方库层（psutil/requests/paramiko）
 * → 标准库层（os/sys/pathlib/subprocess）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const LAYERS = [
  { y: 84, color: accent, label: "工程化层", chips: ["venv / pip", "logging 日志", "pytest 测试", "配置管理"], note: "可重复、可测试、可维护" },
  { y: 172, color: success, label: "第三方库层", chips: ["psutil 系统指标", "requests HTTP", "paramiko SSH", "BeautifulSoup 解析"], note: "站在巨肩上，覆盖运维全链路" },
  { y: 260, color: warning, label: "标准库层", chips: ["os / sys", "pathlib 路径", "subprocess 进程", "shutil 文件树"], note: "无需安装，跨平台基础能力" },
];

const CHIP_X = [200, 330, 460, 590];
const CHIP_W = 118;

export function PopPythonOpsBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python运维能力栈三层：工程化层（venv/pip/logging/pytest）、第三方库层（psutil/requests/paramiko/BeautifulSoup）、标准库层（os/sys/pathlib/subprocess/shutil）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Python 运维能力栈：三层模型
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            底层标准库打底 · 中层第三方库扩展 · 顶层工程化收口
          </text>

          {/* 三层 */}
          {LAYERS.map((layer) => (
            <g key={layer.label}>
              <rect x={36} y={layer.y} width={140} height={76} rx="8" fill={layer.color} fillOpacity="0.12" stroke={layer.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={106} y={layer.y + 34} textAnchor="middle" fontSize="13" fontWeight="700" fill={layer.color}>
                {layer.label}
              </text>
              <text x={106} y={layer.y + 54} textAnchor="middle" fontSize="10" fill={secondary}>
                {layer.note}
              </text>

              {layer.chips.map((chip, i) => (
                <g key={chip}>
                  <rect x={CHIP_X[i]} y={layer.y + 18} width={CHIP_W} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
                  <text x={CHIP_X[i] + CHIP_W / 2} y={layer.y + 43} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                    {chip}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* 层间依赖箭头 */}
          <line x1={106} y1={160} x2={106} y2={170} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pop-basics-arrow)" />
          <line x1={106} y1={248} x2={106} y2={258} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pop-basics-arrow)" />

          <defs>
            <marker id="pop-basics-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={352} x2={VIEW_W - 32} y2={352} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            选型口诀：能用标准库就不引第三方 · 复杂场景上第三方库 · 用工程化层保证可维护
          </text>
          <text x={VIEW_W / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            venv 隔离依赖 · logging 记录执行 · pytest 回归验证——工程化三件套
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 运维能力栈的三层模型。
      </figcaption>
    </figure>
  );
}
