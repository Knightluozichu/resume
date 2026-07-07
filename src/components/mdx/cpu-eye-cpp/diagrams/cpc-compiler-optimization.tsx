/**
 * <CpcCompilerOptimizationDiagram>：编译器优化手段（cpu-eye-cpp 编译器优化章）。
 *
 * 四象限展示四种优化：常量折叠、死代码消除、循环展开、自动向量化。
 * 每象限给出「优化前 → 优化后」的代码对比。
 * 底部展示 as-if 规则与优化屏障（volatile/原子/副作用）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×520、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层。
 */

const VIEW_W = 720;
const VIEW_H = 520;

type Opt = {
  name: string;
  color: string;
  before: string;
  after: string;
  note: string;
};

const OPTS: readonly Opt[] = [
  { name: "常量折叠", color: "var(--accent)", before: "x = 2*3+1;", after: "x = 7;", note: "编译期算出结果" },
  { name: "死代码消除", color: "var(--success)", before: "if (false) {`{f();}`}", after: "(删除)", note: "恒假分支被删" },
  { name: "循环展开", color: "var(--warning)", before: "for i in 0..4: a[i]=0", after: "a[0..3]=0", note: "减少控制开销" },
  { name: "自动向量化", color: "var(--danger)", before: "4× 标量加法", after: "1× SIMD 向量加", note: "一条指令多数据" },
];

export function CpcCompilerOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编译器优化四手段。四象限：常量折叠（2*3+1 编译期算成 7，无运行期计算）、死代码消除（恒假分支删除）、循环展开（4 次循环展成 4 条赋值，减少控制开销并暴露指令级并行）、自动向量化（4 次标量加法合成一条 SIMD 向量指令）。底部 as-if 规则：编译器可任意变换只要可观察行为不变；优化屏障：volatile 访问、原子操作、有副作用的调用不可越过优化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            编译器优化 · 四大手段
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            在「可观察行为不变」（as-if）前提下，把能算的算了、把不可能的删了
          </text>

          {/* ===== 四象限 ===== */}
          {OPTS.map((o, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 48 + col * 324;
            const y = 80 + row * 150;
            return (
              <g key={o.name}>
                <rect x={x} y={y} width="308" height="134" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <rect x={x} y={y} width="308" height="24" rx="8" fill={o.color} fillOpacity="0.12" stroke={o.color} strokeWidth="1.2" />
                <circle cx={x + 14} cy={y + 12} r="3" fill={o.color} />
                <text x={x + 24} y={y + 17} fontSize="13" fontWeight="700" fill={o.color}>{o.name}</text>

                <text x={x + 16} y={y + 44} fontSize="11" fill="var(--text-secondary)">优化前：</text>
                <rect x={x + 16} y={y + 50} width="276" height="24" rx="4" fill="var(--danger)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1" />
                <text x={x + 24} y={y + 66} fontSize="11" fill="var(--text-primary)">{o.before}</text>

                <text x={x + 16} y={y + 92} fontSize="11" fill="var(--text-secondary)">优化后：</text>
                <rect x={x + 16} y={y + 98} width="276" height="24" rx="4" fill={o.color} fillOpacity="0.08" stroke={o.color} strokeWidth="1" />
                <text x={x + 24} y={y + 114} fontSize="11" fontWeight="600" fill={o.color}>{o.after}</text>
                <text x={x + 200} y={y + 114} fontSize="11" fill="var(--text-secondary)">← {o.note}</text>
              </g>
            );
          })}

          {/* ===== 底部：as-if 与屏障 ===== */}
          <rect x="48" y="384" width="308" height="84" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <rect x="48" y="384" width="308" height="24" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="202" y="401" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">as-if 规则</text>
          <text x="64" y="424" fontSize="11" fill="var(--text-primary)">编译器可任意变换代码</text>
          <text x="64" y="440" fontSize="11" fill="var(--text-secondary)">只要「可观察行为」不变</text>
          <text x="64" y="456" fontSize="11" fill="var(--text-secondary)">（I/O、volatile、终止前写入）</text>

          <rect x="372" y="384" width="308" height="84" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <rect x="372" y="384" width="308" height="24" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="526" y="401" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">优化屏障（不可越过）</text>
          <text x="388" y="424" fontSize="11" fill="var(--text-primary)">· volatile 访问（真实访存）</text>
          <text x="388" y="440" fontSize="11" fill="var(--text-primary)">· 原子操作（内存序约束）</text>
          <text x="388" y="456" fontSize="11" fill="var(--text-primary)">· 有副作用的调用</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 36} width={VIEW_W - 120} height="24" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 20} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            保持代码「纯」给优化器空间；用 -O2/-O3、PGO、LTO 让编译器放手优化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编译器四大优化：常量折叠（编译期算结果）、死代码消除（删恒假分支）、循环展开（减控制开销、暴露并行）、自动向量化（标量循环合成 SIMD）。as-if 规则是优化边界，volatile、原子操作与有副作用调用是优化屏障。
      </figcaption>
    </figure>
  );
}
