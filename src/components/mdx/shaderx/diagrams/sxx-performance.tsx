/**
 * <SxxPerformanceDiagram>：Shader 性能优化图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxPerformanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Shader 性能优化图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Shader 性能优化技巧
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            指令数、带宽、分支与寄存器优化
          </text>

          {/* ALU优化 */}
          <rect x="40" y="80" width="200" height="140" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">ALU 指令优化</text>
          <text x="140" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">用 mad 代替 mul+add</text>
          <text x="140" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">用 rsqrt 代替 1/sqrt</text>
          <text x="140" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">避免幂运算，用乘法链</text>
          <text x="140" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">规范化只用一次</text>
          <text x="140" y="198" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">dot/cross 代替分量运算</text>
          <text x="140" y="214" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">lerp 代替手动插值</text>

          {/* 带宽优化 */}
          <rect x="260" y="80" width="200" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">带宽优化</text>
          <text x="360" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">纹理压缩（BC/DXT）</text>
          <text x="360" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Mipmap 减少远距采样</text>
          <text x="360" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">合并贴图减少切换</text>
          <text x="360" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">精简 varying 传递</text>
          <text x="360" y="198" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">float3 → half3 压缩</text>
          <text x="360" y="214" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">G-Buffer 紧凑打包</text>

          {/* 分支优化 */}
          <rect x="480" y="80" width="200" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">分支优化</text>
          <text x="580" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GPU SIMD 锁步执行</text>
          <text x="580" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">分支发散性能暴跌</text>
          <text x="580" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用 step/lerp 替代 if</text>
          <text x="580" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">uniform 分支安全</text>
          <text x="580" y="198" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">c = lerp(a, b, step(th, x))</text>
          <text x="580" y="214" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">无分支替代条件逻辑</text>

          {/* 寄存器优化 */}
          <rect x="120" y="250" width="480" height="110" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="360" y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">寄存器与占用率优化</text>
          <text x="200" y="300" textAnchor="middle" fontSize="10" fill="var(--text-primary)">减少临时变量</text>
          <text x="200" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">复用中间结果</text>
          <text x="360" y="300" textAnchor="middle" fontSize="10" fill="var(--text-primary)">降低寄存器压力</text>
          <text x="360" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">提高 warp/wave 占用率</text>
          <text x="520" y="300" textAnchor="middle" fontSize="10" fill="var(--text-primary)">循环展开权衡</text>
          <text x="520" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">展开减分支但增寄存器</text>
          <text x="360" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">占用率 = 活跃 warp 数 / 最大 warp 数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Shader 性能优化——ALU指令、带宽、分支发散与寄存器占用率
      </figcaption>
    </figure>
  );
}
