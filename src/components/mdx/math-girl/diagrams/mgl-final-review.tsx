/**
 * <MglFinalReviewDiagram>：数学女孩全书知识串联图（mgl-final-review 章）。
 *
 * 四个板块节点环绕中心「数学驱动计算」，箭头展示递进关系。
 * 底部总结栏点出全书闭环。
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

export function MglFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数学女孩全书知识串联图。四个板块节点环绕中心「数学驱动计算」：数论（→密码学）、代数（→函数思维）、离散数学（→算法分析）、算法与ML（→计算应用）。箭头展示递进关系。底部总结：从数论到机器学习的数学闭环。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>数学女孩 · 全书知识串联</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>从数论到机器学习的数学闭环</text>

          {/* 中心节点 */}
          <ellipse cx={VIEW_W / 2} cy="210" rx="100" ry="34" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="2" />
          <text x={VIEW_W / 2} y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>数学驱动计算</text>
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="11" fill={secondary}>数学是算法的理论基础</text>

          {/* 四个板块 */}
          {/* 数论（左上） */}
          <line x1={VIEW_W / 2 - 90} y1="195" x2="200" y2="120" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x="48" y="90" width="180" height="60" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="138" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>数论</text>
          <text x="60" y="128" fontSize="11" fill={primary}>质数·GCD·模运算</text>
          <text x="60" y="144" fontSize="11" fill={secondary}>→ RSA 密码学</text>

          {/* 代数（右上） */}
          <line x1={VIEW_W / 2 + 90} y1="195" x2="520" y2="120" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x="492" y="90" width="180" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="582" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>代数</text>
          <text x="504" y="128" fontSize="11" fill={primary}>方程·函数·复合</text>
          <text x="504" y="144" fontSize="11" fill={secondary}>→ 函数式编程</text>

          {/* 离散数学（左下） */}
          <line x1={VIEW_W / 2 - 80} y1="230" x2="200" y2="300" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x="48" y="280" width="180" height="60" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="138" y="300" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>离散数学</text>
          <text x="60" y="318" fontSize="11" fill={primary}>组合·图论·概率</text>
          <text x="60" y="334" fontSize="11" fill={secondary}>→ 算法分析</text>

          {/* 算法与ML（右下） */}
          <line x1={VIEW_W / 2 + 80} y1="230" x2="520" y2="300" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x="492" y="280" width="180" height="60" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="582" y="300" textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>算法与ML</text>
          <text x="504" y="318" fontSize="11" fill={primary}>分治·贪心·DP·梯度下降</text>
          <text x="504" y="334" fontSize="11" fill={secondary}>→ 计算应用</text>

          {/* 底部总结 */}
          <rect x="48" y="362" width={VIEW_W - 96} height="36" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="385" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            数学闭环：数论→代数→离散→算法与ML→回到数学验证
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四大板块汇聚于「数学驱动计算」：数论驱动密码学，代数提供函数思维，离散数学建模算法，算法与ML是数学的综合应用。全书形成从理论到应用的完整闭环。
      </figcaption>
    </figure>
  );
}
