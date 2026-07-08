/**
 * <MglMachineLearningDiagram>：机器学习核心概念图解（mgl-machine-learning 章）。
 *
 * 左侧：线性回归 + 梯度下降示意。
 * 右侧：神经网络结构 + 反向传播。
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

export function MglMachineLearningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="机器学习核心概念图解。左侧线性回归：数据点+拟合直线 y=wx+b，梯度下降沿负梯度方向更新参数 w←w-η∂L/∂w。右侧神经网络：输入层→隐藏层（ReLU激活）→输出层，反向传播用链式法则逐层传梯度。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>机器学习：回归、梯度下降与神经网络</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>数学（线性代数+微积分+概率）驱动学习</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：线性回归 + 梯度下降 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>线性回归 + 梯度下降</text>

          {/* 散点图 */}
          <rect x="56" y="104" width="248" height="120" rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
          <line x1="72" y1="200" x2="288" y2="120" stroke={accent} strokeWidth="2" />
          {/* 数据点 */}
          {[[80,195],[110,180],[140,185],[170,160],[200,155],[230,140],[260,130]].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={success} />
          ))}
          <text x="76" y="218" fontSize="10" fill={secondary}>y = wx + b（最小化均方误差）</text>

          {/* 梯度下降 */}
          <rect x="48" y="240" width="264" height="76" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="260" fontSize="12" fontWeight="700" fill={warning}>梯度下降</text>
          <text x="64" y="280" fontSize="12" fontFamily="monospace" fill={primary}>w ← w - η · ∂L/∂w</text>
          <text x="64" y="298" fontSize="11" fill={secondary}>η 大→震荡　η 小→慢</text>

          {/* 损失曲线 */}
          <path d="M 64 340 Q 120 335 160 330 Q 200 328 240 326 Q 270 325 290 325" fill="none" stroke={danger} strokeWidth="2" />
          <text x="64" y="360" fontSize="10" fill={danger}>损失 L</text>
          <text x="290" y="360" textAnchor="end" fontSize="10" fill={secondary}>迭代→</text>

          {/* ===== 右侧：神经网络 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>神经网络</text>

          {/* 网络结构 */}
          {/* 输入层 */}
          {[120, 160, 200].map((y, i) => (
            <g key={`in-${i}`}>
              <circle cx="380" cy={y} r="12" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
              <text x="380" y={y + 4} textAnchor="middle" fontSize="10" fill={accent}>x{i+1}</text>
            </g>
          ))}
          {/* 隐藏层 */}
          {[110, 150, 190, 230].map((y, i) => (
            <g key={`h-${i}`}>
              <circle cx="480" cy={y} r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
              <text x="480" y={y + 4} textAnchor="middle" fontSize="10" fill={success}>h{i+1}</text>
            </g>
          ))}
          {/* 输出层 */}
          {[150, 190].map((y, i) => (
            <g key={`o-${i}`}>
              <circle cx="580" cy={y} r="12" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.5" />
              <text x="580" y={y + 4} textAnchor="middle" fontSize="10" fill={danger}>y{i+1}</text>
            </g>
          ))}

          {/* 连接线（简化） */}
          {[120, 160, 200].map(iy => [110, 150, 190, 230].map(hy => (
            <line x1="392" y1={iy} x2="468" y2={hy} stroke={border} strokeWidth="0.5" strokeOpacity="0.4" />
          )))}
          {[110, 150, 190, 230].map(hy => [150, 190].map(oy => (
            <line x1="492" y1={hy} x2="568" y2={oy} stroke={border} strokeWidth="0.5" strokeOpacity="0.4" />
          )))}

          <text x="380" y="260" textAnchor="middle" fontSize="10" fill={accent}>输入层</text>
          <text x="480" y="260" textAnchor="middle" fontSize="10" fill={success}>隐藏层(ReLU)</text>
          <text x="580" y="260" textAnchor="middle" fontSize="10" fill={danger}>输出层</text>

          {/* 反向传播 */}
          <rect x="360" y="276" width="312" height="80" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="296" fontSize="12" fontWeight="700" fill={danger}>反向传播 = 链式法则</text>
          <text x="376" y="316" fontSize="11" fontFamily="monospace" fill={primary}>∂L/∂w₁ = ∂L/∂f · ∂f/∂g · ∂g/∂h · ∂h/∂w₁</text>
          <text x="376" y="336" fontSize="11" fill={secondary}>输出层→隐藏层→输入层 逐层传梯度</text>
          <text x="376" y="352" fontSize="11" fill={secondary}>没有激活函数→多层等价于单层线性变换</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线性回归用最小二乘法拟合直线，梯度下降沿负梯度更新参数。神经网络是多层数非线性变换的复合，反向传播用链式法则逐层传梯度。数学（线代+微积分+概率）是ML的语言。
      </figcaption>
    </figure>
  );
}
