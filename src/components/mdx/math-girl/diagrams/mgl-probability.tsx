/**
 * <MglProbabilityDiagram>：概率论核心概念图解（mgl-probability 章）。
 *
 * 左侧：贝叶斯定理的文氏图示意。
 * 右侧：期望与方差 + 蒙特卡洛示意。
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

export function MglProbabilityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="概率论核心概念图解。左侧贝叶斯定理：P(A|B)=P(B|A)×P(A)/P(B)，用文氏图展示条件概率。医学检测示例：发病率1%、准确率99%、阳性时真患病=50%（基础率谬误）。右侧期望与方差：骰子期望3.5，方差度量波动。底部蒙特卡洛估算π。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>概率论：贝叶斯、期望与蒙特卡洛</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>处理不确定性的数学工具</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：贝叶斯定理 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>贝叶斯定理</text>

          {/* 文氏图 */}
          <rect x="60" y="104" width="240" height="100" rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
          <circle cx="140" cy="154" r="36" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5" />
          <circle cx="200" cy="154" r="36" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1.5" />
          <text x="120" y="158" textAnchor="middle" fontSize="11" fill={accent}>P(A)</text>
          <text x="220" y="158" textAnchor="middle" fontSize="11" fill={danger}>P(B)</text>
          <text x="170" y="158" textAnchor="middle" fontSize="10" fill={primary}>A∩B</text>

          <text x="180" y="226" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="600" fill={primary}>P(A|B) = P(B|A)·P(A) / P(B)</text>
          <text x="180" y="246" textAnchor="middle" fontSize="11" fill={secondary}>后验 = 似然 × 先验 / 证据</text>

          {/* 医学检测示例 */}
          <rect x="48" y="264" width="272" height="108" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="284" fontSize="12" fontWeight="700" fill={danger}>医学检测（基础率谬误）</text>
          <text x="64" y="304" fontSize="11" fill={primary}>发病率：1%（先验）</text>
          <text x="64" y="322" fontSize="11" fill={primary}>检测准确率：99%</text>
          <text x="64" y="342" fontSize="11" fontWeight="600" fill={warning}>直觉：阳性→99%患病</text>
          <text x="64" y="360" fontSize="11" fontWeight="600" fill={danger}>实际：P(病|阳性)=50%</text>

          {/* ===== 右侧：期望 + 蒙特卡洛 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>期望与方差</text>

          <rect x="360" y="104" width="312" height="72" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="124" fontSize="12" fontWeight="700" fill={success}>骰子的期望</text>
          <text x="376" y="144" fontSize="12" fontFamily="monospace" fill={primary}>E[X] = (1+2+3+4+5+6)/6 = 3.5</text>
          <text x="376" y="162" fontSize="11" fill={secondary}>期望=加权平均，不一定是最可能值</text>

          <rect x="360" y="192" width="312" height="72" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="212" fontSize="12" fontWeight="700" fill={warning}>方差</text>
          <text x="376" y="232" fontSize="12" fontFamily="monospace" fill={primary}>Var(X) = E[(X-E[X])²]</text>
          <text x="376" y="250" fontSize="11" fill={secondary}>方差越大，波动越大</text>

          {/* 蒙特卡洛 */}
          <rect x="360" y="280" width="312" height="92" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="300" fontSize="12" fontWeight="700" fill={accent}>蒙特卡洛模拟</text>
          <text x="376" y="320" fontSize="11" fill={primary}>随机撒点估算 π</text>
          <text x="376" y="338" fontSize="11" fontFamily="monospace" fill={primary}>π ≈ 4 × (圆内点/总点数)</text>
          <text x="376" y="358" fontSize="11" fill={secondary}>大数定律：点数越多越精确</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        贝叶斯定理根据证据更新概率（基础率谬误是常见陷阱）。期望是加权平均，方差度量波动。蒙特卡洛用随机采样估计确定值，大数定律保证收敛。
      </figcaption>
    </figure>
  );
}
