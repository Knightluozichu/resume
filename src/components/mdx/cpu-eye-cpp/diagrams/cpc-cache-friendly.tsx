/**
 * <CpcCacheFriendlyDiagram>：缓存友好编程（cpu-eye-cpp 缓存友好章）。
 *
 * 左侧展示缓存行机制：64 字节为加载单元，连续访问命中、随机访问 miss。
 * 右侧展示 false sharing：两线程变量同缓存行互相失效；及 AoS vs SoA 布局。
 * 底部给出缓存友好三原则。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层。
 */

const VIEW_W = 720;
const VIEW_H = 500;

export function CpcCacheFriendlyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="缓存友好编程。左侧上方缓存行：CPU 缓存以 64 字节为加载单元，连续访问时一次加载后续多次命中（绿色命中），随机访问每次 miss（红色未命中）。左侧下方 false sharing：线程 A 改变量 X 与线程 B 改变量 Y 同处一个缓存行，缓存一致性协议反复互相失效，用对齐填充把两者分到不同缓存行即可消除。右侧 AoS vs SoA：AoS 每对象字段连续，遍历单字段时缓存行混入冷字段有效率仅 25%；SoA 每字段独立成数组，遍历单字段时整行都是热数据，有效率 100%，且利于 SIMD 向量化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            缓存友好 · cache line、false sharing、AoS/SoA
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            让每次加载的 64 字节尽量全是热数据
          </text>

          {/* ===== 左上：缓存行 ===== */}
          <text x="56" y="88" fontSize="13" fontWeight="700" fill="var(--text-primary)">缓存行（64 字节）</text>
          <rect x="48" y="100" width="320" height="56" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="64" y="120" fontSize="11" fill="var(--text-secondary)">连续访问（vector 遍历）：</text>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={64 + i * 32} y="128" width="28" height="18" rx="2" fill={i < 6 ? "var(--success)" : "var(--success)"} fillOpacity={i < 6 ? 0.5 : 0.3} stroke="var(--success)" strokeWidth="1" />
          ))}
          <text x="64" y="168" fontSize="11" fill="var(--success)">一次加载 64B → 后续命中（绿）</text>

          <rect x="48" y="180" width="320" height="56" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="64" y="200" fontSize="11" fill="var(--text-secondary)">随机访问（链表遍历）：</text>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={64 + i * 72} y="208" width="28" height="18" rx="2" fill="var(--danger)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="1" />
          ))}
          <text x="64" y="248" fontSize="11" fill="var(--danger)">每节点一次潜在 miss（红）</text>

          {/* ===== 左下：false sharing ===== */}
          <text x="56" y="280" fontSize="13" fontWeight="700" fill="var(--text-primary)">False sharing（伪共享）</text>
          <rect x="48" y="292" width="320" height="44" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="64" y="310" fontSize="11" fill="var(--text-secondary)">同一缓存行：</text>
          <rect x="160" y="300" width="40" height="20" rx="2" fill="var(--danger)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="1" />
          <text x="180" y="314" textAnchor="middle" fontSize="11" fill="var(--text-primary)">X</text>
          <rect x="206" y="300" width="40" height="20" rx="2" fill="var(--warning)" fillOpacity="0.4" stroke="var(--warning)" strokeWidth="1" />
          <text x="226" y="314" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Y</text>
          <text x="64" y="330" fontSize="11" fill="var(--danger)">A 改 X、B 改 Y → 互相失效缓存行</text>

          <rect x="48" y="344" width="320" height="40" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="64" y="362" fontSize="11" fill="var(--text-secondary)">对齐填充后：</text>
          <rect x="160" y="352" width="40" height="20" rx="2" fill="var(--danger)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="1" />
          <text x="180" y="366" textAnchor="middle" fontSize="11" fill="var(--text-primary)">X</text>
          <rect x="252" y="352" width="40" height="20" rx="2" fill="var(--warning)" fillOpacity="0.4" stroke="var(--warning)" strokeWidth="1" />
          <text x="272" y="366" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Y</text>
          <text x="64" y="378" fontSize="11" fill="var(--success)">分到不同缓存行 → 互不干扰</text>

          {/* ===== 右：AoS vs SoA ===== */}
          <text x="408" y="88" fontSize="13" fontWeight="700" fill="var(--text-primary)">AoS vs SoA（遍历单字段）</text>

          <rect x="400" y="100" width="272" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="400" y="100" width="272" height="22" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="536" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">AoS：对象连续</text>
          {[
            { label: "x", color: "var(--success)", hot: true },
            { label: "y", color: "var(--border)", hot: false },
            { label: "z", color: "var(--border)", hot: false },
            { label: "act", color: "var(--border)", hot: false },
          ].map((f, i) => (
            <g key={f.label}>
              <rect x={416 + i * 60} y="132" width="52" height="56" rx="3" fill={f.color} fillOpacity={f.hot ? 0.5 : 0.15} stroke={f.color} strokeWidth="1" />
              <text x={442 + i * 60} y="164" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{f.label}</text>
            </g>
          ))}
          <text x="536" y="208" textAnchor="middle" fontSize="11" fill="var(--accent)">有效率 ≈ 25%（只热 x）</text>

          <rect x="400" y="224" width="272" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="400" y="224" width="272" height="22" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="536" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">SoA：字段连续</text>
          {[
            { label: "x0", color: "var(--success)", hot: true },
            { label: "x1", color: "var(--success)", hot: true },
            { label: "x2", color: "var(--success)", hot: true },
            { label: "x3", color: "var(--success)", hot: true },
          ].map((f, i) => (
            <g key={f.label}>
              <rect x={416 + i * 60} y="256" width="52" height="56" rx="3" fill={f.color} fillOpacity={0.5} stroke={f.color} strokeWidth="1" />
              <text x={442 + i * 60} y="288" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{f.label}</text>
            </g>
          ))}
          <text x="536" y="332" textAnchor="middle" fontSize="11" fill="var(--success)">有效率 ≈ 100%（整行热）</text>

          <rect x="400" y="344" width="272" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="536" y="362" textAnchor="middle" fontSize="11" fill="var(--text-primary)">SoA 字段连续 → 利于 SIMD 向量化</text>
          <text x="536" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一条指令同时处理多个元素</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            三原则：数据连续 · 隔离可写 · 按访问模式组织布局
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        缓存以 64 字节行为单位加载，连续访问命中率高。false sharing 让多线程变量同缓存行互相失效，需对齐填充隔离。AoS 遍历单字段有效率低，SoA 字段连续利于缓存与 SIMD 向量化。
      </figcaption>
    </figure>
  );
}
