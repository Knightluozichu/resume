/**
 * <McdFinalMindMap>：总复习思维导图（Modern C++ Design 收尾章）。
 *
 * 中心节点「Modern C++ Design」，四条分支辐射到四角：
 *   - Policy 与 Typelist（accent 紫）：Policy 设计、Typelist、编译时派发
 *   - Loki 组件（success 绿）：SmartPtr、SmallObject、Functor
 *   - 设计模式（warning 暖）：Singleton、ObjectFactory、AbstractFactory
 *   - 编译时哲学（accent 紫）：模板元编程、零开销抽象、类型安全
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520，四周留白 ≥32，字号 ≥11。
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
    name: "Policy 与 Typelist",
    color: accent,
    x: 184,
    y: 140,
    children: [
      { label: "Policy 设计", x: 76, y: 88 },
      { label: "Typelist", x: 76, y: 124 },
      { label: "编译时派发", x: 76, y: 160 },
    ],
  },
  {
    name: "Loki 组件",
    color: success,
    x: 536,
    y: 140,
    children: [
      { label: "SmartPtr", x: 644, y: 88 },
      { label: "SmallObject", x: 644, y: 124 },
      { label: "Functor", x: 644, y: 160 },
    ],
  },
  {
    name: "设计模式",
    color: warning,
    x: 184,
    y: 384,
    children: [
      { label: "Singleton", x: 76, y: 344 },
      { label: "ObjectFactory", x: 76, y: 380 },
      { label: "AbstractFactory", x: 76, y: 416 },
    ],
  },
  {
    name: "编译时哲学",
    color: accent,
    x: 536,
    y: 384,
    children: [
      { label: "模板元编程", x: 644, y: 344 },
      { label: "零开销抽象", x: 644, y: 380 },
      { label: "类型安全", x: 644, y: 416 },
    ],
  },
];

export function McdFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点 Modern C++ Design，四条分支辐射：左上 Policy 与 Typelist（紫色，Policy 设计、Typelist、编译时派发）；右上 Loki 组件（绿色，SmartPtr、SmallObject、Functor）；左下设计模式（暖色，Singleton、ObjectFactory、AbstractFactory）；右下编译时哲学（紫色，模板元编程、零开销抽象、类型安全）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Modern C++ Design · 总复习
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
              <rect x={b.x - 72} y={b.y - 18} width="144" height="36" rx="10" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.8" />
              <text x={b.x} y={b.y + 5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={b.color}>
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="64" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.6" />
          <text x={CX} y={CY - 10} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            Modern C++
          </text>
          <text x={CX} y={CY + 10} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            Design
          </text>
          <text x={CX} y={CY + 30} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
            Alexandrescu
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={490} x2={VIEW_W - 32} y2={490} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={510} textAnchor="middle" fontSize="11.5" fill={secondary}>
            四大分支一图收束：Policy 筑基，Loki 落地，模式收口，编译时为魂
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：中心「Modern C++ Design」辐射四分支——Policy 与 Typelist（Policy 设计、Typelist、编译时派发）、Loki 组件（SmartPtr、SmallObject、Functor）、设计模式（Singleton、ObjectFactory、AbstractFactory）、编译时哲学（模板元编程、零开销抽象、类型安全）。
      </figcaption>
    </figure>
  );
}
