/**
 * <EmcFinalMindMap>：总复习思维导图（Effective Modern C++ 收尾章）。
 *
 * 中心节点「Effective Modern C++」，四条分支辐射到四角：
 *   - 类型推导与 auto（accent 紫）：模板推导、auto、decltype、显式初始化惯用法
 *   - 智能指针与资源管理（success 绿）：unique/shared/weak、make 函数、Pimpl
 *   - 移动语义与转发（warning 暖）：move、通用引用、引用折叠、forward
 *   - 并发与其他（accent 紫）：Lambda、thread、atomic、future
 * 每个分支展开 4 个子节点。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
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
const elevated = "var(--bg-elevated)";

const CX = 360;
const CY = 262;

interface Branch {
  name: string;
  color: string;
  x: number;
  y: number;
  children: { label: string; x: number; y: number }[];
}

const BRANCHES: readonly Branch[] = [
  {
    name: "类型推导与 auto",
    color: accent,
    x: 184,
    y: 140,
    children: [
      { label: "模板推导", x: 76, y: 66 },
      { label: "auto 推导", x: 76, y: 104 },
      { label: "decltype", x: 76, y: 142 },
      { label: "显式初始化惯用法", x: 76, y: 180 },
    ],
  },
  {
    name: "智能指针与资源",
    color: success,
    x: 536,
    y: 140,
    children: [
      { label: "unique_ptr", x: 644, y: 66 },
      { label: "shared / weak", x: 644, y: 104 },
      { label: "make 函数", x: 644, y: 142 },
      { label: "Pimpl", x: 644, y: 180 },
    ],
  },
  {
    name: "移动语义与转发",
    color: warning,
    x: 184,
    y: 384,
    children: [
      { label: "std::move", x: 76, y: 344 },
      { label: "通用引用", x: 76, y: 382 },
      { label: "引用折叠", x: 76, y: 420 },
      { label: "std::forward", x: 76, y: 458 },
    ],
  },
  {
    name: "并发与其他",
    color: accent,
    x: 536,
    y: 384,
    children: [
      { label: "Lambda", x: 644, y: 344 },
      { label: "thread / atomic", x: 644, y: 382 },
      { label: "future / async", x: 644, y: 420 },
      { label: "emplace", x: 644, y: 458 },
    ],
  },
];

export function EmcFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点 Effective Modern C++，四条分支辐射：左上类型推导与 auto（紫色，模板推导、auto 推导、decltype、显式初始化惯用法）；右上智能指针与资源（绿色，unique_ptr、shared/weak、make 函数、Pimpl）；左下移动语义与转发（暖色，std::move、通用引用、引用折叠、std::forward）；右下并发与其他（紫色，Lambda、thread/atomic、future/async、emplace）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Effective Modern C++ · 总复习
          </text>

          {/* 中心 → 分支 连线 */}
          {BRANCHES.map((b) => (
            <line key={`cb-${b.name}`} x1={CX} y1={CY} x2={b.x} y2={b.y} stroke={b.color} strokeWidth="2.2" strokeOpacity="0.55" />
          ))}

          {/* 分支 → 子节点 连线 + 子节点 */}
          {BRANCHES.map((b) => (
            <g key={`br-${b.name}`}>
              {b.children.map((c) => (
                <line key={`cl-${b.name}-${c.label}`} x1={b.x} y1={b.y} x2={c.x} y2={c.y} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.4" />
              ))}
              {/* 子节点药丸 */}
              {b.children.map((c) => (
                <g key={`cn-${b.name}-${c.label}`}>
                  <rect x={c.x - 56} y={c.y - 13} width="112" height="26" rx="13" fill={elevated} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.6" />
                  <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
                    {c.label}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={`bn-${b.name}`}>
              <rect x={b.x - 68} y={b.y - 18} width="136" height="36" rx="10" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.8" />
              <text x={b.x} y={b.y + 5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={b.color}>
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="62" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.6" />
          <text x={CX} y={CY - 12} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            Effective
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            Modern C++
          </text>
          <text x={CX} y={CY + 28} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
            42 Items
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={490} x2={VIEW_W - 32} y2={490} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={510} textAnchor="middle" fontSize="11.5" fill={secondary}>
            四大分支一图收束：推导为基，资源为网，移动转发为翼，并发为帆
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：中心「Effective Modern C++」辐射四分支——类型推导与 auto（模板推导、auto、decltype、显式初始化惯用法）、智能指针与资源（unique_ptr、shared/weak、make 函数、Pimpl）、移动语义与转发（move、通用引用、引用折叠、forward）、并发与其他（Lambda、thread/atomic、future/async、emplace）。
      </figcaption>
    </figure>
  );
}
