/**
 * <DsaComplexityDiagram>：复杂度分析工具图解（dsa-complexity-analysis 章）。
 *
 * 左侧：均摊分析三种方法对比。
 * 右侧：主定理三种情形 + 增长曲线。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function DsaComplexityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="复杂度分析工具图解。左侧均摊分析三种方法：聚集法（总代价/n）、记账法（预付信用）、势能法（势能函数Φ）。右侧主定理三种情形：a<b^d→O(n^d)、a=b^d→O(n^d log n)、a>b^d→O(n^(log_b a))。底部列出常见递推与解。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>复杂度分析：均摊与主定理</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>评估操作效率的数学工具</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：均摊分析 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>均摊分析三种方法</text>

          <rect x="48" y="104" width="272" height="60" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="124" fontSize="12" fontWeight="700" fill={accent}>聚集法（Aggregate）</text>
          <text x="64" y="142" fontSize="11" fill={primary}>总代价 T(n) ÷ n = 均摊代价</text>
          <text x="64" y="158" fontSize="11" fill={secondary}>vector: T(n)=3n → 均摊 O(1)</text>

          <rect x="48" y="176" width="272" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="196" fontSize="12" fontWeight="700" fill={success}>记账法（Accounting）</text>
          <text x="64" y="214" fontSize="11" fill={primary}>预付费用，多余存入信用</text>
          <text x="64" y="230" fontSize="11" fill={secondary}>扩容时用信用支付搬迁</text>

          <rect x="48" y="248" width="272" height="60" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="268" fontSize="12" fontWeight="700" fill={warning}>势能法（Potential）</text>
          <text x="64" y="286" fontSize="11" fill={primary}>均摊 = 实际 + ΔΦ</text>
          <text x="64" y="302" fontSize="11" fontFamily="monospace" fill={secondary}>Φ = 2·size - capacity</text>

          {/* ===== 右侧：主定理 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>主定理 T(n)=aT(n/b)+O(n^d)</text>

          <rect x="360" y="104" width="312" height="44" rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="124" fontSize="11" fill={primary}>a &lt; b^d → T(n) = O(n^d)</text>
          <text x="376" y="140" fontSize="10" fill={secondary}>根节点代价主导</text>

          <rect x="360" y="158" width="312" height="44" rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="178" fontSize="11" fill={primary}>a = b^d → T(n) = O(n^d log n)</text>
          <text x="376" y="194" fontSize="10" fill={secondary}>各层代价均衡（归并排序）</text>

          <rect x="360" y="212" width="312" height="44" rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="232" fontSize="11" fill={primary}>a &gt; b^d → T(n) = O(n^(log_b a))</text>
          <text x="376" y="248" fontSize="10" fill={secondary}>叶子代价主导</text>

          {/* 常见递推 */}
          <rect x="360" y="268" width="312" height="104" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x="376" y="288" fontSize="12" fontWeight="700" fill={accent}>常见递推与解</text>
          <text x="376" y="308" fontSize="11" fontFamily="monospace" fill={primary}>二分查找: T(n)=T(n/2)+O(1)→O(log n)</text>
          <text x="376" y="326" fontSize="11" fontFamily="monospace" fill={primary}>归并排序: T(n)=2T(n/2)+O(n)→O(n log n)</text>
          <text x="376" y="344" fontSize="11" fontFamily="monospace" fill={primary}>Strassen: T(n)=7T(n/2)+O(n²)→O(n^2.81)</text>
          <text x="376" y="362" fontSize="11" fontFamily="monospace" fill={primary}>朴素矩阵: T(n)=8T(n/2)+O(1)→O(n³)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        均摊分析评估一系列操作的总代价（聚集/记账/势能三种方法）。主定理求解 T(n)=aT(n/b)+O(n^d) 的递推，根据 a 与 b^d 的关系确定复杂度。
      </figcaption>
    </figure>
  );
}
