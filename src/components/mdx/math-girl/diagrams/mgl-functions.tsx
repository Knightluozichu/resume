"use client";

/**
 * <MglFunctionsDiagram>：函数复合与逆函数图解（mgl-functions 章）。
 *
 * 左侧：函数复合 f(g(x)) 的流程示意。
 * 右侧：逆函数示意 + 常见函数族对比。
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

export function MglFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="函数复合与逆函数图解。左侧展示函数复合 f(g(x))：x→g(x)=2x→f(2x)=(2x)²+1=4x²+1，三个圆圈用箭头串联。右侧上方展示逆函数：f(x)=x²+1 和 f⁻¹(y)=√(y-1) 互为逆。右侧下方展示四种函数族的增长曲线对比：对数、线性、多项式、指数。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>函数：复合、逆与函数族</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>函数是编程与数学的共通语言</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：函数复合 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>函数复合 (f ∘ g)(x)</text>

          {/* x → g → f → 结果 */}
          <ellipse cx="80" cy="140" rx="28" ry="20" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="80" y="145" textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>x</text>

          <line x1="112" y1="140" x2="138" y2="140" stroke={secondary} strokeWidth="1.4" />
          <polygon points="138,136 138,144 144,140" fill={secondary} />
          <text x="125" y="132" textAnchor="middle" fontSize="11" fill={secondary}>g</text>

          <ellipse cx="180" cy="140" rx="36" ry="20" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="180" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>2x</text>

          <line x1="218" y1="140" x2="244" y2="140" stroke={secondary} strokeWidth="1.4" />
          <polygon points="244,136 244,144 250,140" fill={secondary} />
          <text x="231" y="132" textAnchor="middle" fontSize="11" fill={secondary}>f</text>

          <ellipse cx="290" cy="140" rx="40" ry="20" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
          <text x="290" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>4x²+1</text>

          <text x="180" y="182" textAnchor="middle" fontSize="11" fill={secondary}>g(x)=2x → f(g(x))=(2x)²+1</text>

          {/* 逆函数 */}
          <rect x="48" y="208" width="280" height="76" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="228" fontSize="12" fontWeight="700" fill={danger}>逆函数 f⁻¹</text>
          <text x="64" y="248" fontSize="11" fontFamily="monospace" fill={primary}>f:[0,∞)→[1,∞), f(x)=x²+1</text>
          <text x="64" y="266" fontSize="11" fontFamily="monospace" fill={primary}>f⁻¹(y) = √(y - 1)</text>
          <text x="64" y="280" fontSize="11" fill={secondary}>限制定义域与陪域后才有双边逆</text>

          {/* ===== 右侧：函数族 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>函数族增长对比</text>

          {/* 坐标轴 */}
          <line x1="380" y1="280" x2="660" y2="280" stroke={border} strokeWidth="1" />
          <line x1="380" y1="110" x2="380" y2="280" stroke={border} strokeWidth="1" />

          {/* 曲线 */}
          <path d="M 380 270 Q 500 264 660 250" fill="none" stroke={success} strokeWidth="2" />
          <text x="580" y="245" fontSize="11" fill={success}>log n（慢）</text>

          <path d="M 380 270 L 660 170" fill="none" stroke={accent} strokeWidth="2" />
          <text x="600" y="175" fontSize="11" fill={accent}>n（线性）</text>

          <path d="M 380 270 Q 500 260 660 160" fill="none" stroke={warning} strokeWidth="2" />
          <text x="610" y="160" fontSize="11" fill={warning}>n²（快）</text>

          <path d="M 380 270 Q 550 268 640 130" fill="none" stroke={danger} strokeWidth="2" />
          <text x="610" y="130" fontSize="11" fill={danger}>2ⁿ（爆炸）</text>

          <text x="520" y="298" textAnchor="middle" fontSize="11" fill={secondary}>x</text>
          <text x="368" y="120" textAnchor="middle" fontSize="11" fill={secondary}>y</text>

          {/* 底部总结 */}
          <rect x="48" y="304" width="624" height="72" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x="64" y="324" fontSize="12" fontWeight="700" fill={accent}>函数 ↔ 编程</text>
          <text x="64" y="344" fontSize="11" fill={primary}>数学函数 f:X→Y ↔ 显式输入决定唯一输出的纯函数</text>
          <text x="64" y="360" fontSize="11" fill={primary}>复合 f∘g = 可类型检查的函数组合  逆函数 = 双射的反向映射</text>
          <text x="64" y="372" fontSize="11" fill={secondary}>普通程序过程还可能依赖状态、I/O、时间与随机源</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数复合是「先执行一个变换再执行另一个」，逆函数是「撤销变换」。对数增长最慢（O(log n) 算法高效），指数增长最快（O(2ⁿ) 算法不可行）。函数是数学与编程的共通语言。
      </figcaption>
    </figure>
  );
}
