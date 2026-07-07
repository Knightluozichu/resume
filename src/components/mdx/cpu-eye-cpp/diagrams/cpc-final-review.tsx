/**
 * <CpcFinalMindMap>：全书总复习思维导图（cpu-eye-cpp 总复习章）。
 *
 * 中心节点「CPU 眼里的 C++」向外辐射三大分支：
 *   编译与链接、CPU 运行时机制、CPU 性能优化，每分支挂 4 个叶子关键词。
 * 三分支用板块色（紫/绿/橙）区分，叶子用中性卡片。
 * 底部总结「懂 CPU → 写好 C++」的全书主线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、中心放射布局。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const CX = VIEW_W / 2;
const CY = 236;

type Branch = {
  name: string;
  color: string;
  angle: number; // 0=右, 90=上, 180=左, 270=下（弧度方向用三角算）
  leaves: string[];
};

// 三分支：左、上、右
const BRANCHES: readonly Branch[] = [
  { name: "编译与链接", color: "var(--accent)", angle: 180, leaves: ["预处理展开", "编译生成汇编", "汇编转机器码", "链接符号解析"] },
  { name: "CPU 运行时机制", color: "var(--success)", angle: 90, leaves: ["内存模型布局", "函数调用栈帧", "虚函数虚表", "异常栈展开"] },
  { name: "CPU 性能优化", color: "var(--warning)", angle: 0, leaves: ["内联优化链", "缓存友好", "编译器优化", "性能排查"] },
];

export function CpcFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU 眼里的 C++ 总复习思维导图。中心节点「CPU 眼里的 C++」向外辐射三大分支：编译与链接（紫色，含预处理展开、编译生成汇编、汇编转机器码、链接符号解析）、CPU 运行时机制（绿色，含内存模型布局、函数调用栈帧、虚函数虚表、异常栈展开）、CPU 性能优化（橙色，含内联优化链、缓存友好、编译器优化、性能排查）。底部总结：懂 CPU 才能把 C++ 语义映射回真实成本，写出既正确又高效的代码。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU 眼里的 C++ · 总复习思维导图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            三段递进：代码怎么来 → 怎么跑 → 怎么变快
          </text>

          {/* ===== 分支连线 + 叶子 ===== */}
          {BRANCHES.map((b) => {
            const rad = (b.angle * Math.PI) / 180;
            const bx = CX + Math.cos(rad) * 150;
            const by = CY - Math.sin(rad) * 96;
            // 连接中心到分支
            return (
              <g key={b.name}>
                <line x1={CX} y1={CY} x2={bx} y2={by} stroke={b.color} strokeWidth="2" strokeOpacity="0.5" />
                {/* 分支节点 */}
                <rect x={bx - 70} y={by - 16} width="140" height="32" rx="16" fill={b.color} fillOpacity="0.14" stroke={b.color} strokeWidth="1.4" />
                <text x={bx} y={by + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>{b.name}</text>

                {/* 叶子：上方分支横向铺，左右分支纵向铺 */}
                {b.leaves.map((leaf, i) => {
                  let leafX: number, leafY: number;
                  if (b.angle === 90) {
                    leafX = CX + (i - 1.5) * 130;
                    leafY = by - 44;
                  } else {
                    leafX = b.angle === 180 ? bx - 96 : bx + 96;
                    leafY = by + (i - 1.5) * 28;
                  }
                  return (
                    <g key={leaf}>
                      <line x1={bx} y1={by} x2={leafX} y2={leafY} stroke={b.color} strokeWidth="1" strokeOpacity="0.35" />
                      <rect x={leafX - 56} y={leafY - 12} width="112" height="24" rx="12" fill="var(--bg)" stroke={b.color} strokeWidth="1" />
                      <text x={leafX} y={leafY + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{leaf}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 中心节点（放最上层）===== */}
          <circle cx={CX} cy={CY} r="52" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.6" />
          <circle cx={CX} cy={CY} r="40" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">CPU 眼里</text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">的 C++</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 56} width={VIEW_W - 120} height="44" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 38} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书主线：懂 CPU → 把 C++ 语义映射回真实成本
          </text>
          <text x={VIEW_W / 2} y={VIEW_H - 20} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先懂代码怎么编译成机器码，再看 CPU 怎么执行它，最后把底层理解转化为性能红利
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书三段递进：编译与链接（代码怎么来）、CPU 运行时机制（怎么跑）、CPU 性能优化（怎么变快）。懂 CPU 才能把 C++ 的抽象映射回真实的指令、访存与缓存成本，写出既正确又高效的代码。
      </figcaption>
    </figure>
  );
}
