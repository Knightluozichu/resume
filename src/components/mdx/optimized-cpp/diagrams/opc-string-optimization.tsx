/**
 * <OpcStringOptDiagram>：字符串优化（optimized-cpp 字符串优化章）。
 *
 * 左右对比：左侧「低效写法」（红）——多次拷贝、多次分配；
 * 右侧「高效写法」（绿）——string_view 零拷贝、reserve 预分配、move 转移所有权。
 * 每侧三行示例卡片，中间用箭头表示「优化方向」。
 * 底部一条总结栏：减少分配是字符串优化的核心。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

type Row = {
  bad: string;
  good: string;
  gain: string;
};

const ROWS: readonly Row[] = [
  { bad: "按值传参 → 触发拷贝", good: "const ref / string_view → 零拷贝", gain: "省 1 次分配" },
  { bad: "拼接无 reserve → 多次扩容", good: "先 reserve 再拼接 → 一次分配", gain: "省 N 次扩容" },
  { bad: "返回 string → 拷贝", good: "move / RVO → 转移所有权", gain: "省 1 次拷贝" },
];

export function OpcStringOptDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="字符串优化对比图。左侧红色低效写法：按值传参触发拷贝、拼接无 reserve 多次扩容、返回 string 拷贝。右侧绿色高效写法：const 引用或 string_view 零拷贝、先 reserve 再拼接一次分配、move 或 RVO 转移所有权。每行右侧标注收益：省 1 次分配、省 N 次扩容、省 1 次拷贝。底部总结：减少堆分配是字符串优化的核心。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            字符串优化 · 减少分配与拷贝
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            std::string 的性能瓶颈几乎都在堆分配——消除不必要的分配就是最大的提速
          </text>

          {/* ===== 列头 ===== */}
          <rect x="40" y="80" width="280" height="30" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="180" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">低效写法</text>

          <rect x="400" y="80" width="280" height="30" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">高效写法</text>

          {/* ===== 三行对比 ===== */}
          {ROWS.map((row, i) => {
            const y = 132 + i * 68;
            return (
              <g key={i}>
                {/* 左侧低效卡片 */}
                <rect x="40" y={y} width="280" height="52" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <circle cx="56" cy={y + 26} r="3" fill="var(--danger)" />
                <text x="70" y={y + 22} fontSize="12" fill="var(--text-primary)">{row.bad}</text>
                <text x="70" y={y + 40} fontSize="11" fill="var(--text-secondary)">触发堆分配 + 数据拷贝</text>

                {/* 中间箭头 */}
                <line x1="328" y1={y + 26} x2="392" y2={y + 26} stroke="var(--accent)" strokeWidth="1.6" />
                <path d={`M388 ${y + 22} L396 ${y + 26} L388 ${y + 30}`} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />

                {/* 右侧高效卡片 */}
                <rect x="400" y={y} width="280" height="52" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
                <circle cx="416" cy={y + 26} r="3" fill="var(--success)" />
                <text x="430" y={y + 22} fontSize="12" fill="var(--text-primary)">{row.good}</text>
                <text x="430" y={y + 40} fontSize="11" fill="var(--success)" fontWeight="700">{row.gain}</text>
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <rect x="60" y="360" width={VIEW_W - 120} height="56" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            核心原则：减少堆分配
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            string_view 不分配、reserve 预分配一次、move/RVO 转移所有权——三招消除 90% 的字符串开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        字符串优化的三板斧：用 string_view 避免只读场景的分配、用 reserve 预留容量避免反复扩容、用 move 语义与 RVO 避免返回值拷贝。
      </figcaption>
    </figure>
  );
}
