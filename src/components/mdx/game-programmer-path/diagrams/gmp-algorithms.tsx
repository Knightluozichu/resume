/**
 * <GmpAlgorithmsDiagram>：算法基础与复杂度分析图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="算法基础与复杂度分析图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            大 O 复杂度与游戏算法优化
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            16ms/帧 · O(n^2) 在 n=1000 时爆炸
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <text x={VIEW_W / 2} y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">复杂度等级（从快到慢）</text>

          <rect x="70" y="112" width="100" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(1)</text>

          <rect x="180" y="112" width="100" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="230" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(log n)</text>

          <rect x="290" y="112" width="100" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="340" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(n)</text>

          <rect x="400" y="112" width="100" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="450" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(n log n)</text>

          <rect x="510" y="112" width="100" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="560" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(n^2)</text>

          <rect x="620" y="112" width="80" height="36" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="660" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(2^n)</text>

          <text x={VIEW_W / 2} y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            n=1000 时实际耗时估算
          </text>

          <rect x="70" y="184" width="580" height="30" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" />
          <text x={VIEW_W / 2} y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            O(n) ~1us · O(n log n) ~10us · O(n^2) ~1ms · O(n^3) ~1s
          </text>

          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            游戏常用优化策略
          </text>

          <rect x="70" y="250" width="180" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="160" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">暴力 O(n^2)</text>
          <text x="160" y="288" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">1000 对象=100 万次</text>

          <text x="275" y="278" textAnchor="middle" fontSize="14" fill="var(--accent)">&rarr; 空间划分 &rarr;</text>

          <rect x="420" y="250" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="510" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">四叉树 O(n log n)</text>
          <text x="510" y="288" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">1000 对象=1 万次</text>

          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            先保证大 O 不差（不在循环中嵌套 O(n)），再优化常数
          </text>
          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            大 O 定性判断趋势 · Profiler 验证实际性能
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法复杂度——大 O 等级与游戏优化策略
      </figcaption>
    </figure>
  );
}
