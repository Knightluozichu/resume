/**
 * <EppControlStatementsDiagram>：C++ 控制语句分类图（cpp-primer-plus 控制语句章）。
 *
 * 上下两层分别对应两大类控制语句：
 *   分支（if/else、switch）/ 循环（for、while、range-for）
 * 每个结构是一张卡片，标注语法骨架与适用场景；层间用板块色分隔。
 * 底部总结栏点出「分支做选择、循环做重复」的本质。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 两层结构 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

type Card = {
  name: string;
  syntax: string;
  scene: string;
};

const BRANCHES: readonly Card[] = [
  { name: "if / else", syntax: "if (cond) { ... } else { ... }", scene: "布尔条件二选一，可链式 else if" },
  { name: "switch", syntax: "switch (val) { case n: ... }", scene: "整型/枚举多路匹配，需 break 防穿透" },
];

const LOOPS: readonly Card[] = [
  { name: "for", syntax: "for (init; cond; step)", scene: "计数循环，已知次数" },
  { name: "while", syntax: "while (cond) { ... }", scene: "条件循环，先判断后执行" },
  { name: "range-for", syntax: "for (auto& x : coll)", scene: "范围循环，遍历容器元素" },
];

export function EppControlStatementsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"          aria-label="C++ 控制语句分类图。上层分支结构含 if/else（布尔条件二选一，可链式 else if）与 switch（整型枚举多路匹配，需 break 防穿透）；下层循环结构含 for（计数循环，已知次数）、while（条件循环，先判断后执行）、range-for（范围循环，遍历容器元素）。底部总结：分支做选择、循环做重复。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 控制语句分类
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            分支做选择、循环做重复，两类语句控制程序的执行路径
          </text>

          {/* ===== 分支层 ===== */}
          <rect x="32" y="78" width={VIEW_W - 64} height="22" rx="6" fill="var(--accent)" fillOpacity="0.10" />
          <text x="48" y="94" fontSize="13" fontWeight="700" fill="var(--accent)">分支结构</text>
          <text x={VIEW_W - 48} y="94" textAnchor="end" fontSize="11" fill="var(--text-secondary)">根据条件选择执行路径</text>

          {BRANCHES.map((c, i) => {
            const x = 32 + i * 336;
            return (
              <g key={c.name}>
                <rect x={x} y="110" width="320" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <text x={x + 16} y="132" fontSize="13" fontWeight="700" fill="var(--accent)">{c.name}</text>
                <text x={x + 16} y="154" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{c.syntax}</text>
                <text x={x + 16} y="176" fontSize="11" fill="var(--text-secondary)">{c.scene}</text>
              </g>
            );
          })}

          {/* ===== 循环层 ===== */}
          <rect x="32" y="210" width={VIEW_W - 64} height="22" rx="6" fill="var(--success)" fillOpacity="0.10" />
          <text x="48" y="226" fontSize="13" fontWeight="700" fill="var(--success)">循环结构</text>
          <text x={VIEW_W - 48} y="226" textAnchor="end" fontSize="11" fill="var(--text-secondary)">重复执行一段代码直到条件不满足</text>

          {LOOPS.map((c, i) => {
            const x = 32 + i * 224;
            return (
              <g key={c.name}>
                <rect x={x} y="242" width="208" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <text x={x + 16} y="264" fontSize="13" fontWeight="700" fill="var(--success)">{c.name}</text>
                <text x={x + 16} y="286" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{c.syntax}</text>
                <line x1={x + 12} y1="298" x2={x + 196} y2="298" stroke="var(--border)" strokeWidth="1" />
                <text x={x + 16} y="316" fontSize="11" fill="var(--text-secondary)">{c.scene}</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y="362" width={VIEW_W - 120} height="68" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="385" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            分支 = 选择，循环 = 重复
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            if/switch 决定「走哪条路」，for/while/range-for 决定「走几遍」
          </text>
          <text x={VIEW_W / 2} y="421" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            range-for 是 C++11 对容器的语法糖，比手写下标更安全
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 控制语句分两类：分支（if/else、switch）根据条件选择路径，循环（for、while、range-for）重复执行代码块。switch 需用 break 防止 case 穿透，range-for 是遍历容器的安全语法糖。
      </figcaption>
    </figure>
  );
}
