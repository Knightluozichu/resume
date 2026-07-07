/**
 * <CtrFinalMindMap>：总复习思维导图（C++ 编程测试秘籍 收尾章）。
 *
 * 中心节点「C++ 编程测试秘籍」，四条分支辐射到四角：
 *   - 基础测试（accent 紫）：语法陷阱、智能指针、循环引用
 *   - 进阶测试（success 绿）：STL 迭代器、SFINAE、死锁
 *   - 面试实战（warning 暖）：单例工厂、BFS/DFS、ASan 调试
 *   - 测试方法论（accent 紫）：陷阱清单、测试驱动、先测后优
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
    name: "基础测试",
    color: accent,
    x: 184,
    y: 140,
    children: [
      { label: "语法陷阱 UB", x: 76, y: 88 },
      { label: "const 正确性", x: 76, y: 124 },
      { label: "智能指针", x: 76, y: 160 },
    ],
  },
  {
    name: "进阶测试",
    color: success,
    x: 536,
    y: 140,
    children: [
      { label: "STL 迭代器", x: 644, y: 88 },
      { label: "SFINAE/concepts", x: 644, y: 124 },
      { label: "死锁与内存序", x: 644, y: 160 },
    ],
  },
  {
    name: "面试实战",
    color: warning,
    x: 184,
    y: 384,
    children: [
      { label: "单例·工厂", x: 76, y: 344 },
      { label: "BFS/DFS", x: 76, y: 380 },
      { label: "ASan 调试", x: 76, y: 416 },
    ],
  },
  {
    name: "测试方法论",
    color: accent,
    x: 536,
    y: 384,
    children: [
      { label: "陷阱清单法", x: 644, y: 344 },
      { label: "测试驱动复盘", x: 644, y: 380 },
      { label: "先测后优", x: 644, y: 416 },
    ],
  },
];

export function CtrFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点 C++ 编程测试秘籍，四条分支辐射：左上基础测试（紫色，语法陷阱 UB、const 正确性、智能指针）；右上进阶测试（绿色，STL 迭代器、SFINAE concepts、死锁与内存序）；左下面试实战（暖色，单例工厂、BFS/DFS、ASan 调试）；右下测试方法论（紫色，陷阱清单法、测试驱动复盘、先测后优）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C++ 编程测试秘籍 · 总复习
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
                  <rect x={c.x - 60} y={c.y - 13} width="120" height="26" rx="13" fill={elevated} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.6" />
                  <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                    {c.label}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={`bn-${b.name}`}>
              <rect x={b.x - 66} y={b.y - 18} width="132" height="36" rx="10" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.8" />
              <text x={b.x} y={b.y + 5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={b.color}>
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="66" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.6" />
          <text x={CX} y={CY - 14} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            C++ 编程
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            测试秘籍
          </text>
          <text x={CX} y={CY + 26} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
            测试驱动
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={490} x2={VIEW_W - 32} y2={490} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={510} textAnchor="middle" fontSize="11.5" fill={secondary}>
            四大分支一图收束：基础筑底，进阶强骨，面试冲刺，测试方法论贯穿
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：中心「C++ 编程测试秘籍」辐射四分支——基础测试（语法陷阱/const/智能指针）、进阶测试（STL/SFINAE/死锁）、面试实战（模式/算法/调试）、测试方法论（陷阱清单/测试驱动/先测后优）。
      </figcaption>
    </figure>
  );
}
