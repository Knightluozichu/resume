/**
 * <ChpCacheHierarchyDiagram>：CPU 缓存层级与缓存行（cpp-high-performance CPU 缓存章）。
 *
 * 左侧金字塔：L1 → L2 → L3 → 主存，自上而下容量递增、延迟递增、距核递远。
 * 每层标注容量/延迟/共享范围。右侧画一个 64 字节缓存行：8 个 8 字节槽位，
 * 配箭头说明「一次加载一整行」的预取与空间局部性原理。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 金字塔+缓存行主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

type Layer = {
  id: string;
  name: string;
  color: string;
  capacity: string;
  latency: string;
  scope: string;
};

// 自上而下：L1 最小最快 → 主存最大最慢
const LAYERS: readonly Layer[] = [
  { id: "l1", name: "L1 缓存", color: "var(--accent)", capacity: "32–64 KB", latency: "~1 ns", scope: "每核私有" },
  { id: "l2", name: "L2 缓存", color: "var(--success)", capacity: "256 KB–1 MB", latency: "~4 ns", scope: "每核私有" },
  { id: "l3", name: "L3 缓存", color: "var(--warning)", capacity: "几 MB–几十 MB", latency: "~12 ns", scope: "多核共享" },
  { id: "mem", name: "主存 DRAM", color: "var(--danger)", capacity: "GB 级", latency: "~100 ns", scope: "全 CPU 共享" },
];

const PYR_LEFT = 60;
const PYR_TOP = 108;
const PYR_W_MAX = 300;
const LAYER_H = 56;
const LAYER_GAP = 10;

export function ChpCacheHierarchyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU 缓存层级金字塔：L1 缓存（32–64 KB，约 1 ns，每核私有）；L2 缓存（256 KB–1 MB，约 4 ns，每核私有）；L3 缓存（几 MB–几十 MB，约 12 ns，多核共享）；主存 DRAM（GB 级，约 100 ns，全 CPU 共享）。容量递增、延迟递增、距核递远。右侧画一个 64 字节缓存行：8 个 8 字节槽位，一次加载一整行，体现空间局部性与预取原理。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU 缓存层级 · 容量与延迟的取舍
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            越往上越快越小越贵，越往下越慢越大越便宜——访存要尽量命中上层
          </text>

          {/* ===== 左侧金字塔 ===== */}
          <text x={PYR_LEFT + PYR_W_MAX / 2} y={PYR_TOP - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">距核近 ↑ 快 / 小</text>
          {LAYERS.map((l, i) => {
            const w = PYR_W_MAX - i * 48;
            const x = PYR_LEFT + (PYR_W_MAX - w) / 2;
            const y = PYR_TOP + i * (LAYER_H + LAYER_GAP);
            return (
              <g key={l.id}>
                <rect x={x} y={y} width={w} height={LAYER_H} rx="8" fill={l.color} fillOpacity="0.12" stroke={l.color} strokeWidth="1.2" />
                <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={l.color}>{l.name}</text>
                <text x={x + w / 2} y={y + 38} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{l.capacity} · {l.latency}</text>
                <text x={x + w / 2} y={y + 52} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{l.scope}</text>
              </g>
            );
          })}
          <text x={PYR_LEFT + PYR_W_MAX / 2} y={PYR_TOP + LAYERS.length * (LAYER_H + LAYER_GAP) + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">距核远 ↓ 慢 / 大</text>

          {/* ===== 右侧缓存行示意 ===== */}
          <g>
            <text x="470" y={PYR_TOP - 12} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">缓存行（Cache Line）</text>
            <rect x="410" y={PYR_TOP} width="240" height="44" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="530" y={PYR_TOP + 18} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一次加载一整行</text>
            <text x="530" y={PYR_TOP + 35} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">64 字节</text>

            {/* 8 个 8 字节槽位 */}
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i}>
                <rect x={410 + i * 30} y={PYR_TOP + 60} width="28" height="40" rx="4" fill="var(--accent)" fillOpacity={i === 0 ? "0.45" : "0.12"} stroke="var(--accent)" strokeWidth="1" />
                <text x={410 + i * 30 + 14} y={PYR_TOP + 84} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">8B</text>
              </g>
            ))}
            {/* 访问第 0 个槽位 → 整行被加载 */}
            <path d="M424 104 L424 92" stroke="var(--danger)" strokeWidth="1.4" />
            <path d="M420 98 L424 90 L428 98" fill="none" stroke="var(--danger)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
            <text x="424" y={PYR_TOP - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">访问</text>

            {/* 局部性说明 */}
            <rect x="410" y={PYR_TOP + 116} width="240" height="92" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1" />
            <text x="420" y={PYR_TOP + 136} fontSize="11" fill="var(--text-primary)">
              <tspan fontWeight="700" fill="var(--accent)">空间局部性：</tspan>
            </text>
            <text x="420" y={PYR_TOP + 154} fontSize="11" fill="var(--text-secondary)">访问 a[0]，a[1]…a[7]</text>
            <text x="420" y={PYR_TOP + 170} fontSize="11" fill="var(--text-secondary)">已被同一行顺带加载，</text>
            <text x="420" y={PYR_TOP + 186} fontSize="11" fill="var(--text-secondary)">后续命中 L1，几乎免费。</text>
            <text x="420" y={PYR_TOP + 202} fontSize="11" fill="var(--text-primary)">
              <tspan fontWeight="700" fill="var(--success)">连续遍历 = 缓存友好。</tspan>
            </text>
          </g>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            主存比 L1 慢约 100 倍——让数据连续、让访问有序，是高性能的第一性原理
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CPU 缓存呈金字塔：L1 私有最快（约 1ns），L3 多核共享（约 12ns），主存最慢（约 100ns）。缓存以 64 字节为单位整行加载，因此访问连续内存（如 `std::vector` 顺序遍历）能命中同一缓存行，而链表节点散落在堆各处会反复 cache miss。
      </figcaption>
    </figure>
  );
}
