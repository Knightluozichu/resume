/**
 * <EfcFinalMindMap>：总复习思维导图（Effective C++ 收尾章）。
 *
 * 中心节点「Effective C++」，四条分支辐射到四角：
 *   - 资源管理（success 绿）：RAII、智能指针、拷贝行为、new/delete 配对
 *   - 类与继承（accent 紫）：封装、const 正确性、is-a、NVI 模式
 *   - 模板与泛型（warning 暖）：隐式接口、typename、TMP、type traits
 *   - 杂项约定（accent 紫）：inline、转型、异常安全、Boost
 * 每个分支展开 3-4 个子节点。
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
const CY = 260;

interface Branch {
  name: string;
  color: string;
  x: number;
  y: number;
  children: { label: string; x: number; y: number }[];
}

const BRANCHES: readonly Branch[] = [
  {
    name: "资源管理",
    color: success,
    x: 180,
    y: 140,
    children: [
      { label: "RAII", x: 72, y: 66 },
      { label: "智能指针", x: 72, y: 104 },
      { label: "拷贝行为", x: 72, y: 142 },
      { label: "new/delete 配对", x: 72, y: 180 },
    ],
  },
  {
    name: "类与继承",
    color: accent,
    x: 540,
    y: 140,
    children: [
      { label: "封装", x: 648, y: 66 },
      { label: "const 正确性", x: 648, y: 104 },
      { label: "is-a 继承", x: 648, y: 142 },
      { label: "NVI 模式", x: 648, y: 180 },
    ],
  },
  {
    name: "模板与泛型",
    color: warning,
    x: 180,
    y: 380,
    children: [
      { label: "隐式接口", x: 72, y: 340 },
      { label: "typename", x: 72, y: 378 },
      { label: "TMP", x: 72, y: 416 },
      { label: "type traits", x: 72, y: 454 },
    ],
  },
  {
    name: "杂项约定",
    color: accent,
    x: 540,
    y: 380,
    children: [
      { label: "inline", x: 648, y: 340 },
      { label: "转型控制", x: 648, y: 378 },
      { label: "异常安全", x: 648, y: 416 },
      { label: "Boost", x: 648, y: 454 },
    ],
  },
];

export function EfcFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点 Effective C++，四条分支辐射：左上资源管理（绿色，RAII、智能指针、拷贝行为、new/delete 配对）；右上类与继承（紫色，封装、const 正确性、is-a 继承、NVI 模式）；左下模板与泛型（暖色，隐式接口、typename、TMP、type traits）；右下杂项约定（紫色，inline、转型控制、异常安全、Boost）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Effective C++ · 总复习
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
                  <rect x={c.x - 52} y={c.y - 13} width="104" height="26" rx="13" fill={elevated} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.6" />
                  <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary} fontFamily="monospace">
                    {c.label}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={`bn-${b.name}`}>
              <rect x={b.x - 60} y={b.y - 18} width="120" height="36" rx="10" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.8" />
              <text x={b.x} y={b.y + 5} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={b.color}>
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="58" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.6" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            Effective
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            C++
          </text>
          <text x={CX} y={CY + 32} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
            55 Items
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={490} x2={VIEW_W - 32} y2={490} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={510} textAnchor="middle" fontSize="11.5" fill={secondary}>
            四大分支一图收束：资源为基，类与继承为骨，模板为翼，约定为绳
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：中心「Effective C++」辐射四分支——资源管理（RAII、智能指针、拷贝行为、new/delete 配对）、类与继承（封装、const 正确性、is-a、NVI 模式）、模板与泛型（隐式接口、typename、TMP、type traits）、杂项约定（inline、转型控制、异常安全、Boost）。
      </figcaption>
    </figure>
  );
}
